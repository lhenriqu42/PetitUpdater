import { app, BrowserWindow, ipcMain } from 'electron';
import { getPreloadPath } from './pathResolver.js';
import { checkUpdates } from './git.js';
import { isDev } from './util.js';
import path from 'path';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        center: true,
        height: 400,
        width: 600,
        // autoHideMenuBar: true,
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
    ipcMain.handle('verify', (_, repo) => checkUpdates(repo));
})
