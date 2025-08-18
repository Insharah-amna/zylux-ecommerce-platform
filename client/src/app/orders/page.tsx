import TopBar from '@/layout/header/topbar';
import Navbar from '@/layout/header/navbar';
import Orders from '@/components/orders';

export default function page() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Orders />
    </>
  );
}
