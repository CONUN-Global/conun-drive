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
