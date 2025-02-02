// preload.js (renderer process)
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // You can safely expose methods to the renderer here
  someNodeFunction: () => {
    console.log('Node function executed');
  },
});
