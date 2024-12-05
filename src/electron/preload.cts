const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    checkUpdates: (repo: string) => electron.ipcRenderer.invoke("verify", repo),
} satisfies Window['electron']);