const sqlite3 = require('sqlite3')

const handleError = (err) => console.error(err.message)

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        handleError(err)
    }
    console.log('Connected to the SQLite database.')
})

const createTable = async () => {
    try {
        await new Promise((resolve, reject) => {
            db.run(`CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                description TEXT NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
                (err) => {
                    if (err) {
                        reject(err)
                    }
                    resolve()
                })
        })
        console.log('Table created successfully')
        console.table(await getData())
    } catch (err) {
        handleError(err)
    }
}

const getData = async () => {
    try {
        return await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM todos ORDER BY created_at DESC`, [], (err, rows) => {
                if (err) {
                    reject(err)
                }

                rows = rows.sort((a, b) => (a.completed > b.completed) ? 1 : ((b.completed > a.completed) ? -1 : 0))

                resolve(rows)
            })
        })
    } catch (err) {
        handleError(err)
    }
}

const saveData = async (task, completed = 0) => {
    try {
        await new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO todos (description, completed) VALUES (?, ?)`,
                [task, completed],
                function (err) {
                    if (err) {
                        reject(err)
                    }
                    console.log(`A row has been inserted with rowid ${ this.lastID }`)
                    resolve()
                }
            )
        })
    } catch (err) {
        handleError(err)
    }
}

const updateData = async (value, id) => {
    try {
        await new Promise((resolve, reject) => {
            db.run(
                `UPDATE todos SET completed = ?, description = ? WHERE id = ?`,
                [value.completed, value.description, id],
                function (err) {
                    if (err) {
                        reject(err)
                    }
                    console.log(`Row(s) updated: ${ this.changes }`)
                    resolve()
                }
            )
        })
    } catch (err) {
        handleError(err)
    }
}

const deleteData = async (id) => {
    try {
        await new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM todos WHERE id = ?`,
                [id],
                function (err) {
                    if (err) {
                        reject(err)
                    }
                    console.log(`Row(s) deleted: ${ this.changes }`)
                    resolve()
                }
            )
        })
    } catch (err) {
        handleError(err)
    }
}

createTable()

module.exports = { createTable, getData, saveData, updateData, deleteData }
