import { ipcMain, shell } from "electron";
import fetch from "electron-fetch";
import isDev from "electron-is-dev";

import { ipfsd, mainWindow } from "../";
import db from "../store/db";
import connectToWS, { client } from "../socket";
import logger from "../logger";

import { DEV_DRIVE_SERVER, PROD_DRIVE_SERVER } from "../const";

const SERVER_URL = isDev ? DEV_DRIVE_SERVER : PROD_DRIVE_SERVER;

ipcMain.handle("download-file", async (_, args) => {
  try {
    const userDetails = await db.get("userDetailsDrive");

    logger(
      "downloading-file",
      `sending file ${args.hash} sent to manager`,
      "info"
    );

    client.send(
      JSON.stringify({
        type: "download-content",
        ccid: args?.publicHash,
        user_id: userDetails?.userId,
        content_id: args?.contentId,
        name: args?.name,
        hash: args?.hash,
        size: args?.size,
      })
    );

    mainWindow.webContents.send("download-start", args);

    return {
      success: true,
    };
  } catch (error) {
    logger("download-file", error?.message, "error");

    return {
      success: false,
      error: String(error),
    };
  }
});

ipcMain.handle("like-content", async (_, args) => {
  try {
    const userDetails = await db.get("userDetailsDrive");
    logger(
      "like-content",
      `attempting like of file ${args?.publicHash}`,
      "info"
    );
    client.send(
      JSON.stringify({
        type: "like-content",
        ccid: args?.publicHash,
        user_id: userDetails?.userId,
        content_id: args?.contentId,
      })
    );
  } catch (error) {
    logger("like-content", error, "error");
  }
});

ipcMain.handle("get-current-user", async () => {
  try {
    const userDetails = await db.get("userDetailsDrive");

    logger(
      "get-current-user",
      `getting current user with wallet ${userDetails?.walletAddress}`,
      "info"
    );

    const res = await fetch(`${SERVER_URL}/user/auth`, {
      method: "POST",
      body: JSON.stringify({
        wallet_id: userDetails?.walletAddress,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const { data } = await res.json();

    const userDriveDetails = await db.get("userDetailsDrive");

    logger("get-current-user", `current user has id ${data?.id}`, "info");

    if (userDriveDetails.userId !== data?.id) {
      logger(
        "update-current-user",
        `removing id ${userDriveDetails.userId} for id: ${data?.id}`,
        "info"
      );
      await db.put({
        ...userDriveDetails,
        userId: data.id,
        walletId: data?.wallet_id,
      });
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    logger("get-current-user", error, "error");
    return {
      success: false,
      data: null,
    };
  }
});

ipcMain.handle("connect-to-manager", () => {
  try {
    logger("connect-to-manager", "connecting to manager", "info");
    connectToWS();
  } catch (error) {
    logger("connect-to-manager", error?.message, "error");
  }
});

ipcMain.handle("open-file", async (_, path: string) => {
  try {
    await shell.openPath(path);
  } catch (error) {
    logger("open-file", error?.message, "error");
  }
});

ipcMain.handle("get-peers", async () => {
  try {
    const peers = await ipfsd.api.swarm.peers();

    logger("peers", peers, "info");
    return peers;
  } catch (error) {
    logger("get-peers", error?.message, "error");
  }
});
