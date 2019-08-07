import styled from 'styled-components';

const LayoutStyle = styled.div`
  display: grid;
  grid-template-areas: 'menu main';
  grid-template-columns: 300px 1fr;

  .menu {
    grid-area: menu;
  }

  .main {
    grid-area: main;
  }
`;

export default LayoutStyle;
