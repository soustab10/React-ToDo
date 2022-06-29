import React from "react";
import axios from "../utils/axios";
import { API_URL } from "../utils/constants";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { no_auth_required } from "../middlewares/no_auth_required";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  displayErrorToast,
  displaySuccessToast,
  displayWarningToast,
} from "../pages/toast";

export default function RegisterForm() {
  no_auth_required();
  const router = useRouter();
  const { setToken } = useAuth();

  const [loginData, setLoginData] = React.useState({
    usernameInput: "",
    passwordInput: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const login = () => {
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */

    const inputData = {
      username: loginData.usernameInput,
      password: loginData.passwordInput,
    };

    if (inputData.username == "" || inputData.password == "") {
      displayWarningToast("Please fill all required fields!");
      return;
    }

    axios({
      url: API_URL + "auth/login/",
      method: "POST",
      data: inputData,
    })
      .then((res) => {
        displaySuccessToast("User logged in successfully");
        const token = res.data.token;
        setToken(token);
        router.push("LOGIN", "/");
      })
      .catch(function (err) {
        displayErrorToast("Invalid credentials! Please try again.");
        setLoginData({
          usernameInput: "",
          passwordInput: "",
        });
      });
  };

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="dark:bg-gray-500 dark:text-white bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>
            <input
              onChange={handleChange}
              type="text"
              className="block dark:bg-gray-400 dark:placeholder-gray-50 dark:text-gray-50 bg-gray-100 w-full p-3 rounded mb-4"
              name="usernameInput"
              id="usernameInput"
              placeholder="Username"
              value={loginData.usernameInput}
            />

            <input
              onChange={handleChange}
              type="password"
              className="block dark:bg-gray-400 dark:placeholder-gray-50 dark:text-gray-50 bg-gray-100 w-full p-3 rounded mb-4"
              name="passwordInput"
              id="passwordInput"
              placeholder="Password"
              value={loginData.passwordInput}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-transparent dark:border-transparent dark:bg-green-800 dark:text-white text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        theme="light"
        autoClose={3000}
        pauseOnHover={false}
        newestOnTop={false}
        closeOnClick
      />
    </>
  );
}
