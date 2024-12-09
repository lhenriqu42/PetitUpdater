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
        resizable: false,
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
        resizable: false,
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

const handleVerify = (repo: string) => {
    if (configWindow) configWindow?.close();
    return checkUpdates(repo);
}

app.on('ready', () => {
    openMainWindow();
    ipcMain.on('reload', () => mainWindow?.reload());
    ipcMain.on('closeConfig', () => configWindow?.close());
    ipcMain.handle('getConfig', () => ConfigProvider.getConfig());
    ipcMain.handle('saveConfig', (_, config) => ConfigProvider.updateConfig(config));
    ipcMain.handle('pull', (_, repo) => gitPull(repo));
    ipcMain.handle('verify', (_, repo) => handleVerify(repo));
    ipcMain.handle('compile', (_, repo, type) => reCompile(repo, type));
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});