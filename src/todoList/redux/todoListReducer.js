import { GET_TASK_API } from "./constant/constant";
import axios from 'axios';

const initialState = {
    mangTaskList: []
};

export const todoListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_TASK_API:
            state.mangTaskList = payload;
            return {...state};

        default:
            return {...state};
    }
}


