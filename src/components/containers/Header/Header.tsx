import React, { FC, ReactNode } from 'react';
import { StyledHeader } from './Header.sc';

interface Props {
  children: ReactNode;
}

const Header: FC<Props> = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
