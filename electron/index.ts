import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import serve from "electron-serve";
import Jimp from "jimp";

import { prepareDb } from "./store/db";
import "./ipcMain";
import connectToWS from "./socket";

import logger from "./logger";


import NodeIPFS from "./ipfs/index";

const loadURL = serve({ directory: "dist/parcel-build" });

export let mainWindow: BrowserWindow | null = null;


connectToWS();
const ipfsNode = new NodeIPFS();


(async () =>{
  await prepareDb();
  await ipfsNode.initialize();
})();

const createWindow = async (): Promise<void> => {
  // Create the browser window.
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

  try {
    if (isDev) {
      await mainWindow.loadURL("http://localhost:1235");
      mainWindow.webContents.openDevTools({ mode: "detach" });
    } else {
      await loadURL(mainWindow);
    }
  } catch (err) {
    console.log(`err`, err);
    logger("ipfs-connection", err);
  }
};

ipcMain.handle("upload-avatar", async (_, path) => {
  try {
    console.log('>>>>')
    const bufferizedPath = Buffer.from(path.split(",")[1], "base64");
    const preview = await Jimp.read(bufferizedPath);
    await preview.resize(Jimp.AUTO, 500).quality(95);
    const previewContent = await preview.getBufferAsync(preview.getMIME());

    const previewHash = await ipfsNode.send(previewContent);
    console.log('res send: ', previewHash);

    return {
      success: true,
      hash: previewHash?.path,
    };

  } catch (error) {
    logger("upload-avatar", error);
    return {
      success: false,
      error: String(error),
    };
  }
});

app.on("ready", createWindow);

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    ipfsNode.disconnect();
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

process.on("uncaughtException", (uncaughtException) => {
  console.log('uncaughtException: ', uncaughtException);
  logger("uncaught-exception", uncaughtException);
});

export default ipfsNode;