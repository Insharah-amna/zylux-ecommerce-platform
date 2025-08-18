import {AddressProps} from '@/interfaces/cart';
import {TextareaField} from '@/components/shared/textarea';
import {Input} from '@/components/ui/input';

const Address = ({setAddress, setCity, setCountry}: AddressProps) => {
  return (
    <div className='flex flex-col gap-3 w-[90%] md:w-[80%] text-primary'>
      <TextareaField
        placeholder='Enter your address here...'
        label='Address'
        id='address'
        className='p-2'
        setValue={setAddress}
        required={true}
      />

      <div className='flex flex-col gap-2'>
        <label htmlFor='city'>City</label>
        <Input
          className='p-2'
          name='city'
          placeholder='Enter your city'
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='country'>Country</label>
        <Input
          className='p-2'
          name='country'
          placeholder='Enter your country'
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default Address;
