import {ErrorMessageProps} from '@/interfaces/input';

const ErrorMessage = ({errorMessage}: ErrorMessageProps) => (
  <div className='text-error text-[13px]'>{errorMessage}</div>
);

export default ErrorMessage;
