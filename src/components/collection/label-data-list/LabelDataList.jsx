import React, { Component } from 'react';
import { DatePicker, Button,Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import ReactEcharts from 'echarts-for-react';
import EditableTable from '../../ownTable/EditableTable'
import './label-data-list.less'
class LabelDataList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onDateChange = () => {
    // todo
  }

  getOptionLabelChart = () => {
    return {
      title: {
        text: '标注数据统计图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer : {
          type : 'shadow'
        }
      },
      legend: {
        data: ['疑似患者', '正常患者','未标注数据量','总数据量']
      },
      xAxis: {
        type: 'category',
        data: ['10月','11月','12月','1月','2月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '疑似患者',
          type: 'bar',
          label: {
            normal: {
              show: true,
            }
          },
          data: [320, 302, 301, 334, 390, 330, 320],
          barGap:'70%', // 控制柱子的间隔
          itemStyle: {
            normal: {
              color: '#3ba1ff',
            }
          }
        },
        {
          name: '未标注数据量',
          type: 'bar',
          label: {
            normal: {
              show: true,
            }
          },
          data: [320, 302, 301, 334, 390, 330, 320],
          itemStyle: {
            normal: {
              color: '#ffcc00',
            }
          }
        },
        {
          name: '正常患者',
          type: 'bar',
          label: {
            normal: {
              show: true,
            }
          },
          data: [320, 302, 301, 334, 390, 330, 320],
          itemStyle: {
            normal: {
              color: '#6A5ACD',
            }
          }
        },
        {
          name: '总数据量',
          type: 'bar',
          label: {
            normal: {
              show: true,
            }
          },
          data: [320, 302, 301, 334, 390, 330, 320],
          itemStyle: {
            normal: {
              color: '#0000FF',
            }
          }
        }
      ]
    }
  }

  render() {
    return (
      <div className="label-data-container">
        <DatePicker onChange={this.onDateChange} placeholder="请选择日期" />
        <Button type="primary" style={{ marginLeft: "20px" }}>查询</Button>
        <div className="label-data-chart">
          <ReactEcharts option={this.getOptionLabelChart()} />
        </div>
        <EditableTable></EditableTable>
      </div>
    );
  }
}

export default LabelDataList;