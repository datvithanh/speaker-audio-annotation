import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import LayoutStyle from './LayoutStyle';

const Layout = ({ children }) => {
  return (
    <LayoutStyle>
      <Sidebar className="menu" />
      <div className="main">{children}</div>
    </LayoutStyle>
  );
};

export default Layout;
