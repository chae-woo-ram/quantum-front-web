import { MenuItem } from './HeaderType';

// 메뉴 항목 데이터 정의
export const menuItems: MenuItem[] = [
  {
    id: 1,
    label: 'Gallery',
    href: '/gallery',
    submenu: [
      {
        Categories: [
          { label: 'Paintings', href: '/gallery/paintings' },
          { label: 'Sculptures', href: '/gallery/sculptures' },
          { label: 'Photographs', href: '/gallery/photographs' },
        ],
      },
      {
        Featured: [
          { label: 'Top Picks', href: '/gallery/featured/top-picks' },
          { label: 'New Arrivals', href: '/gallery/featured/new-arrivals' },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Exhibitions',
    href: '/exhibitions',
    submenu: [
      {
        'Current Exhibitions': [
          { label: 'Exhibition 1', href: '/exhibitions/current/exhibition-1' },
          { label: 'Exhibition 2', href: '/exhibitions/current/exhibition-2' },
        ],
      },
      {
        'Upcoming Exhibitions': [
          { label: 'Upcoming Exhibition 1', href: '/exhibitions/upcoming/exhibition-1' },
          { label: 'Upcoming Exhibition 2', href: '/exhibitions/upcoming/exhibition-2' },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Books',
    href: '/books',
    submenu: [
      {
        'Art Books': [
          { label: 'Art Book 1', href: '/books/art-book-1' },
          { label: 'Art Book 2', href: '/books/art-book-2' },
        ],
      },
      {
        'Photography Books': [
          { label: 'Photography Book 1', href: '/books/photography-book-1' },
          { label: 'Photography Book 2', href: '/books/photography-book-2' },
        ],
      },
    ],
  },
  {
    id: 4,
    label: 'Shop',
    href: '/shop',
    submenu: [
      {
        'Gallery Artworks': [
          { label: 'All Artworks', href: '/shop/artworks' },
          { label: 'Featured Artworks', href: '/shop/featured-artworks' },
          { label: 'Limited Editions', href: '/shop/limited-editions' },
        ],
      },
      {
        'Art Supplies': [
          { label: 'Painting Supplies', href: '/shop/painting-supplies' },
          { label: 'Drawing Supplies', href: '/shop/drawing-supplies' },
        ],
      },
    ],
  },
  {
    id: 5,
    label: 'Chat',
    href: '/chat',
  },
  {
    id: 6,
    label: 'Notice',
    href: '/notice',
  },
  {
    id: 7,
    label: 'Support',
    href: '/support',
  },
];
