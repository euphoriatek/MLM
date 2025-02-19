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
        id: 'my-profile',
        title: 'my-profile',
        type: 'item',
        url: '/my-profile',
        target: false,
        breadcrumbs: false,
      },
      {
        id: 'kyc',
        title: ' KYC',
        type: 'item',
        url: '/auth/kyc',
        target: true,
        breadcrumbs: false,
      },
      {
        id: 'security',
        title: ' Security',
        type: 'item',
        url: '/auth/Security',
        target: true,
        breadcrumbs: false,
      },
      {
        id: 'change-password-history',
        title: ' Change Password History',
        type: 'item',
        url: '/auth/change-password-history',
        target: true,
        breadcrumbs: false,
      },
    ],
  },

  {
    id: 'auth',
    title: 'Activation',
    type: 'collapse',
    icon: 'fa-solid fa-coins',
    children: [
      {
        id: 'package',
        title: 'Package',
        type: 'item',
        url: '/auth/package',
        target: true,
        breadcrumbs: false,
      },
      {
        id: 'package-history',
        title: 'Package History',
        type: 'item',
        url: '/auth/package-history',
        target: true,
        breadcrumbs: false,
      },
    ],
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
        url: '/auth/wallet-statement',
        target: true,
        breadcrumbs: false,
      },
      {
        id: 'bank-withdrawal-history',
        title: 'Bank Withdrawal History',
        type: 'item',
        url: '/auth/package-history',
        target: true,
        breadcrumbs: false,
      },
      {
        id: 'level-income',
        title: 'Level Income',
        type: 'item',
        url: '/auth/package-history',
        target: true,
        breadcrumbs: false,
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
        target: true,
        breadcrumbs: false,
      },
      {
        id: 'my-downline-list',
        title: 'My Downline List',
        type: 'item',
        url: '/auth/my-downline-list',
        target: true,
        breadcrumbs: false,
      },
      {
        id: 'level-tree',
        title: 'Level Tree',
        type: 'item',
        url: '/auth/level-tree',
        breadcrumbs: false,
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
        url: '/auth/bank-withdrawal',
        target: true,
        breadcrumbs: false,
      },
    ],
  },
  
  {
    id: 'help-desk',
    title: 'Help Desk',
    type: 'collapse',
    icon: 'fa-solid fa-circle-info',
    children: [
      {
        id: 'create-ticket',
        title: 'Create Ticket',
        type: 'item',
        url: '/auth/create-ticket',
        target: true,
        breadcrumbs: false,
      },

      {
        id: 'ticket-list',
        title: 'Ticket List',
        type: 'item',
        url: '/auth/ticket-list',
        target: true,
        breadcrumbs: false,
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
