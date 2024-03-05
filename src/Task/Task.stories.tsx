import type {Meta, StoryObj} from '@storybook/react';
import {Task, TaskPropsType} from "./Task";
import React, {ChangeEvent, memo, useCallback, useState} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {
        task: {id: '12wsdewfijdei', title: 'JS', isDone: true},
        todolistId: 'fgdosrg8rgjuh'
    },
    argTypes: {
        changeTaskStatus: {
            description: 'changeTaskStatus',
            action: 'clicked'
        },
        changeTaskTitle: {
            description: 'changeTaskTitle',
            action: 'clicked'
        },
        removeTask: {
            description: 'removeTask',
            action: 'clicked'
        },
    }
}

export default meta;
type Story = StoryObj<typeof Task>;
export const TaskIsDoneStory: Story = {}
export const TaskIsNotDoneStory: Story = {
    args: {task: {id: '12wsdewfijdei2343', title: 'JS', isDone: false},}
}

export const TaskDemoClickedStory = () => {
    const todolistId = '325gsg'
    const [task, setTask] = useState({id: '11qq', title: 'JS', isDone: false})
    const changeTaskStatusHandler = () => setTask({...task, isDone: !task.isDone})

    return <Task
        todolistId={todolistId}
        task={task}
        changeTaskTitle={action('changeTaskTitle')}
        changeTaskStatus={changeTaskStatusHandler}
        removeTask={action('removeTask')}
    />
}
