import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id:string
    title: string
    filter: string
}
function App() {

    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
      let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )


    const removeTask = (id: string) => {
        setTask(tasks.filter(task => task.id !== id))
    }

    let taskForTodolist = tasks

    if (filter === 'active') {
        taskForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(task => task.isDone)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const addTask = (titleTask: string) => {
        const task = {id: v1(), title: titleTask, isDone: false}
        const newTsk = [task, ...tasks]
        setTask(newTsk)
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(task => task.id === id)
        if(task){
           task.isDone = isDone
            setTask([...tasks])
        }
    }

    return (
        <div className='App'>
            {
                todolists.map(todolist=>{
                    return    <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                    />
                })
            }
        </div>
    )
}

export default App;
