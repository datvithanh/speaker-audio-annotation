import styled from 'styled-components';

const EvaluateStyle = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  font-size: 25px;
  .container {
    margin: 0 auto;
    margin-top: 3rem;
  }

  button {
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
    height: 40px;
    width: 130px;
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
    margin-top: 1rem;
    text-align: center;
  }

  audio {
    width: 600px;
    margin-top: 2rem;
  }

  .evaluate {
    text-align: left;
  }

  .group-button {
    display: flex;
  }

  .content-text {
    height: 200px;
    width: 600px;
    border: 1px solid black;
    text-align: left;
    background-color: white;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-align: justify;
    padding: 0.5rem 1rem 1rem 1rem;
    margin: 1rem 0;
  }
`;

export default EvaluateStyle;
