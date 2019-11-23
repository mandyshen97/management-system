import React, { Component } from 'react';
// import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd';
import './introduction.less'

// 从后台获取
// todo
const labelData = [
  { value: 335, name: '单纯性失眠' },
  { value: 310, name: '伴过度觉醒' },
  { value: 234, name: '伴焦虑' },
  { value: 123, name: '伴抑郁'},
  { value: 65, name:'未诊断'}
]
class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelData: [],
    }
  }

  componentDidMount() {
    this.setState({
      labelData: labelData
    })
  }

  

  render() {
    return (
      <div className="main-content">
        <div className="text">
          <Card className="text-left">
            <h2>数据采集系统介绍</h2>
            <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
          </Card>
          <Card className="text-right">
            <h2>标注步骤介绍</h2>
            <p>标注步骤介绍</p>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </Card>
        </div>
      </div>
    );
  }
}

export default Introduction;