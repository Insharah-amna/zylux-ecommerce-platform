import {FiSend} from 'react-icons/fi';
import {MessageInputProps} from '@/interfaces/messages';
import TextInput from '@/components/shared/inputs/TextInput';
import SubmitButton from '@/components/shared/buttons/SubmitButton';

const MessageInput = ({handleSubmit, control, onSubmit}: MessageInputProps) => {
  return (
    <div className='bg-gray-100 h-[60px] flex-center absolute bottom-0 w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[1400px] px-4'>
        <div className='flex gap-3 h-[40px]'>
          <TextInput
            control={control}
            name='sendMessage'
            type='text'
            placeholder='Enter your message'
            className='rounded-sm h-full focus-visible:ring-0'
          />
          <SubmitButton
            buttonText={<FiSend />}
            className='rounded-sm h-full w-[40px] hover:bg-accent'
          />
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
