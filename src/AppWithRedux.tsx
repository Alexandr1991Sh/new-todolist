import React, {Reducer, useCallback, useReducer, useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


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

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // const removeTask = (id: string, todolistId: string) => dispatch(removeTaskAC(id, todolistId))// было
    const removeTask = useCallback((id: string, todolistId: string) => dispatch(removeTaskAC(id, todolistId)), [dispatch])// стало

    // const addTask = (title: string, todolistId: string) => dispatch(addTaskAC(title, todolistId)) // было
    const addTask = useCallback((title: string, todolistId: string) => dispatch(addTaskAC(title, todolistId)), [dispatch])//стало

    // const changeStatus = (id: string, isDone: boolean, todolistId: string) => dispatch(changeTaskStatusAC(id, isDone, todolistId))// было
    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => dispatch(changeTaskStatusAC(id, isDone, todolistId)), [dispatch])//стало

    // const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => dispatch(changeTaskTitleAC(id, newTitle, todolistId)) // было
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => dispatch(changeTaskTitleAC(id, newTitle, todolistId)), [dispatch])// стало

    // const changeFilter = (value: FilterValuesType, todolistId: string) => dispatch(changeTodolistFilterAC(value, todolistId))// было
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => dispatch(changeTodolistFilterAC(value, todolistId)), [dispatch])// стало

    // const removeTodolist = (id: string) => dispatch(removeTodolistAC(id))// было
    const removeTodolist = useCallback((id: string) => dispatch(removeTodolistAC(id)), [dispatch])//стало

    // const changeTodolistTitle = (id: string, title: string) => dispatch(changeTodolistTitleAC(id, title))// было
    const changeTodolistTitle = useCallback((id: string, title: string) => dispatch(changeTodolistTitleAC(id, title)), [dispatch])// стало

    // const addTodolist = (title: string) => dispatch(addTodolistAC(title)) //было
    const addTodolist = useCallback((title: string) => dispatch(addTodolistAC(title)), [dispatch]) // стало


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
                            // let allTodolistTasks = tasks[tl.id];
                            // let tasksForTodolist = allTodolistTasks;
                            //
                            // if (tl.filter === "active") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            // } //было

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        // tasks={tasksForTodolist} //было
                                        tasks={tasks[tl.id]}  //стало
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
