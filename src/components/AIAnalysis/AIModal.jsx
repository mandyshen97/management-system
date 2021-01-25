import React, { Component } from "react";
import {
  Modal,
  Divider,
  Card,
  Col,
  Row,
  Image,
  Input,
  Radio,
  Tabs,
} from "antd";
import "./AI-modal.less";
import PieDiv from "./PieDiv";
import _001_before from "../../assets/images/001_before.jpg";
import _001_before_kuangxuan from "../../assets/images/001_before_kuangxuan.jpg";
const { TabPane } = Tabs;

class AIModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
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
      jingzhuiBeforeValue: 1,
      jingzhuiAfterValue: 1,
      yaozhuiBeforeValue: 1,
      yaozhuiAfterValue: 1,
      tabKey: "tab1",
    };
    this.jingzhuiData_after = [
      { value: 0.02, name: "正常" },
      { value: 0.02, name: "疲劳" },
      { value: 0.03, name: "劳损或炎性改变" },
      { value: 0.09, name: "颈椎负荷过重" },
      { value: 0.84, name: "颈椎病或颈肩综合征或颈椎退行性改变" },
    ];
    this.jingzhuiData_before = [
      { value: 0.02, name: "正常" },
      { value: 0.02, name: "疲劳" },
      { value: 0.03, name: "劳损或炎性改变" },
      { value: 0.03, name: "颈椎负荷过重" },
      { value: 0.9, name: "颈椎病或颈肩综合征或颈椎退行性改变" },
    ];
    this.yaozhuiData_before = [
      { value: 0.0, name: "正常" },
      { value: 0.02, name: "肌肉紧张/疲劳" },
      { value: 0.03, name: "肌筋膜炎" },
      { value: 0.09, name: "腰肌劳损" },
      { value: 0.86, name: "腰椎退行性改变、腰椎间盘突出症" },
    ];
    this.yaozhuiData_after = [
      { value: 0.02, name: "正常" },
      { value: 0.02, name: "肌肉紧张/疲劳" },
      { value: 0.03, name: "肌筋膜炎" },
      { value: 0.15, name: "腰肌劳损" },
      { value: 0.78, name: "腰椎退行性改变、腰椎间盘突出症" },
    ];
  }

  handleOk = () => {
    this.props.handleModalVisible(false);
  };

  handleCancel = () => {
    this.props.handleModalVisible(false);
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    // setValue(e.target.value);
    this.setState({});
  };

  callback = (key) => {
    console.log(key);
  };

  renderTabs = () => {
    const { patientId, name, count } = this.props.record;
    return (
      <Tabs onChange={this.callback} type="card">
        <TabPane tab="治疗前后分析——颈椎" key="1">
          <Row>
            <Col span={4}>
              <Card
                title="治疗前上传的红外热像图"
                style={{ textAlign: "center" }}
              >
                <Image src={_001_before} width={128} height={162} />
                <Image src={_001_before_kuangxuan} width={128} height={162} />
              </Card>
              <Card
                title="治疗后上传的红外热像图"
                style={{ textAlign: "center" }}
              >
                <Image src={_001_before} width={128} height={162} />
                <Image src={_001_before_kuangxuan} width={128} height={162} />
              </Card>
            </Col>
            <Col span={20}>
              <Card title="智能分析结果">
                <Row>
                  <Col span={16}>
                    <PieDiv
                      data={this.jingzhuiData_before}
                      name={"人体颈部红外热像人工智能分析"}
                      color={[
                        "#5470c6",
                        "#91cc75",
                        "#fac858",
                        "#ee6666",
                        "#73c0de",
                      ]}
                    />
                  </Col>
                  <Col span={8}>
                    <p>医生填写诊断意见</p>
                    <Input placeholder="颈部见片状热区扩大，提示有退行性变化可能" />
                    <p style={{ marginTop: 20 }}>人工智能分析结果是否正确</p>
                    <Radio.Group
                      onChange={this.onChange}
                      value={this.state.jingzhuiBeforeValue}
                    >
                      <Radio value={1}>正确</Radio>
                      <Radio value={2}>错误</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                <Divider />
                <Row>
                  <Col span={16}>
                    <PieDiv
                      data={this.jingzhuiData_after}
                      name={"人体颈部红外热像人工智能分析"}
                      color={[
                        "#5470c6",
                        "#91cc75",
                        "#fac858",
                        "#ee6666",
                        "#73c0de",
                      ]}
                    />
                  </Col>
                  <Col span={8}>
                    <p>医生填写诊断意见</p>
                    <Input placeholder="颈部见片状热区扩大，提示有退行性变化可能" />
                    <p style={{ marginTop: 20 }}>人工智能分析结果是否正确</p>
                    <Radio.Group
                      onChange={this.onChange}
                      value={this.state.yaozhuiBeforeValue}
                    >
                      <Radio value={1}>正确</Radio>
                      <Radio value={2}>错误</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
              </Card>
              <Card>
                <h3 style={{ fontWeight: "bold" }}>前后对比说明：</h3>
                <p>
                  治疗前“颈椎病或颈肩综合征或颈椎退行性改变”的概率为0.90，治疗后“颈椎病或颈肩综合征或颈椎退行性改变”的概率为0.84，可见本次治疗使得颈椎部位患病情况有所好转。
                </p>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="治疗前后分析——腰椎" key="2">
          <Row>
            <Col span={4}>
              <Card title="治疗前上传的红外热像图" style={{ textAlign: "center" }}>
                <Image src={_001_before} width={128} height={162} />
                <Image src={_001_before_kuangxuan} width={128} height={162} />
              </Card>
              <Card title="治疗后上传的红外热像图" style={{ textAlign: "center" }}>
                <Image src={_001_before} width={128} height={162} />
                <Image src={_001_before_kuangxuan} width={128} height={162} />
              </Card>
            </Col>
            <Col span={20}>
              <Card title="智能分析结果">
                <Row>
                  <Col span={16}>
                    <PieDiv
                      data={this.yaozhuiData_before}
                      name={"人体腰部红外热像人工智能分析"}
                      color={[
                        "#c23531",
                        "#2f4554",
                        "#61a0a8",
                        "#d48265",
                        "#ca8622",
                        "#91c7ae",
                        "#749f83",
                        "#bda29a",
                        "#6e7074",
                        "#546570",
                        "#c4ccd3",
                      ]}
                    />
                  </Col>
                  <Col span={8}>
                    <p>医生填写诊断意见</p>
                    <Input placeholder="腰部见片状热区扩大，提示有退行性变化可能" />
                    <p style={{ marginTop: 20 }}>人工智能分析结果是否正确</p>
                    <Radio.Group
                      onChange={this.onChange}
                      value={this.state.jingzhuiAfterValue}
                    >
                      <Radio value={1}>正确</Radio>
                      <Radio value={2}>错误</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                <Divider />
                <Row>
                  <Col span={16}>
                    <PieDiv
                      data={this.yaozhuiData_after}
                      name={"人体腰部红外热像人工智能分析"}
                      color={[
                        "#c23531",
                        "#2f4554",
                        "#61a0a8",
                        "#d48265",
                        "#ca8622",
                        "#91c7ae",
                        "#749f83",
                        "#bda29a",
                        "#6e7074",
                        "#546570",
                        "#c4ccd3",
                      ]}
                    />
                  </Col>
                  <Col span={8}>
                    <p>医生填写诊断意见</p>
                    <Input placeholder="腰部见片状热区扩大，提示有退行性变化可能" />
                    <p style={{ marginTop: 20 }}>人工智能分析结果是否正确</p>
                    <Radio.Group
                      onChange={this.onChange}
                      value={this.state.yaozhuiAfterValue}
                    >
                      <Radio value={1}>正确</Radio>
                      <Radio value={2}>错误</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
              </Card>
              <Card>
                <h3 style={{ fontWeight: "bold" }}>前后对比说明：</h3>
                <p>
                  治疗前“腰椎退行性改变、腰椎间盘突出症”的概率为0.86，
                  治疗后“腰椎退行性改变、腰椎间盘突出症”的概率为0.78，
                  可见本次治疗使得腰椎部位患病情况有所好转。
                </p>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    );
  };

  render() {
    console.log("props", this.props);
    console.log("this.state.isModalVisible", this.state.isModalVisible);
    const { patientId, name, count } = this.props.record;
    return (
      <>
        <Modal
          title={`${patientId}_${name}_第${count}次治疗智能分析`}
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="80%"
          style={{ paddingTop: 5 }}
        >
          {this.renderTabs()}

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
              {`${patientId}_${name}_第${count}次治疗智能分析`}
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
                    <Button type="primary" onClick={this.handleAnalysisBefore}>
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
                        疾病分类： {this.state.anaResultBefore.classification}
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
                    <Button type="primary" onClick={this.handleAnalysisAfter}>
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
                        疾病分类： {this.state.anaResultAfter.classification}
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
        </Modal>
      </>
    );
  }
}

export default AIModal;
