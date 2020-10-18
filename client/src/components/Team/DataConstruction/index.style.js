import styled from 'styled-components';

export default styled.div`
  .app-data-construction {
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(0deg, #fff 5%, #f3f2f1);
    padding: 20px 0;
    .main {
      display: flex;
      position: relative;
      margin-top: 50px;
      padding: 0 30px;

      .collapse-left-content {
        position: absolute;
        left: 80px;
        top: -20px;
      }
    }
    .right-content {
      padding: 0 5% 0 5%;
    }
    .content {
      padding: 0 20px;
      border-radius: 5px;
      height: 45vh;
      overflow-y: auto;
      overflow-x: hidden;
      .text {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-align: justify;
        font-size: 20px;
        font-weight: 500;
        padding: 0 20px;
      }
    }
    .ant-list-item {
      padding: 10px 20px 10px 10px;
      min-height: 80px;
    }
    .ant-col {
      .content {
        padding: 10px 0;
      }
    }
    .box-shadow {
      box-shadow: 0 6px 12px 0px rgba(0, 0, 0, 0.15);
    }
    .flex-center {
      display: flex;
      justify-content: center;
    }
    .icon-btn {
      cursor: pointer;
      font-size: 32px;
      color: #595959;
      margin-right: 5px;
      &:hover {
        color: #0b6398;
        color: #1890ff;
      }
    }
    .controls {
      display: flex;
      align-items: center;
      padding: 15px 30px;
      border-radius: 5px;
      background-color: #ffffff;
    }
    .label {
      font-size: 16px;
      font-weight: 700;
      margin: 10px 0;
      font-family: 'Open Sans';
    }
    .send-button {
      width: 50px;
      height: 50px;
      font-size: 30px;
      font-weight: bold;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      right: 0;
      bottom: 0;
      margin-left: 5px;
      border-radius: 100px;
      overflow: hidden;
      cursor: pointer;
    }
    .input-text {
      flex: 1;
      padding-right: 15%;
      font-size: 20px;
      padding: 10px;
    }
    .input-container {
      align-items: flex-end;
      justify-content: space-between;
      padding: 5px;
    }
    .send-icon {
      padding: 10px;
      &:hover {
        color: #0b6398;
      }
    }
    .number-of-votes {
      display: flex;
      align-items: flex-start;
      font-size: 25px;
      font-weight: 500;
      padding: 1px;
    }
    .link-foreign-dictionary {
      text-decoration: underline;
    }
  }
  .ant-item-list {
    background-color: #f0f3f4;
  }
`;

export const StyleGuide = styled.div`
  padding: 20px 16px 0px 10%;
  text-align: justify;
`;

export const StyleTextDesc = styled.p`
  font-size: 16px;
  margin: 0;
  opacity: 0.85;
  text-align: justify;
`;
export const StyleTextEx = styled(StyleTextDesc)`
  padding-left: 15px;
  font-style: italic;
`;

export const StyleTextTitle = styled(StyleTextDesc)`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 1rem;
  font-style: italic;
`;
