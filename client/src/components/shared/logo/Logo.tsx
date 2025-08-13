import Image from 'next/image';
import {LogoProps} from '@/interfaces/logo';

const Logo = ({
  height,
  width,
  responsiveHeight,
  responsiveWidth,
}: LogoProps) => {
  return (
    <Image
      src='/images/shopease_logo.webp'
      alt='shopease logo'
      width={64}
      height={40}
      className={`${height} ${width} ${responsiveHeight} ${responsiveWidth} cursor-pointer`}
    />
  );
};

export default Logo;
