export default function getCroppedImg(
  imageSrc: string,
  crop: {x: number; y: number; width: number; height: number}
): Promise<{file: File; url: string}> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous'; // avoid CORS issues

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = crop.width;
      canvas.height = crop.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No 2D context'));
        return;
      }

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }

        const file = new File([blob], 'cropped.jpg', {type: 'image/webp'});
        const url = URL.createObjectURL(file);
        resolve({file, url});
      }, 'image/webp');
    };
  });
}
