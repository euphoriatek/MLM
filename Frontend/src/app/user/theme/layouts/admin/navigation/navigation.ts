import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'dashboard',
    title: 'dashboard',
    type: 'item',
    url: '/dashboard/default',
    icon: 'fa-solid fa-house',
  },

  {
    id: 'auths',
    title: 'My Account',
    type: 'collapse',
    icon: 'fa-solid fa-gear',
    children: [
      {
        id: 'profile',
        title: 'Profile',
        type: 'item',
        url: '/profile',
        target: false,
        breadcrumbs: true,
      },
      {
        id: 'kyc',
        title: ' KYC',
        type: 'item',
        url: '/create-kyc',
        target: false,
        breadcrumbs: true,
      },
      {
        id: 'security',
        title: ' Security',
        type: 'item',
        url: '/security',
        target: false,
        breadcrumbs: true,
      },
      // {
      //   id: 'change-password-history',
      //   title: ' Change Password History',
      //   type: 'item',
      //   url: '/change-password-history',
      //   target: false,
      //   breadcrumbs: false,
      // },
    ],
  },

  {
    id: 'auth',
    title: 'Activation',
    type: 'item',
    icon: 'fa-solid fa-coins',
    url: '/activation'
    // children: [
    //   {
    //     id: 'package',
    //     title: 'Package',
    //     type: 'item',
    //     url: '/activation',
    //     target: false,
    //     breadcrumbs: false,
    //   },
    //   // {
    //   //   id: 'package-history',
    //   //   title: 'Package History',
    //   //   type: 'item',
    //   //   url: '/package-history',
    //   //   target: false,
    //   //   breadcrumbs: false,
    //   // },
    // ],
  },

  {
    id: 'earning-wallet',
    title: 'Earning Wallet',
    type: 'collapse',
    icon: 'fa-solid fa-gem',
    children: [
      {
        id: 'wallet-statement',
        title: 'Wallet Statement',
        type: 'item',
        url: '/wallet-statement',
        target: false,
        breadcrumbs: true,
      },
      {
        id: 'bank-withdrawal-history',
        title: 'Withdrawal History',
        type: 'item',
        url: '/bank-withdrawal-history',
        target: false,
        breadcrumbs: true,
      },
      {
        id: 'level-income',
        title: 'Level Income',
        type: 'item',
        url: '/level-income',
        target: false,
        breadcrumbs: true,
      },
    ],
  },

  {
    id: 'my-community',
    title: 'My Community',
    type: 'collapse',
    icon: 'fa-brands fa-stumbleupon-circle',
    children: [
      {
        id: 'direct-referral-list',
        title: 'Direct Referral List',
        type: 'item',
        url: '/auth/direct-referral-list',
        target: false,
        breadcrumbs: true,
      },
      {
        id: 'my-downline-list',
        title: 'My Downline List',
        type: 'item',
        url: '/auth/my-downline-list',
        target: false,
        breadcrumbs: true,
      },
      {
        id: 'level-tree',
        title: 'Level Tree',
        type: 'item',
        url: '/auth/level-tree',
        breadcrumbs: true,
      },
    ],
  },

  {
    id: 'auth',
    title: 'Withdrawal',
    type: 'collapse',
    icon: 'fa-solid fa-right-to-bracket',
    children: [
      {
        id: 'bank-withdrawal',
        title: 'Bank Withdrawal',
        type: 'item',
        url: '/bank-withdrawal',
        target: false,
        breadcrumbs: false,
      },
    ],
  },
  {
    id: 'Profit Level',
    title: 'Profit Level',
    type: 'item',
    url: '/profit-level',
    icon: 'fa-solid fa-house',
  },
  {
    id: 'order',
    title: 'Track Your Order',
    type: 'item',
    icon: 'fa-solid fa-shipping-fast',
    url: '/track-order'
  },
  {
    id: 'help-desk',
    title: 'Help Desk',
    type: 'collapse',
    icon: 'fa-solid fa-circle-info',
    children: [
      {
        id: 'help-desk',
        title: 'Help',
        type: 'item',
        url: '/help-desk',
        breadcrumbs:true,
      },
    ],
  },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
