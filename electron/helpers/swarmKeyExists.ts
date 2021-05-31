import fs from "fs-extra";
import path from "path";

function swarmKeyExists(ipfsd) {
  return fs.pathExistsSync(path.join(ipfsd?.path, "swarm.key"));
}

export default swarmKeyExists;
