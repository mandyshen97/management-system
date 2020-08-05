import React, { Component } from "react";
import "./patient-query.less";
import {
  Input,
  Button,
  Select,
  Table,
  Form,
  Row,
  DatePicker,
  Message,
  Drawer,
  Col,
  Modal,
} from "antd";
import API from "../../api/api";
import { Link } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
const { Option } = Select;
const { TextArea } = Input;

class PatientQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientInfo: {},
      drawerSwitch: false,
      modalSwitch: false,
      helpSwitch: false,
      tableSwitch: false,
      updateSwitch: false,
      chosenIndex: 0,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px",
      },
      listData: [],
      totalNum: 0,
      pageNum: 1,
      pageSize: 10,
      diseaseList: [],

      doctorList: [],
      selectAuxliMedicine: [
        <Option key={"青黛"}>{"青黛"}</Option>,
        <Option key={"蛤蚧"}>{"蛤蚧"}</Option>,
        <Option key={"白芥子"}>{"白芥子"}</Option>,
        <Option key={"苏子"}>{"苏子"}</Option>,
        <Option key={"莱菔子"}>{"莱菔子"}</Option>,
        <Option key={"麻黄"}>{"麻黄"}</Option>,
        <Option key={"僵蚕"}>{"僵蚕"}</Option>,
        <Option key={"陈皮"}>{"陈皮"}</Option>,
        <Option key={"半夏"}>{"半夏"}</Option>,
        <Option key={"茯苓"}>{"茯苓"}</Option>,
        <Option key={"甘草"}>{"甘草"}</Option>,

        <Option key={"白芍"}>{"白芍"}</Option>,
        <Option key={"白术"}>{"白术"}</Option>,
        <Option key={"茯苓"}>{"茯苓"}</Option>,
        <Option key={"郁金"}>{"郁金"}</Option>,
        <Option key={"香附"}>{"香附"}</Option>,
        <Option key={"八月札"}>{"八月札"}</Option>,
        <Option key={"桂枝"}>{"桂枝"}</Option>,
        <Option key={"炙甘草"}>{"炙甘草"}</Option>,
        <Option key={"乌药"}>{"乌药"}</Option>,
        <Option key={"生姜"}>{"生姜"}</Option>,
        <Option key={"大枣"}>{"大枣"}</Option>,
        <Option key={"沉香"}>{"沉香"}</Option>,
      ],
      selectMainMedicine: [
        <Option key={"环磷酰胺"}>{"环磷酰胺"}</Option>,
        <Option key={"阿霉素"}>{"阿霉素"}</Option>,
        <Option key={"依托泊甙"}>{"依托泊甙"}</Option>,
      ],
    };
  }

  // 抽屉等组件关闭
  onClose = () => {
    this.setState({
      drawerSwitch: false,
      tableSwitch: false,
    });
  };
  // textAnalysis(id) {
  //   console.log(id)
  //   this.props.history.push('/admin/textAnanlysis');
  // }

  // 删除按钮实现
  remove(id) {
    this.setState({
      chosenIndex: id,
      modalSwitch: true,
    });
  }

  showHelp() {
    this.setState({
      helpSwitch: true,
    });
  }

  showUpdate() {
    this.setState({
      updateSwitch: true,
    });
  }

  // 查看详情按钮实现
  show(record) {
    let newPatientInfo = {};
    Object.keys(record).map((item) => {
      newPatientInfo[item] = record[item] === null ? "暂无" : record[item];
    });
    console.log(record);
    this.setState({
      drawerSwitch: true,
      patientInfo: newPatientInfo,
    });
  }

  //  检测数据按钮实现
  detectionData(record) {
    let newPatientInfo = {};
    Object.keys(record).map((item) => {
      newPatientInfo[item] = record[item] === null ? "暂无" : record[item];
    });
    this.setState({
      tableSwitch: true,
      patientInfo: newPatientInfo,
    });
  }

  helpConfirm = () => {
    this.setState({
      helpSwitch: false,
    });
  };

  // updateConfirm = () => {
  //   // this.props.form.validateFields((err, values) => {
  //   let param = {
  //     id: this.state.patientInfo.id,
  //     patientSign: values.patientSign,
  //     tcmType: values.tcmType,
  //     diseaseId: values.disease,
  //     westernMedicine: values.mainMedicine.join(","),
  //     chineseMedicine: values.auxMedicine.join(","),
  //   };
  //   console.log(values.disease);
  //   API.updateRecord(param)
  //     .then((response) => {
  //       let _data = response.data;
  //       let _code = response.code;
  //       let _msg = response.msg;
  //       if (_code === "200") {
  //         Message.info("病历更新成功");
  //         this.queryPatient();
  //         this.setState({
  //           updateSwitch: false,
  //           drawerSwitch: false,
  //         });
  //       } else {
  //         Message.info("病历更新失败，请稍后重试！");
  //         this.setState({
  //           updateSwitch: false,
  //           drawerSwitch: false,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   // });
  // };
  updateCancel = () => {
    this.setState({
      updateSwitch: false,
    });
  };

  // 删除确认
  confirm = () => {
    let param = {
      id: this.state.listData[this.state.chosenIndex].id,
    };
    API.removeRecord(param)
      .then((response) => {
        let _data = response.data;
        let _code = response.code;
        let _msg = response.msg;
        if (_code === "200" && _data === 1) {
          Message.info("该病历已删除！");
          this.state.listData.splice(this.state.chosenIndex, 1);
          this.setState({
            modalSwitch: false,
          });
        } else {
          Message.info("病历删除失败，请稍后重试！");
          this.setState({
            modalSwitch: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 删除取消
  cancel = () => {
    Message.info("删除操作已取消");
    this.setState({
      modalSwitch: false,
    });
  };

  // 计算年龄
  calculateAge(time) {
    let date = new Date(time);
    let today = new Date().getTime();
    return Math.ceil((today - date) / 31536000000);
  }

  // 获取病种id对应的病种
  getDisease(diseaseId) {
    let disease = "未诊断";
    this.state.diseaseList.forEach((element) => {
      if (element.id == diseaseId) {
        disease = element.disease;
      }
    });
    return disease;
  }

  getOption = () => {
    let option = {
      title: {
        //标题
        // text: '折线图一',
        x: "center",
        textStyle: {
          //字体颜色
          color: "#ccc",
        },
      },
      tooltip: {
        //提示框组件
        trigger: "axis",
      },
      xAxis: {
        //X轴坐标值
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
        ],
      },
      yAxis: {
        type: "value", //数值轴，适用于连续数据
      },
      series: [
        {
          name: "数值", //坐标点名称
          type: "line", //线类型
          data: [
            100,
            90,
            150,
            300,
            500,
            1000,
            900,
            450,
            500,
            400,
            152,
            110,
            87,
            150,
            310,
            487,
            1020,
            910,
            437,
            501,
            430,
            150,
            105,
            80,
            157,
            310,
            506,
            989,
            906,
            460,
            505,
            389,
            150,
          ], //坐标点数据
        },
      ],
    };
    return option;
  };

  // 获取病种列表
  fetchDisease() {
    API.getDisease()
      .then((response) => {
        let _data = response.data,
          _code = response.code,
          _msg = response.msg;
        if (_code === "200") {
          this.setState({
            diseaseList: _data,
          });
        } else {
          this.setState({
            diseaseList: null,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 获取患者信息列表
  queryPatient = () => {
    console.log('queryPatient')
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       let param = {
  //         id: values.patientId,
  //         name: values.name,
  //       };
  //       // todo
  //       // 获取患者列表的API
  //       // API.getPatientList(param).then((res) => {
  //       //   const { data, code, msg } = res;
  //       //   if(code==='200'){
  //       //     let newListData = []

  //       //   }
  //       // });
  //       fetch(
  //         "https://www.fastmock.site/mock/9df39432386360a59e2d0557525f4887/query/query/getPatientList"
  //       )
  //         .then((res) => res.json())
  //         .then((res) => {
  //           console.log("res", res);
  //           const { data, code, desc } = res;
  //           if (code === "200") {
  //             // let newListData = [];
  //             // data.map((item, index) => {
  //             //   let newListDataItem = {};
  //             //   // newListDataItem.key = index+item.patientId;
  //             //   newListData.push(item);
  //             // });
  //             this.setState({
  //               listData: data,
  //             });
  //           }
  //         });
  //       // API.getRecordList(param).then((res) => {
  //       //   let _data = res.data;
  //       //   let _code = res.code;
  //       //   let _msg = res.msg;
  //       //   if (_code === "200") {
  //       //     let newListData = [];
  //       //     // Todo 写的太烂 重写
  //       //     _data.data.map((item, index) => {
  //       //       let newListDataItem = {};
  //       //       newListDataItem.key = index;
  //       //       newListDataItem.id = item.id;
  //       //       Object.assign(item, newListDataItem);
  //       //       item.key = index;
  //       //       newListData.push(item);
  //       //     });
  //       //     this.setState({
  //       //       listData: newListData,
  //       //       totalNum: _data.totalNum,
  //       //     });
  //       //   } else if (_code === "302") {
  //       //     Message.error(_msg);
  //       //     setTimeout(() => {
  //       //       this.props.history.replace("/login");
  //       //     }, 1000);
  //       //   } else {
  //       //     Message.error(_msg);
  //       //   }
  //       // });
  //     }
  //   });
  };

  // 分页页数改变触发函数
  pageChange = (page) => {
    this.setState({
      pageNum: page,
    });
    this.queryPatient();
  };

  // 页面渲染前执行函数
  componentDidMount() {
    this.queryPatient();
    this.fetchDisease();
  }
  // 查询表单
  renderSearch = () => {
    const { form } = this.props;
    return (
      <Form layout="inline">
        <Form.Item name="patientId">
          <span className="input-text">患者id：</span>

          <Input style={{ width: 100, marginRight: 15 }} placeholder="患者id" />
        </Form.Item>
        <Form.Item name="name">
          <span className="input-text">患者姓名：</span>

          <Input
            style={{ width: 100, marginRight: 15 }}
            placeholder="患者姓名"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.queryPatient}>
            查询
          </Button>
        </Form.Item>
      </Form>
    );
  };

  updataPatientInfo = () => {
    console.log("更新患者信息！");
  };

  addRecord = () => {
    console.log("新增病历！");
  };

  // 渲染的页面
  render() {
    console.log("this.state.listData", this.state.listData);
    const tableColumns = [
      {
        title: "患者id",
        dataIndex: "patientId",
        width: 50,
      },
      {
        title: "患者姓名",
        dataIndex: "name",
        width: 50,
      },
      {
        title: "性别",
        dataIndex: "gender",
        width: 30,
        render: (gender) => {
          return gender === 1 ? "男" : "女";
        },
      },
      {
        title: "年龄",
        dataIndex: "birthday",
        width: 40,
        render: (birthday) => {
          return this.calculateAge(birthday);
        },
      },
      {
        title: "就诊时间",
        dataIndex: "createAt",
        width: 50,
      },
      {
        title: "病人主诉",
        dataIndex: "chfCmp",
        ellipsis: true,
        width: 150,
        tooltip: true,
      },
      {
        title: "诊断结果",
        dataIndex: "disease",
        width: 50,
        render: (disease) => {
          return this.getDisease(disease);
        },
      },
      {
        title: "病历详情",
        dataIndex: "detail",
        width: 50,
        render: (text, record, index) => {
          return (
            <Button
              type="primary"
              size="small"
              style={{ marginRight: "5px" }}
              onClick={() => this.show(record)}
            >
              病历详情
            </Button>
          );
        },
      },
      {
        title: "操作",
        width: 150,
        key: "action",
        align: "center",
        render: (text, record, index) => {
          return (
            <div>
              <Link to={`/admin/addRecord/${record.patientId}`} target="_blank">
                <Button
                  type="primary"
                  size="small"
                  style={{
                    marginRight: "5px",
                    backgroundColor: "green",
                    borderColor: "green",
                  }}
                >
                  新增病历
                </Button>
              </Link>
              <Button
                type="primary"
                size="small"
                style={{
                  marginRight: "5px",
                  backgroundColor: "red",
                  borderColor: "red",
                }}
                onClick={() => this.updataPatientInfo}
              >
                更新患者信息
              </Button>
            </div>
          );
        },
      },
    ];
    const { form } = this.props;
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
          columns={tableColumns}
          dataSource={this.state.listData}
        ></Table>
        <Drawer
          title="患者病历"
          placement="right"
          width="640"
          closable={false}
          onClose={this.onClose}
          visible={this.state.drawerSwitch}
        >
          <div className="demo-drawer-profile">
            <Row>
              <Col span={12}>
                <strong>患者姓名:</strong>
                <span style={{ marginLeft: 20 }}>
                  {this.state.patientInfo.name}
                </span>
              </Col>
              <Col span={12}>
                <strong>主治医生:</strong>
                <span style={{ marginLeft: 45 }}>
                  {this.state.patientInfo.doctorName}
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <strong>性别:</strong>
                <span style={{ marginLeft: 50 }}>
                  {this.state.patientInfo.gender == 1 ? "男" : "女"}
                </span>
              </Col>
              <Col span={12}>
                <strong>生日:</strong>
                <span style={{ marginLeft: 72 }}>
                  {this.state.patientInfo.birthday}
                </span>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <strong>身高(cm):</strong>
                <span style={{ marginLeft: 20 }}>
                  {this.state.patientInfo.height}{" "}
                </span>
              </Col>
              <Col span={12}>
                <strong>体重(kg)：</strong>
                <span style={{ marginLeft: 37 }}>
                  {this.state.patientInfo.weight}{" "}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>主诉：</strong>
                <div className="setformat">{this.state.patientInfo.chfCmp}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>既往史：</strong>
                <div className="setformat">
                  {this.state.patientInfo.prvMedHis}{" "}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>现病史：</strong>
                <div className="setformat">
                  {this.state.patientInfo.hisPreIll}{" "}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>中医证型：</strong>
                <div className="setformat">
                  {this.state.patientInfo.tcmType}{" "}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>症状：</strong>
                <div className="setformat">
                  {this.state.patientInfo.patientSign}{" "}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>病种：</strong>
                <div className="setformat">
                  {this.getDisease(this.state.patientInfo.disease)}{" "}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>主药：</strong>
                <div className="setformat">
                  {this.state.patientInfo.westernMedicine}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>辅药：</strong>
                <div className="setformat">
                  {this.state.patientInfo.chineseMedicine}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="primary" onClick={() => this.showHelp()}>
                  用药帮助
                </Button>
                <Button
                  type="primary"
                  style={{
                    margin: "0 8px",
                    backgroundColor: "green",
                    borderColor: "green",
                  }}
                  onClick={() => this.showUpdate()}
                >
                  更新病历
                </Button>
              </Col>
            </Row>
          </div>
        </Drawer>

        <Modal
          visible={this.state.modalSwitch}
          title="请确认操作"
          onOk={this.confirm}
          onCancel={this.cancel}
        >
          <p>本次删除操作不可逆 确认删除本条数据？</p>
        </Modal>
        <Modal
          visible={this.state.helpSwitch}
          title="基于专家用药模型的用药帮助"
          onOk={this.helpConfirm}
          onCancel={this.helpConfirm}
        >
          <p>
            是否加入与甘草关联的
            <span style={{ color: "red" }}>太子参(0.84)</span>?
            <br />
            是否加入与白术关联的<span style={{ color: "red" }}>麦冬(0.72)</span>
            ?
          </p>
        </Modal>
        <Modal
          visible={this.state.updateSwitch}
          width={550}
          title="更新电子病历"
          onOk={this.updateConfirm}
          onCancel={this.updateCancel}
        >
          <Form layout="inline">
            <Form.Item label="姓名" style={{ marginLeft: 27 }}>
              <p style={{ width: 50, marginBottom: 0 }}>
                {this.state.patientInfo.name}
              </p>
            </Form.Item>

            <Form.Item label="主治医生">
              <p style={{ width: 50, marginBottom: 0 }}>
                {this.state.patientInfo.doctorName}
              </p>
            </Form.Item>
            <Form.Item label="年龄">
              <p style={{ width: 50, marginBottom: 0 }}>
                {" "}
                {this.calculateAge(this.state.patientInfo.birthday)}
              </p>
            </Form.Item>
            <Form.Item label="性别">
              <p style={{ width: 50, marginBottom: 0 }}>
                {this.state.patientInfo.gender == 0 ? "男" : "女"}
              </p>
            </Form.Item>
            <Form.Item label="主诉" style={{ marginLeft: 27 }}>
              <p style={{ marginBottom: 0 }}>
                {" "}
                {this.state.patientInfo.chfCmp}
              </p>
            </Form.Item>

            <Form.Item
              label="病人症状"
              name="patientSign"
              style={{ marginLeft: 0 }}
            >
              <TextArea
                style={{ width: 400 }}
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
            <Form.Item
              label="中医证型"
              name="tcmType"
              style={{ marginLeft: 0 }}
            >
              <TextArea
                style={{ width: 400 }}
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
            <Form.Item label="诊断" name="disease" style={{ marginLeft: 27 }}>
              <Select
                allowClear={true}
                showSearch
                style={{ width: 400 }}
                placeholder="请选择病种"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.diseaseList.map((item, index) => (
                  <Option value={item.id} key={index}>
                    {item.disease}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="上次处方" style={{ marginLeft: 0 }}>
              <span>
                龙眼肉，沙参，芦根，麸炒枳壳，姜半夏，当归，白术，桑寄生，
              </span>
              <br />
              <span>麦冬,茯苓,郁金</span>
            </Form.Item>
            <Form.Item label="矫正处方">
              <span>太子参，浙贝，金银花</span>
            </Form.Item>
            <Form.Item label="推荐处方">
              <p style={{ width: 400, margin: "0px 0px 0px" }}>
                <span style={{ color: "red", margin: "0px 2px" }}>茯苓</span>
                <span style={{ color: "red", margin: "0px 2px" }}>当归</span>
                <span style={{ color: "red", margin: "0px 2px" }}>白芍</span>
                <span style={{ color: "red", margin: "0px 2px" }}>太子参</span>
                <span style={{ color: "red", margin: "0px 2px" }}>柴胡</span>
                <span style={{ color: "red", margin: "0px 2px" }}>麻黄</span>
                <span style={{ color: "red", margin: "0px 2px" }}>山药</span>
                <br />
                <span style={{ margin: "0px 2px 2px 2px" }}>香附</span>
                <span style={{ margin: "0px 2px" }}>青黛</span>
              </p>
            </Form.Item>
            <Form.Item
              label="西医主药"
              name="mainMedicine"
              style={{ marginLeft: 0 }}
            >
              <Select
                style={{ width: 400 }}
                placeholder="请选择"
                mode="multiple"
              >
                {this.state.selectMainMedicine}
              </Select>
            </Form.Item>
            <Form.Item label="中医辅药" name="auxMedicine">
              <Select
                style={{ width: 400 }}
                placeholder="请选择"
                mode="multiple"
              >
                {this.state.selectAuxliMedicine}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default PatientQuery;
