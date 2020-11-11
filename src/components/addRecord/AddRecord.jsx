import React, { Component } from "react";
import RenderInfMode from "./RenderInfMode";
import RenderCTMode from "./RenderCTMode";
import RenderMRIMode from "./RenderMRIMode";
import ReactEcharts from "echarts-for-react";
import {
  Input,
  Form,
  Icon,
  Divider,
  Modal,
  Select,
  Table,
  Button,
  Message,
  Tabs,
  Steps,
} from "antd";
import { UserAddOutlined, FileAddOutlined } from "@ant-design/icons";
import "./add-record.less";
import API from "../../api/api";
import feiaiImg from "@/assets/images/feiai2.jpg";
const { TextArea } = Input;
const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { Step } = Steps;
const { Search } = Input;

class AddRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyRecordVisible: false,
      historyNIRSVisible: false,
      patientId: "",
      name: "",
      medRecord: {
        patientId: "000001",
        name: "张三",
        gender: 0,
        birthday: "1993-02-23",
        chfCmp: "腰酸背痛腿抽筋",
        disease: "脊椎疾病——腰椎间盘突出",
      },
      simMedRecordId: null,
      simMedRecord: {},
      diseaseList: [],
      helpSwitch: false,
    };
  }

  // 照片墙 start
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  // 照片墙 end

  //   根据生日获取年龄
  getAge(birthday) {
    //出生时间 毫秒
    var birthDayTime = new Date(birthday).getTime();
    //当前时间 毫秒
    var nowTime = new Date().getTime();
    //一年毫秒数(365 * 86400000 = 31536000000)
    return Math.ceil((nowTime - birthDayTime) / 31536000000);
  }

  handleTreatChange = (value) => {
    console.log("selected", value);
  };

  //   页面渲染前执行函数
  componentDidMount() {
    let id = this.props.match.params.id;
    console.log("this.props.match.params", this.props.match.params);
    // this.getMedRecord(id);
    // this.getDiseaseList();
  }

  // 查询表单
  renderSearch = () => {
    return (
      <Form
        layout="inline"
        style={{ marginBottom: 30 }}
        onFinish={this.queryPatient}
        ref="patientQueryForm"
      >
        <Form.Item name="patientId" label="患者id：">
          <Input style={{ width: 100, marginRight: 15 }} placeholder="患者id" />
        </Form.Item>
        <Form.Item name="name" label="患者姓名：">
          <Input
            style={{ width: 100, marginRight: 15 }}
            placeholder="患者姓名"
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

  // 患者基本信息查询
  queryPatient = () => {
    let values = this.refs.patientQueryForm.getFieldsValue();
    let param = {
      id: values.patientId,
      name: values.name,
    };
    this.setState({
      patientId: values.patientId,
      name: values.name,
    });
    // todo
    // 获取患者列表的API
    // API.getPatientList(param).then((res) => {
    //   const { data, code, msg } = res;
    //   if(code==='200'){
    //     let newListData = []

    //   }
    // });

    fetch(
      "https://www.fastmock.site/mock/9df39432386360a59e2d0557525f4887/query/query/getPatientList"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        const { data, code, msg } = res;
        if (code === "200") {
          // let newListData = [];
          // data.map((item, index) => {
          //   let newListDataItem = {};
          //   // newListDataItem.key = index+item.patientId;
          //   newListData.push(item);
          // });
          this.setState({
            listData: data,
          });
        }
      });
  };

  // 获取历史治疗记录
  queryHistory = () => {
    let param = {
      id: this.state.patientId,
      name: this.state.name,
    };

    API.getHistoryRecords(param).then((res) => {
      // todo
      console.log("res", res);
    });
  };

  // 上传治疗前的内容
  handleSaveBeforeTreat = () => {
    const values = this.refs.beforeTreatForm.getFieldsValue();
    let { infraFile, infraDesc, infraExcp, pulseExcp } = values;
    let param = values;
    param.time = new Date();
    API.saveBeforeTreat(param).then((res) => {
      if ((res.code = "200")) {
        Message.success("上传成功！");
      } else {
        Message.error("上传失败！");
      }
    });
  };

  // 本次治疗的记录
  handleTreat = () => {
    const values = this.refs.treatForm.getFieldsValue();
    let param = values;
    API.treat(param).then((res) => {
      if ((res.code = "200")) {
        Message.success("上传成功！");
      } else {
        Message.error("上传失败！");
      }
    });
  };

  // 上传本次治疗后的内容
  handleSaveAfterTreat = () => {
    console.log("treatafter");
    const values = this.refs.afterTreatForm.getFieldsValue();
    let { infraDesc, infraExcp, infraFile, pulseExcp } = values;
    console.log(values);
    let param = values;
    API.saveAfterTreat(param).then((res) => {
      if ((res.code = "200")) {
        Message.success("上传成功！");
      } else {
        Message.error("上传失败！");
      }
    });
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
      {
        key: 2,
        count: 2,
        time: "2020-05-27",
        infImage: "",
        infImageDes: "脊椎部位红色较深，炎症",
        MRI: "",
        MRIDes: "",
        CT: "",
        CTDes: "",
      },
      {
        key: 3,
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

    return (
      <Table
        bordered="true"
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content", y: 150 }}
      />
    );
  };

  showHistoryRecord = () => {
    this.setState({
      historyRecordVisible: true,
    });
  };

  historyRecordCancel = () => {
    this.setState({
      historyRecordVisible: false,
    });
  };

  showHistoryNIRS = () => {
    this.setState({
      historyNIRSVisible: true,
    });
  };

  historyNIRSCancle = () => {
    this.setState({
      historyNIRSVisible: false,
    });
  };

  onSearch = (value) => {
    console.log("searchparam", value);
  };

  renderNIRSLine = () => {
    let option = {
      legend: {},
      tooltip: {
        trigger: "axis",
        showContent: false,
      },
      dataset: {
        source: [
          [
            "product",
            "2020-05-21",
            "2020-05-30",
            "2020-06-02",
            "2020-06-07",
            "2020-06-12",
            "2020-06-19",
          ],
          ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
          ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
          ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
          ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
        ],
      },
      xAxis: { type: "category" },
      yAxis: { gridIndex: 0 },
      grid: { top: "10%" },
      series: [
        { type: "line", smooth: true, seriesLayoutBy: "row" },
        { type: "line", smooth: true, seriesLayoutBy: "row" },
        { type: "line", smooth: true, seriesLayoutBy: "row" },
        { type: "line", smooth: true, seriesLayoutBy: "row" },
      ],
    };
    return <ReactEcharts option={option} />;
  };

  //   渲染的页面
  render() {
    return (
      <div
        className="main-content"
        style={{
          display: "flex",
          paddingTop: 0,
          paddingRight: 0,
          overflow: "hidden",
        }}
      >
        <div className="left" style={{ width: "100%", overflow: "auto" }}>
          <div
            className="newRecord"
            style={{
              // marginTop: "30px",
              width: "100%",
              // height: 600,
              backgroundColor: "#ffffff",
              // border:"1px solid gray",
              // borderRadius: "10px",
              fontSize: "16px",
              // paddingLeft: "10px",
              // paddingRight: "10px",
            }}
          >
            <div
              style={{
                paddingTop: "30px",
                marginBottom: "20px",
                fontSize: "26px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              选择治疗模式 添加治疗记录
            </div>
            <Tabs type="card">
              <TabPane tab="红外热像模式记录" key="1">
                <RenderInfMode />
              </TabPane>
              <TabPane tab="核磁共振模式记录" key="2">
                <RenderMRIMode />
              </TabPane>
              <TabPane tab="CT 图像模式记录" key="3">
                <RenderCTMode />
              </TabPane>
              <TabPane tab="近红外数据记录模式" key="4">
                <Button type="primary">点击导入近红外数据</Button>
                <Button type="primary" style={{ marginLeft: "30px" }}>
                  点击进行近红外数据人工智能分析
                </Button>
                <br />
                <h2>智能分析文本报告</h2>
                <p>
                  经过脊椎疾病相关治疗方案，经近红外热技术的客观分析可见，患者脊椎疾病严重程度有了改善。
                </p>
              </TabPane>
            </Tabs>
          </div>
          <div
            className="analysis"
            style={{
              marginTop: "10px",
              width: "100%",
              backgroundColor: "#f9f9f9",
              fontSize: "16px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <div
              style={{
                paddingTop: "30px",
                marginBottom: "20px",
                fontSize: "26px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              本次治疗智能分析
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "400px",
                  height: 400,
                  border: "1px solid gray",
                  textAlign: "center",
                  paddingTop: "30px",
                }}
              >
                治疗前的红外热像图：
                <br />
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "block",
                    border: "1px solid gray",
                    marginLeft: "33%",
                  }}
                  src={feiaiImg}
                  alt=""
                />
                <Divider />
                治疗后的红外热像图：
                <br />
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "block",
                    border: "1px solid gray",
                    marginLeft: "33%",
                  }}
                  src={feiaiImg}
                  alt=""
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: 400,
                  border: "1px solid gray",
                  marginLeft: "20px",
                  padding: "30px",
                }}
              >
                <Button type="primary">
                  点击进行本次治疗红外热成像图像变化智能分析
                </Button>
                <h2 style={{ marginTop: "30px" }}>结论</h2>
                <p>背部炎症减少，有好转趋势</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="right"
          style={{ width: "300px", height: "100%", backgroundColor: "#f9f9f9" }}
        >
          {/* {this.renderSearch()} */}
          <Search
            placeholder="查询患者姓名、id"
            allowClear
            onSearch={this.onSearch}
            enterButton
            style={{ width: 260, margin: "20px 10px" }}
          />
          <div
            className="userInfo"
            style={{ display: "flex", fontSize: "14px" }}
          >
            <ul>
              <li>
                <strong>患者id:</strong>
                <span style={{ marginLeft: 15, padding: 8 }}>
                  {this.state.medRecord.patientId}
                </span>
              </li>
              <li>
                <strong>姓名:</strong>
                <span style={{ marginLeft: 15, padding: 8 }}>
                  {this.state.medRecord.name}
                </span>
              </li>
              <li>
                <strong>性别:</strong>
                <span style={{ marginLeft: 15 }}>
                  {this.state.medRecord.gender == 1 ? "男" : "女"}
                </span>
              </li>
              <li>
                <strong>年龄:</strong>
                <span style={{ marginLeft: 15 }}>
                  {this.getAge(this.state.medRecord.birthday)}
                </span>
              </li>
              <li>
                <strong>病人主诉:</strong>
                <span style={{ marginLeft: 15 }}>
                  {this.state.medRecord.chfCmp}
                </span>
              </li>
              <li>
                <strong>诊断:</strong>
                <span style={{ marginLeft: 15 }}>
                  {this.state.medRecord.disease}
                </span>
              </li>
            </ul>
          </div>
          <Button
            onClick={this.showHistoryRecord}
            style={{
              width: "80%",
              height: "100px",
              backgroundColor: "#52c41a",
              boxShadow: "0 0 9px gray",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "25px",
            }}
          >
            点击查看历史治疗记录
          </Button>
          <Button
            onClick={this.showHistoryNIRS}
            style={{
              width: "80%",
              height: "100px",
              backgroundColor: "#faad14",
              boxShadow: "0 0 9px gray",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "25px",
            }}
          >
            点击查看近红外治疗记录
          </Button>
        </div>
        <Modal
          title="历史治疗记录"
          visible={this.state.historyRecordVisible}
          // onOk={this.handleOk}
          onCancel={this.historyRecordCancel}
        >
          <div
            className="history"
            // style={{
            //   width: "100%",
            //   height: 400,
            //   backgroundColor: "#ffffff",
            //   borderRadius: "10px",
            //   fontSize: "16px",
            //   paddingLeft: "10px",
            //   paddingRight: "10px",
            //   paddingBottom: "10px",
            // }}
          >
            <div
            // style={{
            //   paddingTop: "30px",
            //   marginBottom: "20px",
            //   fontSize: "26px",
            //   textAlign: "center",
            //   fontWeight: "bold",
            // }}
            >
              {/* <FileAddOutlined style={{ marginRight: "10px" }} />
              历史治疗记录 */}
            </div>
            {this.renderHistoryTable()}
          </div>
        </Modal>
        <Modal
          title="历史近红外治疗记录"
          visible={this.state.historyNIRSVisible}
          // onOk={this.handleOk}
          onCancel={this.historyNIRSCancle}
        >
          <div
            className="jinhongwai"
            style={{
              marginTop: "30px",
              width: "100%",
              // height: 600,
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              fontSize: "16px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <div
              style={{
                paddingTop: "30px",
                marginBottom: "20px",
                fontSize: "26px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              历史近红外记录分析
              {this.renderNIRSLine()}
            </div>
          </div>
        </Modal>

        {/* {this.renderSearch()}
        <div className="userInfo" style={{ display: "flex" }}>
          <div
            style={{
              width: 300,
              height: 400,
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              fontSize: "16px",
              marginRight: "20px",
            }}
          >
            <div
              style={{
                paddingTop: "30px",
                marginBottom: "20px",
                fontSize: "26px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <UserAddOutlined style={{ marginRight: "10px" }} />
              患者基本信息
            </div>
            <ul>
              <li>
                <strong>患者id:</strong>
                <span style={{ marginLeft: 15, padding: 8 }}>
                  {this.state.medRecord.patientId}
                </span>
              </li>
              <li>
                <strong>姓名:</strong>
                <span style={{ marginLeft: 15, padding: 8 }}>
                  {this.state.medRecord.name}
                </span>
              </li>
              <li>
                <strong>性别:</strong>
                <span style={{ marginLeft: 15 }}>
                  {this.state.medRecord.gender == 1 ? "男" : "女"}
                </span>
              </li>
              <li>
                <strong>年龄:</strong>
                <span style={{ marginLeft: 15 }}>
                  {this.getAge(this.state.medRecord.birthday)}
                </span>
              </li>
              <li>
                <strong>病人主诉:</strong>
                <span style={{ marginLeft: 15 }}>
                  {this.state.medRecord.chfCmp}
                </span>
              </li>
              <li>
                <strong>诊断:</strong>
                <span style={{ marginLeft: 15 }}>
                  {this.state.medRecord.disease}
                </span>
              </li>
            </ul>
          </div>
          <div
            className="history"
            style={{
              width: "100%",
              height: 400,
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              fontSize: "16px",
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingBottom: "10px",
            }}
          >
            <div
              style={{
                paddingTop: "30px",
                marginBottom: "20px",
                fontSize: "26px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <FileAddOutlined style={{ marginRight: "10px" }} />
              历史治疗记录
            </div>
            {this.renderHistoryTable()}
          </div>
        </div>

        <div
          className="jinhongwai"
          style={{
            marginTop: "30px",
            width: "100%",
            // height: 600,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            fontSize: "16px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <div
            style={{
              paddingTop: "30px",
              marginBottom: "20px",
              fontSize: "26px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            历史近红外记录分析
            {this.renderNIRSLine()}
          </div>
        </div>

        <div
          className="newRecord"
          style={{
            marginTop: "30px",
            width: "100%",
            // height: 600,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            fontSize: "16px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <div
            style={{
              paddingTop: "30px",
              marginBottom: "20px",
              fontSize: "26px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            选择治疗模式 添加治疗记录
          </div>
          <Tabs type="card">
            <TabPane tab="红外热像模式记录" key="1">
              <RenderInfMode />
            </TabPane>
            <TabPane tab="核磁共振模式记录" key="2">
              <RenderMRIMode />
            </TabPane>
            <TabPane tab="CT 图像模式记录" key="3">
              <RenderCTMode />
            </TabPane>
            <TabPane tab="近红外数据记录模式" key="4">
              <Button type="primary">点击导入近红外数据</Button>
              <Button type="primary" style={{ marginLeft: "30px" }}>
                点击进行近红外数据人工智能分析
              </Button>
              <br />
              <h2>智能分析文本报告</h2>
              <p>
                经过脊椎疾病相关治疗方案，经近红外热技术的客观分析可见，患者脊椎疾病严重程度有了改善。
              </p>
            </TabPane>
          </Tabs>
        </div>

        <div */}
        {/* className="analysis"
          style={{
            marginTop: "30px",
            width: "100%",
            // height: 600,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            fontSize: "16px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <div
            style={{
              paddingTop: "30px",
              marginBottom: "20px",
              fontSize: "26px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            智能分析
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "400px",
                height: 400,
                border: "1px solid gray",
                textAlign: "center",
                paddingTop: "30px",
              }}
            >
              治疗前的红外热像图：
              <br />
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  display: "block",
                  border: "1px solid gray",
                  marginLeft: "33%",
                }}
                src={feiaiImg}
                alt=""
              />
              <Divider />
              治疗后的红外热像图：
              <br />
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  display: "block",
                  border: "1px solid gray",
                  marginLeft: "33%",
                }}
                src={feiaiImg}
                alt=""
              />
            </div>
            <div
              style={{
                width: "100%",
                height: 400,
                border: "1px solid gray",
                marginLeft: "20px",
                padding: "30px",
              }}
            >
              <Button type="primary">
                点击进行本次治疗红外热成像图像变化智能分析
              </Button>
              <h2 style={{ marginTop: "30px" }}>结论</h2>
              <p>背部炎症减少，有好转趋势</p>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default AddRecord;
