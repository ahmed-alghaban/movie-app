import { toast } from "react-toastify";

export const toastSuccessNotify = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
    });
}

export const toastErrorNotify = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
    });
}

export const toastWarningNotify = (message) => {
    toast.warning(message, {
        position: "top-right",
        autoClose: 3000,
    });
}

