import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      labelData: [1,2,3,4]
    }
  }
  getOption = (data) => {
    return {
      title: {
        text: '标注现状统计',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['正常患者', '多动症患者', '未标注数据']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.state.labelData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
  render() { 
    return (  
      <div className='main-content'>
        <Card title='柱状图一'>
          <ReactEcharts option={this.getOption(this.state.labelData)}></ReactEcharts>
        </Card>
        <Card>
          疾病分类分布图（饼图）
        </Card>
        <Card>
          本月标注统计（柱状图）
        </Card>
      </div>
    );
  }
}

export default Home;