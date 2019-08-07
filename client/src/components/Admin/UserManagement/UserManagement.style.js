import styled from 'styled-components';

const UserManagementStyle = styled.div`
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

  .btn:hover {
    background: #ebeb5b;
  }

  table,
  th,
  td {
    border: 1px solid black;
    margin:2rem auto;
    width: 80%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 15px;
    text-align: left;
  }
  table#t01 tr:nth-child(even) {
    background-color: #eee;
  }
  table#t01 tr:nth-child(odd) {
    background-color: #fff;
  }
  table#t01 th {
    background-color: black;
    color: white;
  }
`;

export default UserManagementStyle;
