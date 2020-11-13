import React, { Component } from "react";
import { Form, message, Input, Button, Table } from "antd";
import ReactEcharts from "echarts-for-react";
import { Link } from "react-router-dom";
import API from "../../api/api";
require("react-dom");

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

  renderHistoryTable = () => {
    const columns = [
      {
        title: "治疗次数",
        dataIndex: "count",
        key: "count",
        render: (count) => `第${count}次治疗`,
      },
      {
        title: "就诊时间",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "红外热像图",
        dataIndex: "infImage",
        key: "infImage",
      },
      {
        title: "红外热像图描述",
        dataIndex: "infImageDes",
        key: "infImageDes",
      },
      {
        title: "核磁共振图像",
        dataIndex: "MRI",
        key: "MRI",
      },
      {
        title: "核磁共振图像描述",
        dataIndex: "MRIDes",
        key: "MRIDes",
      },
      {
        title: "核磁共振图像",
        dataIndex: "CT",
        key: "CT",
      },
      {
        title: "核磁共振图像描述",
        dataIndex: "CTDes",
        key: "CTDes",
      },
    ];

    const data = [
      {
        key: 0,
        count: 1,
        time: "2020-05-21",
        infImage: "",
        infImageDes: "脊椎部位红色较深，炎症",
        MRI: "",
        MRIDes: "",
        CT: "",
        CTDes: "",
      },
      {
        key: 1,
        count: 2,
        time: "2020-05-27",
        infImage: "",
        infImageDes: "脊椎部位红色较深，炎症",
        MRI: "",
        MRIDes: "",
        CT: "",
        CTDes: "",
      },
    ];

    return <Table bordered="true" columns={columns} dataSource={data} />;
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
        {this.renderHistoryTable()}
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
