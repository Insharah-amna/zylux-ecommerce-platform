import {ComponentType} from 'react';
import {IconType} from 'react-icons/lib';

export interface ProfileTabProps {
  profile: TabProps;
  orders: TabProps;
  wishlist: TabProps;
  cart: TabProps;
}
export interface TabProps {
  value: string;
  label: string;
  component: ComponentType;
  icon: IconType;
}
