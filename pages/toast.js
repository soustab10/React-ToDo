import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function displaySuccessToast(message) {
  toast.success(message);
}

export function displayErrorToast(message) {
  toast.error(message);
}

export function displayWarningToast(message) {
  toast.warn(message);
}

export function displaySuccessToastDark(message) {
  toast.success(message, { theme: "dark" });
}

export function displayErrorToastDark(message) {
  toast.error(message, { theme: "dark" });
}

export function displayWarningToastDark(message) {
  toast.warn(message, { theme: "dark" });
}
