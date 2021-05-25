import { app } from "electron";
import IPFS from "ipfs-core";
import fs from "fs-extra";
import { join } from "path";
import Protector from "libp2p/src/pnet";

import logger from "../logger";
import db from "../store/db";

let node = null;

const BOOTSTRAP_ADDRESSS_1 =
  "/ip4/3.37.88.192/tcp/4001/ipfs/12D3KooWHcQJrUAHAt3XSGzEoedRbdmf2S4Y4aX39EqR8wAExTDb";

const BOOTSTRAP_ADDRESSS_2 =
  "/ip4/15.164.162.140/tcp/4001/ipfs/12D3KooWLe8sbS7M4mPuWeF2v8h9qyR7qjMeTuiPgYi51AGFQNdS";

const BOOTSTRAP_ADDRESSS_3 =
  "/ip4/52.79.200.55/tcp/4001/ipfs/12D3KooWMLsqXp8j3Q4eFqfQh1cEVFrmrkKdtcd3JVRaZ2wq94ok";

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

    node = await IPFS.create({
      libp2p: {
        modules: {
          connProtector: new Protector(
            fs.readFileSync(join(__dirname, "../assets/swarm.key"))
          ),
        },
        config: {
          Bootstrap: [
            BOOTSTRAP_ADDRESSS_1,
            BOOTSTRAP_ADDRESSS_2,
            BOOTSTRAP_ADDRESSS_3,
          ],
          Routing: "dhtserver",
        },
      },
    });

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

export default node;
