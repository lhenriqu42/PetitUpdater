import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { getPreloadPath } from './pathResolver.js';
import { checkUpdates, gitPull, reCompile } from './git.js';
import { isDev } from './util.js';
import path from 'path';
import { ConfigProvider } from './configStore.js';

let configWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;

function openConfigWindow() {
    if (configWindow) { configWindow.focus(); return; };
    configWindow = new BrowserWindow({
        center: true,
        height: 400,
        width: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        configWindow.loadURL('http://localhost:5123/#config');
    } else {
        configWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'), { hash: 'config' });
    }

    configWindow.on('closed', () => {
        configWindow = null;
    });

    mainWindow?.on('closed', () => {
        configWindow?.close();
    });

    mainWindow?.reload();
}

function openMainWindow() {
    mainWindow = new BrowserWindow({
        center: true,
        height: 400,
        width: 600,
        // autoHideMenuBar: true,
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
}

const menuTemplate = [
    {
        label: 'Aplicação',
        submenu: [
            {
                label: 'Configurações',
                click() {
                    openConfigWindow();
                }
            },
            {
                label: 'Sair',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

app.on('ready', () => {
    openMainWindow();
    ipcMain.handle('verify', (_, repo) => checkUpdates(repo));
    ipcMain.handle('pull', (_, repo) => gitPull(repo));
    ipcMain.handle('compile', (_, repo, type) => reCompile(repo, type));
    ipcMain.on('reload', () => mainWindow?.reload());
    ipcMain.handle('getConfig', () => ConfigProvider.getConfig());
    ipcMain.handle('saveConfig', (_, config) => ConfigProvider.updateConfig(config));
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});