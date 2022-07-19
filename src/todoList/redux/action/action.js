import axios from "axios";
import { GET_TASK_API } from "../constant/constant";


export const getTaskListApi = () => {
    return async dispatch => {
        try {
            let {data, status} = await axios({
                url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
                method: "GET"
            });
            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    payload: data
                })
            }
        } catch (err) {
            console.log(err.respone.data) }
        }
};

export const addTaskApi = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
            method: "POST",
            data: { taskName: taskName }
        })
        promise.then((result) => {
            dispatch(getTaskListApi());
        });
        promise.catch((err) => { console.log(err.respone.data) });
    }
};

export const deleteTaskApi = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "DELETE"
        });

        promise.then((result) => {
            dispatch(getTaskListApi());
        });
        promise.catch((err) => { alert(err.respone.data) });
    }
};

export const checkDoneTaskApi = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT"
        });
        promise.then((result) => {
            dispatch(getTaskListApi());
        });
        promise.catch((err) => { alert(err.respone.data) });
    }
};

export const checkUndoTaskApi = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT"
        });
        promise.then((result) => {
            dispatch(getTaskListApi());
        });
        promise.catch((err) => { alert(err.respone.data) });
    }
}
