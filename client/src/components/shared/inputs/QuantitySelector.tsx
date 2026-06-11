import {FiMinus, FiPlus} from 'react-icons/fi';
import {QuantitySelectorProps} from '@/interfaces/input';

const QuantitySelector = ({
  product,
  handleIncrement,
  handleDecrement,
}: QuantitySelectorProps) => {
  return (
    <div className='flex border-1 border-gray-300 rounded-3xl w-[100px] py-1'>
      <button
        name='minus'
        className='p-2 w-1/3 cursor-pointer'
        onClick={handleDecrement}
      >
        <FiMinus />
      </button>
      <input
        type='text'
        id='quantity'
        min={1}
        value={product.quantity}
        readOnly
        className='w-1/3 text-center'
      />
      <button
        name='plus'
        className='p-2 w-1/3 cursor-pointer'
        onClick={handleIncrement}
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default QuantitySelector;
