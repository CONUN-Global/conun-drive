import { app } from "electron";
import Ctl from "ipfsd-ctl";
import fs from "fs-extra";
import { join } from "path";
import copyfiles from "copyfiles";
import { concat } from "uint8arrays";
import { appendFileSync } from "fs";
import all from "it-all";
import Jimp from "jimp";

import logger from "../logger";
import db from "../store/db";
import { mainWindow } from "../";

import getIpfsBinPath from "../helpers/getIpfsBinPath";
import writeIpfsBinaryPath from "../helpers/writeIpfsBinaryPath";
import configExists from "../helpers/configExists";
import rmApiFile from "../helpers/removeApiFile";

class NodeIPFS {
  private ipfsd;

  constructor() {
    this.ipfsd = null;
  }

  async initialize() {
    try {
      const userDetails = await db.get("userDetailsDrive");

      if (app.getVersion() === "0.1.2-beta" && !userDetails?.isIpfsFileNew) {
        logger("ipfs-id", "removing .jsipfs folder", "info");

        fs.removeSync(join(app.getPath("home"), ".jsipfs"));

        logger("ipfs-id", "removed .jsipfs folder", "info");

        await db.put({
          ...userDetails,
          isIpfsFileNew: true,
        });
      }

      const ipfsBin = getIpfsBinPath();
      writeIpfsBinaryPath(ipfsBin);
      const ipfsPath = await db.get("ipfs-path");

      this.ipfsd = await await Ctl.createController({
        ipfsHttpModule: require("ipfs-http-client"),
        type: "go",
        ipfsBin: ipfsBin,
        ipfsOptions: {
          repo: ipfsPath?.path || "",
        },
        remote: false,
        disposable: false,
        test: false,
        args: ["--migrate", "--enable-gc", "--routing", "dhtclient"],
      });

      copyfiles(
        [join(__dirname, "../assets/swarm.key"), this.ipfsd.path],
        { up: true, error: true },
        (err) => {
          logger("copy-swarm-key", err, "error");
        }
      );

      if (!ipfsPath?.path) {
        await db.put({
          ...ipfsPath,
          path: this.ipfsd.path,
        });
      }

      if (!configExists(this.ipfsd)) {
        await this.ipfsd.init();
      }

      await this.ipfsd.start();

      const id = await this.ipfsd.api.id();
      const peers = await this.ipfsd.api.swarm.peers();

      logger("ipfs-id", `peer ID: ${JSON.stringify(id?.id)}`, "info");
      logger("ipfs-peers", `peers: ${JSON.stringify(peers)}`, "info");

      return true;
    } catch (error) {
      logger("ipfs-connection", error?.message, "error");
      if (!error.message.includes("ECONNREFUSED")) {
        throw error;
      }

      rmApiFile(this.ipfsd);

      return false;
    }
  }

  async disconnect() {
    await this.ipfsd.stop();
  }

  async upload(content, handleProgress = null) {
    try {
      return await this.ipfsd.api.add(
        {
          content: content,
        },
        {
          progress: handleProgress,
        }
      );
    } catch (e) {
      logger("ipfs-upload", e?.message, "error");
    }
  }

  async getPreview(hash) {
    try {
      logger("get-file-preview", `getting preview with hash ${hash}`, "info");
      const preview = concat(await all(this.ipfsd.api.cat(hash)));
      return preview;
    } catch (e) {
      logger("get-file-preview", e?.message, "error");
      return e;
    }
  }

  async uploadAvatar(path) {
    try {
      logger("upload-avatar", "uploading avatar", "info");

      const bufferizedPath = Buffer.from(path.split(",")[1], "base64");
      const preview = await Jimp.read(bufferizedPath);
      await preview.resize(Jimp.AUTO, 500).quality(95);
      const previewContent = await preview.getBufferAsync(preview.getMIME());
      const previewHash = await this.ipfsd.api.add({
        content: previewContent,
      });

      logger(
        "upload-avatar",
        `avatar uploaded with hash ${previewHash?.path}`,
        "info"
      );

      return {
        success: true,
        hash: previewHash?.path,
      };
    } catch (error) {
      logger("upload-avatar", error?.message, "error");
      return {
        success: false,
        error: String(error),
      };
    }
  }

  async download(data) {
    logger("download-start", `Downloading hash ${data.contentHash}`, "info");
    // eslint-disable-next-line
    for await (const file of this.ipfsd.api.get(data?.contentHash)) {
      let totalBytes = 0;
      // eslint-disable-next-line
      if (!file.content) continue;
      const content = [];

      // eslint-disable-next-line
      for await (const chunk of file.content) {
        totalBytes += chunk?.length;
        const currentPercentage = (
          (totalBytes * 100) /
          data?.data?.size
        ).toFixed(2);

        appendFileSync(
          join(app.getPath("downloads"), data.name),
          Buffer.from(chunk)
        );

        mainWindow.webContents.send("download-percentage", {
          file: data?.data,
          percentage: currentPercentage,
        });

        content.push(chunk);
      }

      logger("download-succes", `Downloaded hash ${data.contentHash}`, "info");

      mainWindow.webContents.send("download-success", {
        success: true,
        path: join(app.getPath("downloads"), data.name),
        data: data?.data,
      });
    }
  }
}

export default NodeIPFS;
