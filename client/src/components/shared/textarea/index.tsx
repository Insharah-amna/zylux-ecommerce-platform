import {Textarea} from '@/components/ui/textarea';
import {TextareaFieldProps} from '@/interfaces/input';

export function TextareaField({
  placeholder,
  label,
  id,
  className,
  setValue,
  required,
}: TextareaFieldProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Textarea
        placeholder={placeholder}
        id={id}
        className={className}
        onChange={(e) => setValue(e.target.value)}
        required={required}
      />
    </>
  );
}
