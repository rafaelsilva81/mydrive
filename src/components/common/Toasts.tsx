// customToast.js
import { toast, ToastClassName, ToastContainer } from 'react-toastify';
import { CheckCircle, Info, Warning, XCircle } from 'phosphor-react'

const CustomToast = {
  success(msg: any, options = {}) {
    return toast.success(msg, {
      ...options,
      className: 'toast-success-container toast-success-container-after',
    });
  },
  error(msg: any, options = {}) {
    return toast.error(msg, {
      ...options,
      className: 'toast-error-container toast-error-container-after',
    });
  },
  info(msg: any, options = {}) {
    return toast.info(msg, {
      ...options,
      className: 'toast-info-container toast-info-container-after',
    });
  },
};


export { CustomToast }