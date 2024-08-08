'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { favoritesState } from '@/recoil/favorites/atom';
import { userState } from '@/recoil/user/atom';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Avatar, Badge, BadgeProps, Button, IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { styled } from 'styled-components';
import { menuItems } from './HeaderData';
import ProfileModal from './ProfileModal';

export const Header = () => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [navListWidth, setNavListWidth] = useState<number>(0);
  const navListRef = useRef<HTMLUListElement>(null);
  const [modalOpen, setModalOpen] = useState(false); // 프로필 모달

  const favorites = useRecoilValue(favoritesState); // 즐겨찾기
  const [user, setUser] = useRecoilState(userState);

  const router = useRouter();

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

  const handleFavorites = () => {
    router.push('/favorites');
  };

  useEffect(() => {
    if (navListRef.current) {
      setNavListWidth(navListRef.current.clientWidth);
    }
  }, [navListRef.current]);

  return (
    <>
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
                  <NavLink href={item.href} onClick={handleMouseLeave}>
                    {item.label} {item.submenu?.length > 0 && <KeyboardArrowDownIcon />}
                  </NavLink>
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
          <IconButton aria-label="cart" onClick={handleFavorites}>
            <Badge color="error" badgeContent={favorites?.length}>
              <ThumbUpAltOutlinedIcon color="secondary" />
            </Badge>
          </IconButton>

          {/* 로그인 영역 */}
          {user?.id ? (
            <>
              <Avatar
                src={user.user_metadata.avatar_url}
                sx={{ width: 24, height: 24 }}
                onClick={() => setModalOpen(true)}
              />
              {/* 프로필 모달 */}
              <ProfileModal open={modalOpen} onClose={() => setModalOpen(false)} />
            </>
          ) : (
            <CustomButton href={'/login'}>LOGIN</CustomButton>
          )}
        </RightWrapper>
      </HeaderContainer>
    </>
  );
};

export default Header;

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
  display: flex;
  align-items: center;
  && svg {
    font-size: 20px;
  }
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

const CustomButton = styled(Button)`
  &&.MuiButton-colorPrimary {
    font-size: 13px;
  }
`;

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
