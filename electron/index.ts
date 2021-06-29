import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import serve from "electron-serve";
import Ctl from "ipfsd-ctl";
import fs from "fs-extra";
import Jimp from "jimp";
import { globSource } from "ipfs-http-client";

import db, { prepareDb } from "./store/db";
import connectToWS, { client } from "./socket";
import logger from "./logger";

import getIpfsBinPath from "./helpers/getIpfsBinPath";
import writeIpfsBinaryPath from "./helpers/writeIpfsBinaryPath";
import configExists from "./helpers/configExists";
import rmApiFile from "./helpers/removeApiFile";
import writeIpfsPath from "./helpers/writeIpfsPath";
import { getURLFromArgv } from "./helpers";

import "./ipcMain";
import "./ipcMain/app";
import "./ipcMain/server";

connectToWS();

const loadURL = serve({ directory: "dist/parcel-build" });

const PROTOCOL_PREFIX = "conun-drive://";

const APP_HEIGHT = process.platform === "win32" ? 746 : 720;

export let mainWindow: BrowserWindow | null = null;

export let ipfsd;

const createWindow = async (): Promise<void> => {
  try {
    await prepareDb();

    try {
      const userDetails = await db.get("userDetailsDrive");

      if (app.getVersion() === "0.1.2-beta" && !userDetails?.isIpfsFileNew) {
        logger("ipfs-id", "removing .jsipfs folder", "info");

        fs.removeSync(path.join(app.getPath("home"), ".jsipfs"));

        logger("ipfs-id", "removed .jsipfs folder", "info");

        await db.put({
          ...userDetails,
          isIpfsFileNew: true,
        });
      }

      const ipfsBin = getIpfsBinPath();
      writeIpfsBinaryPath(ipfsBin);
      const ipfsPath = await db.get("ipfs-path");

      ipfsd = await Ctl.createController({
        ipfsHttpModule: require("ipfs-http-client"),
        type: "go",
        ipfsBin: ipfsBin,
        ipfsOptions: {
          repo: ipfsPath?.path || "",
        },
        remote: false,
        disposable: false,
        test: false,
        args: ["--migrate", "--enable-gc", "--routing", "dhtclient"],
      });

      if (!ipfsPath?.path) {
        await db.put({
          ...ipfsPath,
          path: ipfsd.path,
        });
      }

      if (!configExists(ipfsd)) {
        await ipfsd.init();
      }

      writeIpfsPath(ipfsPath?.path);

      await ipfsd.start();

      const id = await ipfsd.api.id();
      const peers = await ipfsd.api.swarm.peers();

      logger("ipfs-id", `peer ID: ${JSON.stringify(id?.id)}`, "info");
      logger("ipfs-peers", `peers: ${JSON.stringify(peers)}`, "info");
    } catch (error) {
      logger("ipfs-connection", error?.message, "error");
      if (
        !error.message.includes("ECONNREFUSED") &&
        !error.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        throw error;
      }

      rmApiFile(ipfsd);

      await ipfsd.start();

      const id = await ipfsd.api.id();
      const peers = await ipfsd.api.swarm.peers();

      logger("ipfs-id", `peer ID: ${JSON.stringify(id?.id)}`, "info");
      logger("ipfs-peers", `peers: ${JSON.stringify(peers)}`, "info");
    }

    mainWindow = new BrowserWindow({
      height: APP_HEIGHT,
      width: 1280,
      minHeight: APP_HEIGHT,
      minWidth: 1080,
      title: "Conun Drive",
      webPreferences: {
        nodeIntegration: false,
        preload: path.resolve(__dirname, "preload.js"),
      },
    });

    mainWindow.removeMenu();

    mainWindow.webContents.on("new-window", (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });

    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
        /* eslint-disable @typescript-eslint/no-var-requires */
      } = require("electron-devtools-installer");
      await installExtension(REACT_DEVELOPER_TOOLS);
      await mainWindow.loadURL("http://localhost:1235");
      mainWindow.webContents.openDevTools({ mode: "detach" });
    } else {
      await loadURL(mainWindow);
    }

    if (process.platform !== "darwin") {
      if (
        process.argv.length > 1 &&
        process.argv[1].startsWith(PROTOCOL_PREFIX)
      ) {
        // This line works for win and lin
        getURLFromArgv(process.argv[1]).then((url: string) => {
          logger("start-up-with-link", `Start up with link: ${url}`, "error");
          if (url) {
            mainWindow.webContents.send("send-share-link", {
              targetLink: url,
            });
          }
        });
      }
    }
  } catch (err) {
    logger("app-init", err, "error");
  }
};

const singleInstanceLock = app.requestSingleInstanceLock();
app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.setAsDefaultProtocolClient("conun-drive");

if (!singleInstanceLock) {
  app.quit();
} else {
  app.on("second-instance", (_, argv) => {
    logger("Push to file:", `Instance lock triggered`, "error");
    if (argv.length > 1) {
      // Only try this if there is an argv (might be redundant)

      if (process.platform == "win32") {
        getURLFromArgv(argv[argv.length - 1]).then((url: string) => {
          if (url) {
            mainWindow.webContents.send("send-share-link", {
              targetLink: url,
            });
          }
        });
      } else if (process.platform == "linux") {
        getURLFromArgv(argv[1]).then((url: string) => {
          if (url) {
            mainWindow.webContents.send("send-share-link", {
              targetLink: url,
            });
          }
        });
      }
    }
  });
}
// For mac
app.on("will-finish-launching", () => {
  app.on("open-url", (event, url) => {
    event.preventDefault();
    logger("OPEN-URL:", url, "error");
    getURLFromArgv(url).then((url: string) => {
      if (url) {
        mainWindow.webContents.send("send-share-link", {
          targetLink: url,
        });
      }
    });
  });
});

// for mac, when open already
app.on("open-url", (event, url) => {
  event.preventDefault();
  logger("OPEN-URL:", url, "error");
  getURLFromArgv(url).then((url: string) => {
    if (url) {
      mainWindow.webContents.send("send-share-link", {
        targetLink: url,
      });
    }
  });
});

process.on("uncaughtException", (uncaughtException) => {
  logger("uncaught-exception", uncaughtException, "error");
});

ipcMain.handle("upload-avatar", async (_, path) => {
  try {
    logger("upload-avatar", "uploading avatar", "info");

    const bufferizedPath = Buffer.from(path.split(",")[1], "base64");
    const preview = await Jimp.read(bufferizedPath);
    await preview.resize(Jimp.AUTO, 500).quality(95);
    const previewContent = await preview.getBufferAsync(preview.getMIME());

    const newFile = await ipfsd.api.add({
      content: previewContent,
    });

    return {
      success: true,
      hash: newFile?.path,
    };
  } catch (error) {
    logger("upload-avatar", error, "error");
    return {
      success: false,
      error: String(error),
    };
  }
});

ipcMain.handle("upload-file", async (_, info) => {
  try {
    logger("upload-file", `uploading file ${info?.filePath} to ipfs`, "info");
    const handleProgress = (data) => {
      const currentPercentage = ((data * 100) / info?.size).toFixed(2);
      mainWindow.webContents.send("upload-percentage", currentPercentage);
    };

    const fileHash = await ipfsd.api.add(globSource(info.filePath), {
      progress: handleProgress,
    });

    logger(
      "upload-file",
      `sending ${fileHash.cid.toString()} hash to manager`,
      "info"
    );

    client.send(
      JSON.stringify({
        type: "upload-file",
        fileHash: {
          path: fileHash.cid.toString(),
          size: fileHash.size,
        },
        price: 0,
        data: info,
      })
    );

    return {
      success: true,
      fileHash,
    };
  } catch (error) {
    logger("upload-file", error, "error");
    return {
      success: false,
      error: String(error),
    };
  }
});
