const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    checkUpdates: (repo: string) => electron.ipcRenderer.invoke("verify", repo),
    gitPull: (repo: string) => electron.ipcRenderer.invoke("pull", repo),
    reCompile: (repo: string, type: string) => electron.ipcRenderer.invoke("compile", repo, type),
    reloadMainWindow: () => electron.ipcRenderer.send("reload"),
    getConfig: () => electron.ipcRenderer.invoke("getConfig"),
    saveConfig: (config: any) => electron.ipcRenderer.invoke("saveConfig", config),
    closeConfigWindow: () => electron.ipcRenderer.send("closeConfig"),
} satisfies Window['electron']);