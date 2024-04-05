import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {SuperCheckbox} from "./SuperCheckbox";
import {SuperButton} from "./SuperButton";
import {Task} from "./Task/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {

    // console.log("Todolist called")

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]) // стало

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    let tasks = props.tasks

    useMemo(() => {
        console.log('useMemo called')
        if (props.filter === "active") {
            tasks = tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasks = tasks.filter(t => t.isDone === true);
        }
        return tasks
    }, [props.filter])


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return (
                        <Task
                            todolistId={props.id}
                            key={t.id}
                            task={t}
                            changeTaskTitle={props.changeTaskTitle}
                            changeTaskStatus={props.changeTaskStatus}
                            removeTask={props.removeTask}
                        />
                    )
                })
            }
        </div>
        <div>

            <SuperButton filter={'all'} id={props.id} changeFilter={props.changeFilter} value={'all'} title={'All'}
                         color={'inherit'}/>
            <SuperButton filter={'active'} id={props.id} changeFilter={props.changeFilter} value={'active'}
                         title={'Active'} color={'primary'}/>
            <SuperButton filter={'completed'} id={props.id} changeFilter={props.changeFilter} value={'completed'}
                         title={'Completed'} color={'secondary'}/>

        </div>
    </div>
})


