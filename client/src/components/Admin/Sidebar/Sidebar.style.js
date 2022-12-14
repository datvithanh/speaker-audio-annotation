import styled from 'styled-components';

const SidebarStyle = styled.div`
  ul {
    width: 250px;
    height: 100%;
    min-height: 100vh;
    background: rgb(37, 37, 37);
    margin: 0;
  }

  li {
    display: block;
  }

  a {
    color: white;
    display: block;
    padding: 1em;
    font-size: 17px;
  }

  li:hover {
    color: black;
  }

  .active {
    color: black;
    background: #bfd8ea;
    text-decoration: none;
  }

  a:hover {
    color: black;
    background: #bfd8ea;
    text-decoration: none;
  }
`;

export default SidebarStyle;
