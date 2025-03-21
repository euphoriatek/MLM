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
  //   id: 'servers',
  //   title: 'servers',
  //   type: 'item',
  //   url: '/admin/servers',
  //   icon: 'fa-solid fa-layer-group',
  // },
  // {
  //   id: 'admin_users',
  //   title: 'admin_users',
  //   type: 'item',
  //   url: '/admin/admin-users',
  //   icon: 'fa-solid fa-user',
  // },
  // {
  //   id: 're_gaykar_users',
  //   title: 're_gaykar_users',
  //   type: 'item',
  //   url: '/admin/users',
  //   icon: 'fa-solid fa-user-group',
  // },
  // {
  //   id: 'assigned_server',
  //   title: 'servers',
  //   type: 'item',
  //   url: '/admin/assigned_server',
  //   icon: 'ti ti-users',
  // },
  // {
  //   id: 'regaykar_users',
  //   title: 're_gaykar_users',
  //   type: 'item',
  //   url: '/admin/regaykar_users',
  //   icon: 'fa-solid fa-user-group',
  // },
  // {
  //   id: 'sales_agents',
  //   title: 'sales_agents',
  //   type: 'item',
  //   url: '/admin/list-sales-agents',
  //   icon: 'fa-solid fa-people-group',
  // },
  // {
  //   id: 'setting',
  //   title: 'setting',
  //   type: 'item',
  //   url: '/admin/settings',
  //   icon: 'ti ti-settings',
  // },
  {
    id: 'kyc-request',
    title: 'KYC Request',
    type: 'collapse',
    icon: 'fa-solid fa-book',
    children: [
      {
        id: 'new-request',
        title: 'New Request',
        type: 'item',
        url: '',
        breadcrumbs: false,
      },
      {
        id: 'reports',
        title: 'Reports',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
      }
    ],
  },
  {
    id: 'balance-request',
    title: 'Balance Request',
    type: 'collapse',
    icon: 'fa-solid fa-money-bill',
    children: [
      {
        id: 'new-request',
        title: 'New Request',
        type: 'item',
        url: '/admin/new_product',
        breadcrumbs: false,
      },
      {
        id: 'reports',
        title: 'Reports',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
      }
    ],
  },
  {
    id: 'members',
    title: 'Members',
    type: 'collapse',
    icon: 'fa-solid fa-user-group',
    children: [
      {
        id: 'seach-profile',
        title: 'Search Profile',
        type: 'item',
        url: '/admin/new_product',
        breadcrumbs: false,
      },
      {
        id: 'user-datewise',
        title: 'User Datewise',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
      },
      {
        id: 'tree-viwe',
        title: 'Tree View',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
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
        id: 'autopool-income ',
        title: 'Autopool Income ',
        type: 'item',
        url: '/admin/new_product',
        breadcrumbs: false,
      },
      {
        id: 'repurchase-income',
        title: 'Repurchase Income',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
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
        id: 'pending-withdrawals ',
        title: 'Pending Withdrawals',
        type: 'item',
        url: '/admin/new_product',
        breadcrumbs: false,
      },
      {
        id: 'paid-withdrawals',
        title: 'Paid Withdrawals',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
      },
      {
        id: 'wallets',
        title: 'Wallets',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
      },
      {
        id: 'add-wallet-balance',
        title: 'Add Wallet Balance',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
      },
      {
        id: 'remove-wallet-balance',
        title: 'Remove Wallet Balance',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
      },
      {
        id: 'wallet-report',
        title: 'Wallet Report',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
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
        breadcrumbs: false,
      },
      {
        id: 'orders',
        title: 'Orders',
        type: 'item',
        url: '/admin/orders',
        breadcrumbs: false,
      },
      {
        id: 'old_orders',
        title: 'Old Orders',
        type: 'item',
        url: '/admin/old_orders',
        breadcrumbs: false,
      },
      {
        id: 'product_list',
        title: 'Product List',
        type: 'item',
        url: '/admin/product_list',
        breadcrumbs: false,
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
