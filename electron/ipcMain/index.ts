import { ipcMain } from "electron";
import fs from "fs";
import fetch from "electron-fetch";
import all from "it-all";
import { concat } from "uint8arrays";

import { mainWindow, node } from "../";

ipcMain.handle("get-file-preview", async (_, hash) => {
  try {
    const preview = concat(await all(node.cat(hash)));

    return {
      success: true,
      preview,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
});

ipcMain.handle("upload-file", async (_, info) => {
  try {
    mainWindow.webContents.send("is-registering-file", true);
    const file = fs.readFileSync(info.filePath);
    const fileContent = Buffer.from(file);
    const fileHash = await node.add({
      content: fileContent,
    });

    process.send({ type: "upload-file", fileHash, price: 0, data: info });

    return {
      success: true,
      fileHash,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
});

ipcMain.handle("like-content", (_, args) => {
  try {
    process.send({
      type: "like-content",
      ccid: args?.publicHash,
      user_id: args?.userId,
      content_id: args?.contentId,
    });
  } catch (error) {
    console.log(`error`, error);
  }
});

ipcMain.handle("get-current-user", async (_, walletAddress) => {
  try {
    const res = await fetch("http://192.168.100.54:8000/api/user/auth", {
      method: "POST",
      body: JSON.stringify({ wallet_id: walletAddress }),
      headers: { "Content-Type": "application/json" },
    });

    const { data } = await res.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
});
