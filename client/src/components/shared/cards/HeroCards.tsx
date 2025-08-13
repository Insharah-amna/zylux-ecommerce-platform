import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import Container from '@/components/shared/containers/Container';

const HeroCards = () => {
  return (
    <div className='flex-center w-full'>
      <Container>
        <div className='my-8 md:py-14 flex flex-col md:flex-row gap-6'>
          <div className='md:w-1/2'>
            <Card className='h-[600px] p-0 relative'>
              <Image
                src={'/images/card_1.webp'}
                alt={'autumn dress'}
                height={600}
                width={600}
                className={`h-full w-auto object-cover overflow-hidden rounded-md`}
              />
              <CardContent className='absolute h-full p-6 items-center md:items-start md:left-10 flex flex-col justify-evenly'>
                <span className='p-1 bg-white/70 rounded-md text-gray-800 text-center w-[90px]'>
                  {`POPULAR`}
                </span>

                <div className='flex flex-col gap-5'>
                  <CardTitle className='text-4xl font-semibold text-white'>
                    {'Top Fashion Deals'}
                  </CardTitle>

                  <CardDescription className='text-white text-lg'>
                    {'SAVE UP TO $99 OFF, GET CHANCE!'}
                  </CardDescription>
                </div>

                <PrimaryButton
                  buttonText={'Shop Now'}
                  className='h-[50px] rounded-full bg-black hover:bg-accent'
                />
              </CardContent>
            </Card>
          </div>

          <div className='md:w-1/2 flex flex-col gap-6'>
            <div className='flex gap-6 h-[288px]'>
              <Card className='p-0 relative w-1/2'>
                <Image
                  src={'/images/card_2.webp'}
                  alt={'glasses'}
                  height={600}
                  width={600}
                  className={`h-full w-auto object-cover overflow-hidden rounded-md`}
                />
                <CardContent className='absolute h-full p-6 left-1 md:left-3 flex flex-col justify-between'>
                  <div className='flex flex-col gap-2'>
                    <CardTitle className='text-xl md:text-2xl font-semibold text-primary'>
                      {'Trendy Eyewear'}
                    </CardTitle>
                  </div>

                  <Link
                    href={''}
                    className='text-sm md:text-lg hover:text-accent'
                  >
                    Shop Now
                  </Link>
                </CardContent>
              </Card>

              <Card className='p-0 relative w-1/2'>
                <Image
                  src={'/images/card_3.webp'}
                  alt={'sneakers'}
                  height={600}
                  width={600}
                  className={`h-full w-auto object-cover overflow-hidden rounded-md`}
                />
                <CardContent className='absolute h-full p-6 left-3 flex flex-col justify-between'>
                  <div className='flex flex-col gap-2'>
                    <CardTitle className='text-xl md:text-2xl font-semibold text-primary'>
                      {'Hottest Sneaker Trends'}
                    </CardTitle>
                  </div>

                  <Link
                    href={''}
                    className='text-sm md:text-lg hover:text-accent'
                  >
                    Shop Now
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className='h-[287px] p-0 relative'>
                <Image
                  src={'/images/card_4.webp'}
                  alt={'handbag'}
                  height={600}
                  width={600}
                  className={`h-[300px] w-auto object-cover overflow-hidden rounded-md`}
                />
                <CardContent className='absolute h-full p-6 left-6 flex flex-col justify-evenly'>
                  <div className='flex flex-col gap-5'>
                    <CardTitle className='text-xl md:text-3xl font-semibold text-primary'>
                      {'Fashionable Bags For Everyday'}
                    </CardTitle>

                    <CardDescription className='text-gray-800 text-sm md:text-md'>
                      {'SAVE UP TO $99 OFF, GET CHANCE!'}
                    </CardDescription>
                  </div>

                  <PrimaryButton
                    buttonText={'Shop Now'}
                    className='h-[35px] md:h-[50px] rounded-full bg-black hover:bg-accent'
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroCards;
