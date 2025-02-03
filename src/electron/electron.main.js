// src/main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    minWidth: 1060,
    minHeight: 700,
    frame: false,
    icon: path.join(__dirname, '..', 'dist', 'resources', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, '..', 'dist', 'preload.js'),  // Correct path to preload.js
      nodeIntegration: true, // Disable nodeIntegration for security
      contextIsolation: true, // Enable contextIsolation for security
    },
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
    .then(() => {
      console.log('HTML loaded successfully');
    })
    .catch((err) => {
      console.error('Error loading HTML:', err);
    });

  ipcMain.handle('close-window', () => mainWindow.close());
  ipcMain.handle('minimize-window', () => mainWindow.minimize());
  ipcMain.handle('fullscreen-window', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
      return 0;
    } else {
      mainWindow.maximize();
      return 1;
    }
  })
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
