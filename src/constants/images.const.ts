import { IImageTag } from 'interfaces/image-tag.interface';
import { SITE_PAGES } from './pages.const';

export const IMAGES: IImageTag[] = [
  {
    _id: 'Ho_Chi_Minh',
    title: 'Ho Chi Minh city',
    path: '/images/locations/hochiminh.jpg',
    href: SITE_PAGES.LIST_OF_ROOMS.path + '/Ho_Chi_Minh',
  },
  {
    _id: 'Ha_Noi',
    title: 'Ha Noi capital',
    path: '/images/locations/hanoi.jpg',
    href: SITE_PAGES.LIST_OF_ROOMS.path + '/Ha_Noi',
  },
  {
    _id: 'Ha_Long',
    title: 'Ha Long Bay',
    path: '/images/locations/halong.jpg',
    href: SITE_PAGES.LIST_OF_ROOMS.path + '/Ha_Long',
  },
  {
    _id: 'Da_Lat',
    title: 'Da Lat city',
    path: '/images/locations/dalat.jpg',
    href: SITE_PAGES.LIST_OF_ROOMS.path + '/Da_Lat',
  },
  {
    _id: 'Da_Nang',
    title: 'Da Nang',
    path: '/images/locations/danang.jpg',
    href: SITE_PAGES.LIST_OF_ROOMS.path + '/Da_Nang',
  },
  {
    _id: 'Hoi_An',
    title: 'Hoi An',
    path: '/images/locations/hoian.jpg',
    href: SITE_PAGES.LIST_OF_ROOMS.path + '/Hoi_An',
  },
  {
    _id: 'Hue',
    title: 'Hue',
    path: '/images/locations/hue.jpg',
    href: SITE_PAGES.LIST_OF_ROOMS.path + '/Hue',
  },
];

export const GIFTS: IImageTag[] = [
  { _id: 'gift1', path: '/images/gifts/gift1.jpg' },
  { _id: 'gift2', path: '/images/gifts/gift2.jpg' },
  { _id: 'gift3', path: '/images/gifts/gift3.jpg' },
  { _id: 'gift4', path: '/images/gifts/gift4.jpg' },
  { _id: 'gift5', path: '/images/gifts/gift5.jpg' },
];

export const ROOMS: IImageTag[] = [
  { _id: 'homestay1', path: '/images/homestays/homestay1.jpg' },
  { _id: 'homestay2', path: '/images/homestays/homestay2.jpg' },
  { _id: 'homestay3', path: '/images/homestays/homestay3.jpg' },
  { _id: 'homestay4', path: '/images/homestays/homestay4.jpg' },
  { _id: 'homestay5', path: '/images/homestays/homestay5.jpg' },
  { _id: 'homestay6', path: '/images/homestays/homestay6.jpg' },
];
