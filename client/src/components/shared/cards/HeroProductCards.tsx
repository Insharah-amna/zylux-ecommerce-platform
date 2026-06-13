'use client';
import Link from 'next/link';
import {useFetchProductsQuery} from '@/redux/slices/products/productsApi';
import {useServerSideListFilter} from '@/hooks/useServerSideListFilter';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import {SHOP_ROOT} from '@/utils/PATHS';
import Container from '@/components/shared/containers/Container';
import {QUERY_PARAMS} from '@/constants/queryParams';
import ProductCardTemp from './ProductCardTemp';

const HeroProductCards = () => {
  const {filteredData: productsList, isLoading: isProductsLoading} =
    useServerSideListFilter({
      queryToCall: useFetchProductsQuery,
      queryKey: 'products',
      queryOptions: QUERY_PARAMS.homeProducts,
    });

  if (isProductsLoading) return <ComponentLoader />;

  return (
    <div className='flex-center w-full'>
      <Container>
        <div className='text-center mb-5'>
          <h1 className='text-3xl font-semibold mt-3'>Featured Collection</h1>

          <ProductCardTemp
            productsList={productsList}
            isProductsLoading={isProductsLoading}
            className='md:grid-cols-4'
          />

          <Link href={SHOP_ROOT}>
            <PrimaryButton
              buttonText='Load More'
              className='h-12 w-35 rounded-4xl font-mono border-1 border-gray-800 bg-white text-primary hover:bg-black hover:text-white transition-colors duration-300'
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HeroProductCards;
