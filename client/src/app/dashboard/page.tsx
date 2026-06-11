import {redirect} from 'next/navigation';
import {DASHBOARD_ROUTES} from '@/utils/PATHS';

export default function page() {
  redirect(DASHBOARD_ROUTES.categories);
}
