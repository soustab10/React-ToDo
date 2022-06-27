/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "../utils/axios";
import { API_URL } from "../utils/constants";
import {
  displayErrorToast,
  displaySuccessToast,
  displayWarningToast,
} from "../pages/toast";
import useDarkMode from "../pages/useDarkMode";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function TodoListItem(props) {
  const [task, setTask] = useState(props.task);
  const { token } = useAuth();

  const [darkTheme, setDarkTheme] = useDarkMode();

  const inputId = "input-button-" + props.id;
  const doneId = "done-button-" + props.id;
  const taskId = "task-" + props.id;
  const taskActionsId = "task-actions-" + props.id;

  const editTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
    document.getElementById("done-button-" + id).classList.remove("hideme");
    document.getElementById("input-button-" + id).classList.remove("hideme");

    document.getElementById("task-actions-" + id).classList.add("hideme");
    document.getElementById("task-" + id).classList.add("hideme");
  };

  const deleteTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
    axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: API_URL + "todo/" + id + "/",
      method: "DELETE",
    })
      .then(() => {
        displaySuccessToast("Task deleted successfully!");
        props.renderTasks();
      })
      .catch((err) => {
        displayErrorToast("Something went wrong!");
      });
  };

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
    if (task === "") {
      displayWarningToast("Task title cannot be empty!");
    } else {
      axios({
        headers: {
          Authorization: "Token " + token,
        },
        url: API_URL + "todo/" + id + "/",
        method: "PUT",
        data: {
          title: task,
        },
      })
        .then(() => {
          displaySuccessToast("Todo has been successfully updated...");
          document
            .getElementById("input-button-" + props.id)
            .classList.add("hideme");
          document
            .getElementById("done-button-" + props.id)
            .classList.add("hideme");
          document
            .getElementById("task-" + props.id)
            .classList.remove("hideme");
          document
            .getElementById("task-actions-" + props.id)
            .classList.remove("hideme");
          props.renderTasks();
        })
        .catch(function (err) {
          displayErrorToast("Something went wrong!");
        });
    }
  };

  return (
    <>
      <li className="border dark:bg-gray-700 flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2 mobile-width-adjust">
        <input
          onChange={(e) => setTask(e.target.value)}
          id={inputId}
          type="text"
          className="hideme appearance-none  dark:bg-gray-500  rounded w-full py-2 px-3 dark:text-gray-100 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
          placeholder="Edit The Task"
          value={task}
        />
        <div id={doneId} className="hideme">
          <button
            className="bg-transparent dark:bg-green-600 dark:hover:bg-green-700 dark:text-gray-50 hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
            type="button"
            onClick={() => updateTask(props.id)}
          >
            Done
          </button>
        </div>
        <div
          id={taskId}
          className="todo-task  dark:text-gray-100 text-gray-600 "
        >
          {task}
        </div>
        <span id={taskActionsId} className="">
          <button
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => editTask(props.id)}
            className="bg-transparent h-auto dark:text-white dark:bg-yellow-600 dark:hover:bg-yellow-400 hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2"
          >
            <ModeEditIcon fontSize="small" />
          </button>

          <button
            type="button"
            className="bg-transparent h-auto dark:text-white dark:bg-red-600 dark:hover:bg-red-400 text-black hover:bg-red-500 hover:text-white border  border-red-500 hover:border-transparent rounded px-2 py-2"
            onClick={() => deleteTask(props.id)}
          >
            <DeleteIcon fontSize="small" />
            {/* <img
              src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
              width="18px"
              height="22px"
              alt="Delete"
            /> */}
          </button>
        </span>
      </li>
    </>
  );
}
