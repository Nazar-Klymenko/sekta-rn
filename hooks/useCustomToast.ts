// import { toast as burntToast } from "burnt";

// type ToastType = "success" | "error" | "info";

// interface ToastOptions {
//   duration?: number;
//   preset?: "done" | "error" | "general";
// }
// const toast = {
//   show: (message: string, options?: ToastOptions) => {
//     burntToast(message, options);
//   },
// };
// export const showToast = (
//   message: string,
//   type: ToastType = "info",
//   duration: number = 2000
// ) => {
//   const preset =
//     type === "error" ? "error" : type === "success" ? "done" : "general";
//   toast.show(message, {
//     duration,
//     preset,
//   });
// };
// export const useCustomToast = () => {
//   return {
//     showToast: (
//       message: string,
//       type: ToastType = "info",
//       duration: number = 2000
//     ) => {
//       showToast(message, type, duration);
//     },
//   };
// };
