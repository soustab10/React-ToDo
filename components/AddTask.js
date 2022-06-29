import { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { API_URL } from "../utils/constants";
import {
  displayErrorToast,
  displaySuccessToast,
  displayWarningToast,
} from "../pages/toast";
import TodoListItem from "../components/TodoListItem";

export default function AddTask(props) {
  /**
   * @todo Complete this function.
   * @todo 1. Send the request to add the task to the backend server.
   * @todo 2. Add the task in the dom.
   */

  const { token } = useAuth();
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task == "") {
      displayWarningToast("Task title is required!");
      return;
    } else {
      const dataForApiRequest = {
        title: task,
      };
      axios({
        headers: {
          Authorization: "Token " + token,
        },
        url: API_URL + "todo/create/",
        method: "POST",
        data: dataForApiRequest,
      })
        .then((res) => {
          setTask("");
          props.renderTasks();

          displaySuccessToast("Task added successfully");
        })
        .catch(function (err) {
          displayErrorToast("Error!! Task could not be added!");
        });
    }
  };

  return (
    <div>
      <div className="flex items-center flex-row max-w-sm mt-24 align-middle w-full">
        <input
          onChange={(e) => setTask(e.target.value)}
          type="text"
          className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 dark:placeholder-gray-100 text-blueGray-600 dark:bg-gray-400 dark:text-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full "
          placeholder="Enter Task Title"
          value={task}
        />
        <button
          type="button"
          className="todo-add-task bg-transparent  dark:bg-green-700 dark:text-white hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
