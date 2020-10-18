import styled from 'styled-components';

const CompetitionsStyle = styled.div`
  margin: 0 auto;
  margin-top: 3rem;
  width: 90%;
  .btn {
    display: block;
    background: #0b6398;
    color: #333;
    padding: 0.4rem 1.3rem;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    margin-right: 3rem;
    outline: none;
    width: 250px;
    text-align: center;
    margin: 0 auto;
    margin-top: 3rem;
  }

  .table {
    margin-top: 1rem;
    background: white;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
      0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
      0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
      0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    padding: 20px;
  }

  .ant-table-thead {
    display: none;
  }

  .btn:hover {
    background: #ebeb5b;
  }
`;

export default CompetitionsStyle;
