const { contextBridge, ipcRenderer } = require('electron');

// Expose a clean, immutable API interface to the renderer
contextBridge.exposeInMainWorld('reportAPI', {
  exportPdf: () => ipcRenderer.invoke('reports:export-pdf'),
  // printNative: () => window.print()
  printNative: () => ipcRenderer.invoke('reports:print-native')
});