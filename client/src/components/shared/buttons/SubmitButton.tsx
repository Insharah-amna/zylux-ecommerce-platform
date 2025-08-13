import {Button} from '@/components/ui/button';
import {SubmitButtonProps} from '@/interfaces/buttons';

const SubmitButton = ({
  buttonText,
  isLoading = false,
  handleSubmit,
  className = 'h-[50px]',
  variant,
  disabled = false,
}: SubmitButtonProps) => {
  return (
    <Button
      variant={variant}
      type='submit'
      className={`rounded-[40px] w-[125px] px-4 py-3 ${className} cursor-pointer`}
      onSubmit={handleSubmit}
      disabled={disabled || isLoading}
    >
      {!isLoading ? buttonText : 'Loading...'}
    </Button>
  );
};

export default SubmitButton;
