import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    ActionTodolistsType, addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    ActionTaskType,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer<Reducer<Array<TodolistType>, ActionTodolistsType>>(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer<Reducer<TasksStateType, ActionTaskType>>(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        // let todolistTasks = tasks[todolistId];
        // tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // setTasks({...tasks});
        dispatchTasks(removeTaskAC(id,todolistId))
    }

    function addTask(title: string, todolistId: string) {
        // let task = {id: v1(), title: title, isDone: false};
        // let todolistTasks = tasks[todolistId];
        // tasks[todolistId] = [task, ...todolistTasks];
        // setTasks({...tasks});
        dispatchTasks(addTaskAC(title,todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        // let todolistTasks = tasks[todolistId];
        // let task = todolistTasks.find(t => t.id === id);
        // if (task) {
        //     task.isDone = isDone;
        //     // setTasks({...tasks});
        // }
        dispatchTasks(changeTaskStatusAC(id,isDone,todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        // let todolistTasks = tasks[todolistId];
        // let task = todolistTasks.find(t => t.id === id);
        // if (task) {
        //     task.title = newTitle;
        //     // setTasks({...tasks});
        // }
        dispatchTasks(changeTaskTitleAC(id,newTitle,todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if (todolist) {
        //     todolist.filter = value;
        //     // setTodolists([...todolists])
        // }
        dispatchTodolists(changeTodolistFilterAC(value,todolistId))
    }

    function removeTodolist(id: string) {
        // setTodolists(todolists.filter(tl => tl.id != id));
        // delete tasks[id];
        // setTasks({...tasks});
        dispatchTodolists(removeTodolistAC(id))
        dispatchTasks(removeTodolistAC(id))
    }

    function changeTodolistTitle(id: string, title: string) {
        // const todolist = todolists.find(tl => tl.id === id);
        // if (todolist) {
        //     todolist.title = title;
        //     // setTodolists([...todolists]);
        // }
        dispatchTodolists(changeTodolistTitleAC(id,title))
    }

    function addTodolist(title: string) {
        // let newTodolistId = v1();
        // let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        // setTodolists([newTodolist, ...todolists]);
        // setTasks({
        //     ...tasks,
        //     [newTodolistId]: []
        // })
        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
