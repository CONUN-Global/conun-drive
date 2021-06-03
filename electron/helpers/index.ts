import fetch from "electron-fetch";
import isDev from "electron-is-dev";

import logger from "../logger";
import db from "../store/db";

import { DEV_DRIVE_SERVER, PROD_DRIVE_SERVER } from "../const";

const SERVER_URL = isDev ? DEV_DRIVE_SERVER : PROD_DRIVE_SERVER;

async function getFileIDfromPHash(argv: string) {
  const publicHash = argv.split("conun-drive://")[1];
  logger("get-file-id-from-hash", `checking for current user ID`, "info");

  const userDetails = await db.get("userDetailsDrive");

  if (!userDetails.userId) {
    logger(
      "get-file-id-from-hash",
      `user ID not present. Not logged in?`,
      "info"
    );
    return "file/NO_USER"; // Add some sort of error page here?
  }

  logger(
    "get-file-id-from-hash",
    `Found current user with id ${userDetails?.userId}`,
    "info"
  );
  const res = await fetch(
    `${SERVER_URL}/search/content?keyword=${publicHash}&filter=cid`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "current-user": userDetails?.userId,
      },
    }
  );

  const { data } = await res.json();
  logger("get-file-id-from-hash", `Received this id - ${data.data}`, "info");
  if (data?.data) {
    return `file/${data.data[0]?.id}`;
  }
  return "file/";
}

// export function readFileURL(fileURL: string) {
//   const encodedPart = fileURL.split("conun-drive://")[1];

//   const fileID = Buffer.from(encodedPart, "base64")
//     .toString("ascii")
//     .split("%")[1];
//   return `file/${fileID}`;
// }

export async function getURLFromArgv(argv) {
  try {
    const res = await getFileIDfromPHash(argv);
    logger("Push to file:", `Direct link to file - SUCCESS: ${argv}`, "error");
    console.log("Log assembled URL before pushing: ", res);
    return res;
  } catch {
    logger("Push to file:", `Direct link to file - FAILED: ${argv}`, "error");
    return null;
  }
}

// export async function windowsGetURLFromArgv(argv) {
//   try {
//     const res = await getFileIDfromPHash(argv[argv.length - 1]);
//     logger(
//       "Push to file:",
//       `WINDOWS Direct link to file - SUCCESS: ${argv}`,
//       "error"
//     );
//     return res;
//   } catch {
//     logger(
//       "Push to file:",
//       `WINDOWS Direct link to file - FAILED: ${argv}`,
//       "error"
//     );
//     return null;
//   }
// }
