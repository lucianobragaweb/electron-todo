import React from 'react'
import Task from "./Task"

class Welcome extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: [],
            isLoading: false,
            task: '',
        }
    }

    componentDidMount () {
        this.setState({ isLoading: true })
        this.loadTasks()
    }

    loadTasks = async () => {
        this.setState({ isLoading: true })

        const tasks = await window.app.getData()
        this.setState({
            data: tasks,
            isLoading: false
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTask()
        }
    }

    addTask = async () => {
        if (this.state.task) {
            await window.app.storeData(this.state.task, 0)
            this.setState({ task: '' })
            this.loadTasks()
        }

    }

    removeTask = async (id) => {
        await window.app.deleteData(id)
        this.loadTasks()
    }

    toggleTask = async (task) => {
        await window.app.hasData(task.id, { completed: !task.completed ? true : false, description: task.description })
        this.loadTasks()
    }

    setTask = (e) => {
        this.setState({ task: e.target.value })
    };

    render () {
        return (
            <div className="h-100 w-full h-full flex items-center justify-center font-sans bg-gradient-to-r from-green-400 to-blue-500">
                <div className="bg-white rounded-xl shadow-xl pt-4 m-4 w-3/4 lg:max-w-2xl">
                    <h1 className="text-gray-600 font-semibold mb-4 mx-6">Minha lista de tarefas</h1>
                    <hr />
                    <div className="my-4 p-6 py-4">
                        <div className="flex ">
                            <input value={ this.state.task }
                                onChange={ this.setTask } onKeyDown={ this.handleKeyDown } className={ `shadow appearance-none border-2 border-gray-600 rounded w-full py-2 px-3 mr-4 text-gray-600-darker ${ !this.state.task ? 'border-gray-600' : 'border-blue-600' }` } placeholder={ `Qual será sua ${ this.state.data.length > 0 ? 'próxima' : 'primeira' } tarefa?` } />
                            <button disabled={ !this.state.task } className="flex-no-shrink p-2 border-2 rounded text-green-600 border-green-600 hover:text-white hover:bg-green-600 focus:outline-none disabled:text-gray-600 disabled:border-gray-600 disabled:hover:bg-transparent" onClick={ this.addTask } >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>

                            </button>
                        </div>
                    </div>
                    <div className="px-6 pr-3 mr-1 mb-6 pb-3 task-list overflow-y-auto">
                        { this.state.isLoading ? (
                            <p>Carregando minhas tasks...</p>
                        ) : (
                            <div>
                                {
                                    this.state.data.map(task => (
                                        <div className="flex mb-2 items-center rounded-lg border border-gray-200  px-3 py-2 bg-white" key={ task.id }>
                                            <div className={ `w-full ${ task.completed ? 'line-through text-red-600' : 'text-gray-600' }` }>
                                                <Task onSaveTask={ this.loadTasks } item={ task } />
                                            </div>
                                            <button onClick={ () => this.toggleTask(task) } className={ `flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white ${ task.completed ? 'text-gray-600 border-gray-600 hover:bg-gray-600' : 'text-green-600 border-green-600 hover:bg-green-600' }` }>

                                                { task.completed ?
                                                    (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>


                                                    )
                                                    : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>

                                                    ) }
                                            </button>

                                            <button onClick={ () => this.removeTask(task.id) } className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome
