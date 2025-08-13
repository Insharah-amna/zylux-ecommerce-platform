'use client';

import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import {PRODUCTS_TABLE_HEADER} from '@/constants/products';
import CustomTable from '@/components/shared/tables/CustomTable';
import {TableCell, TableRow} from '@/components/ui/table';
import ProductRow from './ProductRow';
import {ProductTableProps} from '@/interfaces/products';
import {Product} from '@/types/redux';
import {useServerSideListFilter} from '@/hooks/useServerSideListFilter';
import {useFetchProductsQuery} from '@/redux/slices/products/productsApi';
import {QUERY_PARAMS} from '@/constants/queryParams';
import TableSearchInput from '@/components/shared/inputs/TableSearchInput';

const ProductTable = ({
  setSelectedProduct,
  setIsFormOpen,
  setIsInfoOpen,
  setIsConfirmationOpen,
}: ProductTableProps) => {
  const {
    filteredData: productsList,
    isLoading: isProductsLoading,
    PaginationComponent,
    search,
    setSearch,
    handleSearch,
    resetAllFilters,
  } = useServerSideListFilter({
    queryToCall: useFetchProductsQuery,
    queryKey: 'products',
    queryOptions: QUERY_PARAMS.dashboardProducts,
  });

  const productsTableHeader = Object.values(PRODUCTS_TABLE_HEADER);

  if (isProductsLoading) return <ComponentLoader />;

  return (
    <>
      <div className='flex-end w-full'>
        <TableSearchInput
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          resetFilters={resetAllFilters}
          isResetButtonShown={!!search}
        />
      </div>

      <CustomTable
        tableHeaders={productsTableHeader}
        tableBody={
          <>
            {productsList.map((product: Product) => (
              <ProductRow
                product={product}
                setSelectedProduct={setSelectedProduct}
                setIsFormOpen={setIsFormOpen}
                setIsInfoOpen={setIsInfoOpen}
                setIsConfirmationOpen={setIsConfirmationOpen}
              />
            ))}
            {productsList.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className='w-full text-center py-4 text-gray-500'
                >
                  No products available.
                </TableCell>
              </TableRow>
            )}
          </>
        }
      />

      {PaginationComponent}
    </>
  );
};
export default ProductTable;
