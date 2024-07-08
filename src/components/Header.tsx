'use client';

import Link from 'next/link';
import { styled } from 'styled-components';

export const Header = () => {
  return (
    <HeaderContainer>
      <nav>
        <NavList>
          <NavItem>
            <NavLink href="/home">gnb1</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">gnb2</NavLink>
          </NavItem>
        </NavList>
      </nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background: #333;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    color: red;
  }
`;
