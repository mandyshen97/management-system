import React, { Component, Fragment } from "react";
import { Descriptions, Button, Card, Message, Empty } from "antd";
import ReactEcharts from "echarts-for-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./print.less";
import API from "../../api/api";
class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medcineList: [],
      nonMedicineList: [],
      patientData: undefined,
      taskData: undefined,
      testType: undefined,
      channelOne: {},
      channelTwo: {},
      channelThree: {},
      channelFour: {}
    };
  }
  componentDidMount() {
    API.getMedicineList({}).then(res => {
      this.setState({
        medcineList: res.data
      });
    });
    API.getNonMedicineList({}).then(res => {
      this.setState({
        nonMedicineList: res.data
      });
    });
    let id = this.props.match.params.id;
    this.searchInfo(id);
  }
  searchInfo = id => {
    let param = {
      medId: id
    };
    API.InquirePatientTaskList(param).then(res => {
      console.log(res);
      this.setState({
        patientData: res.data[0].patient,
        taskData: res.data[0].task,
        testType: res.data[0].type
      });
      API.getBloodOxygenData({ path: res.data[0].task.dataPath }).then(res => {
        if (res.code === "200") {
          let fourChannelsData = res.data.fourChannelsData;
          let channel = [
            "channelOne",
            "channelTwo",
            "channelThree",
            "channelFour"
          ];
          fourChannelsData.map((item, index) => {
            if (item) {
              let timeList = [];
              let toiList = [];
              let dtHbList = [];
              let thiList = [];
              let dhbList = [];
              let dhbO2List = [];
              item.map((itemList, i) => {
                timeList.push(itemList.time);
                toiList.push(itemList.toi);
                dtHbList.push(itemList.dtHb);
                thiList.push(itemList.thi);
                dhbList.push(itemList.dhb);
                dhbO2List.push(itemList.dhbO2);
              });
              channel[index] = Object.assign(
                {},
                { timeList: timeList },
                { toiList: toiList },
                { dtHbList: dtHbList },
                { thiList: thiList },
                { dhbList: dhbList },
                { dhbO2List: dhbO2List }
              );
              if (index === 0) {
                this.setState({
                  channelOne: channel[index]
                });
              }
              if (index === 1) {
                this.setState({
                  channelTwo: channel[index]
                });
              }
              if (index === 2) {
                this.setState({
                  channelThree: channel[index]
                });
              }
              if (index === 3) {
                this.setState({
                  channelFour: channel[index]
                });
              }
            }
          });
        } else {
          Message.error("获取信息失败！");
        }
      });
    });
  };

  handlePrintClick = () => {
    html2canvas(this.refs.pdf, { scale: 2 }).then(canvas => {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;

      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = (contentWidth / 595.28) * 841.89;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //pdf页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 555.28;
      var imgHeight = (555.28 / contentWidth) * contentHeight;

      var pageData = canvas.toDataURL("image/jpeg", 1.0);

      var pdf = new jsPDF("", "pt", "a4");
      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, "JPEG", 20, 20, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, "JPEG", 20, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save(
        `${this.state.patientData.name}_${this.state.patientData.medId}.pdf`
      );
    });
  };

  getOptionChannelOne = () => {
    return {
      title: {
        text: "通道1"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["toi", "dtHb", "thi", "dhb", "dhbO2"]
      },
      grid: {
        left: "4%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.state.channelOne.timeList
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "toi",
          type: "line",
          stack: "总量",
          data: this.state.channelOne.toiList
        },
        {
          name: "dtHb",
          type: "line",
          stack: "总量",
          data: this.state.channelOne.dtHbList
        },
        {
          name: "thi",
          type: "line",
          stack: "总量",
          data: this.state.channelOne.thiList
        },
        {
          name: "dhb",
          type: "line",
          stack: "总量",
          data: this.state.channelOne.dhbList
        },
        {
          name: "dhbO2",
          type: "line",
          stack: "总量",
          data: this.state.channelOne.dhbO2List
        }
      ]
    };
  };
  getOptionChannelTwo = () => {
    return {
      title: {
        text: "通道2"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["toi", "dtHb", "thi", "dhb", "dhbO2"]
      },
      grid: {
        left: "4%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.state.channelTwo.timeList
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "toi",
          type: "line",
          stack: "总量",
          data: this.state.channelTwo.toiList
        },
        {
          name: "dtHb",
          type: "line",
          stack: "总量",
          data: this.state.channelTwo.dtHbList
        },
        {
          name: "thi",
          type: "line",
          stack: "总量",
          data: this.state.channelTwo.thiList
        },
        {
          name: "dhb",
          type: "line",
          stack: "总量",
          data: this.state.channelTwo.dhbList
        },
        {
          name: "dhbO2",
          type: "line",
          stack: "总量",
          data: this.state.channelTwo.dhbO2List
        }
      ]
    };
  };
  getOptionChannelThree = () => {
    return {
      title: {
        text: "通道3"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["toi", "dtHb", "thi", "dhb", "dhbO2"]
      },
      grid: {
        left: "4%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.state.channelThree.timeList
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "toi",
          type: "line",
          stack: "总量",
          data: this.state.channelThree.toiList
        },
        {
          name: "dtHb",
          type: "line",
          stack: "总量",
          data: this.state.channelThree.dtHbList
        },
        {
          name: "thi",
          type: "line",
          stack: "总量",
          data: this.state.channelThree.thiList
        },
        {
          name: "dhb",
          type: "line",
          stack: "总量",
          data: this.state.channelThree.dhbList
        },
        {
          name: "dhbO2",
          type: "line",
          stack: "总量",
          data: this.state.channelThree.dhbO2List
        }
      ]
    };
  };
  getOptionChannelFour = () => {
    return {
      title: {
        text: "通道4"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["toi", "dtHb", "thi", "dhb", "dhbO2"]
      },
      grid: {
        left: "4%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.state.channelFour.timeList
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "toi",
          type: "line",
          stack: "总量",
          data: this.state.channelFour.toiList
        },
        {
          name: "dtHb",
          type: "line",
          stack: "总量",
          data: this.state.channelFour.dtHbList
        },
        {
          name: "thi",
          type: "line",
          stack: "总量",
          data: this.state.channelFour.thiList
        },
        {
          name: "dhb",
          type: "line",
          stack: "总量",
          data: this.state.channelFour.dhbList
        },
        {
          name: "dhbO2",
          type: "line",
          stack: "总量",
          data: this.state.channelFour.dhbO2List
        }
      ]
    };
  };

  render() {
    const WCSTTask = {
      应答总数: "ta",
      正确应答数: "cr",
      正确应答百分比: "pcr",
      错误应答数: "te",
      错误应答数百分比: "pe",
      持续性应答数: "pr",
      持续性应答数百分比: "ppr",
      持续性错误数: "pse",
      持续性错误的百分数: "ppe",
      非持续性错误: "npe",
      非持续性错误百分比: "pnpe",
      概念化水平应答数: "clr",
      概念化水平百分数: "pclr",
      完成分类数: "cc",
      完成第一个分类所需应答数: "tcfc",
      不能维持完整分类: "fm",
      学习到学会: "l2l",
      用时: "useTime"
    };
    const patientData = this.state.patientData;
    const taskData = this.state.taskData;
    const testType = this.state.testType;
    let medicine = "";
    let nonMedicine = "";
    if (taskData) {
      if (taskData.medArray.length > 0) {
        taskData.medArray.map((item, index) => {
          this.state.medcineList.map(listItem => {
            if (item === listItem.id) {
              medicine += `${listItem.name}  `;
            }
          });
        });
      }
      if (taskData.nonMedArray.length > 0) {
        taskData.nonMedArray.map((item, index) => {
          this.state.nonMedicineList.map(listItem => {
            if (item === listItem.id) {
              nonMedicine += `${listItem.name}  `;
            }
          });
        });
      }
    }
    const title = this.state.patientData
      ? `${this.state.patientData.name}_${this.state.patientData.medId}`
      : "";
    return (
      <div
        style={{
          margin: "10px 50px",
          position: "relative",
          overflow: "auto",
          width: "calc(100% - 100px)"
        }}
      >
        <Button
          type="primary"
          style={{ position: "absolute", right: "20px" }}
          onClick={this.handlePrintClick}
        >
          点击打印此页面信息
        </Button>
        <div ref="pdf" style={{ padding: "16px" }}>
          <h1 style={{ width: "260px", margin: "auto" }}>{title}</h1>
          <div>
            {patientData !== undefined &&
              taskData !== undefined &&
              testType !== undefined && (
                <Descriptions bordered title="患者信息">
                  <Descriptions.Item label="患者姓名">
                    {patientData.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="患者标注">
                    {testType}
                  </Descriptions.Item>
                  <Descriptions.Item label="患者编号">
                    {patientData.medId}
                  </Descriptions.Item>
                  <Descriptions.Item label="患者性别">
                    {patientData.gender === 1 ? "男" : "女"}
                  </Descriptions.Item>
                  <Descriptions.Item label="患者年龄">
                    {patientData.age}
                  </Descriptions.Item>
                  <Descriptions.Item label="患者体重(kg)">
                    {patientData.weight}
                  </Descriptions.Item>
                  <Descriptions.Item label="患者身高(cm)">
                    {patientData.height}
                  </Descriptions.Item>
                  <Descriptions.Item label="测试前服用药物">
                    {taskData.medArray.length > 0 ? medicine : "未服用药物"}
                  </Descriptions.Item>
                  <Descriptions.Item label="服药后多久进行测试">
                    {taskData.medInt ? taskData.medInt : "无数据"}
                  </Descriptions.Item>
                  <Descriptions.Item label="非药物干预">
                    {taskData.nonMedArray.length > 0 ? nonMedicine : "无干预"}
                  </Descriptions.Item>
                  <Descriptions.Item label="测试近红外时间">
                    {taskData.time}
                  </Descriptions.Item>
                </Descriptions>
              )}
          </div>
          <div>
            {testType === 0 && (
              <Fragment>
                <Descriptions
                  bordered
                  title="任务测试得分"
                  style={{ marginTop: "20px" }}
                >
                  {Object.keys(WCSTTask).map((item, index) => {
                    let k = WCSTTask[item];
                    return (
                      <Descriptions.Item key={index} label={item}>
                        {taskData[k]}
                      </Descriptions.Item>
                    );
                  })}
                </Descriptions>
              </Fragment>
            )}
          </div>
          <div className="curve" style={{ marginTop: "24px" }}>
            <Card>
              <h2
                style={{
                  color: "gray",
                  borderBottom: "2px solid #e8e8e8"
                }}
              >
                通道1数据折线图
              </h2>
              {Object.keys(this.state.channelOne).length > 0 && (
                <ReactEcharts
                  option={this.getOptionChannelOne()}
                ></ReactEcharts>
              )}
              {Object.keys(this.state.channelOne).length === 0 && <Empty />}
            </Card>
            <Card>
              <h2
                style={{
                  color: "gray",
                  borderBottom: "2px solid #e8e8e8"
                }}
              >
                通道2数据折线图
              </h2>
              {Object.keys(this.state.channelTwo).length > 0 && (
                <ReactEcharts
                  option={this.getOptionChannelTwo()}
                  lazyUpdate={true}
                ></ReactEcharts>
              )}
              {Object.keys(this.state.channelTwo).length === 0 && <Empty />}
            </Card>
            <Card>
              <h2
                style={{
                  color: "gray",
                  borderBottom: "2px solid #e8e8e8"
                }}
              >
                通道3数据折线图
              </h2>
              {Object.keys(this.state.channelThree).length > 0 && (
                <ReactEcharts
                  option={this.getOptionChannelThree()}
                ></ReactEcharts>
              )}
              {Object.keys(this.state.channelThree).length === 0 && <Empty />}
            </Card>
            <Card>
              <h2
                style={{
                  color: "gray",
                  borderBottom: "2px solid #e8e8e8"
                }}
              >
                通道4数据折线图
              </h2>
              {Object.keys(this.state.channelFour).length > 0 && (
                <ReactEcharts
                  option={this.getOptionChannelFour()}
                ></ReactEcharts>
              )}
              {Object.keys(this.state.channelFour).length === 0 && <Empty />}
            </Card>
          </div>
          <h2 style={{ marginTop: "24px", fontWeight: "bold" }}>
            医生诊断意见：
          </h2>
          <p>诊断意见内容</p>
        </div>
      </div>
    );
  }
}

export default Print;
