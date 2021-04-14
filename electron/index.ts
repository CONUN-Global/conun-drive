import { app, BrowserWindow } from "electron";
import fs from "fs";
import IPFS from "ipfs-core";
import Protector from "libp2p/src/pnet";
import isDev from "electron-is-dev";
import serve from "electron-serve";

const loadURL = serve({ directory: "dist/parcel-build" });

let node;

const BOOTSTRAP_ADDRESSS =
  "/ip4/15.164.229.6/tcp/4001/ipfs/12D3KooWNubmXubMPzPY9B69HLAEpoRBS41MchdGCa9SgJtd5LnT";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = async (): Promise<void> => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    title: "Conun Drive",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  try {
    node = await IPFS.create({
      libp2p: {
        modules: {
          connProtector: new Protector(
            fs.readFileSync(__dirname + "/assets/swarm.key")
          ),
        },
      },
      // @ts-expect-error
      config: {
        Bootstrap: [BOOTSTRAP_ADDRESSS],
      },
    });
  } catch (err) {
    console.log(`err`, err);
  }

  if (isDev) {
    await mainWindow.loadURL("http://localhost:1234");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    await loadURL(mainWindow);
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
