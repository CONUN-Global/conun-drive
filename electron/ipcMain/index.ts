import { ipcMain } from "electron";
import fs from "fs";
import all from "it-all";
import Jimp from "jimp";
import fetch from "electron-fetch";
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

ipcMain.handle("upload-file", async (_, info) => {
  try {
    const descriptionHash = await node.add({ content: info.description });
    const preview = await Jimp.read(info.previewPath);
    await preview.resize(720, 404).quality(95);
    const previewContent = await preview.getBufferAsync(preview.getMIME());
    const previewHash = await node.add({
      content: previewContent,
    });

    const file = fs.readFileSync(info.filePath);
    const fileContent = Buffer.from(file);
    const fileHash = await node.add({
      content: fileContent,
    });

    process.send({ type: "upload-file", fileHash, price: 0 });

    // const body = {
    //   title: info.file.title,
    //   info: {
    //     ccid: String(fileHash.cid),
    //     desc: String(descriptionHash.cid),
    //     txhash: "x0020202",
    //     file_name: info.file.name,
    //     ext: info.file.ext,
    //     size: info.file.size,
    //     thumbnail: String(previewHash.cid),
    //   },
    //   cate_id: 1,
    //   user: {
    //     wallet_id: "x0020202",
    //   },
    // };

    console.log(`fileHash`, fileHash);

    // upload to server
    // const res = await fetch("http://192.168.100.54:8000/api/content/register", {
    //   method: "POST",
    //   body: JSON.stringify(body),
    //   headers: { "Content-Type": "application/json" },
    // });

    // const data = await res.json();

    return {
      success: true,
      previewHash,
      fileHash,
      descriptionHash,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
});
