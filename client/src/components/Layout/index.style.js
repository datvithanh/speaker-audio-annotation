import styled from 'styled-components';

const LayoutStyle = styled.div`
  display: grid;
  grid-template-rows: 70px 1fr;
  grid-template-areas: 'navbar' 'content';
  .navbar1 {
    grid-area: navbar;
  }

  .content {
    grid-area: content;
  }
`;

export default LayoutStyle;
