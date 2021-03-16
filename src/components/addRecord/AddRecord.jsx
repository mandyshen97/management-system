import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import RenderInfMode from "./RenderInfMode";
import RenderCTMode from "./RenderCTMode";
import RenderMRIMode from "./RenderMRIMode";
import RenderHistoryTable from "../AIAnalysis/RenderHistoryTable";
import _ from "lodash";
import {
  Input,
  Form,
  Divider,
  Modal,
  Button,
  Message,
  Tabs,
  Spin,
} from "antd";
import "./add-record.less";
import API from "../../api/api";
import { getDesFromClassification } from "../../utils/diseaseInfo";
import { getAge } from "../../utils/dateUtils";

const { TabPane } = Tabs;
const { Search } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class AddRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyRecordVisible: false, // 是否显示历史治疗记录 Modal
      historyNIRSVisible: false, // 是否显示近红外记录 Modal
      currentTablePage: 1, // 历史治疗记录表格当前页码
      existPatient: false, // 是否有患者信息
      patientInfo: {}, // 患者基本信息
      patientId: "", // 患者id
      historyRecords: [], // 患者历史治疗记录
      treatCount: 0, // 治疗次数
      analysisFileBefore: {
        img: "",
        txt: {},
      }, // 分析需要上传的内容
      analysisFileAfter: {
        img: "",
        txt: {},
      }, // 分析需要上传的内容
      anaResultBefore: { imgUrl: "", classification: "", loading: false }, // 治疗前的智能分析结果
      anaResultAfter: { imgUrl: "", classification: "", loading: false }, //治疗后的智能分析结果
    };
  }

  // 子组件传来的 图片、 txt 信息
  handleFile = async (v) => {
    const imgInfoBefore = _.get(v, "fileBefore.imgInfoBefore");
    const txtInfoBefore = _.get(v, "fileBefore.txtInfoBefore");
    const imgInfoAfter = _.get(v, "fileAfter.imgInfoAfter");
    const txtInfoAfter = _.get(v, "fileAfter.txtInfoAfter");
    let new_analysisFileBefore = this.state.analysisFileBefore;
    new_analysisFileBefore.img = await getBase64(imgInfoBefore);
    new_analysisFileBefore.txt = txtInfoBefore;
    let new_analysisFileAfter = this.state.analysisFileAfter;
    new_analysisFileAfter.img = await getBase64(imgInfoAfter);
    new_analysisFileAfter.txt = txtInfoAfter;
    this.setState({
      analysisFileBefore: new_analysisFileBefore,
      analysisFileAfter: new_analysisFileAfter,
    });
  };

  //   页面渲染前执行函数
  componentDidMount() {
    let id = this.props.match.params.id; // 获取url中带的id
    if (id) {
      this.setState({
        patientId: id,
      });
      this.queryPatient({ patientId: id }); // 查询患者信息
      this.queryHistory({ patientId: id }); // 查询历史治疗记录
    }
  }

  // 查询表单
  renderSearch = () => {
    return (
      <Form
        layout="inline"
        style={{ marginBottom: 30 }}
        onFinish={this.handleSearch}
        ref="patientQueryForm"
      >
        <Form.Item name="patientId" label="患者id：">
          <Input style={{ width: 100, marginRight: 15 }} placeholder="患者id" />
        </Form.Item>
        <Form.Item name="patientName" label="患者姓名：">
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

  handleSearch = (v) => {
    this.queryPatient(v);
    this.queryHistory(v);
  };

  // 患者基本信息查询
  queryPatient = (v) => {
    let param = {};
    if (typeof v === "object") {
      param = v;
      this.setState({
        patientId: _.get(v, "patientId"),
      });
    } else {
      // 判断搜索框输入的参数是id还是name(包括搜索框输入，url获取id 这两种)
      if (isNaN(v)) {
        param.patientName = v;
      } else {
        param.patientId = v;
        this.setState({
          patientId: v,
        });
      }
    }
    // 获取患者信息
    API.getPatient(param).then((res) => {
      const { data, code, msg } = res;
      let patientData = data[0];
      if (code === "200" && (data || []).length === 1) {
        this.setState({
          patientInfo: patientData,
          existPatient: true,
        });
      } else if (code === "200") {
        this.setState({
          patientInfo: {},
          existPatient: false,
        });
        Message.warning("您查询的病人不存在！");
      } else {
        Message.warning(msg);
      }
    });
  };

  // 获取历史治疗记录
  queryHistory = (v) => {
    let param = {};
    if (typeof v === "object") {
      param = v;
    } else {
      // 判断搜索框输入的参数是id还是name(包括搜索框输入，url获取id 这两种)
      if (isNaN(v)) {
        param.patientName = v;
      } else {
        param.patientId = v;
      }
    }
    API.getHistoryRecords(param).then((res) => {
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

  // 上传治疗前的内容
  handleSaveBeforeTreat = () => {
    const values = this.refs.beforeTreatForm.getFieldsValue();
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
    const values = this.refs.afterTreatForm.getFieldsValue();
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

  // 分析治疗前
  handleAnalysisBefore = () => {
    console.log("this.state.patientId", this.state.patientId);
    let anaResultBefore = this.state.anaResultBefore;
    anaResultBefore.loading = true;
    this.setState({
      anaResultBefore,
    });
    let formData = new FormData();
    formData.append("original_img", this.state.analysisFileBefore.img);
    formData.append("temp_matrix", this.state.analysisFileBefore.txt);
    formData.append("treatCount", this.state.treatCount);
    formData.append("patientId", this.state.patientId);
    formData.append("process", "before");

    API.getAnalyseResult(formData)
      .then((res) => {
        let new_anaResultBefore = this.state.anaResultBefore;
        new_anaResultBefore.imgUrl = _.get(res, "neck_area");
        new_anaResultBefore.classification = _.get(res, "classification");
        this.setState({
          anaResultBefore: new_anaResultBefore,
        });
      })
      .catch((err) => {
        Message.error("分析失败！");
      })
      .finally(() => {
        let new_anaResultBefore = this.state.anaResultBefore;
        new_anaResultBefore.loading = false;
        this.setState({
          anaResultBefore: new_anaResultBefore,
        });
      });
  };

  // 分析治疗后
  handleAnalysisAfter = () => {
    let anaResultAfter = this.state.anaResultAfter;
    anaResultAfter.loading = true;
    this.setState({
      anaResultAfter,
    });
    var formData = new FormData();
    formData.append("original_img", this.state.analysisFileAfter.img);
    formData.append("temp_matrix", this.state.analysisFileAfter.txt);
    formData.append("treatCount", this.state.treatCount);
    formData.append("patientId", this.state.patientId);
    formData.append("process", "after");
    API.getAnalyseResult(formData)
      .then((res) => {
        let new_anaResultAfter = this.state.anaResultAfter;
        new_anaResultAfter.imgUrl = _.get(res, "neck_area");
        new_anaResultAfter.classification = _.get(res, "classification");
        this.setState({
          anaResultAfter: new_anaResultAfter,
        });
      })
      .catch((err) => {
        Message.error("分析失败！");
      })
      .finally(() => {
        let new_anaResultAfter = this.state.anaResultAfter;
        new_anaResultAfter.loading = false;
        this.setState({
          anaResultAfter: new_anaResultAfter,
        });
      });
  };

  // 是否显示历史治疗记录
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

  // 是否显示近红外记录
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

  // 渲染近红外记录的曲线
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

  // 渲染整体的页面
  render() {
    const { existPatient, patientInfo, historyRecords } = this.state;
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
        <div
          className="left"
          style={{
            width: "100%",
            overflow: "auto",
            paddingRight: "24px",
            position: "relative",
          }}
        >
          {existPatient && (
            <div>
              <div
                className="newRecord"
                style={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  fontSize: "16px",
                }}
              >
                {/* <div
                  style={{
                    paddingTop: "30px",
                    marginBottom: "20px",
                    fontSize: "26px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  选择治疗模式 添加治疗记录
                </div> */}
                <Tabs type="card">
                  <TabPane tab="红外热像模式记录" key="1">
                    <RenderInfMode
                      patientInfo={patientInfo}
                      handleFile={this.handleFile}
                      historyRecords={historyRecords}
                      treatCount={this.state.treatCount}
                    />
                  </TabPane>
                  {/* <TabPane tab="核磁共振模式记录" key="2">
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
                  </TabPane> */}
                </Tabs>
              </div>
              {/* <div
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
                      src={this.state.analysisFileBefore.img}
                      alt="治疗前的红外热像图"
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
                      src={this.state.analysisFileAfter.img}
                      alt="治疗后的红外热像图"
                    />
                  </div>
                  <div
                    style={{
                      width: "60%",
                      height: 400,
                      border: "1px solid gray",
                      marginLeft: "20px",
                      padding: "30px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div className="before" style={{ flexGrow: 1 }}>
                        <Button
                          type="primary"
                          onClick={this.handleAnalysisBefore}
                        >
                          点击分析治疗前
                        </Button>
                        <Spin spinning={this.state.anaResultBefore.loading}>
                          <img
                            style={{
                              width: "100px",
                              height: "100px",
                              display: "block",
                              border: "1px solid gray",
                              marginTop: "10px",
                              // marginLeft: "33%",
                            }}
                            src={this.state.anaResultBefore.imgUrl}
                            alt="治疗前的分析图"
                          />
                          <span>
                            疾病分类：{" "}
                            {this.state.anaResultBefore.classification}
                          </span>
                          <br />
                          <span>
                            疾病描述：{" "}
                            {getDesFromClassification(
                              this.state.anaResultBefore.classification
                            )}
                          </span>
                        </Spin>
                      </div>
                      <div
                        className="after"
                        // style={{ flexGrow: 1, marginLeft: 10 }}
                      >
                        <Button
                          type="primary"
                          onClick={this.handleAnalysisAfter}
                        >
                          点击分析治疗后
                        </Button>
                        <Spin spinning={this.state.anaResultAfter.loading}>
                          <img
                            style={{
                              width: "100px",
                              height: "100px",
                              display: "block",
                              border: "1px solid gray",
                              // marginLeft: "33%",
                              marginTop: "10px",
                            }}
                            src={this.state.anaResultAfter.imgUrl}
                            alt="治疗后的分析图"
                          />
                          <span>
                            疾病分类：{" "}
                            {this.state.anaResultAfter.classification}
                          </span>
                          <br />
                          <span>
                            疾病描述：{" "}
                            {getDesFromClassification(
                              this.state.anaResultAfter.classification
                            )}
                          </span>
                        </Spin>
                      </div>
                    </div>
                    <Divider />
                    <h2 style={{ marginTop: "20px" }}>结论:</h2>
                    <p>背部炎症减少，有好转趋势</p>
                  </div>
                </div>
              </div>
            */}
            </div>
          )}
          {!existPatient && (
            <div
              style={{
                position: "absolute",
                top: "100px",
              }}
            >
              <h2 style={{ marginBottom: "30px" }}>
                请输入需要添加记录的患者信息：
              </h2>
              {this.renderSearch()}
            </div>
          )}
        </div>
        <div
          className="right"
          style={{ width: "300px", height: "100%", backgroundColor: "#f9f9f9" }}
        >
          <Search
            placeholder="查询患者姓名、id"
            onSearch={this.handleSearch}
            enterButton
            style={{ width: 260, margin: "20px 10px" }}
          />

          {existPatient && (
            <div>
              <div
                className="userInfo"
                style={{ display: "flex", fontSize: "14px" }}
              >
                <ul>
                  <li>
                    <strong>科室:</strong>
                    <span style={{ marginLeft: 15, padding: 8 }}>
                      {_.get(this.state.patientInfo, "department", "")}
                    </span>
                  </li>
                  <li>
                    <strong>主治医生:</strong>
                    <span style={{ marginLeft: 15, padding: 8 }}>
                      {_.get(this.state.patientInfo, "doctorName", "")}
                    </span>
                  </li>
                  <li>
                    <strong>患者id:</strong>
                    <span style={{ marginLeft: 15, padding: 8 }}>
                      {_.get(this.state.patientInfo, "id")}
                    </span>
                  </li>
                  <li>
                    <strong>姓名:</strong>
                    <span style={{ marginLeft: 15, padding: 8 }}>
                      {_.get(this.state.patientInfo, "name", "")}
                    </span>
                  </li>
                  <li>
                    <strong>性别:</strong>
                    <span style={{ marginLeft: 15 }}>
                      {_.get(this.state.patientInfo, "gender") === 1
                        ? "男"
                        : "女"}
                    </span>
                  </li>
                  <li>
                    <strong>年龄:</strong>
                    <span style={{ marginLeft: 15 }}>
                      {getAge(_.get(this.state.patientInfo, "birthday", ""))}
                    </span>
                  </li>
                  <li>
                    <strong>病人主诉:</strong>
                    <span style={{ marginLeft: 15 }}>
                      {_.get(this.state.patientInfo, "chief", "")}
                    </span>
                  </li>
                  <li>
                    <strong>诊断:</strong>
                    <span style={{ marginLeft: 15 }}>
                      {_.get(this.state.patientInfo, "opinion", "")}
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
          )}
        </div>

        <Modal
          title={`历史治疗记录——${_.get(this.state.patientInfo, "id")}_${_.get(
            this.state.patientInfo,
            "name"
          )}`}
          visible={this.state.historyRecordVisible}
          onCancel={this.historyRecordCancel}
          width="90%"
          style={{
            position: "absolute",
            top: "8px",
            left: "5%",
          }}
          footer={null}
        >
          <div
            className="history"
            style={{
              width: "100%",
              height: "70vh",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          >
            <RenderHistoryTable historyRecords={this.state.historyRecords} />
          </div>
        </Modal>
        <Modal
          title={`历史近红外记录——${_.get(
            this.state.patientInfo,
            "id"
          )}_${_.get(this.state.patientInfo, "name")}`}
          visible={this.state.historyNIRSVisible}
          onCancel={this.historyNIRSCancle}
          width="90%"
          style={{
            position: "absolute",
            top: "8px",
            left: "5%",
          }}
          footer={null}
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
        </Modal>
      </div>
    );
  }
}

export default AddRecord;
