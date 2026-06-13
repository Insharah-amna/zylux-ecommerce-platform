import {ContainerProps} from '@/interfaces/containers';

const Container = ({children}: ContainerProps) => {
  return <div className='w-full max-w-[1440px] px-6'>{children}</div>;
};

export default Container;
