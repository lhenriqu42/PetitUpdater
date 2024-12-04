const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    checkUpdates: () => electron.ipcRenderer.invoke("verify"),
} satisfies Window['electron']);