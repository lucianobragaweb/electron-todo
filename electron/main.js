const {app} = require('electron');
const { HandleIPCs } = require('./src/ipc');
const { createMainWindow } = require('./src/main');

const MAIN_URL = "http://localhost:3000";

app.whenReady().then(() => {
    HandleIPCs();

    const MainWindow = createMainWindow();

    MainWindow.on("closed", () => {
        app.quit();
    })

    MainWindow.loadURL(MAIN_URL);
});
