import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as HID from 'node-hid';

const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

let mainWindow: BrowserWindow;

function createWindow() {

    const size = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    if (serve) {
        mainWindow.loadURL('http://localhost:4200');

        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.setMenu(null);
        mainWindow.loadURL('https://rfid.apiiisit.me');
    }

}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    app.quit();
    clearInterval(interval);
    device?.close();
});

let device: HID.HID;
const isDevice = () => !!device;

const interval = setInterval(() => {
    if (isDevice()) return;
    const deviceInfo = HID.devices().find((d: any) => d.vendorId === 0x1a86);
    if (!deviceInfo) return;
    device = new HID.HID(deviceInfo.path!);

    mainWindow?.webContents.send('status', isDevice());

    device.on('data', (data) => {
        const RFiDTag = data.subarray(1, 33).toString('hex');
        mainWindow.webContents.send('rfidTag', RFiDTag);
    });

    device.on('error', () => {
        device = null as any;
        mainWindow.webContents.send('status', isDevice());
    });

});

ipcMain.on('status', (event) => event.sender.send('status', isDevice()));