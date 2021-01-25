import React from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie"; //折线图是line,饼图改为pie,柱形图改为bar
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import { Row, Col, Card, Statistic } from "antd";
import {
  TeamOutlined,
  UserAddOutlined,
  CalculatorOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.drawJingzhuifenbu();
    this.drawYaozhuifenbu();
    this.drawKangfupinggu();
    this.drawFangantuijian();
  }
  drawJingzhuifenbu = () => {
    let myChart = echarts.getInstanceByDom(
      document.getElementById("jingzhuifenbu")
    );
    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById("jingzhuifenbu"));
    }
    let option;
    option = {
      title: {
        text: "颈椎部位疾病等级分布情况统计图",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "left",
        orient: "vertical",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          center: ["60%", "55%"],
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
            formatter: "{b} : 共{c}人 ({d}%)",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "正常" },
            { value: 735, name: "疲劳" },
            { value: 580, name: "劳损或炎性改变" },
            { value: 484, name: "颈椎负荷过重" },
            { value: 300, name: "颈椎病或颈肩综合征或颈椎退行性改变" },
          ],
        },
      ],
    };
    myChart.setOption(option);
  };

  drawYaozhuifenbu = () => {
    let myChart = echarts.getInstanceByDom(
      document.getElementById("yaozhuifenbu")
    );
    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById("yaozhuifenbu"));
    }
    let option;
    option = {
      color: ["#15A848", "#15A892", "#1574A8", "#152BA8", "#4815A8"],
      title: {
        text: "腰椎部位疾病等级分布情况统计图",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "left",
        orient: "vertical",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          center: ["60%", "55%"],
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
            formatter: "{b} : 共{c}人 ({d}%)",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "正常" },
            { value: 735, name: "肌肉紧张/疲劳" },
            { value: 580, name: "肌筋膜炎" },
            { value: 484, name: "腰肌劳损" },
            { value: 300, name: "腰椎退行性改变/腰椎间盘突出症" },
          ],
        },
      ],
    };
    myChart.setOption(option);
  };

  drawKangfupinggu = () => {
    let myChart = echarts.getInstanceByDom(
      document.getElementById("kangfupinggu")
    );
    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById("kangfupinggu"));
    }
    let option;
    option = {
      title: {
        text: "智能康复评估采纳率",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["腰椎评估采纳率", "颈椎评估采纳率"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        bottom: 100,
        left: 140,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,

        axisLabel: {
          rotate: 30,
        },
        data: [
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
        ],
      },

      yAxis: {
        type: "value",
        max: 1,
      },
      series: [
        {
          name: "腰椎评估采纳率",
          type: "line",
          data: [0.7, 0.72, 0.79, 0.84, 0.87, 0.9, 0.92],
        },
        {
          name: "颈椎评估采纳率",
          type: "line",
          data: [0.68, 0.72, 0.75, 0.81, 0.86, 0.91, 0.94],
        },
      ],
    };
    myChart.setOption(option);
  };

  drawFangantuijian = () => {
    let myChart = echarts.getInstanceByDom(
      document.getElementById("fangantuijian")
    );
    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById("fangantuijian"));
    }
    let option;
    option = {
      color: ["#6B008F", "#33CC00"],
      title: {
        text: "智能方案推荐采纳率",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["腰椎方案推荐采纳率", "颈椎方案推荐采纳率"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        bottom: 100,
        left: 140,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,

        axisLabel: {
          rotate: 30,
        },
        data: [
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
          "2021/01/17~2020/01/23",
        ],
      },

      yAxis: {
        type: "value",
        max: 1,
      },
      series: [
        {
          name: "腰椎评估采纳率",
          type: "line",
          data: [0.7, 0.72, 0.79, 0.84, 0.87, 0.9, 0.92],
        },
        {
          name: "颈椎评估采纳率",
          type: "line",
          data: [0.68, 0.72, 0.75, 0.81, 0.86, 0.91, 0.94],
        },
      ],
    };
    myChart.setOption(option);
  };

  render() {
    return (
      <div style={{ padding: "24px", overflow: "auto" }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Row>
                <Col span={16}>
                  <TeamOutlined
                    style={{ fontSize: "90px", color: "#40c9c6" }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="总患者数量" value={490} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Row>
                <Col span={12}>
                  <UserAddOutlined
                    style={{ fontSize: "90px", color: "#9eb4ff" }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic title="本周新增患者数量" value={70} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Row>
                <Col span={12}>
                  <CalculatorOutlined
                    style={{ fontSize: "90px", color: "#36a3f7" }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic title="本周新增治疗次数" value={130} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Row>
                <Col span={12}>
                  <RadarChartOutlined
                    style={{ fontSize: "90px", color: "#f4556f" }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic title="本周智能分析次数" value={193} />
                </Col>
              </Row>
            </Card>
            ,
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="颈椎部位疾病等级分布情况">
              <div id="jingzhuifenbu" style={{ height: 250 }}></div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="腰椎部位疾病等级分布情况">
              <div id="yaozhuifenbu" style={{ height: 250 }}></div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Card title="智能康复评估采纳率">
              <div id="kangfupinggu" style={{ height: 250 }}></div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="智能治疗方案推荐采纳率">
              <div id="fangantuijian" style={{ height: 250 }}></div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Statistics;
