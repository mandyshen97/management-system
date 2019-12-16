import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { Card, Message } from "antd";
import API from "../../api/api";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classificationLegendData: [],
      classificationData: [],
      barChartTimeData: [],
      WCSTData: [],
      nirData: [],
    };
  }
  componentDidMount() {
    API.getDiseaseTotal({}).then(res => {
      if (res.code === "200") {
        let classificationData = [];
        let legendData = [];
        res.data.map(item => {
          legendData.push(item.name);
          let obj = {};
          obj.value = item.num;
          obj.name = item.name;
          classificationData.push(obj);
        });
        this.setState({
          classificationData,
          classificationLegendData: legendData
        });
      } else {
        Message.error("获取数据失败！");
      }
    });
    API.getTaskTotal({}).then(res => {
      if (res.code === "200") {
        let barChartTimeData = [];
        let WCSTData = [];
        let nirData = [];
        res.data.map(item => {
          barChartTimeData.push(item.date);
          WCSTData.push(item.wcst);
          nirData.push(item.nir);
        });
        this.setState({
          barChartTimeData,
          WCSTData,
          nirData
        });
      } else {
        Message.error("获取数据失败！");
      }
    });
  }
  getOptionClassification = () => {
    return {
      title: {
        text: "疾病分类分布图",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: this.state.classificationLegendData
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: this.state.classificationData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          label: {
            normal: {
              formatter: "{b} : {c} ({d}%)"
            }
          }
        }
      ]
    };
  };
  getOptionAnnotate = () => {
    return {
      title: {
        text: "本月标注统计",
        x: "center"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ['WCST', 'nir']
      },
      xAxis: {
        type: "category",
        data: this.state.barChartTimeData,
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            type: "solid",
            color: "#EEEEEE", //坐标线的颜色
            width: "1" //坐标线的宽度
          }
        },
        axisLabel: {
          textStyle: {
            color: "#B6B6B7",
            fontSize: "12"
          }
        }
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { type: "dashed" } },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#B6B6B7"
          }
        }
      },
      series: [
        {
          name: "WCST",
          type: "bar",
          label: {
            normal: {
              show: true
            }
          },
          data: this.state.WCSTData,
          barWidth: 14, 
          barGap: 0,
          itemStyle: {
            normal: {
              color: "#66B0FF"
            }
          }
        },
        {
          name: "nir",
          type: "bar",
          label: {
            normal: {
              show: true
            }
          },
          data: this.state.nirData,
          barWidth: 14,
          itemStyle: {
            normal: {
              color: "#90D059"
            }
          }
        }
      ]
    };
  };
  handleClick=()=>{
    // let newStr=document.getElementsByClassName('main-content').innerHtml

    window.print()
  }
  render() {
    return (
      <div className="main-content">
        <button onClick={this.handleClick}>打印</button>
        <Card>
          <ReactEcharts option={this.getOptionClassification()}></ReactEcharts>
        </Card>
        <Card style={{marginTop: '20px'}}>
          <ReactEcharts option={this.getOptionAnnotate()}></ReactEcharts>
        </Card>
      </div>
    );
  }
}

export default Home;
