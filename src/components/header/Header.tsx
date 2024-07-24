'use client';

import Image from 'next/image';
import Link from 'next/link';
import { keyframes, styled } from 'styled-components';

export const Header = () => {
  return (
    <HeaderContainer>
      <nav>
        <NavList>
          <NavItem>
            <NavLink href="/">
              <Image src={'/images/favicon.png'} alt={'search icon'} width={20} height={20} />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/store">Store</NavLink>
            <SubMenu>
              <SubMenuItem href="/store/sub1">SubMenu 1</SubMenuItem>
              <SubMenuItem href="/store/sub2">SubMenu 2</SubMenuItem>
            </SubMenu>
          </NavItem>
          <NavItem>
            <NavLink href="/mac">Mac</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/iPad">iPad</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/iPhone">iPhone</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/watch">watch</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/airPods">AirPods</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/entertainment">Entertainment</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/chat">Chat</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/support">Support</NavLink>
          </NavItem>
          <NavItem>
            <Image src={'/images/search.svg'} alt={'search icon'} width={20} height={20} />
          </NavItem>
        </NavList>
      </nav>
    </HeaderContainer>
  );
};

const dropdown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 300px;
    opacity: 1;
  }
`;

const dropdownReverse = keyframes`
  from {
    max-height: 300px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
`;

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
`;

const NavItem = styled.li`
  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }

  &:hover > ul {
    visibility: visible;
    max-height: 300px;
    opacity: 1;
    animation: ${dropdown} 0.3s ease-out forwards;
  }

  &:not(:hover) > ul {
    visibility: hidden;
    max-height: 0;
    opacity: 0;
    animation: ${dropdownReverse} 0.3s ease-out forwards;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 12px;

  &:hover {
    font-weight: bold;
  }
`;

const SubMenu = styled.ul`
  width: 100vw;
  visibility: visible;
  opacity: 1;
  position: absolute;
  top: 48px;
  left: 0;
  background: black;
  transition:
    opacity 0.3s,
    max-height 0.3s,
    visibility 0.3s;
`;

const SubMenuItem = styled(Link)`
  display: block;
  padding: 8px 16px;
  color: white;
  text-decoration: none;
  font-size: 12px;

  &:hover {
    background: black;
  }
`;

export default Header;
