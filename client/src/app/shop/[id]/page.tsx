import ProductPreview from '@/components/shop/ProductPreview';
import {ProductPreviewParamProps} from '@/interfaces/shop';
import Navbar from '@/layout/header/navbar';
import TopBar from '@/layout/header/topbar';

export default async function page({params}: ProductPreviewParamProps) {
  const {id} = await params;

  return (
    <>
      <TopBar />
      <Navbar />
      <ProductPreview productId={id} />
    </>
  );
}
