import React from 'react';
import './styles.css';
import { Row, Icon, List, Col, Input, Slider, Button } from 'antd';

const { TextArea } = Input;

const data_list = [
  'Em mới nghe tiếng của bà đấy mà',
  'Cuộc sống này là những chông gai',
  'Thế giới này đâu phải của chúng mình đâu!Thế giới này đâu phải của chúng mình đâu!Thế giới này đâu phải của chúng mình đâu!Thế giới này đâu phải của chúng mình đâu!Thế giới này đâu phải của chúng mình đâu!Thế giới này đâu phải của chúng mình đâu!Thế giới này đâu phải của chúng mình đâu!Thế giới này đâu phải của chúng mình đâu!',
];

const DataConstruction = () => {
  return (
    <div className="app-data-construction">
      <h2 className="flex-center">Cuộc thi cái gì đó đó</h2>
      <Row type="flex" justify="center" align="middle">
        <Col span={12} className="content box-shadow">
          <List
            itemLayout="horizontal"
            dataSource={data_list}
            renderItem={item => (
              <List.Item>
                <div className="text">{item}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Icon type="like" title="124" className="icon-btn" />
                  &nbsp;
                  <span>124</span>
                </div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <div style={{ flex: 1 }}></div>
      <Row type="flex" justify="center" align="middle">
        <Col span={12} className="flex-center">
          <TextArea
            className="box-shadow"
            autosize={{ minRows: 3, maxRows: 6 }}
            size="large"
            placeholder="Dữ liệu tùy chỉnh"
          />
          &nbsp; &nbsp;
          <Button type="primary" size="default">
            Gửi
          </Button>
        </Col>
      </Row>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ marginBottom: '20px' }}
      >
        <Col span={12}>
          <div className="controls box-shadow">
            <Icon
              className="icon-btn"
              type="play-circle"
              style={{ fontSize: 32, marginRight: '10px' }}
            />
            <Slider style={{ width: '100%' }}></Slider>
            &nbsp;
            <div className="duration">16:02</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DataConstruction;
