import Loader from './Loader';
import {ComponentLoaderProps} from '@/interfaces/loaders';

const ComponentLoader = ({height = 100}: ComponentLoaderProps) => {
  return (
    <div className={`h-[${height}px] flex-center w-full`}>
      <Loader size={18} />
    </div>
  );
};

export default ComponentLoader;
