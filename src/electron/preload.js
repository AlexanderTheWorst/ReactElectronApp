const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  global: global // Exposing the global object safely
});
