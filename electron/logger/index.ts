import { app } from "electron";
import { join } from "path";
import isDev from "electron-is-dev";
import fetch from "electron-fetch";
import { createLogger, format, transports } from "winston";

import db from "../store/db";

import { LOG_SERVER_DEV, LOG_SERVER_PROD } from "../const";

const LOG_URL = isDev ? LOG_SERVER_DEV : LOG_SERVER_PROD;

const logsPath = app.getPath("userData");

const { combine, splat, timestamp, printf } = format;

const errorFile = new transports.File({
  level: "error",
  filename: join(logsPath, "error.log"),
});

errorFile.on("finish", () => {
  process.exit(1);
});

const localLogger = createLogger({
  format: combine(
    timestamp(),
    splat(),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: "debug",
      silent: !isDev,
    }),
    errorFile,
    new transports.File({
      level: "debug",
      filename: join(logsPath, "combined.log"),
    }),
  ],
});

localLogger.info(`[meta] logs can be found on ${logsPath}`);

async function logger(name: string, message: any, type: "info" | "error") {
  if (type === "error") {
    localLogger.error(message);
  }

  if (type === "info") {
    localLogger.info(message);
  }

  let formattedMessage;
  if (typeof message === "object") {
    formattedMessage = JSON.stringify(message);
  } else {
    formattedMessage = String(message);
  }

  const userDetails: { walletAddress: string } = await db.get(
    "userDetailsDrive"
  );

  const body = {
    product_name: "Conun Drive",
    company_name: "CONUN Global",
    version: app.getVersion(),
    platform: process.platform,
    process_type: process.type,
    wallet_address: userDetails?.walletAddress,
    app_location: app.getPath("exe"),
    error_name: name,
    error_message: formattedMessage,
  };

  await fetch(LOG_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

export default logger;
