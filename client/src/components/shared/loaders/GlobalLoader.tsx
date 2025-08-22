import Loader from './SyncLoader';

const GlobalLoader = () => {
  return (
    <div className='min-h-screen w-full flex-center absolute top-0'>
      <Loader />
    </div>
  );
};

export default GlobalLoader;
