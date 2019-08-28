import styled from 'styled-components';

const TestManagementStyle = styled.div`
  margin: 3rem auto;
  width: 90%;

  h4 {
    font-weight: bold;
    margin-top: 2rem;
  }

  .table {
    background: white;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
      0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
      0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
      0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    padding: 20px;
  }

  .notice {
    display: block;
    margin: 0 auto;
    text-align: center;
    font-size: 30px;
  }

  .column {
    text-align: center;
  }

  button {
    min-width: 100px;
    margin: 0 auto;
    display: block;
  }
`;

export default TestManagementStyle;
