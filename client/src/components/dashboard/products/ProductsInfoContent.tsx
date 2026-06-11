import {LabelValueRowProps} from '@/interfaces/products';

const DisplayFields = ({label, value}: LabelValueRowProps) => {
  return (
    <div className='flex w-full mb-2'>
      <label className='w-1/2 font-semibold'>{label}</label>
      <p className='w-1/2'>{value ?? '-'}</p>
    </div>
  );
};

export default DisplayFields;
