import {FiAlertTriangle} from 'react-icons/fi';

const ProductDeleteConfirmation = () => {
  return (
    <>
      <div className='pb-3 flex-center flex-col gap-3'>
        <div className='bg-red-100 rounded-full p-4'>
          <FiAlertTriangle color='red' size={30} />
        </div>
        <h2 className='font-semibold text-2xl'>Are You Sure?</h2>
      </div>
      <div className='p-4 text-center'>
        <p>
          The product will be deleted permanently. This action cannot be undone.
        </p>
      </div>
    </>
  );
};

export default ProductDeleteConfirmation;
