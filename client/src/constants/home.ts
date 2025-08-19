import {NAVBAR_URLS} from '@/utils/PATHS';
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa';

const SOCIAL_ICONS = {
  facebook: {
    icon: FaFacebook,
    url: '',
    value: 'facebook',
  },
  instagram: {
    icon: FaInstagram,
    url: '',
    value: 'instagram',
  },
  linkedin: {
    icon: FaLinkedin,
    url: '',
    value: 'linkedin',
  },
  twitter: {
    icon: FaTwitter,
    url: '',
    value: 'twitter',
  },
};

export const SOCIAL_ICON_LINKS = Object.values(SOCIAL_ICONS);

const HOME_PAGE_SWIPER_CONTENT = {
  slide1: {
    value: 'text1',
    label: 'Welcome to our store',
  },
  slide2: {
    value: 'text2',
    label: 'Thank you for visiting',
  },
};
export const HOME_SWIPER_CONTENT = Object.values(HOME_PAGE_SWIPER_CONTENT);

export const DOLLARRATE = 274;
export const EURORATE = 332;

export const CURRENCIES = {
  pk: {
    value: 'pk',
    symbol: 'Rs',
    label: 'PKR',
    country: 'Pakistan',
    currency: 1,
  },
  us: {
    value: 'usd',
    symbol: '$',
    label: 'USD',
    country: 'United States',
    currency: DOLLARRATE,
  },
  eu: {
    value: 'eur',
    symbol: '€',
    label: 'EUR',
    country: 'European Union',
    currency: EURORATE,
  },
};

export const CURRENCY_ARRAY = Object.values(CURRENCIES);

const NAVBAR_PATH_LINKS = {
  home: {
    label: 'Home',
    path: NAVBAR_URLS.home,
  },
  shop: {
    label: 'Shop',
    path: NAVBAR_URLS.shop,
  },
  blog: {
    label: 'Blog',
    path: NAVBAR_URLS.blog,
  },
};

export const NAVBAR_PATHS = Object.values(NAVBAR_PATH_LINKS);

export const HERO_SLIDE_CONTENT = {
  slide1: {
    title: 'Women Winter Trend Style',
    description: 'Introducing the Ambaz women winter fashion',
    button: {
      text: 'Shop Collection',
      url: '',
    },
    image: {
      src: '/images/image_1.webp',
      alt: 'image1',
    },
  },
  slide2: {
    title: 'Discover Premium Products',
    description: 'Shop the best collections at unbeatable prices',
    button: {
      text: 'Shop Now',
      url: '',
    },
    image: {
      src: '/images/image_2.webp',
      alt: 'image2',
    },
  },
  slide3: {
    title: 'Winter Collection 2025',
    description: 'Explore vibrant colors and breathable fabrics',
    button: {
      text: 'Explore',
      url: '',
    },
    image: {
      src: '/images/image_3.webp',
      alt: 'image3',
    },
  },
};

export const HERO_SWIPER_CONTENT = Object.values(HERO_SLIDE_CONTENT);
