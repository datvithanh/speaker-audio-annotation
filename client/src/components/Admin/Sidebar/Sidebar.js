import React from 'react';
import SidebarStyle from './Sidebar.style';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <SidebarStyle>
      <ul>
        <li>
          <NavLink activeClassName="active" to="/admin/create-test">
            Tạo bài test
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/test-management">
            Quản lý bài test
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/user-management">
            Quản lý user
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/voice-management">
            Quản lý voice
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/data-management">
            Quản lý dữ liệu training
          </NavLink>
        </li>
      </ul>
    </SidebarStyle>
  );
};

export default Sidebar;
