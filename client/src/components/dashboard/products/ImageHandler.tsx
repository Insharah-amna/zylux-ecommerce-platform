'use client';

import {ChangeEvent, useEffect} from 'react';
import {FiX} from 'react-icons/fi';
import {PreviewImage, SetImageProps} from '@/interfaces/products';

export default function ImageHandler({
  setValue,
  product = null,
  images,
  setImages,
}: SetImageProps) {
  useEffect(() => {
    if (product) {
      const loadedImages = product.imageUrls.map((img, index) => ({
        id: index,
        objectUrl: img,
      }));

      setImages(loadedImages);
      setValue('imageUrls', product.imageUrls);
    }
  }, [product]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: PreviewImage[] = [];

    files.forEach((file) => {
      const objectUrl = URL.createObjectURL(file);

      newImages.push({
        id: `${file.name}-${file.lastModified}`,
        objectUrl,
        file,
      });
    });

    setImages((prev) => [...prev, ...newImages]);

    setValue('files', files);

    e.target.value = '';
  };

  const handleRemove = (id: string) => {
    if (product) {
      setImages((prev) => {
        const updatedImages = prev.filter((img) => img.id !== Number(id));

        const newFiles = updatedImages
          .map((img) => img.file)
          .filter((file): file is File => file !== undefined);

        const newImageUrls = updatedImages
          .map((img) => (img.file ? undefined : img.objectUrl))
          .filter((url): url is string => !!url);

        setValue('files', newFiles);
        setValue('imageUrls', newImageUrls);

        return updatedImages;
      });
    } else {
      setImages((prev) => {
        const updatedImages = prev.filter((img) => img.id !== id);

        const newFiles = updatedImages
          .map((img) => img.file)
          .filter((file): file is File => file !== undefined);

        const newImageUrls = updatedImages
          .map((img) => (img.file ? undefined : img.objectUrl))
          .filter((url): url is string => !!url);

        setValue('files', newFiles);
        setValue('imageUrls', newImageUrls);

        return updatedImages;
      });
    }
  };

  return (
    <div className='py-2 w-full text-left flex flex-col gap-4'>
      <label>Select Image</label>
      <input
        type='file'
        multiple
        accept='image/*'
        onChange={handleFileChange}
        className='mb-2 px-4 py-2 border-[1px] border-zinc-300 rounded-sm cursor-pointer'
      />

      <div className='flex flex-wrap gap-4'>
        {images.map((img) => (
          <div key={img.id} className='relative w-32 h-32 group'>
            <img
              src={img.objectUrl}
              alt='preview'
              className='w-full h-full object-cover rounded shadow'
            />
            <button
              type='button'
              onClick={() => handleRemove(String(img.id))}
              className='absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex-center text-xs cursor-pointer'
              title='Remove'
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
