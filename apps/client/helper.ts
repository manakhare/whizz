import { toast, ToastContent, ToastOptions, Slide, Id } from "react-toastify";

//======================= TOAST ======================================

export const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};

type ToastType = "success" | "error" | "info" | "warning" | "default";

export const showToast = (
    type: ToastType,
    content: ToastContent,
    options: Partial<ToastOptions> = {},
  ): Id => {
    const optionsToApply = { ...defaultToastOptions, ...options };
  
    switch (type) {
      case "success":
        return toast.success(content, optionsToApply);
      case "error":
        return toast.error(content, optionsToApply);
      case "info":
        return toast.info(content, optionsToApply);
      case "warning":
        return toast.warn(content, optionsToApply);
      case "default":
        return toast(content, optionsToApply);
      default:
        return toast(content, optionsToApply);
    }
  };


// ================================= DATE =======================================

export const formatDate = (date: string) => {    
    const givenDate = new Date(date);

    const readableDate = givenDate.toLocaleString("en-US", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour12: false
    })

    return readableDate==="Invalid Date" ? "-" : readableDate;
}