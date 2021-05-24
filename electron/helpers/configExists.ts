import fs from "fs-extra";
import path from "path";

function configExists(ipfsd) {
  return fs.pathExistsSync(path.join(ipfsd?.path, "config"));
}

export default configExists;
