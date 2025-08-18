import {FOOTER_URLS} from '@/utils/PATHS';

const QUICK_LINK_OPTIONS = {
  faq: {
    label: 'FAQ',
    url: FOOTER_URLS.quickLinks.faq,
  },
  storeLocation: {
    label: 'Find store location',
    url: FOOTER_URLS.quickLinks.storeLocation,
  },
  privacyPolicy: {
    label: 'Privacy Policy',
    url: FOOTER_URLS.quickLinks.privacyPolicy,
  },
  returnPolicy: {
    label: 'Return Policy',
    url: FOOTER_URLS.quickLinks.returnPolicy,
  },
  termsOfService: {
    label: 'Terms of Service',
    url: FOOTER_URLS.quickLinks.termsOfService,
  },
};

export const QUICK_LINKS = Object.values(QUICK_LINK_OPTIONS);

const COMPANY_OPTIONS = {
  wishlist: {
    label: 'Wishlist',
    url: FOOTER_URLS.companyOptions.wishlist,
  },
  myAccount: {
    label: 'My account',
    url: FOOTER_URLS.companyOptions.myAccount,
  },
  cart: {
    label: 'Cart',
    url: FOOTER_URLS.companyOptions.cart,
  },
  aboutUs: {
    label: 'About us',
    url: FOOTER_URLS.companyOptions.aboutUs,
  },
};

export const COMPANY_LINKS = Object.values(COMPANY_OPTIONS);
