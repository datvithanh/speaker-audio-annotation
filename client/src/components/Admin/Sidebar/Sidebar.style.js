import styled from 'styled-components';

const SidebarStyle = styled.div`
  ul {
    width: 300px;
    height: 100%;
    min-height: 100vh;
    background: rgb(37, 37, 37);
  }

  li {
    display: block;
  }

  a {
    color: white;
    display: block;
    padding: 1em;
    font-size: 20px;
  }

  li:hover {
    color: black;
  }

  a:hover {
    color: black;
    background: rgb(255, 248, 184);
  }
`;

export default SidebarStyle;
