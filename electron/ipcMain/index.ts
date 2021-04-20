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

ipcMain.handle("get-file-description", async (_, hash) => {
  try {
    const description = concat(await all(node.cat(hash, { timeout: 5000 })));

    return {
      success: true,
      description,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
});

ipcMain.handle("download-file", async (_, hash) => {
  try {
    // eslint-disable-next-line
    for await (const file of node.get(hash)) {
      // eslint-disable-next-line
      if (!file.content) continue;

      const content = [];

      // eslint-disable-next-line
      for await (const chunk of file.content) {
        content.push(chunk);
      }

      return {
        success: true,
        file: content,
      };
    }

    return {
      success: false,
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
