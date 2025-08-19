'use client';

import * as Slider from '@radix-ui/react-slider';
import {PriceFilterProps} from '@/interfaces/shop';

const PriceFilter = ({values, setValues}: PriceFilterProps) => {
  return (
    <div className='flex flex-col justify-between hover:text-gray-800'>
      <div className='flex justify-between h-[40px] cursor-pointer hover:underline'>
        <h3 className='font-semibold pt-3 text-gray-600'>Price:</h3>
      </div>

      <div className='my-5 flex flex-col gap-4'>
        <div className='w-[250px]'>
          <Slider.Root
            className='relative flex items-center select-none touch-none w-full h-5'
            min={0}
            max={30000}
            step={100}
            value={values}
            onValueChange={(val) => setValues(val as [number, number])}
          >
            <Slider.Track className='bg-gray-200 relative grow rounded-full h-[4px]'>
              <Slider.Range className='absolute bg-black rounded-full h-full' />
            </Slider.Track>
            <Slider.Thumb className='block w-4 h-4 bg-black rounded-full' />
            <Slider.Thumb className='block w-4 h-4 bg-black rounded-full' />
          </Slider.Root>
          <div className='mt-4 text-sm text-gray-700'>
            Selected range: {values[0]} - {values[1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
