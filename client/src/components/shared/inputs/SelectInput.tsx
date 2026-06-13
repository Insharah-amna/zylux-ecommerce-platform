import {Controller} from 'react-hook-form';
import {SelectInputProps} from '@/interfaces/input';
import ErrorMessage from './ErrorMessage';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const SelectInput = ({
  name,
  control,
  className,
  label,
  options,
  isDisabled = false,
}: SelectInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => {
        const selectedValue = field.value?.value || '';
        const selectedLabel = field.value?.label || '';

        const handleChange = (value: string | boolean) => {
          const selectedOption = options.find((opt) => opt.value === value);
          if (selectedOption) field.onChange(selectedOption);
        };

        return (
          <div className='w-full flex flex-col justify-center gap-2'>
            {label && <label className='text-secondary'>{label}</label>}

            <Select
              onValueChange={handleChange}
              value={selectedValue}
              disabled={isDisabled}
            >
              <SelectTrigger
                className={`w-full text-primary border border-gray-300 rounded-sm p-2 ${className}
                ${error ? 'border-error ring-error ring-1' : ''}`}
              >
                <SelectValue placeholder='Select an option'>
                  {selectedLabel}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.label} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {error && <ErrorMessage errorMessage={error.message} />}
          </div>
        );
      }}
    />
  );
};

export default SelectInput;
