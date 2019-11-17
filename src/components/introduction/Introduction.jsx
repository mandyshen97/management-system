import React, { Component } from 'react';
// import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd';
import './introduction.less'

// 从后台获取
// todo
const labelData = [
  { value: 335, name: '正常患者' },
  { value: 310, name: '多动症患者' },
  { value: 234, name: '未标注数据' },
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