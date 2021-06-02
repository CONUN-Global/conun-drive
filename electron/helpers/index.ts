import logger from "../logger"

export function linuxGetArgPath(argv){
            try {
          logger(
            "Push to file:",
            `LINUX Direct link to file - SUCCESS: ${argv}`,
            "error"
          );
          return argv[1].split("conun-drive://")[1];
        } catch {
          logger(
            "Push to file:",
            `LINUX Direct link to file - FAILED: ${argv}`,
            "error"
          );
          return null
        }
}

export function windowsGetArgPath(argv){
            try {
          logger(
            "Push to file:",
            `WINDOWS Direct link to file - SUCCESS: ${argv}`,
            "error"
          );
          return argv[argv.length-1].split("conun-drive://")[1];
        } catch {
          logger(
            "Push to file:",
            `WINDOWS Direct link to file - FAILED: ${argv}`,
            "error"
          );
          return null
        }
}