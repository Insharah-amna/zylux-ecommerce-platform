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

export interface ProfileFormProps {
  setIsFormOpen: (data: any) => void;
}

export interface ImageFormProps {
  setIsFormOpen: (data: any) => void;
  setCroppedImage: (data: any) => void;
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface ImageCropperProps {
  croppedImage: string;
  setCroppedImage: (data: any) => void;
}

export interface CropperProps {
  imageSrc: string;
  setCroppedImage: (data: any) => void;
  setIsFormOpen: (data: any) => void;
}
