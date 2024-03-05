import type {StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

const meta = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button clicked inside form')
    },
};


 const AddItemFormWithError = memo((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>("Title is required")

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />

        <IconButton color="primary" onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>
})


export const AddItemFormWithErrorStory: Story = {
    render: () => <AddItemFormWithError addItem={action("Button clicked inside form")}/>
}
