import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormPropsType = {
    addTodolist: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = ({addTodolist}) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            if (title.trim() !== '') {
                addTodolist(title.trim())
                setTitle('')
            } else {
                setError('Title is required')
            }
        }
    }
    const addItemHandler = () => {
        if (title.trim() !== '') {
            addTodolist(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={addItemHandler}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
};
