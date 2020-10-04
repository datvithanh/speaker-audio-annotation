import styled from 'styled-components';

const NavbarStyle = styled.div`
  background-color: white;
  color: black;

  .navbar1 {
    display: flex;
    box-shadow: rgb(221, 221, 221) 0px 0px 8px 2px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
    background-color: #0b6398;
    height: 70px;
    color: white;
  }

  .welcome {
    padding: 10px;
  }

  .logo-vbee {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }

  .logo-vbee .logo-description {
    padding-left: 0.7em;
    width: 130px;
  }

  img {
    width: 100px;
    height: auto;
  }

  ul {
    display: flex;
    margin: 0 0 0 auto;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
  }

  ul a {
    text-decoration: none;
    color: white;
    display: block;
    width: 145px;
    text-align: center;
    margin-left: 2px;
    padding: 9px;
    font-size: 18px;
  }

  .active,
  a:hover {
    background-color: #bfd8ea;
    color: black;
  }

  .logo-vbee:hover {
    background: #0b6398;
  }

  .logo:hover {
    background: #0b6398;
  }
`;

export default NavbarStyle;
