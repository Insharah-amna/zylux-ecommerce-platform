import ProductPreview from '@/components/shop/ProductPreview';
import {PageParamProps} from '@/interfaces/common';
import Navbar from '@/layout/header/navbar';
import TopBar from '@/layout/header/topbar';

export default async function page({params}: PageParamProps) {
  const {id} = await params;

  return (
    <>
      <TopBar />
      <Navbar />
      <ProductPreview productId={id} />
    </>
  );
}
