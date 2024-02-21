import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {SuperCheckbox} from "./state/SuperCheckbox";
import {SuperButton} from "./SuperButton";
import {Task} from "./Task";

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

    // const addTask = (title: string) => {
    //     props.addTask(title, props.id);
    // } //было

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]) // стало

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    // const onAllClickHandler = () => props.changeFilter("all", props.id);
    // const onActiveClickHandler = () => props.changeFilter("active", props.id);
    // const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    // const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    // const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    // const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    // const onChangeHandler = (tID: string, isDone: boolean) => {
    //     props.changeTaskStatus(tID, isDone, props.id,);
    // }

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
                    // const onClickHandler = () => props.removeTask(t.id, props.id)

                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     let newIsDoneValue = e.currentTarget.checked;
                    //     props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    // }

                    // const onTitleChangeHandler = (newValue: string) => {
                    //     props.changeTaskTitle(t.id, newValue, props.id);
                    // }


                    return (
                        //     <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        //     {/*<Checkbox checked={t.isDone} color="primary" onChange={onChangeHandler}/>*/}
                        //     <SuperCheckbox
                        //         isDone={t.isDone}
                        //         callBack={(isDone) => onChangeHandler(t.id, isDone)}
                        //     />
                        //
                        //     <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        //     <IconButton onClick={onClickHandler}>
                        //         <Delete/>
                        //     </IconButton>
                        // </div>
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
            {/*<Button variant={props.filter === 'all' ? 'outlined' : 'text'}*/}
            {/*        onClick={onAllClickHandler}*/}
            {/*        color={'inherit'}*/}
            {/*>All*/}
            {/*</Button>*/}
            {/*<Button variant={props.filter === 'active' ? 'outlined' : 'text'}*/}
            {/*        onClick={onActiveClickHandler}*/}
            {/*        color={'primary'}>Active*/}
            {/*</Button>*/}
            {/*<Button variant={props.filter === 'completed' ? 'outlined' : 'text'}*/}
            {/*        onClick={onCompletedClickHandler}*/}
            {/*        color={'secondary'}>Completed*/}
            {/*</Button>*/}

            <SuperButton filter={'all'} id={props.id} changeFilter={props.changeFilter} value={'all'} title={'All'}
                         color={'inherit'}/>
            <SuperButton filter={'active'} id={props.id} changeFilter={props.changeFilter} value={'active'}
                         title={'Active'} color={'primary'}/>
            <SuperButton filter={'completed'} id={props.id} changeFilter={props.changeFilter} value={'completed'}
                         title={'Completed'} color={'secondary'}/>

        </div>
    </div>
})


