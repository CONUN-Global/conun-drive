import { ipcMain } from "electron";
import { getPeerData, setPeerData } from "../../ipfs";

ipcMain.handle("get-peer-data-by-cid", async (_, cid: string) => {
  const result = getPeerData(cid);

  return {
    success: !!result,
    data: result,
  };
});

ipcMain.handle("set-peer-data", async (_, data: any) => {
  const result = setPeerData(data);

  return {
    success: !!result,
    data: result,
  };
});
