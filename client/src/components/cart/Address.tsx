import {TextareaField} from '@/components/shared/inputs/Textarea';
import AuthFormContainer from '@/components/shared/containers/AuthFormContainer';
import TextInput from '@/components/shared/inputs/TextInput';
import {AddressProps} from '@/interfaces/cart';
import SubmitButton from '../shared/buttons/SubmitButton';

const Address = ({handleSubmit, onSubmit, control}: AddressProps) => {
  return (
    <div className='w-full'>
      <AuthFormContainer
        heading=''
        handleSubmit={handleSubmit(onSubmit)}
        className='w-full md:w-[90%]'
      >
        <TextareaField
          control={control}
          placeholder='Enter your address here...'
          label='Address'
          name='address'
          className='p-2'
        />

        <TextInput
          control={control}
          name='city'
          type='text'
          label='City'
          className='rounded-[2px] h-[35px]'
        />

        <TextInput
          control={control}
          name='country'
          type='text'
          label='Country'
          className='rounded-[2px] h-[35px]'
        />

        <div className='flex w-full justify-end'>
          <SubmitButton
            buttonText='Set address'
            className='rounded-[4px] hover:bg-accent'
          />
        </div>
      </AuthFormContainer>
    </div>
  );
};

export default Address;
