import type { NavItem } from '@core/types/navigation';

import { pages } from '@lib/constants/navigation';

export const questions: {
  packing: NavItem[],
  conservation: NavItem[],
  shipping: NavItem[],
} = {
  packing: [
    {
      text: { 
        id: '1',
      },
      path: undefined,
    },
    {
      text: { 
        id: '2',
      },
      path: undefined,
    },
    {
      text: { 
        id: '3',
      },
      path: `${pages.home.path}#advantages`,
    },
    {
      text: { 
        id: '4',
      },
      path: `${pages.home.path}#use`,
    },
    {
      text: { 
        id: '5',
      },
      path: pages.bags.path,
    },
    {
      text: { 
        id: '6',
      },
      path: undefined,
    },
    {
      text: { 
        id: '7',
      },
      path: pages.home.path,
    },
    {
      text: { 
        id: '8',
      },
      path: undefined,
    },
    {
      text: { 
        id: '9',
      },
      path: undefined,
    }
  ],
  conservation: [
    {
      text: { 
        id: '1',
      },
      path: `${pages.home.path}#conservation`,
    },
    {
      text: { 
        id: '2',
      },
      path: `${pages.home.path}#convervation`,
    },
    {
      text: { 
        id: '3',
      },
      path: `${pages.home.path}#conservation`,
    },
    {
      text: { 
        id: '4',
      },
      path: `${pages.home.path}#convervation`,
    },
    {
      text: { 
        id: '5',
      },
      path: `${pages.home.path}#convervation`,
    },
    {
      text: { 
        id: '6',
      },
      path: undefined,
    },
    {
      text: { 
        id: '7',
      },
      path: undefined,
    },
    {
      text: { 
        id: '8',
      },
      path: `${pages.home.path}#convervation`,
    },
    {
      text: { 
        id: '9',
      },
      path: undefined,
    },
    {
      text: { 
        id: '10',
      },
      path: `${pages.home.path}#convervation`,
    }
  ],
  shipping: [
    {
      text: { 
        id: '1',
      },
      path: pages.conditions.path,
    },
    {
      text: { 
        id: '2',
      },
      path: pages.orders.path,
    },
    {
      text: { 
        id: '3',
      },
      path: pages.conditions.path,
    },
  ],
};
