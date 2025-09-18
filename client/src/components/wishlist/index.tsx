import {useState} from 'react';
import {useSelector} from 'react-redux';
import {InfoModal} from '@/components/shared/modals/InfoModal';
import {Product} from '@/types/redux';
import ProductInfo from '@/components/dashboard/products/ProductInfo';
import ProductCardTemp from '@/components/shared/cards/ProductCardTemp';
import {getWishlist} from '@/redux/slices/users/usersSlice';
import {extractProduct} from '@/utils/general';

const Wishlist = () => {
  const wishlist = useSelector(getWishlist);
  const productList = extractProduct({data: wishlist});

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const onClose = () => {
    setIsInfoOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className={`mx-auto min-h-[80vh] py-4`}>
      <h3 className='text-3xl font-semibold mb-6'>Wishlist</h3>

      <ProductCardTemp productsList={productList} className='grid-cols-4' />

      <InfoModal
        title={`Product Details`}
        content={
          selectedProduct
            ? [
                <ProductInfo
                  selectedProduct={selectedProduct}
                  onCancel={onClose}
                />,
              ]
            : []
        }
        isInfoOpen={isInfoOpen}
        setIsInfoOpen={() => setIsInfoOpen}
      />
    </div>
  );
};

export default Wishlist;
