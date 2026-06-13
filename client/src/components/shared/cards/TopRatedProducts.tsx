'use client';
import Container from '@/components/shared/containers/Container';
import ProductCardTemp from './ProductCardTemp';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import {useFetchProductsQuery} from '@/redux/slices/products/productsApi';
import {useServerSideListFilter} from '@/hooks/useServerSideListFilter';
import {QUERY_PARAMS} from '@/constants/queryParams';

const TopRatedProducts = () => {
  const {filteredData: productsList, isLoading: isProductsLoading} =
    useServerSideListFilter({
      queryToCall: useFetchProductsQuery,
      queryKey: 'products',
      queryOptions: QUERY_PARAMS.topRatedProducts,
    });

  if (isProductsLoading) return <ComponentLoader />;

  return (
    <div className='flex-center w-full'>
      <Container>
        <div className='my-5 text-center'>
          <h1 className='text-3xl font-semibold text-left'>
            Top Rated Products
          </h1>

          <ProductCardTemp
            productsList={productsList}
            isProductsLoading={isProductsLoading}
            className='md:grid-cols-4'
          />
        </div>
      </Container>
    </div>
  );
};

export default TopRatedProducts;
