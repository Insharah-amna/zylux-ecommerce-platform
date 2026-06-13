import {ColorPreviewProps} from '@/interfaces/cards';

const ColorsPreview = ({colorVariants}: ColorPreviewProps) => {
  return (
    <div className='flex-center gap-2'>
      {colorVariants.slice(0, 3).map((color: string) => (
        <div
          key={color}
          className='w-4 h-4 rounded-full cursor-pointer border'
          style={{backgroundColor: color}}
          title={color}
        />
      ))}

      {colorVariants.length > 3 && (
        <div className='w-4 h-4 flex items-center justify-center'>
          +{colorVariants.length - 3}
        </div>
      )}
    </div>
  );
};

export default ColorsPreview;
