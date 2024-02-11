import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";


export type ActionTaskType =
    removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionTaskType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(task => task.id !== action.payload.id)
            };
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.id
                        ? {...el, isDone: action.payload.isDone} : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.id
                        ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.newTodolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            // option 1
            let {[action.payload.id]: [], ...rest} = state
            return rest

            // option 2
            // const copyState = { ...state };
            // delete copyState[action.payload.id];
            // return copyState;
        }
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistId}
    } as const
}
type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId}
    } as const
}
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {id, isDone, todolistId}
    } as const
}
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {id, newTitle, todolistId}
    } as const
}
