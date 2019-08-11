import styled from 'styled-components';

const CreateTestStyle = styled.div`
  max-width: 700px;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
  margin-top: 1rem;
  margin-bottom: 3rem;

  /* Text Styles*/
  .large {
    font-size: 3rem;
    line-height: 1.2;
  }

  .lead {
    font-size: 1.5rem;
  }

  .text-primary {
    color: black;
  }

  .btn {
    display: inline-block;
    background: #f4f4f4;
    color: #333;
    padding: 0.4rem 1.3rem;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    margin-right: 0.5rem;
    transition: opacity 0.2s ease-in;
    outline: none;
  }

  .btn-primary,
  .bg-primary,
  .badge-primary,
  .alert-primary {
    background: rgb(236, 202, 81);
    color: rgb(0, 0, 0);
  }

  .btn:hover {
    opacity: 0.8;
  }

  .my-1 {
    margin: 1rem 0;
  }

  /* Forms */
  .form .form-group {
    margin: 1.2rem 0;
  }

  .form .form-text {
    display: block;
    margin-top: 0.3rem;
    color: #888;
  }

  .form input[type='text'],
  .form input[type='date'],
  .form select,
  .form textarea {
    display: block;
    width: 100%;
    padding: 0.4rem;
    font-size: 1.2rem;
    border: 1px solid #ccc;
  }

  .form input[type='submit'],
  button {
    font: inherit;
  }

  .form .social-input {
    display: flex;
  }

  .form .social-input i {
    padding: 0.5rem;
    width: 4rem;
  }

  @media (max-width: 800px) {
    margin: 0 3em;
  }
`;

export default CreateTestStyle;
