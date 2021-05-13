import Ctl from "ipfsd-ctl";
import getIpfsBinPath from "../helpers/getIpfsBinPath";
import writeIpfsBinaryPath from "../helpers/writeIpfsBinaryPath";
import db from "../store/db";
import copyfiles from "copyfiles";
import {concat} from "uint8arrays";
import all from "it-all";
import path from "path"
import fs from "fs-extra"
const BOOTSTRAP_ADDRESSS =
    "/ip4/52.79.200.55/tcp/4001/ipfs/12D3KooWFyYb19Xki7pj4PyQ1jnZsEx4MfExyng2MZCAtpPXoCxb";


function configExists(ipfsd) {
    return fs.pathExistsSync(path.join(ipfsd.path, "config"));
}

function rmApiFile(ipfsd) {
    return fs.removeSync(path.join(ipfsd.path, "api"));
}

class NodeIPFS {
    private ipfsd;


    constructor () {
        this.ipfsd = null;
    }

    async initialize () {
        try {
            const ipfsBin = getIpfsBinPath();
            writeIpfsBinaryPath(ipfsBin);

            const ipfsPath = await db.get("ipfs-path");

            this.ipfsd = await Ctl.createController({
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
                [path.join(__dirname, "../assets/swarm.key"), this.ipfsd.path],
                { up: true, error: true },
                (err) => {
                    console.log(`err`, err);
                }
            );
            console.log('path.join: ', path.join(__dirname, "../assets/swarm.key"));

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

            await this.ipfsd.api.bootstrap.clear();

            await this.ipfsd.api.bootstrap.add(BOOTSTRAP_ADDRESSS);

            const id = await this.ipfsd.api.id();

            // mainWindow.webContents.send("ipfs-connection-succesful");
            console.log('peer id: ', id)

            const peers = await this.ipfsd.api.swarm.peers();
            console.log('peers: ', peers)
        } catch (err) {
            console.log('inint err: ', err);
            if (!err.message.includes("ECONNREFUSED")) {
                throw err;
            }

            rmApiFile(this.ipfsd);
            await this.ipfsd.start();
        }

    }

    async disconnect () {
        await this.ipfsd.stop();
    }

    async send (content) {
        // console.log('ipfs send: ', this.ipfsd.api);
        console.log('ipfs send: ', content);
       try {
           return await this.ipfsd.api.add({
               content: content
           });

           // const send = await this.ipfsd.api.add({
           //     path: '423hello.taxt',
           //     content: '5422Hello World 10132'
           // });
           // console.log('send: ', send);
       } catch (e) {
           console.log('send error: ', e);
           return e;
       }
    }

    async preview (hash) {
        try {
            console.log('hash', hash);
            const preview = concat(await all(this.ipfsd.api.cat(hash)));
            console.log('preview: ', preview);
            return preview;
        } catch (e) {
            console.log('preview: ', e)
            return e
        }
    }


    async download (data, callback) {
        for await (const file of this.ipfsd.api.get(data?.contentHash)) {
            // eslint-disable-next-line
            if (!file.content) continue;
            const content = [];

            // eslint-disable-next-line
            for await (const chunk of file.content) {
                content.push(chunk);
            }
            callback(content)
        }
    }
}


export default NodeIPFS;