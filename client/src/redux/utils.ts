import {createAction} from '@reduxjs/toolkit';
import {showToast} from '@/utils/toast';
import {
  ApiResponseObject,
  FinalResponse,
  HandleApiResponseParams,
} from '@/interfaces/redux';
import {asyncTryCatch} from '@/utils/tryCatchUtils';

export const clearStore = createAction('util/clearStore');

export const handleApiResponse = async <T = any>({
  queryFulfilled,
  toastMessage = {
    success: {show: true, customMessage: ''},
    error: {show: true, customMessage: ''},
  },
}: HandleApiResponseParams): Promise<FinalResponse<T>> => {
  const {
    success,
    error: errorObj,
    response,
  } = await asyncTryCatch(() => queryFulfilled);

  let responseObject: ApiResponseObject<T>;

  let successMessage = false;

  if (success) {
    responseObject = {
      statusCode: response.data.statusCode,
      message: response.data.message,
      body: response.data.body,
    };
    successMessage = true;
    if (toastMessage.success.show) {
      showToast({
        type: 'success',
        message: toastMessage.success.customMessage || response.data.message,
      });
    }
  } else {
    const {message: errorMessage, statusCode} = errorObj?.error?.data || {};

    responseObject = {
      statusCode,
      message: errorMessage,
      type: errorObj?.error?.data.type || null,
      body: null,
    };

    successMessage = false;

    const message = errorMessage || 'Something went wrong';

    if (toastMessage.error.show) {
      showToast({
        type: 'error',
        message: toastMessage.error.customMessage || message,
      });
    }
  }

  return {
    body: success ? responseObject?.body : undefined,
    error: !success ? responseObject : undefined,
  };
};
