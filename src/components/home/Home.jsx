import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd'
import API from "../../api/algorithm"
class Home extends Component {
  constructor(props) {
    super(props);
    API.getDiseaseTotal({}).then(res => {
      this.setState({
        labelData: [
          {value:res.data.d1,name:"单纯性失眠"},
          {value:res.data.d2, name:"伴过度觉醒"},
          {value:res.data.d3, name: "伴焦虑"},
          {value:res.data.d4,name:"伴抑郁"},
          {value:res.data.noDiagnose,name:"未诊断"}
        ]
      });
    });

    this.state = {  
      labelData: []
    }
  }
  getOption = (data) => {
    return {
      title: {
        text: '患者失眠类型分布图',
       // subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['单纯性失眠', '伴过度觉醒', '伴焦虑','伴抑郁','未诊断']
      },
      series: [
        {
          name: '失眠类别分布',
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