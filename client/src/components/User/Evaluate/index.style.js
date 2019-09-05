import styled from 'styled-components';

const EvaluateStyle = styled.div`
  text-align: center;
  display: flex;
  padding: 2rem;
  max-width: 80%;
  margin: 0 auto;
  .container {
    margin: 0 auto;
  }

  .table {
    margin-right: 3rem;
    max-width: 250px;
    margin: 0 auto;
  }

  .content-evaluate {
    margin: 0 auto;
    margin-left: 3rem;
  }

  button {
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
    height: 40px;
    width: 130px;
  }

  table {
    background: white;
  }

  .voice {
    display: flex;
    margin: 0 auto;
    text-align: center;
  }

  h5 {
    text-align: left;
  }

  h3 {
    margin-top: 3rem;
    text-align: center;
  }

  audio {
    width: 600px;
    margin-top: 1rem;
  }

  .evaluate {
    text-align: left;
  }

  .group-button {
    display: flex;
    margin-top: 2rem;
  }

  .content-text {
    height: 120px;
    width: 600px;
    border: 1px solid black;
    text-align: left;
    background-color: hsl(0, 0%, 94%);
    font-size: 19px;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-align: justify;
    font-style: oblique;
    padding: 0.5rem 1rem 1rem 1rem;
    margin: 1rem 0;
    color: hsl(0, 0%, 50%);
    overflow-y: auto;
    max-height: 300px;
  }
`;

export default EvaluateStyle;
