'use client';
import {useEffect, useState} from 'react';
import {ProductPreviewIdProps} from '@/interfaces/shop';
import {useGetSingleProductQuery} from '@/redux/slices/products/productsApi';
import Container from '@/components/shared/containers/Container';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import ProductImage from './ProductImage';
import ProductColor from './ProductDetails';
import ProductQuantity from './ProductQuantity';
import ProductButtons from './ProductButtons';
import ProductDescription from './ProductDescription';
import Footer from '@/layout/footer';

const ProductPreview = ({productId}: ProductPreviewIdProps) => {
  const {data, isLoading} = useGetSingleProductQuery({_id: productId});

  const product = data?.body.product;

  const [showProductImage, setShowProductImage] = useState<string>(
    product?.imageUrls[0] ?? ''
  );

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colorVariants[0] as string
  );

  useEffect(() => {
    if (product?.imageUrls[0]) setShowProductImage(product?.imageUrls[0]);
    if (product?.colorVariants[0]) setSelectedColor(product?.colorVariants[0]);
  }, [product]);

  if (isLoading) return <ComponentLoader height={500} />;

  return (
    <>
      <div className='w-full flex-center'>
        <Container>
          {product && (
            <div className='flex-center min-h-screen gap-7 my-6 relative flex-col md:flex-row'>
              <ProductImage
                product={product}
                showProductImage={showProductImage}
                setShowProductImage={setShowProductImage}
              />

              <div className='flex flex-col gap-5 w-full md:w-1/2'>
                <ProductColor
                  product={product}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />

                <ProductQuantity
                  selectedQuantity={selectedQuantity}
                  setSelectedQuantity={setSelectedQuantity}
                />

                <ProductButtons product={product} quantity={selectedQuantity} />

                <ProductDescription product={product} />
              </div>
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ProductPreview;
