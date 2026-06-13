import {Controller} from 'react-hook-form';
import {Textarea} from '@/components/ui/textarea';
import {TextareaFieldProps} from '@/interfaces/input';
import ErrorMessage from './ErrorMessage';

export function TextareaField({
  control,
  placeholder,
  label,
  name,
  className,
  rows = 3,
}: TextareaFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <div className='w-full flex flex-col justify-center gap-2'>
          {label && <label className=''> {label} </label>}
          <Textarea
            {...field}
            placeholder={placeholder}
            rows={rows}
            className={`border-gray-300 px-[15px] rounded-[2px] ${className} ${error && 'border-error focus-visible:ring-error'}`}
          />
          {error && <ErrorMessage errorMessage={error.message} />}
        </div>
      )}
    />
  );
}
