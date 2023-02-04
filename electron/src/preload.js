const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("app", {
    storeData: (key, value) => {
        return ipcRenderer.invoke("app.storeData", key, value);
    },
    deleteData: (key, value) => {
        return ipcRenderer.invoke("app.deleteData", key, value);
    },
    getData: (key, value) => {
        return ipcRenderer.invoke("app.getData", key, value);
    },
    hasData: (key, value) => {
        return ipcRenderer.invoke("app.hasData", key, value);
    }
})