import React, {ChangeEvent, useState, KeyboardEvent, ChangeEventHandler} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {v1} from "uuid";
import {EditableSpan} from "./EditableSpan";

export  type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, titleTask: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: string
    todolistId: string
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolist: (todolistId: string, newTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter,
        todolistId, removeTodolist, updateTask, updateTodolist
    }) => {

    const [titleTask, setTitleTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (titleTask.trim() !== '') {
            addTask(todolistId, titleTask.trim())
            setTitleTask('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitleTask(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            if (titleTask.trim() !== '') {
                addTask(todolistId, titleTask.trim())
                setTitleTask('')
            } else {
                setError('Title is required')
            }
        }
    }
    const onAllClickHandler = () => changeFilter(todolistId, 'all')
    const onActiveClickHandler = () => changeFilter(todolistId, 'active')
    const onCompletedClickHandler = () => changeFilter(todolistId, 'completed')
    const removeTaskHandler = (taskId: string) => removeTask(todolistId, taskId)
    const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todolistId, taskId, e.currentTarget.checked)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        updateTask(todolistId, taskId, newTitle)
    }
    const updateTodolistHandler = (newTitle: string) => {
        updateTodolist(todolistId, newTitle)
    }

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan updateTask={updateTodolistHandler} oldTitle={title}/>
                    <button onClick={removeTodolistHandler}>x</button>
                </h3>
                <div>
                    <input value={titleTask}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={addTaskHandler}>+</button>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                <ul>
                    {tasks.map((task) => {
                        // const updateTaskHandler = (newTitle: string) => {
                        //     updateTask(todolistId, task.id, newTitle)
                        // }
                        return (
                            <li><input key={task.id} type="checkbox" checked={task.isDone}
                                       className={task.isDone ? 'is-done' : ''}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatusHandler(task.id, e)}
                            />
                                <EditableSpan updateTask={(newTitle) => updateTaskHandler(task.id, newTitle)}
                                              oldTitle={task.title}/>
                                <button onClick={() => removeTaskHandler(task.id)}>x</button>

                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button className={filter === 'all' ? 'active-filter' : ''}
                            onClick={onAllClickHandler}>All
                    </button>
                    <button className={filter === 'active' ? 'active-filter' : ''}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={filter === 'completed' ? 'active-filter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};
