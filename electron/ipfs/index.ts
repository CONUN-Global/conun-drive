import { app } from "electron";
import Ctl from "ipfsd-ctl";
import fs from "fs-extra";
import { join } from "path";

import logger from "../logger";
import db from "../store/db";

import getIpfsBinPath from "../helpers/getIpfsBinPath";
import writeIpfsBinaryPath from "../helpers/writeIpfsBinaryPath";
import configExists from "../helpers/configExists";

let node = null;

export function getIpfs() {
  return node;
}

export async function createIpfs() {
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

    const ipfsd = await await Ctl.createController({
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

    if (!ipfsPath?.path) {
      await db.put({
        ...ipfsPath,
        path: ipfsd.path,
      });
    }

    if (!configExists(ipfsd)) {
      await ipfsd.init();
    }

    await ipfsd.start();

    node = ipfsd.api;

    const id = await node.id();
    const peers = await node.swarm.peers();

    logger("ipfs-id", `peer ID: ${JSON.stringify(id?.id)}`, "info");
    logger("ipfs-peers", `peers: ${JSON.stringify(peers)}`, "info");

    return true;
  } catch (error) {
    logger("ipfs-connection", error?.message ?? error, "error");

    return false;
  }
}

export default node;
