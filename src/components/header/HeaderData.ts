import { MenuItem } from './HeaderType';

// 메뉴 항목 데이터 정의
export const menuItems: MenuItem[] = [
  {
    id: 1,
    label: 'Gallery',
    href: '/gallery',
  },
  {
    id: 2,
    label: 'Exhibitions',
    href: '/exhibitions',
  },
  {
    id: 3,
    label: 'Shop',
    href: '/shop',
    submenu: [
      {
        'Explore iPad': [
          { label: 'Explore All iPad', href: '/ipad' },
          { label: 'iPad Pro', href: '/' },
          { label: 'iPad Air', href: '/' },
          { label: 'iPad mini', href: '/' },
        ],
      },
      {
        'Shop iPad': [
          { label: 'Shop iPad', href: '/' },
          { label: 'iPad Accessories', href: '/' },
        ],
      },
    ],
  },
  {
    id: 4,
    label: 'Books',
    href: '/books',
    submenu: [
      {
        'Explore iPhone': [
          { label: 'Explore All iPhone', href: '/iphone' },
          { label: 'iPhone15', href: '/' },
          { label: 'iPhone14', href: '/' },
        ],
      },
      {
        'Shop iPhone': [
          { label: 'Shop iPhone', href: '/' },
          { label: 'iPhone Accessories', href: '/' },
        ],
      },
    ],
  },
  {
    id: 6,
    label: 'Favorites',
    href: '/favorites',
    submenu: [
      {
        'Favorites ': [{ label: '즐겨찾기한 작품', href: '/favorites' }],
      },
      {
        'Purchase Inquiry ': [{ label: '구매요청 이력', href: '/watch' }],
      },
    ],
  },
  { id: 7, label: 'Chat', href: '/chat' },
  {
    id: 8,
    label: 'Support',
    href: '/notice',
    submenu: [
      {
        Notice: [
          { label: '공지사항', href: '/notice' },
          { label: '자주 묻는 질문들', href: '/' },
        ],
      },
    ],
  },
];
