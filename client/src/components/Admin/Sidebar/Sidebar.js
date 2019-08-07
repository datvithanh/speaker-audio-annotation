import React from 'react';
import SidebarStyle from './Sidebar.style';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <SidebarStyle>
      <ul>
        <li>
          <Link to="/admin/create-test">Tạo bài test</Link>
        </li>
        <li>
          <Link to="/admin/test-management">Quản lý bài test</Link>
        </li>
        <li>
          <Link to="/admin/user-management">Quản lý user</Link>
        </li>
      </ul>
    </SidebarStyle>
  );
};

export default Sidebar;
