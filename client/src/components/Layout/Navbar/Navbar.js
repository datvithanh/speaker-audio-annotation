import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NavbarStyle from './Navbar.style';
import Logo from '../../../static/img/logo-vbee.svg';
import LogoDescription from '../../../static/img/logo-description.svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <span className="welcome">
          Xin chào, <b>{user ? user.name : null}</b>
        </span>
        <NavLink activeClassName="active" to="/change-password">
          <span>Đổi mật khẩu</span>
        </NavLink>
        <Link className="logout" to="/login" onClick={logout}>
          <i className="fas fa-sign-out-alt" /> <span>Đăng xuất</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink activeClassName="active" to="/register">
          Đăng ký
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/login">
          Đăng nhập
        </NavLink>
      </li>
    </ul>
  );

  return (
    <NavbarStyle>
      <nav className="navbar1">
        <Link
          to={user && user.role === 0 ? '/' : '/team/competitions'}
          className="logo-vbee"
        >
          <img src={Logo} alt="VBEE" />
          <img
            className="logo-description"
            src={LogoDescription}
            alt="Vietnamese BE your Eyes"
          />
        </Link>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </NavbarStyle>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout },
)(Navbar);
