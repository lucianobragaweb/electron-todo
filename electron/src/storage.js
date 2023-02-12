const storage = require('./database/sqlite')

const saveData = (key, value) => {
    storage.saveData(key, value)
}

const getData = (key, value) => {
    return storage.getData()
}

const updateData = (key, value) => {
    storage.updateData(value, key)
}

const deleteData = (key, value) => {
    storage.deleteData(key)
}

module.exports = {
    saveData,
    getData,
    updateData,
    deleteData
}
