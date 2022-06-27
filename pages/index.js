import React from "react";
import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { API_URL } from "../utils/constants";
import { auth_required } from "../middlewares/auth_required";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  displaySuccessToast,
  displayErrorToast,
  displayWarningToast,
  displaySuccessToastDark,
  displayErrorToastDark,
} from "./toast";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SortIcon from "@mui/icons-material/Sort";

export default function Home() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [searchTask, setSearchTask] = useState("");
  const [sortType, setSortType] = useState("");

  auth_required();
  useEffect(() => {
    if (token != undefined) getTasks();
  }, [tasks]);

  const resetSearch = () => {
    setSearchTask("");
  };

  function getTasks() {
    /***
     * @todo Fetch the tasks created by the user.
     * @todo Set the tasks state and display them in the using TodoListItem component
     * The user token can be accessed from the context using useAuth() from /context/auth.js
     */
    let newTasks = [];
    axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: API_URL + "todo/",
      method: "GET",
    })
      .then(function ({ data, status }) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].title.toLowerCase().includes(searchTask.toLowerCase())) {
            newTasks.push(data[i]);
          }
        }
        //setTasks(newTasks);
        if (sortType == 0) {
          newTasks.reverse();
        }

        setTasks(newTasks);
      })
      .catch((err) => {
        console.log("Error:" + err);
        displayErrorToast("Error: " + err);
      });
  }

  const setSortMode = (sortMode) => {
    setSortType(sortMode);
  };

  return (
    <div>
      <div>
        <center>
          <AddTask renderTasks={getTasks} />
          <div className="py-4 min-w-full">
            <input
              onChange={(e) => setSearchTask(e.target.value)}
              type="text"
              className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 dark:placeholder-gray-100 text-blueGray-600 dark:bg-gray-400 dark:text-white bg-white text-sm rounded border border-gray-300 outline-none focus:outline-none focus:ring w-full "
              placeholder="Search here.."
              value={searchTask}
            />
            <button
              type="button"
              className="todo-add-task bg-transparent  dark:bg-green-700 dark:text-white hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
              onClick={resetSearch}
            >
              <RestartAltIcon className="text-base" /> Reset
            </button>
          </div>

          <button
            type="button"
            className="todo-add-task bg-transparent m-1  dark:bg-green-700 dark:text-white hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent "
            onClick={() => setSortMode(0)}
          >
            <SortIcon className="text-base rotate-icons" /> Newest First
          </button>
          <button
            type="button"
            className="todo-add-task bg-transparent m-1  dark:bg-green-700 dark:text-white hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent "
            onClick={() => setSortMode(1)}
          >
            <SortIcon className="text-base" /> Oldest First
          </button>

          {tasks.length == 0 ? (
            <div className=" text-gray-400 py-2 text-sm">No To-Do Found!</div>
          ) : (
            <div>
              <ul className="flex-col mt-9 max-w-sm mb-3 ">
                <span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
                  Available Tasks
                </span>
                <div className="max-h-80 task-container">
                  {tasks.map((task) => {
                    return (
                      <TodoListItem
                        id={task.id}
                        key={task.id}
                        task={task.title}
                        renderTasks={getTasks}
                      />
                    );
                  })}
                </div>
              </ul>
            </div>
          )}
        </center>
      </div>
      <ToastContainer
        position="bottom-right"
        theme="light"
        autoClose={3000}
        pauseOnHover={false}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
}
