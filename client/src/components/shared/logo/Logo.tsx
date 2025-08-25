import Link from 'next/link';
import Image from 'next/image';
import {LogoProps} from '@/interfaces/logo';
import {HOME_ROOT} from '@/utils/PATHS';

const Logo = ({
  height,
  width,
  responsiveHeight,
  responsiveWidth,
}: LogoProps) => {
  return (
    <Link href={HOME_ROOT}>
      <Image
        src='/images/shopease_logo.webp'
        alt='shopease logo'
        width={64}
        height={40}
        className={`${height} ${width} ${responsiveHeight} ${responsiveWidth} cursor-pointer`}
      />
    </Link>
  );
};

export default Logo;
