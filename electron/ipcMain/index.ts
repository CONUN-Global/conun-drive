import { ipcMain } from "electron";
import all from "it-all";
import { concat } from "uint8arrays";

import { node } from "../";

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
    const description = concat(await all(node.cat(hash)));

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
