import {AuthFormContainerProps} from '@/interfaces/containers';

const AuthFormContainer = ({
  heading,
  children,
  handleSubmit,
}: AuthFormContainerProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className='w-[95%] md:w-[500px] flex-center flex-col gap-5 py-5'
    >
      <h1 className='text-4xl font-semibold'>{heading}</h1>
      {children}
    </form>
  );
};

export default AuthFormContainer;
