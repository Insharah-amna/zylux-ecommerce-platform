import HeroCards from '@/components/shared/cards/HeroCards';
import ProductCards from '@/components/shared/cards/HeroProductCards';
import TopRatedProducts from '@/components/shared/cards/TopRatedProducts';
import HeroSwiper from '@/components/shared/swiper/HeroSwiper';
import Navbar from '@/layout/header/navbar';
import TopBar from '@/layout/header/topbar';

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <HeroSwiper />
      <HeroCards />
      <ProductCards />
      <TopRatedProducts />
    </>
  );
}
