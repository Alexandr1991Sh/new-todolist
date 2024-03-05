import React, {ChangeEvent, memo, useCallback} from 'react';
import {SuperCheckbox} from "../state/SuperCheckbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";
import {Checkbox} from "@mui/material";

export type TaskPropsType = {
    todolistId: string
    task: TaskType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Task: React.FC<TaskPropsType> = memo((
    {task, changeTaskTitle, changeTaskStatus, removeTask, todolistId}) => {

    const onTitleChangeHandler = useCallback(
        (newValue: string) => changeTaskTitle(task.id, newValue, todolistId),
        [changeTaskTitle, task.id, todolistId]
    );
    const onClickHandler = () => removeTask(task.id, todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue, todolistId)
    }

    // const onChangeHandler = (tID: string, isDone: boolean) => changeTaskStatus(tID, isDone, task.id,); //не работает
    return (
        <div className={task.isDone ? "is-done" : ""}>

            {/*<SuperCheckbox*/}
            {/*    isDone={task.isDone}*/}
            {/*    callBack={(isDone) => onChangeHandler(task.id, isDone)}*/}
            {/*/>               /!*не работает *!/    */}

            <Checkbox
                checked={task.isDone}
                color={'primary'}
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}><Delete/></IconButton>
        </div>
    );
});
