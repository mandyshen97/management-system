import React from "react";

import echarts from "echarts/lib/echarts";

import "echarts/lib/chart/pie"; //折线图是line,饼图改为pie,柱形图改为bar

import "echarts/lib/component/tooltip";

import "echarts/lib/component/title";

import "echarts/lib/component/legend";

class PieDiv extends React.Component {
  // /**
  //  * 初始化id id是随机生成的一串唯一的字符串
  //  */
  constructor(props) {
    super(props);
    let id = ("_" + Math.random()).replace(".", "_");
    this.state = {
      pieId: "pie" + id,
    };
  }

  /**
   * 生成图表，主要做了一个判断，因为如果不去判断dom有没有生成，
   * 在后面如果定期去更新图表，每次生成一个dom节点会导致浏览器
   * 占用的cpu和内存非常高，踩过坑。
   * 这里的config就是引入的配置文件中的config,文件头部会有说明
   */
  componentDidMount() {
    this.initPie(this.state.pieId);
  }

  initPie = (id) => {
    let myChart = echarts.getInstanceByDom(document.getElementById(id));
    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById(id));
    }
    let option;

    option = {
      color: this.props.color,
      title: {
        text: this.props.name,
        // subtext: '纯属虚构',
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      grid: {
        left: 50,
        right: 0,
      },
      series: [
        {
          name: this.props.name,
          type: "pie",
          radius: "50%",
          data: this.props.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          right: -100,
          label: {
            //饼图图形上的文本标签
            normal: {
              show: true,
              // position:'inner', //标签的位置
              textStyle: {
                fontWeight: 300,
                fontSize: 16, //文字的字体大小
              },
              formatter: "{b} : {c} ({d}%)",
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  };

  render() {
    // const { height } = this.props;

    return <div id={this.state.pieId} style={{ height: 300 }}></div>;
  }
}

export default PieDiv;
