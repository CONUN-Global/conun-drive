import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  getFilePreview: (hash: string) =>
    ipcRenderer.invoke("get-file-preview", hash),
  uploadFile: (info: any) => ipcRenderer.invoke("upload-file", info),
  testIpc: () => ipcRenderer.invoke("test-ipc"),
  listenToFileRegister: (fn: any) => {
    ipcRenderer.on("is-registering-file", (e, ...args) => fn(...args));
  },
});
