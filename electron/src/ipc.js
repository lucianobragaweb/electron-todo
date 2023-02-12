const { ipcMain } = require("electron")
const storage = require('./storage')

function HandleIPCs () {
    ipcMain.handle("app.storeData", (event, key, value) => {
        storage.saveData(key, value)
        return false
    })

    ipcMain.handle("app.deleteData", (event, key, value) => {
        return storage.deleteData(key)
    })

    ipcMain.handle("app.getData", (event, key, value) => {
        return storage.getData()
    })

    ipcMain.handle("app.hasData", (event, key, value) => {
        return storage.updateData(key, value)
    })
}

module.exports = {
    HandleIPCs
}
