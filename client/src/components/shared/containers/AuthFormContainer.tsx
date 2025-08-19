import {AuthFormContainerProps} from '@/interfaces/containers';

const AuthFormContainer = ({
  heading,
  children,
  handleSubmit,
  className = 'w-[95%] md:w-[500px]',
}: AuthFormContainerProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex-center flex-col gap-5 py-5 ${className}`}
    >
      <h1 className='text-4xl font-semibold'>{heading}</h1>
      {children}
    </form>
  );
};

export default AuthFormContainer;
