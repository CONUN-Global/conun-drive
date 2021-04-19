import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  getFilePreview: (hash: string) =>
    ipcRenderer.invoke("get-file-preview", hash),
  getFileDescription: (hash: string) =>
    ipcRenderer.invoke("get-file-description", hash),
  downloadFile: (hash: string) => ipcRenderer.invoke("download-file", hash),
});
