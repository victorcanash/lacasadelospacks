import type { NavItem } from '@core/types/navigation';

import { pages } from 'lib/constants/navigation';

const blogsConfig: NavItem[] = [
  {
    text: { 
      id: 'home.intro.title',
    },
    path: pages.vacuumBlog.path,
  },
  {
    text: { 
      id: 'cbdBlog.h1',
    },
    path: pages.cbdBlog.path,
  },
];

export default blogsConfig;