const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  close: () => ipcRenderer.invoke('close-window'),
  minimize: () => ipcRenderer.invoke('minimize-window'),
  try_fullscreen: () => { return ipcRenderer.invoke('fullscreen-window'); },
});
