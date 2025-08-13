import {Controller} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {TextInputProps} from '@/interfaces/input';
import ErrorMessage from './ErrorMessage';

const TextInput = ({
  control,
  name,
  label,
  type,
  className,
  placeholder = '',
}: TextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <div className='w-full flex flex-col justify-center gap-2'>
          {label && <label className='text-secondary'> {label} </label>}

          <Input
            {...field}
            placeholder={placeholder || label}
            type={type}
            className={`border-gray-300 h-[50px] px-[15px] rounded-[25px] ${className} ${error && 'border-error focus-visible:ring-error'}`}
          />
          {error && <ErrorMessage errorMessage={error.message} />}
        </div>
      )}
    />
  );
};

export default TextInput;
