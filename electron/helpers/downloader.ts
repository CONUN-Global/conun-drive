import { app } from "electron";
import { appendFileSync } from "fs";
import { join } from "path";
import { mainWindow } from "../";
import logger from "../logger";

async function downloader(node, data) {
  let totalBytes = 0;

  setTimeout(async () => {
    if (totalBytes === 0) {
      logger(
        "download-from-bootstrap",
        `attempting to download from bootstrap`,
        "info"
      );

      mainWindow.webContents.send("attempt-bootstrap-download", {
        data: data?.data,
      });
    }
  }, 10000);

  // eslint-disable-next-line
  for await (const file of node.get(data.contentHash)) {
    // eslint-disable-next-line
    if (!file.content) continue;

    // eslint-disable-next-line
    for await (const chunk of file.content) {
      totalBytes += chunk?.length;
      const currentPercentage = ((totalBytes * 100) / data?.data?.size).toFixed(
        2
      );

      appendFileSync(
        join(app.getPath("downloads"), data.name),
        Buffer.from(chunk)
      );

      mainWindow.webContents.send("download-percentage", {
        file: data?.data,
        percentage: currentPercentage,
      });
    }

    logger("download-succes", `Downloaded hash ${data.contentHash}`, "info");

    mainWindow.webContents.send("download-success", {
      success: true,
      path: join(app.getPath("downloads"), data.name),
      data: data?.data,
    });
  }
}

export default downloader;
