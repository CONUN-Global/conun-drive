import { app } from "electron";
import fs from "fs-extra";
import IPFS from "ipfs-core";
import { join } from "path";
import logger from "../logger";
import db from "../store/db";

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

    node = await IPFS.create();

    const id = await node.id();
    const peers = await node.swarm.peers();

    logger("ipfs-id", `peer ID: ${JSON.stringify(id?.id)}`, "info");
    logger("ipfs-peers", `peers: ${JSON.stringify(peers)}`, "info");

    return true;
  } catch (error) {
    logger("ipfs-connection", error?.message, "error");

    return false;
  }
}

export async function getPeerData(cid: string) {
  const result = [];
  if (node) {
    try {
      const stream = node.cat(cid);
      for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        result.push(chunk.toString());
      }
    } catch (error) {
      logger("ipfs-get-data", error?.message, "error");
      return [];
    }
  }
  return result;
}

export async function setPeerData(data: any) {
  const result = [];
  if (node) {
    try {
      // add your data to to IPFS - this can be a string, a Buffer,
      // a stream of Buffers, etc
      const cids = node.add(data);

      // we loop over the results because 'add' supports multiple
      // additions, but we only added one entry here so we only see
      // one log line in the output
      for await (const { cid } of cids) {
        // CID (Content IDentifier) uniquely addresses the data
        // and can be used to get it again.
        result.push(cid);
      }
    } catch (error) {
      logger("ipfs-get-data", error?.message, "error");
    }
  }
  return result;
}

export default node;
