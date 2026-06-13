import {useState} from 'react';
import {ChromePicker, ColorResult} from 'react-color';
import {FiX} from 'react-icons/fi';
import {MultiColorPickerProps} from '@/interfaces/products';

export default function MultiColorPicker({
  name,
  selectedColors,
  setValue,
}: MultiColorPickerProps) {
  const [currentColor, setCurrentColor] = useState('#000000');

  const handleColorChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
  };

  const addColor = () => {
    if (!selectedColors.includes(currentColor)) {
      setValue(name, [...selectedColors, currentColor]);
    }
  };

  const removeColor = (colorToRemove: string) => {
    setValue(
      name,
      selectedColors.filter((c) => c !== colorToRemove)
    );
  };

  return (
    <div className='space-y-4 w-full '>
      <label>Colors</label>
      <div className='shadow-sm'>
        <ChromePicker
          color={currentColor}
          onChange={handleColorChange}
          styles={{
            default: {
              picker: {
                marginTop: '8px',
                width: '100%',
                boxShadow: 'none',
              },
            },
          }}
        />
      </div>

      <div className='flex-center'>
        <button
          type='button'
          onClick={addColor}
          className='bg-primary text-white px-4 py-2 rounded hover:bg-accent'
        >
          Add Color
        </button>
      </div>

      <div className='flex gap-2 text-wrap mt-4'>
        {selectedColors.map((color) => (
          <div key={color} className='relative'>
            <div
              className='w-8 h-8 rounded-sm border'
              style={{backgroundColor: color}}
              title={color}
            />
            <button
              type='button'
              onClick={() => removeColor(color)}
              className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs cursor-pointer'
            >
              <FiX className='text-center w-full' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
