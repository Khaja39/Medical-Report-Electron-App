Amogha Kids Care Reports (Laboratory Information System)

A desktop-based laboratory reporting and diagnostic management system built with Electron, Node.js ES Modules, and vanilla JavaScript. Designed specifically for Aroma / Amogha Kids Care Hospital, the application streamlines patient test entry, automatic reference range validation, keyboard-driven navigation, and high-performance PDF report generation/printing.
🚀 Key Features

    Desktop Native Integration: Built on Electron with custom window geometry, auto-hidden/disabled menus, and native taskbar icon handling.

    Dynamic Diagnostic Panel & Search: Live searchable test directory featuring panels like Complete Blood Counts (CBC), Liver Function Tests (LFT), Kidney Function Tests (KFT), Electrolytes, Infection Markers, and Lipid/Thyroid profiles.

    Smart Input Validations:

        Age restriction enforcement (numeric-only input).

        Real-time decimal tracking with automated abnormal value highlighting (.abnormal-result) relative to defined baseline ranges.

    Keyboard-First Workflow: Seamless Enter key progression through input fields, automatic dropdown item capture, and form submission shortcuts.

    PDF Export & Native Printing:

        Instant PDF saving via backend IPC channels and PdfService.

        Native printing capabilities with background color and graphic preservation (printBackground: true).

    Metadata Auto-Timestamping: One-click and automatic ISO string time-stamping for sample collection and final report generation times.

🛠️ Project Architecture
```text

medical-report/
├── assets/
│   ├── Aroma-icon.ico      # Application and window icon
│   └── Aroma-logo.png      # Hospital letterhead brand logo
├── src/
│   ├── main/
│   │   └── pdfService.js   # Main-process PDF generation and save handler
│   └── renderer/
│       ├── repositories/
│       │   └── testRepository.js # Diagnostic test dictionaries & reference ranges
│       ├── ui/
│       │   └── app.js      # Frontend controller / UI logic (ReportPresenter)
│       ├── index.html      # Main user interface layout (Letterhead & form grid)
│       └── styles.css      # Custom styling for layout and error states
├── main.js                 # Electron main process & IPC handlers
├── preload.js              # Context-isolation bridge
└── package.json            # Project config, metadata, and electron-builder setup
```text
Plaintext
📦 Installation & Setup

Ensure you have Node.js (v18+ recommended) installed on your system.

    Clone or Open the Repository:
    Bash

    cd medical-report

    Install Dependencies:
    Bash

    npm install

💻 Running the Application
1. Development Mode (Live Testing)

To launch the app in development mode using Electron:
Bash

npm start

2. Building the Production Installer (.exe)

To package the application into a redistributable Windows installer (NSIS format) with your customized icon and app configurations:
Bash

npm run dist

The compiled output files and installers will appear inside the dist/ directory.
⚙️ Core Configuration & Dependencies (package.json)
JSON

{
  "name": "medical-report",
  "version": "1.0.2",
  "type": "module",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "dist": "electron-builder"
  },
  "build": {
    "appId": "com.amoghakidscare.reportapp",
    "productName": "Amogha Kids Care Reports",
    "win": {
      "target": "nsis",
      "icon": "assets/Aroma-icon.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true
    }
  },
  "devDependencies": {
    "electron": "^43.1.1",
    "electron-builder": "^26.15.3"
  }
}

⌨️ Usage & Keyboard Shortcuts

    Search Tests: Type inside the Select Investigation / Panel input field to instantly narrow down panels.

    Enter Key: Moves focus forward sequentially through patient inputs, test parameters, and triggers quick selection from the suggestion dropdown.

    Enter on Final Field: Automatically executes Download PDF.

    Shift + Enter: Directly triggers Print Report.

    Clear Inputs: Use the floating × clear buttons located beside form entries to instantly reset fields or tests.