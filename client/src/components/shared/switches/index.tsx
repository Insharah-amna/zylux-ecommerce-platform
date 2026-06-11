import {Controller} from 'react-hook-form';
import {Switch} from '@/components/ui/switch';
import ErrorMessage from '../inputs/ErrorMessage';

interface SwitchInputProps {
  name: string;
  control: any;
  label: string;
  className?: string;
  isDisabled?: boolean;
}

const SwitchInput = ({
  name,
  control,
  className = '',
  label,
  isDisabled = false,
}: SwitchInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <div className='w-full flex flex-col gap-2'>
          <label className='text-secondary flex items-center justify-between'>
            <span>{label}</span>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isDisabled}
              className={`data-[state=checked]:bg-accent ${className}`}
            />
          </label>

          {error && <ErrorMessage errorMessage={error.message} />}
        </div>
      )}
    />
  );
};

export default SwitchInput;
