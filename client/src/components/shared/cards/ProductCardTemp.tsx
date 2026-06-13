import Image from 'next/image';
import {useSelector} from 'react-redux';
import {getCurrency} from '@/redux/slices/users/usersSlice';
import {Card, CardDescription, CardTitle} from '@/components/ui/card';
import {Product} from '@/types/redux';
import HoverIcons from './ProductCardHover';
import ColorsPreview from './PreviewColorVariants';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import {ProductCardsProps} from '@/interfaces/cards';
import ProductNotFound from './ProductNotFound';
import {getCurrencyConversion} from '@/utils/currencyUtils';
import {getDiscountedPrice} from '@/utils/discountedPrice';
import RatingStar from '@/components/shared/rating';

const ProductCardTemp = ({
  productsList,
  isProductsLoading,
  className,
}: ProductCardsProps) => {
  const currency = useSelector(getCurrency);

  if (isProductsLoading) return <ComponentLoader />;

  if (productsList.length === 0) return <ProductNotFound />;

  return (
    <div className={`grid grid-cols-1 ${className} gap-6 my-10`}>
      {productsList?.map((product: Product) => (
        <div className='flex flex-col gap-2 relative' key={product._id}>
          <Card
            key={product._id}
            className='p-0 rounded-md overflow-hidden cursor-pointer relative group transition-all duration-500'
          >
            <Image
              src={product.imageUrls[0]}
              alt={`${product.name}`}
              width={400}
              height={400}
              className='h-[400px] w-full bg-cover rounded-md transition-all transform hover:scale-[1.5]'
            />

            <HoverIcons product={product} />
          </Card>

          <CardTitle className='capitalize'>{product.name}</CardTitle>

          {product.discount > 0 ? (
            <CardDescription className='text-primary font-semibold'>
              {`${currency.symbol} `}

              <span className='line-through text-accent'>
                {Number(
                  getCurrencyConversion({
                    price: product.price,
                    currency: currency.label,
                  })
                ).toLocaleString('en-IN')}
              </span>

              <span>
                {` ${Number(
                  getDiscountedPrice({
                    unitPrice: product.price,
                    discount: product.discount,
                    currency: currency.label,
                  })
                ).toLocaleString('en-IN')}`}
              </span>
            </CardDescription>
          ) : (
            <CardDescription className='text-primary font-semibold'>{`${currency.symbol} ${Number(
              getCurrencyConversion({
                price: product.price,
                currency: currency.label,
              })
            ).toLocaleString('en-IN')}`}</CardDescription>
          )}

          <ColorsPreview colorVariants={product.colorVariants} />

          <div className='flex-center'>
            <RatingStar
              readOnly={true}
              rating={product.averageRating}
              width={100}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardTemp;
