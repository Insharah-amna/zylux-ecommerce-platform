import TopBar from '@/layout/header/topbar';
import Navbar from '@/layout/header/navbar';
import Cart from '@/components/cart';

export default function page() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Cart />
    </>
  );
}
