import React, { Component } from "react";
import { Form, message, Input, Button, Table, Message, Image } from "antd";
import ReactEcharts from "echarts-for-react";
import { Link } from "react-router-dom";
import API from "../../api/api";
import _ from "lodash";
import moment from "moment";
import { getAge } from "../../utils/dateUtils";
import RenderHistoryTable from './RenderHistoryTable'
// import { image } from "html2canvas/dist/types/css/types/image";
require("react-dom");

class AIAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientInfo: {}, // 患者基本信息
      existPatient: false,
      historyRecords: [], // 历史治疗记录
    };
  }

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
          data: this.state.historyRecords.map(
            (item) => `第${item.treatCount}次`
          ),
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
          data: this.state.historyRecords.map(
            (item) => item.classificationBefore
          ),
        },
      ],
    };
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

  // 渲染历史治疗记录表格
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
        render: (infImage) => {
          return <img src={infImage} alt="" />;
        },
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

    const data = [];

    function getDesFromClassification(classification) {
      const map = {
        0: "正常",
        1: "疲劳",
        2: "炎性改变",
        3: "颈椎负荷过重",
        4: "颈肩综合症，颈椎退行性，颈椎病",
        100: "",
      };
      return map[classification];
    }

    (this.state.historyRecords || []).map((item, index) => {
      let record = {};
      record.key = index;
      record.count = item.treatCount;
      record.time = moment(item.timeBefore).format("YYYY-MM-DD HH:mm");
      record.infImage = item.infraAfterPath;
      record.infImageDes = getDesFromClassification(
        _.get(item, "classificationBefore", 100)
      );
      record.MRI = "";
      record.MRIDes = "";
      record.CT = "";
      record.CTDes = "";
      data.push(record);
    });

    const paginationProps = {
      showTotal: (total) => {
        return `共${total}条`;
      },
      total: data.length, //数据总数
      defaultCurrent: 1, //默认当前页
      current: this.state.currentTablePage, //当前页
      pageSize: 3, //每页条数
      onChange: (page, pageSize) => {
        console.log("page", page, pageSize);
        //页码改变的回调，参数是改变后的页码及每页条数
        this.setState({
          currentTablePage: page,
        });
      },
    };

    return (
      <Table
        bordered="true"
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content", y: 600 }}
        pagination={paginationProps}
      />
    );
  };

  // 查询表单
  renderSearch = () => {
    return (
      <Form
        layout="inline"
        style={{ marginBottom: 30 }}
        onFinish={this.handleQueryInfo}
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
    console.log("this.state", this.state);

    let { existPatient, patientInfo } = this.state;

    return (
      <div className="main-content">
        {this.renderSearch()}
        {existPatient && (
          <>
            <div style={{ marginBottom: 20 }}>
              <span style={{ marginRight: "30px" }}>
                <strong>患者ID：</strong>
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
            {/* {this.renderHistoryTable()} */}
            <RenderHistoryTable historyRecords={this.state.historyRecords}/>
            <Button type="primary" style={{ marginBottom: 20 }}>
              点击进行智能分析
            </Button>
            <h2>智能分析图形结果</h2>
            <ReactEcharts option={this.getOption()} />
            <h2>智能分析文本报告</h2>
            <p>
              经过脊椎疾病相关治疗方案，经红外热成像技术的客观分析可见，患者脊椎疾病严重程度有了明显的改善。
            </p>
          </>
        )}
      </div>
    );
  }
}

export default AIAnalysis;
