import { app, BrowserWindow, protocol, shell } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import serve from "electron-serve";

import { prepareDb } from "./store/db";
import { createIpfs } from "./ipfs";
import connectToWS from "./socket";
import logger from "./logger";

import { linuxGetArgPath, windowsGetArgPath } from "./helpers";

import "./ipcMain";
import "./ipcMain/app";

const loadURL = serve({ directory: "dist/parcel-build" });

export let mainWindow: BrowserWindow | null = null;

connectToWS();

const createWindow = async (): Promise<void> => {
  try {
    await prepareDb();

    await createIpfs();

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

    if (isDev) {
      await mainWindow.loadURL("http://localhost:1235");
      mainWindow.webContents.openDevTools({ mode: "detach" });
    } else {
      await loadURL(mainWindow);
      mainWindow.webContents.openDevTools({ mode: "detach" }); // DEV
    }

    if (process.platform !== "darwin") {
      logger(
        "Start up with file:",
        `Start up with file: ${process.argv}`,
        "error"
      );
      if (process.argv.length > 1) {
        // This line works for win and lin
        mainWindow.webContents.send("send-share-link", {
          targetLink: process.argv[1].split("conun-drive://")[1],
        });
      }
    } else {
      // Mac Only -

      protocol.registerHttpProtocol("conun-drive", (req, cb) => {
        const url = req.url;
        console.log(url);
        logger("url", `url: ${url}`, "error");
      });
    }
  } catch (err) {
    logger("app-init", err, "error");
  }

  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
};

const singleInstanceLock = app.requestSingleInstanceLock();
app.on("ready", () => {
  createWindow();
  logger("ready", "ready", "error");
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
        const deepFileLink = windowsGetArgPath(argv);
        if (deepFileLink) {
          mainWindow.webContents.send("send-share-link", {
            targetLink: deepFileLink,
          });
        }
      } else if (process.platform == "linux") {
        const deepFileLink = linuxGetArgPath(argv);
        if (deepFileLink) {
          mainWindow.webContents.send("send-share-link", {
            targetLink: deepFileLink,
          });
        }
      }
    }
  });
}

// for mac
app.on("open-url", (_, url) => {
  logger("OPEN-URL", "message", "error");
  logger("OPEN-URL:", url, "error");
});

process.on("uncaughtException", (uncaughtException) => {
  logger("uncaught-exception", uncaughtException, "error");
});
