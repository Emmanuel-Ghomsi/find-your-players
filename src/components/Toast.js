import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Toast(type, message) {
  switch (type) {
    case "success":
      return toast.success(message);
    case "error":
      return toast.error(message);
    default:
      return toast(message);
  }
}

export default Toast;
