const { app, BrowserWindow, screen } = require('electron')
const path = require("path");

let mainWindow

function createWindow() {

    const size = screen.getPrimaryDisplay().workAreaSize;
    
    mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true
        },
    })
    
    // mainWindow.removeMenu();

    // const url = new URL(path.join('file:', __dirname, '/dist/app/index.html'));
    const url = new URL('http://localhost:4200/');
    mainWindow.loadURL(url.href);
    
    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})