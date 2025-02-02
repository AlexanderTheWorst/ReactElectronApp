// src/main.ts
import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '..', 'dist', 'preload.js'),  // Correct path to preload.js
      nodeIntegration: true, // Disable nodeIntegration for security
      contextIsolation: true, // Enable contextIsolation for security
    },
  });
  
  // Check if the HTML file loads properly
  win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
    .then(() => {
      console.log('HTML loaded successfully');
    })
    .catch((err) => {
      console.error('Error loading HTML:', err);
    });
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
