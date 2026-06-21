'use client';
import {useEffect, useState} from 'react';
import {FiX} from 'react-icons/fi';
import {useServerSideListFilter} from '@/hooks/useServerSideListFilter';
import {useFetchCategoriesQuery} from '@/redux/slices/categories/categoriesApi';
import SearchFilter from '@/layout/sidebar/filterSidebar/SearchFilter';
import CategoryCheck from '@/layout/sidebar/filterSidebar/CategoryFilter';
import Container from '@/components/shared/containers/Container';
import {QUERY_PARAMS} from '@/constants/queryParams';
import {useFetchProductsQuery} from '@/redux/slices/products/productsApi';
import PriceFilter from '@/layout/sidebar/filterSidebar/PriceFilter';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import ProductCardTemp from '@/components/shared/cards/ProductCardTemp';
import RatingFilter from '@/layout/sidebar/filterSidebar/RatingFilter';
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from '../ui/sheet';
import FiltersContent from '../shared/sheets/FiltersContent';
import {Button} from '../ui/button';

const ShopPage = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const [price, setPrice] = useState<number[]>([0, 30000]);

  const [ratings, setRatings] = useState<number[]>([]);

  const handleCheckboxChange = (categoryId: string) => {
    setCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleRatingChange = (selectedRating: number) => {
    setRatings((prev) =>
      prev.includes(selectedRating)
        ? prev.filter((r) => r !== selectedRating)
        : [...prev, selectedRating]
    );
  };

  const {filteredData: categoryList, isLoading: isCategoriesLoading} =
    useServerSideListFilter({
      queryToCall: useFetchCategoriesQuery,
      queryKey: 'categories',
      queryOptions: QUERY_PARAMS.category,
    });

  const {
    filteredData: productsList,
    isLoading: isProductsLoading,
    search,
    setSearch,
    handleSearch,
    setFilters,
    resetAllFilters,
  } = useServerSideListFilter({
    queryToCall: useFetchProductsQuery,
    queryKey: 'products',
    queryOptions: QUERY_PARAMS.shopProducts,
  });

  const isResetButtonShown =
    !!search || categories.length > 0 || price[0] !== 0 || ratings.length > 0;

  const filterProps = {
    isResetButtonShown,
    resetAllFilters,
    setCategories,
    setPrice,
    setRatings,
    search,
    setSearch,
    handleSearch,
    price,
    categoryList,
    isCategoriesLoading,
    categories,
    handleCheckboxChange,
    ratings,
    handleRatingChange,
  };

  useEffect(() => {
    setFilters({
      category: categories,
      minPrice: price[0],
      maxPrice: price[1],
      rating: ratings,
    });
  }, [categories, price, ratings]);

  return (
    <>
      <div className='flex-center w-full'>
        <Container>
          <div className='my-6 flex gap-6'>
            {/* Desktop sidebar */}
            <div className='hidden md:block w-[290px]'>
              <div className='flex flex-col gap-4 p-4 rounded-xl bg-gray-50 sticky top-7'>
                <h3 className='font-semibold text-gray-800'>Filter:</h3>

                {isResetButtonShown && (
                  <div>
                    <PrimaryButton
                      buttonText={
                        <span className='flex items-center gap-2'>
                          <FiX />
                          Reset Filters
                        </span>
                      }
                      className='rounded-md w-full bg-gray-800 hover:bg-accent'
                      handleClick={() => {
                        resetAllFilters();
                        setCategories([]);
                        setPrice([0, 30000]);
                        setRatings([]);
                      }}
                    />
                  </div>
                )}

                <SearchFilter
                  searchValue={search}
                  setSearchValue={setSearch}
                  handleSearch={handleSearch}
                />

                <PriceFilter
                  values={[price[0], price[1]]}
                  setValues={setPrice}
                />

                <CategoryCheck
                  categoryList={categoryList}
                  isCategoriesLoading={isCategoriesLoading}
                  categories={categories}
                  handleCheckboxChange={handleCheckboxChange}
                />

                <RatingFilter
                  ratings={ratings}
                  handleRatingChange={handleRatingChange}
                />
              </div>
            </div>

            <div className='flex-1'>
              {/* Mobile trigger */}
              <div className='md:hidden mb-4'>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant='outline' className='gap-2'>
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side='left'
                    className='w-[280px] overflow-y-auto'
                  >
                    <FiltersContent {...filterProps} />
                  </SheetContent>
                </Sheet>
              </div>

              <ProductCardTemp
                productsList={productsList}
                isProductsLoading={isProductsLoading}
                className={'md:grid-cols-3'}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ShopPage;
