import React from "react";
import "./statistics.less";
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
        text: "颈椎病情分布情况统计图",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      // legend: {
      //   // top: "5%",
      //   left: "left",
      //   orient: "vertical",
      // },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["20%", "40%"],
          avoidLabelOverlap: false,
          center: ["45%", "60%"],
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
            formatter: "{b}:{c}人 ({d}%)",
            fontSize: 16,
            fontWeight: "bold",
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
            { value: 28, name: "正常" },
            { value: 71, name: "疲劳" },
            { value: 63, name: "颈肌劳损或炎性改变" },
            { value: 86, name: "颈椎负荷过重" },
            { value: 52, name: "颈椎退行性病变" },
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
        text: "腰椎病情分布情况统计图",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      // legend: {
      //   top: "5%",
      //   left: "left",
      //   orient: "vertical",
      // },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["20%", "40%"],
          avoidLabelOverlap: false,
          center: ["50%", "60%"],
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
            formatter: "{b}:{c}人 ({d}%)",
            fontSize: 16,
            fontWeight: "bold",
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
            { value: 43, name: "正常" },
            { value: 24, name: "疲劳" },
            { value: 76, name: "肌筋膜炎" },
            { value: 97, name: "腰肌劳损" },
            { value: 60, name: "腰椎退行性病变" },
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
        textStyle: {
          fontSize: 18,
        },
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        top: "20%",
        left: 60,
        right: "20%",
        containLabel: true,
        height: "80%",
        weight: "100%",
      },
      xAxis: {
        name: "周数",
        nameTextStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        type: "category",
        boundaryGap: false,
        axisLabel: {
          fontSize: 16,
          fontWeight: "bold",
        },
        axisLine: {
          symbol: ["none", "arrow"],
          symbolOffeset: [0, 20],
        },
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },

      yAxis: {
        name: "采纳率",
        nameTextStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        axisLine: {
          symbol: ["none", "arrow"],
          symbolOffeset: [0, 20],
        },
        type: "value",
        max: 1,
        axisLabel: {
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      series: [
        {
          name: "腰椎评估采纳率",
          type: "line",
          symbol: "rect",
          symbolSize: 8,
          data: [
            0.7,
            0.72,
            0.79,
            0.84,
            0.87,
            0.9,
            0.92,
            0.91,
            0.91,
            0.92,
            0.91,
            0.93,
          ],
        },
        {
          name: "颈椎评估采纳率",
          type: "line",
          symbol: "triangle",
          symbolSize: 8,
          data: [
            0.68,
            0.72,
            0.75,
            0.81,
            0.86,
            0.87,
            0.87,
            0.88,
            0.9,
            0.89,
            0.92,
            0.93,
          ],
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
        textStyle: {
          fontSize: 18,
        },
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        top: "20%",
        left: 60,
        right: "20%",
        containLabel: true,
        height: "80%",
        weight: "100%",
      },
      xAxis: {
        name: "周数",
        nameTextStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        type: "category",
        boundaryGap: false,
        axisLabel: {
          fontSize: 16,
          fontWeight: "bold",
        },
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },

      yAxis: {
        name: "采纳率",
        nameTextStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        type: "value",
        max: 1,
        axisLabel: {
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      series: [
        {
          name: "腰椎方案推荐采纳率",
          type: "line",
          symbol: "rect",
          symbolSize: 8,
          data: [
            0.7,
            0.72,
            0.79,
            0.84,
            0.87,
            0.9,
            0.92,
            0.91,
            0.91,
            0.92,
            0.93,
            0.94,
          ],
        },
        {
          name: "颈椎方案推荐采纳率",
          symbol: "triangle",
          symbolSize: 8,
          type: "line",
          data: [
            0.68,
            0.72,
            0.75,
            0.81,
            0.86,
            0.91,
            0.92,
            0.92,
            0.93,
            0.94,
            0.95,
            0.95,
          ],
        },
      ],
    };
    myChart.setOption(option);
  };

  render() {
    return (
      <div
        style={{
          padding: "24px",
          overflow: "auto",
          height: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <Card style={{ flexGrow: 1 }}>
            <Row>
              <Col span={16}>
                <TeamOutlined style={{ fontSize: "60px", color: "#40c9c6" }} />
              </Col>
              <Col span={8}>
                <Statistic title="总患者数量" value={300} />
              </Col>
            </Row>
          </Card>
          <Card style={{ flexGrow: 1, marginLeft: "16px" }}>
            <Row>
              <Col span={12}>
                <UserAddOutlined
                  style={{ fontSize: "60px", color: "#9eb4ff" }}
                />
              </Col>
              <Col span={12}>
                <Statistic title="本周新增患者数量" value={27} />
              </Col>
            </Row>
          </Card>
          <Card style={{ flexGrow: 1, marginLeft: "16px" }}>
            <Row>
              <Col span={12}>
                <CalculatorOutlined
                  style={{ fontSize: "60px", color: "#36a3f7" }}
                />
              </Col>
              <Col span={12}>
                <Statistic title="本周新增治疗次数" value={130} />
              </Col>
            </Row>
          </Card>
          <Card style={{ flexGrow: 1, marginLeft: "16px" }}>
            <Row>
              <Col span={12}>
                <RadarChartOutlined
                  style={{ fontSize: "60px", color: "#f4556f" }}
                />
              </Col>
              <Col span={12}>
                <Statistic title="本周智能分析次数" value={193} />
              </Col>
            </Row>
          </Card>
        </div>
        <div
          style={{
            display: "flex",
            height: "40%",
            width: "100%",
            marginTop: "5px",
          }}
        >
          <Card style={{ height: "100%", width: "48%" }}>
            <div
              id="jingzhuifenbu"
              style={{ height: "98%", width: "98%", position: "absolute" }}
            ></div>
          </Card>
          <Card
            style={{
              height: "100%",
              width: "48%",
              flexGrow: 1,
              marginLeft: "16px",
            }}
          >
            <div
              id="yaozhuifenbu"
              style={{ height: "98%", width: "98%", position: "absolute" }}
            ></div>
          </Card>
        </div>
        <div
          style={{
            display: "flex",
            height: "50%",
            width: "100%",
            marginTop: "5px",
          }}
        >
          <Card style={{ height: "100%", width: "48%" }}>
            <div
              id="kangfupinggu"
              style={{ height: "98%", width: "98%", position: "absolute" }}
            ></div>
          </Card>
          <Card
            style={{
              height: "100%",
              width: "48%",
              flexGrow: 1,
              marginLeft: "16px",
            }}
          >
            <div
              id="fangantuijian"
              style={{ height: "98%", width: "98%", position: "absolute" }}
            ></div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Statistics;
