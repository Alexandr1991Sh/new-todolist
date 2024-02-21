import React, {memo, useCallback} from 'react';
import {Button} from "@mui/material";
import {FilterValuesType} from "./App";

type SuperButtonPropsType = {
    filter: FilterValuesType
    id: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    color: any
    value: FilterValuesType
    title: string
}

export const SuperButton: React.FC<SuperButtonPropsType> = memo((
    {filter, id, changeFilter, color, value, title}) => {

    const onClickHandler = useCallback(() =>
        changeFilter(value, id), [changeFilter, id]);

    return (
        <Button variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={onClickHandler}
                color={color}
        >{title}
        </Button>
    );
});

