import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    oldTitle: string
    updateTask: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({oldTitle, updateTask}) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)
    const activateEditMode = () => {
        setEditMode(!editMode)
        setNewTitle(oldTitle)
        if (editMode) {
            addTask()
        }
    }

    const addTask = () => updateTask(newTitle)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    return (editMode
            ? <input value={newTitle} onBlur={activateEditMode} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={activateEditMode}>{oldTitle}</span>
    );
};
