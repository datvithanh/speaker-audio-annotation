import styled from 'styled-components';

const UserManagementStyle = styled.div`
  margin: 0 auto;
  margin-top: 3rem;
  width: 90%;
  .btn {
    display: block;
    background: rgb(236, 202, 81);
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
    border: 1px solid #e8e8e8;
    margin: 2rem auto;
  }

  .btn:hover {
    background: #ebeb5b;
  }
`;

export default UserManagementStyle;
