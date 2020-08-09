import React, { Component } from "react";
import { Form, message, Input, Button, Table } from "antd";
import ReactEcharts from "echarts-for-react";
import { Link } from "react-router-dom";
import API from "../../api/api";

const { Column, ColumnGroup } = Table;

require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);

class AIAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientData: {},
    };
  }

  onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (values.opinion) {
      message.success("提交成功！");
    }

    // todo
    // 提交接口
    // API.addPatient(values).then((res) => {
    //   console.log(res);
    //   if ((res.state = "200")) {
    //     message.success('提交成功！')
    //   }
    // });
  };

  getOption = () => {
    const option = {
      title: {
        text: "脊椎疾病严重程度",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["脊椎疾病严重程度等级"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "10%",
        right: "10%",
        bottom: "5%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          name: "治疗次数",
          data: ["第0次", "第1次", "第2次", "第3次", "第4次", "第5次", "第6次"],
          position: "bottom",
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "脊椎疾病严重程度等级",
        },
      ],
      series: [
        {
          name: "脊椎疾病严重程度等级",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top",
            },
          },
          areaStyle: {},
          data: [5, 5, 4, 3.5, 3, 2, 1],
        },
      ],
    };
    return option;
  };

  queryPatient = () => {
    console.log("查询");
  };

  // 查询表单
  renderSearch = () => {
    return (
      <Form
        layout="inline"
        style={{ marginBottom: 30 }}
        onFinish={this.queryPatient}
      >
        <Form.Item name="patientId" label="患者id：">
          <Input style={{ width: 100, marginRight: 15 }} placeholder="患者id" />
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
    const dataSource = [
      {
        key: "1",
        firstDate: "2020-02-02",
        iniSymptoms: "腰酸背痛",
      },
    ];

    return (
      <div className="main-content">
        {this.renderSearch()}
        <div style={{ marginBottom: 20 }}>
          <span>
            <strong>患者ID：</strong>
            000006
          </span>
          <span style={{ marginLeft: "70px" }}>
            <strong>性别：</strong>男
          </span>
          <span style={{ marginLeft: "70px" }}>
            <strong>身高：</strong>
            176cm
          </span>
          <span style={{ marginLeft: "70px" }}>
            <strong>体重：</strong>
            70kg
          </span>
          <span style={{ marginLeft: "70px" }}>
            <strong>过敏史：</strong>无
          </span>
          <span style={{ marginLeft: "70px" }}>
            <strong>初始就诊时间：</strong>
            2020-01-02
          </span>
        </div>
        <Table dataSource={dataSource} bordered>
          <Column title="初次就诊时间" dataIndex="firstDate" key="firstDate" />
          <Column title="初始症状" dataIndex="iniSymptoms" key="iniSymptoms" />
          <ColumnGroup title="第1次治疗">
            <Column title="就诊时间" dataIndex="date" key="date" />
            <Column title="红外热像图" dataIndex="firstName" key="firstName" />
            <Column title="描述" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <ColumnGroup title="第2次治疗">
            <Column title="就诊时间" dataIndex="date" key="date" />
            <Column title="红外热像图" dataIndex="firstName" key="firstName" />
            <Column title="描述" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <ColumnGroup title="第3次治疗">
            <Column title="就诊时间" dataIndex="date" key="date" />
            <Column title="红外热像图" dataIndex="firstName" key="firstName" />
            <Column title="描述" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <ColumnGroup title="第4次治疗">
            <Column title="就诊时间" dataIndex="date" key="date" />
            <Column title="红外热像图" dataIndex="firstName" key="firstName" />
            <Column title="描述" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
        </Table>
        <Button type="primary" style={{ marginBottom: 20 }}>
          点击进行智能分析
        </Button>
        <h2>智能分析图形结果</h2>
        <ReactEcharts option={this.getOption()} />
        <h2>智能分析文本报告</h2>
        <p>
          经过脊椎疾病相关治疗方案，经红外热成像技术的客观分析可见，患者脊椎疾病严重程度有了明显的改善。
        </p>
      </div>
    );
  }
}

export default AIAnalysis;
