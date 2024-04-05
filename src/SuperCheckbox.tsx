import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type SuperCheckboxPropsType = {
    isDone: boolean
    callBack: (isDone: boolean) => void
}

export const SuperCheckbox = (props: SuperCheckboxPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            checked={props.isDone}
            color="primary"
            onChange={onChangeHandler}
        />
    );
};

