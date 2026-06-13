import {ClipLoader} from 'react-spinners';

const ClipBtnLoader = ({size = 16, height = 16, color = 'white'}) => {
  return (
    <div className={`h-[${height}px] items-center flex-center`}>
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default ClipBtnLoader;
