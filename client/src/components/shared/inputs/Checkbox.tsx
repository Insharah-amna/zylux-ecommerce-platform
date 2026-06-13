import {Checkbox} from '@/components/ui/checkbox';
import {CheckboxInputProps} from '@/interfaces/input';

const CheckboxInput = ({
  label,
  disabled,
  checked,
  onChange,
}: CheckboxInputProps) => {
  return (
    <div className='flex items-center gap-3 cursor-pointer'>
      <Checkbox
        disabled={disabled}
        className='hover:border-gray-700 cursor-pointer'
        checked={checked}
        onCheckedChange={() => onChange()}
      />
      <label className='text-sm text-gray-500 cursor-pointer capitalize'>
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
