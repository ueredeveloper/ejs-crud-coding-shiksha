const { app, BrowserWindow } = require('electron')
const path = require('path')
require('electron-reload')(__dirname)

/* por motivos de segurança, utilizar ipcMain
    link: https://stackoverflow.com/questions/44391448/electron-require-is-not-defined
    */
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile(`${__dirname}/src/index.html`)
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

/*
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})*/

