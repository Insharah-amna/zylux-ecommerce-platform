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
import Link from 'next/link';
import {PUBLIC_ROUTES} from '@/utils/PATHS';

const ProductCardTemp = ({
  productsList,
  isProductsLoading,
  className,
}: ProductCardsProps) => {
  const currency = useSelector(getCurrency);

  if (isProductsLoading) return <ComponentLoader />;

  if (productsList.length === 0) return <ProductNotFound />;

  return (
    <div className={`grid grid-cols-2 ${className} gap-6 my-10`}>
      {productsList?.map((product: Product) => (
        <div className='flex flex-col gap-2 relative' key={product._id}>
          <Card
            key={product._id}
            className='p-0 rounded-md h-[180px] sm:h-[400px] overflow-hidden cursor-pointer relative group transition-all duration-500'
          >
            <Link href={PUBLIC_ROUTES.singleProduct({_id: product._id})}>
              <Image
                src={product.imageUrls[0]}
                alt={`${product.name}`}
                fill
                sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                className=' bg-cover rounded-md transition-all transform hover:scale-[1.5]'
              />
            </Link>

            <HoverIcons product={product} />
          </Card>

          <CardTitle className='capitalize text-xs sm:text-sm md:text-lg line-clamp-2'>
            {product.name}
          </CardTitle>

          {product.discount > 0 ? (
            <CardDescription className='text-primary font-semibold text-xs sm:text-sm md:text-lg'>
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
            <CardDescription className='text-primary font-semibold text-xs sm:text-sm md:text-lg'>{`${currency.symbol} ${Number(
              getCurrencyConversion({
                price: product.price,
                currency: currency.label,
              })
            ).toLocaleString('en-IN')}`}</CardDescription>
          )}

          <ColorsPreview colorVariants={product.colorVariants} />

          <div className='flex-center'>
            <div className='w-[70px] sm:w-[100px]'>
              <RatingStar
                readOnly={true}
                rating={product.averageRating}
                width={100}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardTemp;
