import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: string
}
type TaskStateType = {
    [key: string]: Array<TaskPropsType>
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }
    const addTask = (todolistId: string, titleTask: string) => {
        const newTask = {id: v1(), title: titleTask, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId]
                .map(el => el.id === taskId ? {...el, isDone} : el)
        })
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
    }
    const addTodolist = (title: string) => {
        let todolistId = v1()
        let newTodolist = {id: todolistId, title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: []})
    }
    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId]
                .map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }
    const updateTodolist = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    }
    return (
        <div className='App'>
            <AddItemForm addTodolist={addTodolist}/>
            {
                todolists.map(todolist => {
                    let taskForTodolist = tasks[todolist.id]

                    if (todolist.filter === 'active') {
                        taskForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        taskForTodolist = tasks[todolist.id].filter(task => task.isDone)
                    }
                    return <Todolist
                        key={todolist.id}
                        todolistId={todolist.id}
                        title={todolist.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                    />

                })
            }
        </div>

    )
}

export default App;
