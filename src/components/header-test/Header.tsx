'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { styled } from 'styled-components';

// 메뉴 항목 데이터 정의
const menuItems = [
  { id: 1, label: 'Store', href: '/store', submenu: ['SubMenu 1', 'SubMenu 2'] },
  { id: 2, label: 'Mac', href: '/mac', submenu: ['Mac SubMenu 1', 'Mac SubMenu 2'] },
  { id: 3, label: 'iPad', href: '/ipad', submenu: ['iPad SubMenu 1', 'iPad SubMenu 2'] },
  { id: 4, label: 'iPhone', href: '/iphone', submenu: ['iPhone SubMenu 1', 'iPhone SubMenu 2'] },
  { id: 5, label: 'Watch', href: '/watch', submenu: ['Watch SubMenu 1', 'Watch SubMenu 2'] },
  { id: 6, label: 'AirPods', href: '/airpods', submenu: ['AirPods SubMenu 1', 'AirPods SubMenu 2'] },
  {
    id: 7,
    label: 'Entertainment',
    href: '/entertainment',
    submenu: ['Entertainment SubMenu 1', 'Entertainment SubMenu 2'],
  },
  { id: 8, label: 'Chat', href: '/chat', submenu: ['Chat SubMenu 1', 'Chat SubMenu 2'] },
  { id: 9, label: 'Support', href: '/support', submenu: ['Support SubMenu 1', 'Support SubMenu 2'] },
];

export const Header = () => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <HeaderContainer onMouseEnter={() => handleMouseEnter(null)} onMouseLeave={handleMouseLeave}>
      <nav>
        <NavList>
          <NavItem>
            <NavLink href="/">
              <Image src={'/images/favicon.png'} alt={'search icon'} width={20} height={20} />
            </NavLink>
          </NavItem>
          {menuItems.map((item) => (
            <NavItem key={item.id} onMouseEnter={() => handleMouseEnter(item.id)}>
              <NavLink href={item.href}>{item.label}</NavLink>
              <AnimatePresence>
                {activeItemId === item.id && isHover && (
                  <MotionSubMenu
                    initial={isActive ? 'enter' : 'exit'}
                    animate="enter"
                    exit="exit"
                    variants={subMenuAnimate}
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <SubMenuItem key={subIndex} href={`${item.href}/sub${subIndex + 1}`}>
                        {subItem}
                      </SubMenuItem>
                    ))}
                  </MotionSubMenu>
                )}
              </AnimatePresence>
            </NavItem>
          ))}
          <NavItem>
            <Image src={'/images/search.svg'} alt={'search icon'} width={20} height={20} />
          </NavItem>
        </NavList>
      </nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: relative;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 48px;
  align-items: center;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 12px;

  &:hover {
    font-weight: bold;
  }
`;

const MotionSubMenu = styled(motion.ul)`
  position: fixed;
  top: 48px;
  left: 0;
  width: 100vw;
  background: black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const SubMenuItem = styled(Link)`
  display: block;
  padding: 8px 16px;
  color: white;
  text-decoration: none;
  font-size: 12px;

  &:hover {
    background: #333;
  }
`;

export default Header;
