import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import serve from "electron-serve";
import Ctl from "ipfsd-ctl";
import copyfiles from "copyfiles";
import fs from "fs-extra";
import Jimp from "jimp";

import db, { prepareDb } from "./store/db";
import connectToWS, { client } from "./socket";
import logger from "./logger";

import getIpfsBinPath from "./helpers/getIpfsBinPath";
import writeIpfsBinaryPath from "./helpers/writeIpfsBinaryPath";
import swarmKeyExists from "./helpers/swarmKeyExists";
import configExists from "./helpers/configExists";
import rmApiFile from "./helpers/removeApiFile";
import writeIpfsPath from "./helpers/writeIpfsPath";

import "./ipcMain";
import "./ipcMain/app";

connectToWS();

const loadURL = serve({ directory: "dist/parcel-build" });

export let mainWindow: BrowserWindow | null = null;

const BOOTSTRAP = [
  "/ip4/52.79.200.55/tcp/4001/ipfs/12D3KooWMLsqXp8j3Q4eFqfQh1cEVFrmrkKdtcd3JVRaZ2wq94ok",
  "/ip4/15.164.162.140/tcp/4001/ipfs/12D3KooWLe8sbS7M4mPuWeF2v8h9qyR7qjMeTuiPgYi51AGFQNdS",
  "/ip4/3.37.88.192/tcp/4001/ipfs/12D3KooWHcQJrUAHAt3XSGzEoedRbdmf2S4Y4aX39EqR8wAExTDb",
];

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
          config: {
            Bootstrap: BOOTSTRAP,
            Routing: {
              Type: "dhtserver",
            },
            Discovery: {
              MDNS: {
                Enabled: true,
              },
            },
            Swarm: {
              DisableBandwidthMetrics: false,
              DisableNatPortMap: false,
              EnableAutoRelay: true,
              EnableRelayHop: true,
            },
          },
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

      if (!swarmKeyExists(ipfsd)) {
        copyfiles(
          [path.join(__dirname, "../assets/swarm.key"), ipfsd.path],
          { up: true, error: true },
          (err) => {
            logger("copy-swarm-key", err, "error");
          }
        );
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
    }

    mainWindow = new BrowserWindow({
      height: 720,
      width: 1280,
      title: "Conun Drive",
      webPreferences: {
        nodeIntegration: false,
        preload: path.resolve(__dirname, "preload.js"),
        webSecurity: false,
      },
      resizable: false,
    });

    mainWindow.removeMenu();
    mainWindow.setResizable(false);

    mainWindow.webContents.on("new-window", (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });

    if (isDev) {
      await mainWindow.loadURL("http://localhost:1235");
      mainWindow.webContents.openDevTools({ mode: "detach" });
    } else {
      await loadURL(mainWindow);
    }
  } catch (err) {
    logger("app-init", err, "error");
  }
};

app.on("ready", createWindow);

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
    const file = fs.readFileSync(info.filePath);
    const fileContent = Buffer.from(file);

    const fileHash = await ipfsd.api.add({
      content: fileContent,
      handleProgress,
    });

    logger("upload-file", `sending ${fileHash.path} hash to manager`, "info");

    client.send(
      JSON.stringify({ type: "upload-file", fileHash, price: 0, data: info })
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
