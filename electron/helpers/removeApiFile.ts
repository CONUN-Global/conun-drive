import fs from "fs-extra";
import { join } from "path";

function rmApiFile(ipfsd) {
  return fs.removeSync(join(ipfsd.path, "api"));
}
export default rmApiFile;
