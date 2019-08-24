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
    background-color: white;
    height: 90px;
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
    width: 150px;
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
    margin-left: 2px;
  }

  ul a {
    text-decoration: none;
    color: black;
    display: block;
    padding: 1em;
    font-size: 25px;
  }

  .active,
  a:hover {
    background: rgb(255, 248, 184);
    color: black;
  }

  .logo-vbee:hover {
    background: white;
  }

  .logo:hover {
    background: white;
  }

  h1:hover {
  }
`;

export default NavbarStyle;
