const { BrowserWindow } = require("electron");
const path = require('path');

const mainWindowOptions = {
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    title: "Todo App",
    webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, "preload.js"),
    }
}

function createMainWindow() {
    const Window = new BrowserWindow(mainWindowOptions);
    Window.webContents.openDevTools();
    return Window;
}

module.exports = {
    createMainWindow
}