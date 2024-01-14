import React, {ChangeEvent, useState, KeyboardEvent, ChangeEventHandler} from 'react';
import {FilterValuesType} from "./App";


type taskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type todolistPropsType = {
    title: string
    tasks: Array<taskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (titleTask: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: string
    id: string
}

export const Todolist: React.FC<todolistPropsType> = (
    {title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter,id}
) => {
    const [titleTask, setTitleTask] = useState('')
    const [error, setError] = useState<string | null>(null)
    const removeTaskHandler = (id: string) => {
        removeTask(id)
    }
    const addTaskHandler = () => {
        if (titleTask.trim() !== '') {
            addTask(titleTask.trim())
            setTitleTask('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleTask(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            if (titleTask.trim() !== '') {
                addTask(titleTask.trim())
                setTitleTask('')
            } else {
                setError('Title is required')
            }
        }
    }
    const onAllClickHandler = () => {
        changeFilter('all')
    }
    const onActiveClickHandler = () => {
        changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        changeFilter('completed')
    }
    const changeTaskStatusHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(id, e.currentTarget.checked)
    }

    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
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

                        return (
                            <li><input key={task.id} type="checkbox" checked={task.isDone}
                                       className={task.isDone ? 'is-done' : ''}
                                // onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatusHandler(task.id, e)}
                            />
                                <span className={task.isDone ? 'is-done' : ''}>{task.title}</span>
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
