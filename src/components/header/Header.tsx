'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { isSubMenuVisibleState } from '@/recoil/header/atom';
import { userState } from '@/recoil/user/atom';
import supabase from '@/app/utils/supabase/client';
import { Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { createGlobalStyle, styled } from 'styled-components';

// 서브메뉴 항목 데이터 타입 정의
interface SubMenuItem {
  label: string;
  href: string;
}

// 메뉴 항목 데이터 타입 정의
interface MenuItem {
  id: number;
  label: string;
  href: string;
  submenu?: {
    [key: string]: SubMenuItem[];
  }[];
}

// 메뉴 항목 데이터 정의
const menuItems: MenuItem[] = [
  {
    id: 1,
    label: 'Artists',
    href: '/artists',
    submenu: [
      {
        Shop: [
          { label: 'Shop The Latest', href: '/store' },
          { label: 'Mac', href: '/shop/buy-mac' },
          { label: 'iPad', href: '/shop/buy-ipad' },
          { label: 'iPone', href: '/shop/buy-iphone' },
        ],
      },
      {
        'Quick Links': [
          { label: 'Find a Store', href: '/retail' },
          { label: 'Apple Trade In', href: '/shop/trade-in' },
        ],
      },
      {
        'Shop Special Stores': [
          { label: 'Certified Refurbished', href: '/shop/refurbished' },
          { label: 'Business', href: '/retail/business/' },
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
    label: 'Notice',
    href: '/Notice',
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
    label: 'Books',
    href: '/books',
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

export const Header = () => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [navListWidth, setNavListWidth] = useState<number>(0);
  const navListRef = useRef<HTMLUListElement>(null);

  const [isSubMenuVisible, setSubMenuVisible] = useRecoilState(isSubMenuVisibleState);
  const [user, setUser] = useRecoilState(userState);

  const router = useRouter();

  const GlobalStyle = createGlobalStyle<{ isSubMenuVisible: boolean }>`
  /* body {
    ${({ isSubMenuVisible }) =>
      isSubMenuVisible &&
      `
      
    `}
  } */
`;

  const handleMouseEnter = useCallback((index: number) => {
    setActiveItemId(index);
    setIsHover(true);
    setTimeout(() => {
      setIsActive(true);
    }, 300);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTimeout(() => {
      setIsActive(false);
      setIsHover(false);
    }, 300);
  }, []);

  const subMenuAnimate = {
    enter: {
      visibility: 'visible' as const,
      height: 'auto',
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
    exit: {
      visibility: 'hidden' as const,
      height: 0,
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser({});
    router.push('/login');
  };

  useEffect(() => {
    if (navListRef.current) {
      setNavListWidth(navListRef.current.clientWidth);
    }
  }, [navListRef.current]);

  useEffect(() => {
    if (isHover && isActive) {
      setSubMenuVisible(true);
    } else {
      setSubMenuVisible(false);
    }
  }, [isHover, isActive, setSubMenuVisible]);

  return (
    <>
      <GlobalStyle isSubMenuVisible={isSubMenuVisible} />
      <HeaderContainer onMouseEnter={() => handleMouseEnter(null)} onMouseLeave={handleMouseLeave}>
        {/* 로고 */}
        <NavLink href="/">
          <Image src={'/images/favicon.png'} alt={'search icon'} width={100} height={30} />
        </NavLink>

        {/* 메뉴 */}
        <NavWrapper>
          <nav>
            <NavList ref={navListRef}>
              {menuItems?.map((item) => (
                <NavItem key={item.id} onMouseEnter={() => handleMouseEnter(item.id)}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                  <AnimatePresence>
                    {activeItemId === item.id && isHover && item.submenu?.length && (
                      <MotionSubMenu
                        initial={isActive ? 'enter' : 'exit'}
                        animate="enter"
                        exit="exit"
                        variants={subMenuAnimate}
                      >
                        <SubMenuItemWrapper width={navListWidth}>
                          {item.submenu?.map((subItem, subItemIdex: number) => (
                            <SubMenuItem key={subItemIdex}>
                              {Object.entries(subItem)?.map(([subItemKey, subItemList], subItemListIndex) => (
                                <SubMenuItemList key={subItemListIndex}>
                                  <h4>{subItemKey}</h4>
                                  {subItemList?.map((subItemListItem, subItemListItemIndex) => (
                                    <SubMenuItemListItem key={subItemListItemIndex} href={subItemListItem.href}>
                                      {subItemListItem.label}
                                    </SubMenuItemListItem>
                                  ))}
                                </SubMenuItemList>
                              ))}
                            </SubMenuItem>
                          ))}
                        </SubMenuItemWrapper>
                      </MotionSubMenu>
                    )}
                  </AnimatePresence>
                </NavItem>
              ))}
            </NavList>
          </nav>
        </NavWrapper>

        <RightWrapper>
          {/* 장바구니 */}
          <Image src={'/images/shoppingBag.png'} alt={'shopping bag icon'} width={20} height={20} />
          {/* 로그인 영역 */}
          {user?.id ? (
            <CustomButton onClick={handleLogout}>LOGOUT</CustomButton>
          ) : (
            <CustomButton href={'/login'}>LOGIN</CustomButton>
          )}
        </RightWrapper>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: black;
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  z-index: 10;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 35px;
  height: 48px;
  align-items: center;
`;

const NavWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 12px;

  &:hover {
    font-weight: bold;
  }
`;

const MotionSubMenu = styled(motion.ul)`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100vw;
  background: black;
  overflow: hidden;
  display: flex;
  justify-content: center;
  z-index: 10;
  padding: 40px;
`;

const SubMenuItemWrapper = styled.div<{ width: number }>`
  display: flex;
  gap: 70px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: ${({ width }) => width}px;
`;

const SubMenuItem = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child > ul > a {
    font-size: 24px;
  }
`;

const SubMenuItemList = styled.ul`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 13px;

  > h4 {
    color: gray;
    margin-bottom: 10px;
  }
`;

const SubMenuItemListItem = styled(Link)`
  padding: 5px 0;
`;

const RightWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const LoginWrapper = styled.div`
  color: white;
`;

export default Header;

const CustomButton = styled(Button)`
  &&.MuiButton-colorPrimary {
    font-size: 13px;
  }
`;
