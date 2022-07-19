import React, { useState, useEffect } from 'react'
import styles from "./TodoList.css"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { todoListReducer } from './redux/todoListReducer';
import { GET_TASK_API } from './redux/constant/constant';
import { addTaskApi, checkDoneTaskApi, checkUndoTaskApi, deleteTaskApi, getTaskListApi } from './redux/action/action';


export default function TodoList(props) {

  const {mangTaskList} = useSelector(state => state.todoListReducer);

  const dispatch = useDispatch();

  let [state, setState] = useState({
    values: {
      taskName: ""
    },
    errors: {
      taskName: ""
    }
  });

  //Ham nhan data tu back-end
  const getTaskList = () => {
    dispatch(getTaskListApi())
  };

  useEffect(() => {
    getTaskList()
  
    return () => {}
  }, [])
  

  //Ham render danh sach task chua hoan thanh
  const renderTaskToDo = () => {
    return mangTaskList.filter(item => !item.status).map((item, index) => {
      return (
        <li key={index}>
          <span>{item.taskName}</span>
          <div className="buttons">
            <button className="remove" type='button' onClick={() => { handleDeleteTask(item.taskName) }}>
              <i className="fa fa-trash-alt" />
            </button>
            <button className="complete" type='button' onClick={() => { handleDoneTask(item.taskName) }}>
              <i className="far fa-check-circle" />
              <i className="fas fa-check-circle" />
            </button>
          </div>
        </li>
      )
    })
  };

  //Ham render danh sach task da hoan thanh
  const renderTaskDone = () => {
    return mangTaskList.filter(item => item.status).map((item, index) => {
      return (
        <li key={index}>
          <span>{item.taskName}</span>
          <div className="buttons">
            <button className="remove" type='button' onClick={() => { handleDeleteTask(item.taskName) }}>
              <i className="fa fa-trash-alt" />
            </button>
            <button className="complete" type='button' onClick={() => { handleUnDoneTask(item.taskName) }}>
              <i class="far fa-rotate-left"></i>
              <i class="fas fa-rotate-left"></i>
            </button>
          </div>
        </li>
      )
    })
  };

  //Ham xu ly check hoan thanh task
  const handleDoneTask = (taskName) => {
    dispatch(checkDoneTaskApi(taskName))
  };

  //Ham xu ly check chua hoan thanh task
  const handleUnDoneTask = (taskName) => {
    dispatch(checkUndoTaskApi(taskName))
  };

  //Ham xu ly xoa task
  const handleDeleteTask = (taskName) => {
    dispatch(deleteTaskApi(taskName))
  };

  //Ham xu ly nhan gia tri input truyen vao state
  const handleChange = (event) => {
    let { value, name } = event.target;
    let newValues = { ...state.values };

    newValues = { ...newValues, [name]: value };

    let newErrors = { ...state.errors };

    let regexString = /^[a-z A-Z 0-9]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = [name] + " invalid!";
    } else {
      newErrors[name] = "";
    };

    setState({
      ...state,
      values: newValues,
      errors: newErrors
    })
  };

  //Ham xu ly them task
  const handleAddTask = (event) => {
    event.preventDefault();
    dispatch(addTaskApi(state.values.taskName))
  };

  return (
    <form onSubmit={(e) => { handleAddTask(e) }}>
      {/* <button className='btn btn-primary btn-lg my-3' onClick={() => { getTaskList() }}>Get Task List</button> */}
      <div className="card">
        <div className="card__header">
          <img src="./img/X2oObC4.png" />
        </div>
        {/* <h2>hello!</h2> */}
        <div className="card__body">
          <div className="card__content">
            <div className="card__title">
              <h2>My Tasks</h2>
              <p>May 23,2022</p>
            </div>
            <div className="card__add">
              <input name='taskName' onChange={handleChange} id="newTask" type="text" placeholder="Enter an activity..." />
              <button id="addItem" onClick={(e) => { handleAddTask(e) }}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <p className='text text-danger'>{state.errors.taskName}</p>
            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                {renderTaskToDo()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
                {renderTaskDone()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
