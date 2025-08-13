import Link from 'next/link';
import {SOCIAL_ICON_LINKS} from '@/constants/home';
import Container from '@/components/shared/containers/Container';
import {COMPANY_LINKS, QUICK_LINKS} from '@/constants/footer';

const Footer = () => {
  return (
    <div className='text-gray-500 flex-center flex-col bg-gray-50 mt-20'>
      <Container>
        <div className='flex justify-between flex-col md:flex-row text-sm py-10 border-b-1 border-gray-300'>
          <div className='px-2 w-full md:w-1/4'>
            <h2 className='text-primary text-lg font-semibold mb-3'>
              About Us
            </h2>
            <p className='leading-7'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              rem expedita accusamus cumque!
            </p>
            <div className='flex gap-4 my-5'>
              {SOCIAL_ICON_LINKS.map(({icon: Icon, value, url}) => (
                <Link
                  key={value}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-115 max-w-6 transition-transform duration-200 cursor-pointer'
                >
                  <Icon size={18} color='black' />
                </Link>
              ))}
            </div>
          </div>
          <div className='px-2 mb-3 w-full md:w-1/4'>
            <h2 className='text-primary text-lg font-semibold mb-3'>
              Quick Links
            </h2>
            <ul className='leading-8'>
              {QUICK_LINKS.map(({label, url}) => (
                <li className='hover:text-gray-800 cursor-pointer' key={url}>
                  <Link href={url}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='px-2 mb-3 w-full md:w-1/4'>
            <h2 className='text-primary text-lg font-semibold mb-3'>Company</h2>
            <ul className='leading-8 cursor-pointer'>
              {COMPANY_LINKS.map(({label, url}) => (
                <li className='hover:text-gray-800 cursor-pointer' key={url}>
                  <Link href={url}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='px-2 mb-3 w-full md:w-1/4'>
            <h2 className='text-primary text-lg font-semibold mb-3'>Address</h2>
            <p className='leading-7'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam.
            </p>
          </div>
        </div>
        <div className='flex-center'>
          <p className='my-7'>&copy; 2025, Powered by HookThemes</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
