import logger from "../logger";

export function readFileURL(fileURL: string) {
  const encodedPart = fileURL.split("conun-drive://")[1];

  const fileID = Buffer.from(encodedPart, "base64")
    .toString("ascii")
    .split("%")[1];
  return `file/${fileID}`;
}

export function getURLFromArgv(argv) {
  try {
    const res = readFileURL(argv[1]);
    logger("Push to file:", `Direct link to file - SUCCESS: ${argv}`, "error");
    return res;
  } catch {
    logger("Push to file:", `Direct link to file - FAILED: ${argv}`, "error");
    return null;
  }
}

export function windowsGetURLFromArgv(argv) {
  try {
    logger(
      "Push to file:",
      `WINDOWS Direct link to file - SUCCESS: ${argv}`,
      "error"
    );
    return readFileURL(argv[argv.length - 1]);
  } catch {
    logger(
      "Push to file:",
      `WINDOWS Direct link to file - FAILED: ${argv}`,
      "error"
    );
    return null;
  }
}
