import React from 'react';
import {
  FiCompass, FiHome, FiMenu, FiStar, FiTrendingUp
} from 'react-icons/fi';

export const SidebarData = [
  {
    title: 'Trang chủ',
    path: '/',
    icon: FiHome,
    cName: 'nav-text'
  },
  {
    title: 'Định giá công ty',
    path: '/company/VIC',
    icon: FiStar,
    cName: 'nav-text'
  },
  {
    title: 'Xếp hạng công ty',
    path: '/company-ranking',
    icon: FiTrendingUp,
    cName: 'nav-text'
  },
  {
    title: 'Về chúng tôi',
    path: '/xxx',
    icon: FiCompass,
    cName: 'nav-text'
  },
];
