const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
require('electron-reload')(__dirname)

function handleSetTitle (event, title) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
}

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
    
    ipcMain.on('set-title', handleSetTitle)
    createWindow()
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

