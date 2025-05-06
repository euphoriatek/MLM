import { Injectable } from '@angular/core';
import { AdminCookiesService } from 'src/app/admin/services/admincookies.service';
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
    url: '/admin/dashboard/default',
    icon: 'fa-solid fa-server',
  },
  // {
  //   id: 'kyc-request',
  //   title: 'KYC Request',
  //   type: 'collapse',
  //   icon: 'fa-solid fa-book',
  //   children: [
  //     {
  //       id: 'new-request',
  //       title: 'New Request',
  //       type: 'item',
  //       url: '',
  //       breadcrumbs: true,
  //     },
  //     {
  //       id: 'reports',
  //       title: 'Reports',
  //       type: 'item',
  //       url: '/admin/orders',
  //       breadcrumbs: true,
  //     }
  //   ],
  // },
  // {
  //   id: 'balance-request',
  //   title: 'Balance Request',
  //   type: 'collapse',
  //   icon: 'fa-solid fa-money-bill',
  //   children: [
  //     {
  //       id: 'new-request',
  //       title: 'New Request',
  //       type: 'item',
  //       url: '/admin/new_product',
  //       breadcrumbs: true,
  //     },
  //     {
  //       id: 'reports',
  //       title: 'Reports',
  //       type: 'item',
  //       url: '/admin/orders',
  //       breadcrumbs: true,
  //     }
  //   ],
  // },
  {
    id: 'members',
    title: "Member's",
    type: 'collapse',
    icon: 'fa-solid fa-user-group',
    children: [
      // {
      //   id: 'seach-profile',
      //   title: 'Search Profile',
      //   type: 'item',
      //   url: '/admin/new_product',
      //   breadcrumbs: true,
      // },
      {
        id: 'members-list',
        title: "Member's List",
        type: 'item',
        url: '/admin/members-list',
        breadcrumbs: true,
      },
      {
        id: 'tree-viwe',
        title: 'Tree View',
        type: 'item',
        url: '/admin/tree-view',
        breadcrumbs: true,
      }
    ],
  },
  {
    id: 'earnings',
    title: 'Earnings',
    type: 'collapse',
    icon: 'fa-solid fa-chart-pie',
    children: [
      {
        id: 'level-income',
        title: 'Level Income',
        type: 'item',
        url: '/admin/level-income',
        target: false,
        breadcrumbs: true,
      }
    ],
  },
  {
    id: 'wallet',
    title: 'Wallet',
    type: 'collapse',
    icon: 'fa-solid fa-wallet',
    children: [
      {
        id: 'wallet-statement',
        title: 'Wallet Statement',
        type: 'item',
        url: '/admin/wallet-statement',
        target: false,
        breadcrumbs: true,
      },
      {
        id: 'pending-withdrawals ',
        title: 'Pending Withdrawals',
        type: 'item',
        url: '',
        breadcrumbs: true,
      },
      {
        id: 'paid-withdrawals',
        title: 'Paid Withdrawals',
        type: 'item',
        url: '',
        breadcrumbs: true,
      },
      {
        id: 'wallets',
        title: 'Wallets',
        type: 'item',
        url: '',
        breadcrumbs: true,
      },
      {
        id: 'add-wallet-balance',
        title: 'Add Wallet Balance',
        type: 'item',
        url: '',
        breadcrumbs: true,
      },
      {
        id: 'remove-wallet-balance',
        title: 'Remove Wallet Balance',
        type: 'item',
        url: '',
        breadcrumbs: true,
      },
      {
        id: 'wallet-report',
        title: 'Wallet Report',
        type: 'item',
        url: '',
        breadcrumbs: true,
      }
    ],
  },
  {
    id: 'e-commerce',
    title: 'E-commerce',
    type: 'collapse',
    icon: 'fa-solid fa-cart-shopping',
    children: [
      {
        id: 'new-product',
        title: 'New Product',
        type: 'item',
        url: '/admin/new_product',
        breadcrumbs: true,
      },
      {
        id: 'orders',
        title: 'Orders',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: true,
      },
      // {
      //   id: 'old_orders',
      //   title: 'Old Orders',
      //   type: 'item',
      //   url: '/admin/old_orders',
      //   breadcrumbs: true,
      // },
      {
        id: 'product_list',
        title: 'Product List',
        type: 'item',
        url: '/admin/product_list',
        breadcrumbs: true,
      }
    ],
  },
  {
    id: 'my-community',
    title: 'My Community',
    type: 'collapse',
    icon: 'fa-brands fa-stumbleupon-circle',
    children: [
      {
        id: 'transaction',
        title: 'Transactions',
        type: 'item',
        url: '/admin/transaction',
        target: false,
        breadcrumbs: true,
      },
      {
        id: 'commissions',
        title: 'Commissions',
        type: 'item',
        url: '/admin/commissions',
        target: false,
        breadcrumbs: true,
      },
      {
        id: 'payments',
        title: 'Payments',
        type: 'item',
        url: '/admin/payments',
        target: false,
        breadcrumbs: true,
      }
    ],
  },
  {
    id: 'Withdrawals',
    title: 'Withdrawals',
    type: 'collapse',
    icon: 'fa-solid fa-right-to-bracket',
    children: [
      {
        id: 'withdrawal-listing',
        title: 'Withdrawal Listing',
        type: 'item',
        url: '/admin/withdrawal-listing',
        target: false,
        breadcrumbs: true,
      },
    ],
  },
  {
    id: 'add-city',
    title: 'Add City',
    type: 'collapse',
    icon: 'fa-solid fa-city',
    children: [
      {
        id: 'add-city',
        title: 'add-city',
        type: 'item',
        url: '/admin/add-city',
        target: false,
        breadcrumbs: true,
      },
    ],
  },
];

@Injectable()
export class NavigationItem {
  AdminRole: string | undefined;
  constructor(public cookiesService:AdminCookiesService){
    this.AdminRole = this.cookiesService.getCookie('AdminUser')?.role;
  }
  get(role:any) {
    if (role === "admin") {
      return NavigationItems.filter(item => item.id !== 'servers' && item.id !== 'admin_users' && item.id !== 're_gaykar_users' && item.id !== 'setting');
    }
    if(role === "superadmin"){
      return NavigationItems.filter(item => item.id !== 'regaykar_users' && item.id !== 'assigned_server');
    }
    return NavigationItems;
  }
}
