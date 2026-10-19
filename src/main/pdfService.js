import fs from 'node:fs/promises';
import { dialog } from 'electron';

export class PdfService {
  /**
   * Generates a PDF buffer from a BrowserWindow and writes it to disk.
   * @param {Electron.BrowserWindow} window 
   */
  static async exportToPdf(window) {
    const { canceled, filePath } = await dialog.showSaveDialog(window, {
      title: 'Save Medical Report PDF',
      defaultPath: 'Medical_Report.pdf',
      filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
    });

    if (canceled || !filePath) return { success: false, reason: 'user_cancelled' };

    try {
      const pdfBuffer = await window.webContents.printToPDF({
        printBackground: true,            // Retains background color (#f2f5f7)
        pageSize: 'A4',
        margins: { 
          top: 0.4, 
          bottom: 0.4, 
          left: 0.4, 
          right: 0.4 
        },
        displayHeaderFooter: false,       // Suppresses default browser header/footers
        preferCSSPageSize: true
      });

      await fs.writeFile(filePath, pdfBuffer);
      return { success: true, path: filePath };
    } catch (error) {
      console.error('PDF Generation Error:', error);
      return { success: false, error: error.message };
    }
  }
}