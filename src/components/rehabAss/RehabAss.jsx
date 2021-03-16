import React, { Component } from "react";
import { Form, Input, Button, Message, Progress, message } from "antd";
import ReactEcharts from "echarts-for-react";
import API from "../../api/api";
import _ from "lodash";
import { getAge } from "../../utils/dateUtils";
import RenderHistoryTable from "./RenderHistoryTable";

class RehabAss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientInfo: {}, // 患者基本信息
      existPatient: false,
      historyRecords: [], // 历史治疗记录
      anaResultVisible: false,
      percent: 0, // 进度条进度
      progressVisible: false, // 是否显示进度条
    };
  }

  getOption = () => {
    let { historyRecords } = this.state;
    const option = {
      title: {
        text: "智能分析图形结果",
        left: "center",
      },
      color: ["#c41d7f", "#722ed1", "#1890ff", "#f5222d"],
      tooltip: {
        trigger: "axis",
      },
      legend: {
        top: 30,
        data: [
          "颈椎评估效果数字等级",
          "颈椎VAS评分",
          "腰椎评估效果数字等级",
          "腰椎VAS评分",
        ],
      },
      grid: {
        top: "20%",
        left: "8%",
        right: "10%",
        bottom: "5%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        name: "患者治疗次数",
        nameTextStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        type: "category",
        boundaryGap: false,
        data: ["第1次", "第2次", "第3次", "第4次", "第5次", "第6次"],
        axisLine: {
          symbol: ["none", "arrow"],
          lineStyle: {
            color: "black",
          },
        },
        axisLabel: {
          textStyle: {
            fontSize: 16,
          },
        },
      },
      yAxis: {
        name: "评估效果数字等级和VAS评分",
        nameTextStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        type: "value",
        min: 0, // 设置y轴刻度的最小值
        max: 10, // 设置y轴刻度的最大值
        splitNumber: 9, // 设置y轴刻度间隔个数
        axisLine: {
          // 标轴轴线相关设置。
          show: true,
          // symbol: 'arrow', // 坐标轴两边的图表类型，不写默认没有
          lineStyle: {
            // type: 'dashed', // 坐标轴的分割线类型还有其他关于轴线的样式自行开发吧
            // 设置y轴颜色
            color: "black",
          },
          symbol: ["none", "arrow"],
        },
        axisLabel: {
          textStyle: {
            fontSize: 16,
          },
        },
      },
      series: [
        {
          name: "颈椎评估效果数字等级",
          type: "line",
          data: [4, 3, 2, 3, 2, 1],
          symbol: "rect",
          symbolSize: 16,
        },
        {
          name: "颈椎VAS评分",
          type: "line",
          data: [8, 6, 4, 4, 3, 2],
          symbol: "rect",
          symbolSize: 16,
        },
        {
          name: "腰椎评估效果数字等级",
          type: "line",
          data: [5, 4, 3, 3, 2, 1],
          symbol: "triangle",
          symbolSize: 16,
        },
        {
          name: "腰椎VAS评分",
          type: "line",
          data: [9, 8, 6, 5, 3, 1],
          symbol: "triangle",
          symbolSize: 16,
        },
      ],
    };
    // const option = {
    //   title: {
    //     text: "脊椎疾病严重程度",
    //   },
    //   tooltip: {
    //     trigger: "axis",
    //     axisPointer: {
    //       type: "cross",
    //       label: {
    //         backgroundColor: "#6a7985",
    //       },
    //     },
    //   },
    //   legend: {
    //     data: ["脊椎疾病严重程度等级"],
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {},
    //     },
    //   },
    //   grid: {
    //     left: "10%",
    //     right: "10%",
    //     bottom: "5%",
    //     containLabel: true,
    //   },
    //   xAxis: [
    //     {
    //       type: "category",
    //       boundaryGap: false,
    //       name: "治疗次数",
    //       data: historyRecords.map((item) => `第${item.treatCount}次`),
    //       position: "bottom",
    //     },
    //   ],
    //   yAxis: [
    //     {
    //       type: "value",
    //       name: "脊椎疾病严重程度等级",
    //     },
    //   ],
    //   series: [
    //     {
    //       name: "脊椎疾病严重程度等级",
    //       type: "line",
    //       stack: "总量",
    //       label: {
    //         normal: {
    //           show: true,
    //           position: "top",
    //         },
    //       },
    //       areaStyle: {},
    //       data: historyRecords.map((item) => item.classificationBefore),
    //     },
    //   ],
    // };
    return option;
  };

  queryPatient = (v) => {
    let param = v;
    API.getPatient(param).then((res) => {
      console.log("getPatient", res);
      const { data, code, msg } = res;
      if (code === "200" && data.length > 0) {
        this.setState({
          patientInfo: data[0],
          existPatient: true,
        });
      } else if (code === "200" && data.length === 0) {
        Message.error("该患者不存在");
      } else {
        Message.error(msg);
      }
    });
  };

  // 获取历史治疗记录
  queryHistory = (v) => {
    let param = v;
    API.getHistoryRecords(param).then((res) => {
      console.log("getHistoryRecords 历史治疗记录", res);
      let records = _.get(res, "data");
      records.sort((a, b) => {
        return a.treatCount - b.treatCount;
      });
      this.setState({
        historyRecords: records,
        treatCount: records.length + 1,
      });
    });
  };

  handleQueryInfo = (v) => {
    this.queryPatient(v);
    this.queryHistory(v);
  };

  handleDownload = () => {
    const { patientInfo } = this.state;
    window.location.href =
      "http://10.16.98.192:9090/record/download?id=" +
      _.get(patientInfo, "id") +
      "&description=" +
      " 经过脊椎疾病相关治疗方案，经红外热成像技术的客观分析可见，患者脊椎疾病严重程度有了明显的改善。";
    // window.open("http://10.16.98.192:9090/record/download?id=" + _.get(patientInfo, "id")
    // + "&description=" + " 经过脊椎疾病相关治疗方案，经红外热成像技术的客观分析可见，患者脊椎疾病严重程度有了明显的改善。") ;
    // const param = {
    //   id: _.get(patientInfo, "id"),
    //   description: "经过脊椎疾病相关治疗方案，经红外热成像技术的客观分析可见，患者脊椎疾病严重程度有了明显的改善。",
    // }
    // API.downloadRecord(param).then((res) => {});
  };

  handleAnalysis = () => {
    this.setState({
      progressVisible: true,
    });
    let timer = setInterval(() => {
      let percent = this.state.percent + 30;
      if (percent > 100) {
        percent = 100;
        clearImmediate(timer);
        this.setState({
          anaResultVisible: true,
        });
      }
      this.setState({ percent });
    }, 500);
  };

  // 查询表单
  renderSearch = () => {
    return (
      <Form
        layout="inline"
        style={{ marginBottom: 5 }}
        onFinish={this.handleQueryInfo}
      >
        <Form.Item name="patientId" label="患者编号：">
          <Input
            style={{ width: 100, marginRight: 15 }}
            placeholder="患者编号"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
    );
  };
  render() {
    let { existPatient, patientInfo } = this.state;
    return (
      <div className="main-content">
        {this.renderSearch()}
        {existPatient && (
          <>
            <div style={{ marginBottom: 20 }}>
              <span style={{ marginRight: "30px" }}>
                <strong>患者编号：</strong>
                {_.get(patientInfo, "id")}
              </span>
              <span style={{ marginRight: "30px" }}>
                <strong>患者姓名：</strong>
                {_.get(patientInfo, "name")}
              </span>
              <span style={{ marginRight: "30px" }}>
                <strong>性别：</strong>
                {_.get(patientInfo, "gender") === 1 ? "男" : "女"}
              </span>
              <span style={{ marginRight: "30px" }}>
                <strong>身高：</strong>
                176cm
              </span>
              <span style={{ marginRight: "30px" }}>
                <strong>年龄：</strong>
                {getAge(_.get(patientInfo, "birthday", ""))}
              </span>
              <span style={{ marginRight: "30px" }}>
                <strong>体重：</strong>
                {_.get(patientInfo, "weight")}kg
              </span>
              <span>
                <strong>过敏史：</strong>无
              </span>
            </div>
            <RenderHistoryTable historyRecords={this.state.historyRecords} />
            <Button
              type="primary"
              style={{ fontSize: 18, fontWeight: "bold" }}
              onClick={this.handleAnalysis}
            >
              智能康复评估分析
            </Button>
            {this.state.progressVisible && (
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={this.state.percent}
              />
            )}
            {this.state.anaResultVisible && (
              <div className="anal">
                <ReactEcharts option={this.getOption()} />
                {/* <h2>智能分析文本报告</h2>
                <p>
                  经过脊椎疾病相关治疗方案，经红外热成像技术的客观分析可见，患者脊椎疾病严重程度有了明显的改善。
                </p> */}
                <Button
                  type="primary"
                  style={{ fontSize: 18, fontWeight: "bold" }}
                  onClick={this.handleDownload}
                >
                  下载报告
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default RehabAss;
