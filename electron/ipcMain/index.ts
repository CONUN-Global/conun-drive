import { ipcMain } from "electron";
import fs from "fs";
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
