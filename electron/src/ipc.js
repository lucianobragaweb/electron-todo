const { ipcMain } = require("electron")

function HandleIPCs() {
    ipcMain.handle("app.storeData", (event, key, value) => {
        //TODO

        return false;
    });

    ipcMain.handle("app.deleteData", (event, key, value) => {
        //TODO

        return false;
    });

    ipcMain.handle("app.getData", (event, key, value) => {
        //TODO

        return false;
    });

    ipcMain.handle("app.hasData", (event, key, value) => {
        //TODO

        return false;
    });
}

module.exports = {
    HandleIPCs
}