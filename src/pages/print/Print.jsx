import React, { Component, Fragment } from "react";
import { Descriptions, Button, Card, Message, Empty } from "antd";
import ReactEcharts from "echarts-for-react";
import html2canvas from "html2canvas";
// import jsPDF from 'jspdf';
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
      // curveData: undefined,
      // channelOneTime: [],
      // channelOneFrameNum: [],
      // channelOneToi: [],
      // channelOnedtHb: [],
      // channelOneThi: [],
      // channelOneDhb: [],
      // channelOnedhbO2: [],
      // channelTwoTime: [],
      // channelThreeTime: [],
      // channelFourTime: [],
      // channelOneData: {},
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
              // let frameNumList = [];
              let toiList = [];
              let dtHbList = [];
              let thiList = [];
              let dhbList = [];
              let dhbO2List = [];
              item.map((itemList, i) => {
                timeList.push(itemList.time);
                // frameNumList.push(itemList.frameNum);
                toiList.push(itemList.toi);
                dtHbList.push(itemList.dtHb);
                thiList.push(itemList.thi);
                dhbList.push(itemList.dhb);
                dhbO2List.push(itemList.dhbO2);
              });
              channel[index] = Object.assign(
                {},
                { timeList: timeList },
                // { frameNumList: frameNumList },
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
  // https://www.jianshu.com/p/956a0bab5152
  handlePrintClick = () => {
    // html2canvas(document.body).then(function(canvas){
    //   // 返回图片url
    //   let pageData = canvas.toDataURL('image/jpeg', 1.0)
    //   // 方向默认竖直，尺寸points，格式a4
    //   let pdf = new jsPDF('','pt','a4')
    //   pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height)
    //   pdf.sava('content.pdf')
    // })


    window.print();
  };
  getOptionChannelOne = () => {
    return {
      // title: {
      //   text: "通道1"
      // },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["toi", "dtHb", "thi", "dhb", "dhbO2"]
      },
      grid: {
        left: "3%",
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
        // {
        //   name: "frameNum",
        //   type: "line",
        //   stack: "总量",
        //   data: this.state.channelOne.frameNumList
        // },
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
      // title: {
      //   text: "通道2"
      // },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: [ "toi", "dtHb", "thi", "dhb", "dhbO2"]
      },
      grid: {
        left: "6%",
        right: "6%",
        bottom: "3%",
        weight: "90%",
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
        // {
        //   name: "frameNum",
        //   type: "line",
        //   stack: "总量",
        //   data: this.state.channelTwo.frameNumList
        // },
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
      // title: {
      //   text: "通道3"
      // },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: [ "toi", "dtHb", "thi", "dhb", "dhbO2"]
      },
      grid: {
        left: "3%",
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
        // {
        //   name: "frameNum",
        //   type: "line",
        //   stack: "总量",
        //   data: this.state.channelThree.frameNumList
        // },
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
      // title: {
      //   text: "通道4"
      // },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["toi", "dtHb", "thi", "dhb", "dhbO2"]
      },
      grid: {
        left: "3%",
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
        // {
        //   name: "frameNum",
        //   type: "line",
        //   stack: "总量",
        //   data: this.state.channelFour.frameNumList
        // },
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
    return (
      <div
        style={{
          margin: "30px",
          position: "relative",
          overflow:'auto'
        }}
      >
        <Button
          type="primary"
          style={{ position: "absolute", right: "20px" }}
          onClick={this.handlePrintClick}
        >
          点击打印此页面信息
        </Button>
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
                fontSize: "18px",
                color: "rgba(0,0,0,0.85)",
                fontWeight: "bold"
              }}
            >
              通道1
            </h2>
            {Object.keys(this.state.channelOne).length > 0 && (
              <ReactEcharts option={this.getOptionChannelOne()}></ReactEcharts>
            )}
            {Object.keys(this.state.channelOne).length === 0 && <Empty />}
          </Card>
          <Card>
            <h2
              style={{
                fontSize: "18px",
                color: "rgba(0,0,0,0.85)",
                fontWeight: "bold"
              }}
            >
              通道2
            </h2>
            {Object.keys(this.state.channelTwo).length > 0 && (
              <ReactEcharts option={this.getOptionChannelTwo()}></ReactEcharts>
            )}
            {Object.keys(this.state.channelTwo).length === 0 && <Empty />}
          </Card>
          <Card>
            <h2
              style={{
                fontSize: "18px",
                color: "rgba(0,0,0,0.85)",
                fontWeight: "bold"
              }}
            >
              通道3
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
                fontSize: "18px",
                color: "rgba(0,0,0,0.85)",
                fontWeight: "bold"
              }}
            >
              通道4
            </h2>
            {Object.keys(this.state.channelFour).length > 0 && (
              <ReactEcharts option={this.getOptionChannelFour()}></ReactEcharts>
            )}
            {Object.keys(this.state.channelFour).length === 0 && <Empty />}
          </Card>
        </div>
        <h2 style={{ marginTop: "24px", fontWeight: "bold" }}>
          医生诊断意见：
        </h2>
        <p>诊断意见内容</p>
      </div>
    );
  }
}

export default Print;
