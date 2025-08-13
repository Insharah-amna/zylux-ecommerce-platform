import {ToastType} from '@/types/common';
import {toast} from 'react-toastify';

export const showToast = ({type, message}: ToastType) => {
  if (type === 'success') toast.success(message);
  else toast.error(message);
};
