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
  displaySuccessToastDark,
  displayErrorToastDark,
} from "./toast";
import useDarkMode from "./useDarkMode";

export default function Home() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  auth_required();
  useEffect(() => {
    if (token != undefined) getTasks();
  }, [tasks]);

  function getTasks() {
    /***
     * @todo Fetch the tasks created by the user.
     * @todo Set the tasks state and display them in the using TodoListItem component
     * The user token can be accessed from the context using useAuth() from /context/auth.js
     */

    const theme = axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: API_URL + "todo/",
      method: "GET",
    })
      .then(function ({ data, status }) {
        setTasks(data);
      })
      .catch((err) => {
        console.log("Error:" + err);
        displayErrorToast("Error: " + err);
      });
  }

  return (
    <div>
      <div>
        <center>
          <AddTask displayTasks={getTasks} />
          {tasks.length == 0 ? (
            <div className=" py-1.5 text-gray-400 py-2 text-sm">
              No To-Do created! Add a To-Do now!
            </div>
          ) : (
            <div>
              <ul className="flex-col mt-9 max-w-sm mb-3 ">
                <span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
                  Available Tasks
                </span>
                {tasks.map((task) => {
                  return (
                    <TodoListItem
                      id={task.id}
                      key={task.id}
                      task={task.title}
                      displayTasks={getTasks}
                    />
                  );
                })}
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
