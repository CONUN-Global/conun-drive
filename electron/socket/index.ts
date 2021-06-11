import { app } from "electron";
import Jimp from "jimp";
import fetch from "electron-fetch";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import isDev from "electron-is-dev";

import { ipfsd, mainWindow } from "../";
import db from "../store/db";
import logger from "../logger";
import downloader from "../helpers/downloader";

import { DEV_DRIVE_SERVER, PROD_DRIVE_SERVER } from "../const";

const SERVER_URL = isDev ? DEV_DRIVE_SERVER : PROD_DRIVE_SERVER;

const MANAGER_PORT = 17401;

const MANAGER_CURRENT_VERSION = "1";

export let client: W3CWebSocket | null;

function connectToWS() {
  client = new W3CWebSocket(`ws://127.0.0.1:${MANAGER_PORT}`);

  client.onopen = () => {
    logger("socket-connected", "socket is connected", "info");
    if (mainWindow) {
      mainWindow.webContents.send("is-manager-connected", true);
    }

    logger(
      "sending-drive-path",
      `sending drive path to manager: ${app.getPath("exe")}`,
      "info"
    );

    client.send(
      JSON.stringify({
        type: "get-drive-path",
        path: app.getPath("exe"),
      })
    );
  };

  client.onclose = () => {
    if (mainWindow) {
      mainWindow.webContents.send("is-manager-connected", false);
    }
    logger("socket-disconnected", "socket has been disconnected", "info");
  };

  client.onerror = (error) => {
    if (mainWindow) {
      mainWindow.webContents.send("is-manager-connected", false);
    }

    logger("socket-error", error.message, "error");
  };

  client.onmessage = async (message) => {
    if (typeof message.data === "string") {
      const data = JSON.parse(message?.data);
      if (data.type === "send-user-details") {
        try {
          const userDetails = await db.get("userDetailsDrive");

          logger(
            "receiving-user-details",
            `receiving user details: ${data?.walletAddress}`,
            "info"
          );

          if (data?.walletAddress !== userDetails.walletAddress) {
            logger(
              "receiving-user-details",
              `updating wallet address: ${data?.walletAddress}`,
              "info"
            );
            await db.put({
              ...userDetails,
              walletAddress: data?.walletAddress,
            });
          }

          if (!data?.managerVersion.startsWith(MANAGER_CURRENT_VERSION)) {
            mainWindow.webContents.send("update-manager");
          }
        } catch (error) {
          logger("send-user-details", error.message, "error");
        }
      }

      if (data.type === "upload-success") {
        try {
          logger(
            "manager-file-register-success",
            `received public hash from manager: ${data?.publicHash}`,
            "info"
          );

          const descriptionHash = await ipfsd.api.add(data?.data?.description);

          const previewBuffer = Buffer.from(
            data?.data?.previewPath.split(",")[1],
            "base64"
          );
          const preview = await Jimp.read(previewBuffer);
          await preview.resize(720, 404).quality(95);
          const previewContent = await preview.getBufferAsync(
            preview.getMIME()
          );
          const previewHash = await ipfsd.api.add(previewContent);

          logger(
            "manager-file-register-success",
            `created description and preview hash`,
            "info"
          );

          const userDetails = await db.get("userDetailsDrive");

          const body = {
            name: data?.data?.title,
            cate_id: data?.data?.category,
            type_id: data?.data?.type,
            user_id: userDetails?.userId,
            tags: data?.data?.tags,
            status_id: 1,
            info: {
              content_hash: data?.fileHash,
              description: descriptionHash?.path,
              txhash: data?.transactionHash,
              file_name: data?.data?.fileName,
              public_hash: data?.publicHash,
              ext: data?.data?.ext,
              size: data?.size,
              thumbnail: previewHash?.path,
            },
          };

          // upload to server
          const res = await fetch(`${SERVER_URL}/content/create`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          });

          if (res.status === 201) {
            logger(
              "drive-upload-file-success",
              `file uploaded to drive: ${data?.publicHash}`,
              "info"
            );

            mainWindow.webContents.send("upload-success");
          } else {
            try {
              const createData = await res.json();

              mainWindow.webContents.send("error-listener", {
                data: createData?.message,
              });
              logger("upload-failure", createData?.message, "error");
            } catch (error) {
              mainWindow.webContents.send("error-listener", {
                data: String(error),
              });
              logger("upload-failure", error?.message, "error");
            }
          }
        } catch (error) {
          mainWindow.webContents.send("error-listener", { data: data?.data });
          logger("upload-failure", error, "error");
        }
      }

      if (data.type === "download-success") {
        logger(
          "download-start",
          `Downloading hash ${data.contentHash}`,
          "info"
        );

        await downloader(ipfsd.api, data);
      }
      if (data.type === "upload-failure") {
        logger("upload-failure", data?.data, "error");
        mainWindow.webContents.send("error-listener", { data: data?.data });
      }

      if (data.type === "like-failure") {
        logger("like-failure", data?.data, "error");
        mainWindow.webContents.send("error-listener", {
          data: data?.data,
          contentId: data.contentId,
        });
      }

      if (data.type === "download-failure") {
        logger(
          "download-failure",
          `failed to download hash ${data.contentHash}`,
          "info"
        );
        mainWindow.webContents.send("error-listener", {
          data: data?.data,
          contentId: data?.contentId,
        });
      }
    }
  };
}

export default connectToWS;
