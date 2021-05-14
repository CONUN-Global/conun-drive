import IPFS from "ipfs-core";
import Protector from "libp2p/src/pnet";
import fs from "fs";
import PeerId from "peer-id";
import { join } from "path";

import logger from "../logger";

let node = null;

const BOOTSTRAP_ADDRESSS_1 =
  "/ip4/52.79.200.55/tcp/4001/ipfs/12D3KooWFyYb19Xki7pj4PyQ1jnZsEx4MfExyng2MZCAtpPXoCxb";

const BOOTSTRAP_ADDRESSS_2 =
  "/ip4/3.34.181.64/tcp/4002/ipfs/12D3KooWRRxEVRbptGzX4Moz6xEqrGnCA35kvFW371QwFuSipwEJ";

export function getIpfs() {
  return node;
}

export async function createIpfs() {
  try {
    const privateKey = await PeerId.create({ keyType: "Ed25519" });

    logger(
      "swarm-key",
      `swarm Key: ${fs.readFileSync(join(__dirname, "../assets/swarm.key"))}`,
      "info"
    );

    node = await IPFS.create({
      libp2p: {
        modules: {
          connProtector: new Protector(
            fs.readFileSync(join(__dirname, "../assets/swarm.key"))
          ),
        },
      },
      // @ts-expect-error
      config: {
        Bootstrap: [BOOTSTRAP_ADDRESSS_1, BOOTSTRAP_ADDRESSS_2],
      },
      init: { privateKey },
    });

    const id = await node.id();
    const peers = await node.swarm.peers();

    logger("ipfs-id", `peer ID: ${JSON.stringify(id?.id)}`, "info");
    logger("ipfs-peers", `peers: ${JSON.stringify(peers)}`, "info");

    return true;
  } catch (error) {
    logger("ipfs-connection", error, "error");

    return false;
  }
}

export default node;
