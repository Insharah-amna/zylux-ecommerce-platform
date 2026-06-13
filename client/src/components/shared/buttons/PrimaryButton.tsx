import {Button} from '@/components/ui/button';
import {PrimaryButtonProps} from '@/interfaces/buttons';

const PrimaryButton = ({
  buttonText,
  isLoading = false,
  handleClick,
  className = 'h-[50px]',
  variant,
}: PrimaryButtonProps) => {
  return (
    <Button
      type='button'
      variant={variant}
      className={`rounded-[10px] w-[125px] p-4 cursor-pointer ${className}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {!isLoading ? buttonText : 'Loading...'}
    </Button>
  );
};

export default PrimaryButton;
