import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  getFilePreview: (hash: string) =>
    ipcRenderer.invoke("get-file-preview", hash),
  uploadFile: (info: any) => ipcRenderer.invoke("upload-file", info),
  likeContent: (args: any) => ipcRenderer.invoke("like-content", args),
  getCurrentUser: (walletAddress: string) =>
    ipcRenderer.invoke("get-current-user", walletAddress),
  listenToFileRegister: (fn: any) => {
    ipcRenderer.on("is-registering-file", (e, ...args) => fn(...args));
  },
  listenToFileLike: (fn: any) => {
    ipcRenderer.on("like-success", (e, ...args) => fn(...args));
  },
});
