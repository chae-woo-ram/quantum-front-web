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
    submenu: [
      {
        'Explore Mac': [
          { label: 'Explore All Mac', href: '/mac' },
          { label: 'iMac', href: '/' },
        ],
      },
      {
        'Shop Mac': [
          { label: 'Shop Mac', href: '/' },
          { label: 'Help Me Choose', href: '/' },
        ],
      },
      {
        'More From Mac': [{ label: 'Mac Support', href: '/' }],
      },
    ],
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
    label: 'News',
    href: '/news',
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
    id: 5,
    label: 'Notice',
    href: '/notice',
    submenu: [
      {
        'Explore Watch': [
          { label: 'Explore All Apple Watch', href: '/watch' },
          { label: 'Apple Watch Series 9', href: '/' },
          { label: 'Apple Watch Ultra 2', href: '/' },
          { label: 'Apple Watch SE', href: '/' },
          { label: 'Apple Watch NIKE', href: '/' },
        ],
      },
      {
        'Shop Watch': [
          { label: 'Shop Apple Watch', href: '/' },
          { label: 'Apple Watch Studio', href: '/' },
        ],
      },
      {
        'More from Watch': [
          { label: 'Apple Watch Support', href: '/' },
          { label: 'AppleCare+', href: '/' },
        ],
      },
    ],
  },
  {
    id: 6,
    label: 'Gallery',
    href: '/gallery',
    submenu: [
      {
        'Explore AirPods': [
          { label: 'Explore All AirPods', href: '/watch' },
          { label: 'AirPods Pro 2nd generation', href: '/' },
          { label: 'AirPods 2nd generation', href: '/' },
          { label: 'AirPods 3rd generation', href: '/' },
        ],
      },
      {
        'Shop AirPods': [{ label: 'Shop AirPods', href: '/' }],
      },
      {
        'More from AirPods': [{ label: 'AirPods Support', href: '/' }],
      },
    ],
  },
  { id: 7, label: 'Chat', href: '/chat' },
  { id: 8, label: 'Support', href: '/support' },
];
