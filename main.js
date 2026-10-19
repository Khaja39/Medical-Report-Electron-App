import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PdfService } from './src/main/pdfService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 850,
    height: 900,
    icon: path.join(__dirname, 'assets/Aroma-icon.ico'),
    autoHideMenuBar: true, // Hides top menu bar (File, Edit, View, etc.)
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.setMenu(null);
  win.loadFile(path.join(__dirname, 'src/renderer/index.html'));
}

// IPC Channel Registration
ipcMain.handle('reports:export-pdf', async () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return { success: false, error: 'No active window found' };
  await win.webContents.executeJavaScript('if (document.activeElement) document.activeElement.blur();');
  return await PdfService.exportToPdf(win);
});
ipcMain.handle('reports:print-native', async () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return { success: false, error: 'No active window found' };
  win.webContents.print({ printBackground: true });
  return { success: true };
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });