// ElementMaker.js

import React from "react"

class Task extends React.Component {
    constructor ({ props }) {
        super(props)
    }

    saveTask = async (id, description) => {
        await window.app.hasData(id, { completed: this.props.item.completed, description })
        this.props.onSaveTask()
    }

    render () {
        return (
            <div className='tasks-container'>
                <div className='p-2' contentEditable={ true } suppressContentEditableWarning={ true } onBlur={ (e) => this.saveTask(this.props.item.id, e.currentTarget.textContent) }>
                    { this.props.item.description }
                </div>
            </div>
        )
    }
}

export default Task
