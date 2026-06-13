import {FiXCircle} from 'react-icons/fi';

const ProductNotFound = () => {
  return (
    <div className='flex-center w-full h-[380px]'>
      <div className='flex-center flex-col gap-3 border-l-2 border-b-2 border-gray-400 rounded-md p-7'>
        <FiXCircle size={30} color='gray' />
        <h3 className='text-xl font-semibold text-gray-500'>
          No Products Found
        </h3>
      </div>
    </div>
  );
};

export default ProductNotFound;
