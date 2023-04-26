const { app, BrowserWindow } = require('electron')
const path = require('path')
require('electron-reload')(__dirname)


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
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

