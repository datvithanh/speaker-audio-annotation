import styled from 'styled-components';

const UserChoosenStyle = styled.div`
  margin: 0 auto;
  margin-top: 3rem;
  width: 90%;

  h4 {
    font-weight: bold;
    text-align: center;
  }

  .table {
    border: 1px solid #e8e8e8;
    margin: 0 auto;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
      0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
      0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
      0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
  }

  .notice {
    display: block;
    margin: 0 auto;
    text-align: center;
    font-size: 30px;
  }

  button {
    margin: 1rem auto;
    display: block;
  }
`;

export default UserChoosenStyle;
