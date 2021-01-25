import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Message,
  Table,
  Tag,
} from "antd";
import API from "../../api/api";
import _ from "lodash";
import AIModal from "./AIModal";

const listData = [
  {
    key: 0,
    patientId: "000004",
    count: 1,
    name: "赵鹏",
    gender: 1,
    birthday: "1995-06-06",
    createAt: "2020-02-03",
    chief: "腰酸背痛",
    recommendTreat: "针灸治疗",
    treat: "针灸治疗",
  },
  {
    key: 1,
    patientId: "000004",
    count: 2,
    name: "赵鹏",
    gender: 1,
    birthday: "1995-06-06",
    createAt: "2020-02-03",
    chief: "腰酸背痛",
    recommendTreat: "针灸治疗",
    treat: "针灸治疗",
  },
  {
    key: 2,
    patientId: "000004",
    count: 3,
    name: "赵鹏",
    gender: 1,
    birthday: "1995-06-06",
    createAt: "2020-02-03",
    chief: "腰酸背痛",
    recommendTreat: "针灸治疗",
    treat: "针灸治疗",
  },{
    key: 3,
    patientId: "000004",
    count: 4,
    name: "赵鹏",
    gender: 1,
    birthday: "1995-06-06",
    createAt: "2020-02-03",
    chief: "腰酸背痛",
    recommendTreat: "针灸治疗",
    treat: "针灸治疗",
  },{
    key: 4,
    patientId: "000004",
    count: 5,
    name: "赵鹏",
    gender: 1,
    birthday: "1995-06-06",
    createAt: "2020-02-03",
    chief: "腰酸背痛",
    recommendTreat: "针灸治疗",
    treat: "针灸治疗",
  },{
    key: 5,
    patientId: "000004",
    count: 6,
    name: "赵鹏",
    gender: 1,
    birthday: "1995-06-06",
    createAt: "2020-02-03",
    chief: "腰酸背痛",
    recommendTreat: "针灸治疗",
    treat: "针灸治疗",
  },{
    key: 6,
    patientId: "000004",
    count: 7,
    name: "赵鹏",
    gender: 1,
    birthday: "1995-06-06",
    createAt: "2020-02-03",
    chief: "腰酸背痛",
    recommendTreat: "针灸治疗",
    treat: "针灸治疗",
  },{
    key: 7,
    patientId: "000004",
    count: 8,
    name: "赵鹏",
    gender: 1,
    birthday: "1995-06-06",
    createAt: "2020-02-03",
    chief: "腰酸背痛",
    recommendTreat: "针灸治疗",
    treat: "针灸治疗",
  }
];

class AIAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientInfo: {}, // 患者基本信息
      existPatient: false,
      historyRecords: [], // 历史治疗记录
      anaResultVisible: false,
      percent: 0, // 进度条进度
      progressVisible: false, // 是否显示进度条

      isModalVisible: false,
      record: {},
      pageNum: 1,
      listData: listData,
      tableColumns: [
        {
          title: "患者id",
          dataIndex: "patientId",
          align: "center",
          // width: 50,
        },
        {
          title: "患者姓名",
          dataIndex: "name",
          align: "center",
          // width: 50,
        },
        {
          title: "性别",
          dataIndex: "gender",
          align: "center",
          // width: 40,
          render: (gender) => {
            return gender === 1 ? (
              <Tag color="red">男</Tag>
            ) : (
              <Tag color="red">女</Tag>
            );
          },
        },
        {
          title: "年龄",
          align: "center",
          dataIndex: "birthday",
          // width: 40,
          render: (birthday) => {
            return this.calculateAge(birthday);
          },
        },
        {
          title: "就诊时间",
          dataIndex: "createAt",
          align: "center",
          // width: 50,
          render: (createAt) => {
            return this.formatDate(new Date(createAt));
          },
        },
        {
          title: "治疗次数",
          dataIndex: "count",
          align: "center",
          // width: 50,
          render: (count) => {
            return `第${count}次治疗`;
          },
        },
        {
          title: "病人主诉",
          dataIndex: "chief",
          align: "center",
          ellipsis: true,
          // width: 150,
          tooltip: true,
        },
        {
          title: "智能推荐治疗方案",
          dataIndex: "recommendTreat",
          ellipsis: true,
          align: "center",
          width: 150,
          tooltip: true,
        },
        {
          title: "实际治疗方案",
          dataIndex: "treat",
          ellipsis: true,
          align: "center",
          width: 150,
          tooltip: true,
        },
        // {
        //   title: "诊断结果",
        //   dataIndex: "disease",
        //   width: 50,
        // },
        // {
        //   title: "智能分析结果",
        //   dataIndex: "AnalysisRes",
        //   ellipsis: true,
        //   width: 150,
        //   tooltip: true,
        // },
        {
          title: "操作",
          // width: 150,
          key: "action",
          align: "center",
          render: (text, record, index) => {
            return (
              <div>
                <Button
                  type="primary"
                  size="small"
                  style={{ marginRight: "5px" }}
                  onClick={() =>
                    this.setState({
                      isModalVisible: true,
                      record,
                    })
                  }
                >
                  智能分析
                </Button>
              </div>
            );
          },
        },
      ],
    };
  }
  /////////
  getOption = () => {
    let { historyRecords } = this.state;
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
          data: historyRecords.map((item) => `第${item.treatCount}次`),
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
          data: historyRecords.map((item) => item.classificationBefore),
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
      } else if (code === "200" && data.length === 0) {
        Message.error("该患者不存在");
      } else {
        Message.error(msg);
      }
    });
  };

  // 计算年龄
  calculateAge(time) {
    let date = new Date(time);
    let today = new Date().getTime();
    return Math.ceil((today - date) / 31536000000);
  }

  formatDate = (now) => {
    var year = now.getFullYear(); //取得4位数的年份
    var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
    var date = now.getDate(); //返回日期月份中的天数（1到31）
    return year + "-" + month + "-" + date;
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
      let percent = this.state.percent + 10;
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
  //////
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

  // 分页页数改变触发函数
  pageChange = (page) => {
    this.setState(
      {
        pageNum: page,
      },
      () => {
        this.fetchData();
      }
    );
  };
  handleModalVisible = (bool) => {
    this.setState({
      isModalVisible: bool,
    });
  };
  render() {
    return (
      <div className="main-content">
        {this.renderSearch()}
        <Table
          bordered
          pagination={{
            simple: true,
            current: this.state.pageNum,
            total: this.state.totalNum,
            onChange: this.pageChange,
          }}
          columns={this.state.tableColumns}
          dataSource={this.state.listData}
        ></Table>
        {this.state.isModalVisible && (
          <AIModal
            isModalVisible={this.state.isModalVisible}
            handleModalVisible={this.handleModalVisible}
            record={this.state.record}
          />
        )}
      </div>
    );
  }
}

export default AIAnalysis;
