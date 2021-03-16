import React, { Component } from "react";
import "./patient-query.less";
import {
  Input,
  Button,
  Select,
  Table,
  Form,
  Row,
  Message,
  Drawer,
  Col,
  Modal,
  Tag,
} from "antd";
import API from "../../api/api";
import { Link } from "react-router-dom";
// import ReactEcharts from "echarts-for-react";
import UpdateModal from "./UpdataModal";
const { Option } = Select;
const { TextArea } = Input;

Date.prototype.toLocaleString = function () {
  return (
    this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate()
  );
};

let tableData = [
  {
    doctorName: "张诣",
    id: 200421,
    name: "刘坤",
    gender: 1,
    birthday: "1963-02-04",
    jDisease: "疲劳",
    yDisease: "腰肌劳损",
  },
  {
    doctorName: "张诣",
    id: 130456,
    name: "黄欣",
    gender: 0,
    birthday: "1960-02-04",
    jDisease: "颈椎负荷过重",
    yDisease: "疲劳",
  },
  {
    doctorName: "张诣",
    id: "001367",
    name: "王群",
    gender: 0,
    birthday: "1968-02-04",
    jDisease: "颈椎负荷过重",
    yDisease: "肌筋膜炎",
  },
  {
    doctorName: "刘梓",
    id: "018269",
    name: "张新",
    gender: 1,
    birthday: "1974-02-04",
    jDisease: "颈椎退行性病变",
    yDisease: "疲劳",
  },
  {
    doctorName: "刘梓",
    id: "008629",
    name: "赵文",
    gender: 1,
    birthday: "1982-02-04",
    jDisease: "疲劳",
    yDisease: "腰椎退行性病变",
  },
];

class PatientQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableDataLoading: true,
      updateInfoModalVisible: false,
      patientInfo: {},
      modalPatientInfo: {}, // 一条record
      currentTablePage: 1,
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
      selectAuxliMedicine: [],
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
        // let _msg = response.msg;
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
    (this.state.diseaseList || []).forEach((element) => {
      if (element.id === diseaseId) {
        disease = element.disease;
      }
    });
    return disease;
  }

  showUpdateInfoModal = (record) => {
    this.setState({
      updateInfoModalVisible: true,
      modalPatientInfo: record,
    });
  };
  // 获取病种列表接口
  fetchDisease() {
    API.getDisease()
      .then((response) => {
        console.log("getDisease", response);
        let _data = response.data;
        let _code = response.code;
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

  handleSearchReset = () => {
    let config = {
      patientId: undefined,
      name: undefined,
      doctorId: undefined,
      doctorName: undefined,
    };
    this.refs.patientQueryForm.setFieldsValue(config);
    this.queryPatient();
  };

  // 获取患者信息列表
  queryPatient = () => {
    this.setState({
      tableDataLoading: true,
    });
    let param = {};
    let values = this.refs.patientQueryForm.getFieldsValue();
    for (const [, value] of Object.entries(values)) {
      if (value) {
        param = {
          patientId: values.patientId,
          patientName: values.name,
          doctorId: values.doctorId,
          doctorName: values.doctorName,
        };
      }
    }

    // 获取患者列表的API，成功
    API.getPatient(param).then((res) => {
      console.log("getPatient", res);
      const { data, code, msg } = res;
      if (code === "200") {
        this.setState({
          listData: data,
          tableDataLoading: false,
        });
      } else {
        Message.error(msg);
      }
    });
  };

  // 分页页数改变触发函数
  // pageChange = (page) => {
  //   this.setState({
  //     pageNum: page,
  //   });
  //   this.queryPatient();
  // };

  // 页面渲染前执行函数
  componentDidMount() {
    this.queryPatient();
    this.fetchDisease();
  }
  // 患者查询表单
  renderSearch = () => {
    return (
      <Form
        layout="inline"
        style={{ marginBottom: 30, display: "flex" }}
        onFinish={this.queryPatient}
        ref="patientQueryForm"
      >
        <Form.Item name="patientId" label="患者编号：">
          <Input placeholder="患者编号" style={{ width: 80 }} />
        </Form.Item>
        <Form.Item name="name" label="患者姓名：">
          <Input placeholder="患者姓名" style={{ width: 80 }} />
        </Form.Item>
        <Form.Item name="doctorId" label="主治医生编号：">
          <Input placeholder="医生编号" style={{ width: 80 }} />
        </Form.Item>
        <Form.Item name="doctorName" label="主治医生姓名：">
          <Input placeholder="医生姓名" style={{ width: 80 }} />
        </Form.Item>
        <Form.Item style={{ marginRight: 2 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Form.Item style={{ marginRight: 2 }}>
          <Button onClick={this.handleSearchReset}>重置</Button>
        </Form.Item>
        <Form.Item style={{ width: 20 }}>
          <Button type="primary" onClick={this.handleSearchReset}>
            新建患者
          </Button>
        </Form.Item>
      </Form>
    );
  };

  handleModalVisible = (isvisible) => {
    this.setState({
      updateInfoModalVisible: isvisible,
    });
  };

  // 渲染的页面
  render() {
    const tableColumns = [
      {
        title: "主治医生",
        dataIndex: "doctorName",
        align: "center",
        width: "8%",
      },
      {
        title: "患者编号",
        dataIndex: "id",
        align: "center",
        width: "8%",
      },
      {
        title: "患者姓名",
        dataIndex: "name",
        align: "center",
        width: "8%",
      },
      {
        title: "患者性别",
        dataIndex: "gender",
        align: "center",
        width: "8%",
        // render: (gender) => {
        //   return gender === 1 ? (
        //     <Tag color="blue">男</Tag>
        //   ) : (
        //     <Tag color="red">女</Tag>
        //   );
        // },
        render: (gender) => {
          return gender === 1 ? "男" : "女";
        },
      },
      {
        title: "患者年龄",
        dataIndex: "birthday",
        align: "center",
        width: "8%",
        render: (birthday) => {
          return this.calculateAge(birthday);
        },
      },
      // {
      //   title: "就诊时间",
      //   dataIndex: "createAt",
      //   width: "8%",
      // },
      // {
      //   title: "病人主诉",
      //   dataIndex: "chief",
      //   align: "center",
      //   // ellipsis: true,
      //   width: "10%",
      //   tooltip: true,
      // },
      {
        title: "颈椎病分类",
        dataIndex: "jDisease",
        align: "center",
        width: "8%",
        render: (jDisease) => {
          let tagColor;
          switch (jDisease) {
            case "正常":
              tagColor = "#52c41a";
              break;
            case "疲劳":
              tagColor = "#13c2c2";
              break;
            case "颈肌劳损或炎性改变":
              tagColor = "#1890ff";
              break;
            case "颈椎负荷过重":
              tagColor = "#722ed1";
              break;
            case "颈椎退行性病变":
              tagColor = "#eb2f96";
              break;
            default:
              tagColor = "#faad14";
          }
          return <Tag color={tagColor}>{jDisease}</Tag>;
        },
      },
      {
        title: "腰椎病分类",
        dataIndex: "yDisease",
        align: "center",
        width: "8%",
        render: (yDisease) => {
          let tagColor;
          switch (yDisease) {
            case "正常":
              tagColor = "#52c41a";
              break;
            case "疲劳":
              tagColor = "#13c2c2";
              break;
            case "肌筋膜炎":
              tagColor = "#1890ff";
              break;
            case "腰肌劳损":
              tagColor = "#722ed1";
              break;
            case "腰椎退行性病变":
              tagColor = "#eb2f96";
              break;
            default:
              tagColor = "#faad14";
          }
          return <Tag color={tagColor}>{yDisease}</Tag>;
        },
      },
      // {
      //   title: "患者信息展示",
      //   dataIndex: "detail",
      //   align: "center",
      //   width: "14%",
      //   render: (text, record, index) => {
      //     return (
      //       <Button
      //         type="primary"
      //         // size="small"
      //         style={{ marginRight: "5px" }}
      //         onClick={() => this.show(record)}
      //       >
      //         患者信息展示
      //       </Button>
      //     );
      //   },
      // },
      {
        title: "操作",
        width: "22%",
        key: "action",
        align: "center",
        render: (text, record, index) => {
          return (
            <div>
              <Link to={`/admin/addRecord/${record.id}`} target="_blank">
                <Button
                  // type="primary"
                  style={{
                    marginRight: "5px",
                    // backgroundColor: "green",
                    // borderColor: "green",
                  }}
                >
                  新增病历
                </Button>
              </Link>
              <Button
                // type="primary"
                style={{
                  marginRight: "5px",
                  // backgroundColor: "red",
                  // borderColor: "red",
                }}
                onClick={() => this.showUpdateInfoModal(record)}
              >
                更新患者信息
              </Button>
            </div>
          );
        },
      },
    ];

    const paginationProps = {
      // showTotal: (total) => {
      //   return `共${total}条`;
      // },
      // total: this.state.listData.length, //数据总数
      // defaultCurrent: 1, //默认当前页
      // current: this.state.currentTablePage, //当前页
      // pageSize: 8, //每页条数
      // onChange: (page, pageSize) => {
      //   console.log("page", page, pageSize);
      //   //页码改变的回调，参数是改变后的页码及每页条数
      //   this.setState({
      //     currentTablePage: page,
      //   });
      // },
      showTotal: (total) => {
        return `共${total}条`;
      },
      total: 204, //数据总数
      defaultCurrent: 1, //默认当前页
      current: 1, //当前页
      pageSize: 5, //每页条数
      // onChange: (page, pageSize) => {
      //   console.log("page", page, pageSize);
      //   //页码改变的回调，参数是改变后的页码及每页条数
      //   this.setState({
      //     currentTablePage: page,
      //   });
      // },
    };

    return (
      <div className="main-content">
        {this.renderSearch()}
        <Table
          bordered
          pagination={paginationProps}
          columns={tableColumns}
          dataSource={tableData}
          scroll={{ x: "max-content" }} // 表格横向滚动，防止溢出
          loading={this.state.tableDataLoading}
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
                  {this.state.patientInfo.gender === 1 ? "男" : "女"}
                </span>
              </Col>
              <Col span={12}>
                <strong>生日:</strong>
                <span style={{ marginLeft: 72 }}>
                  {new Date(this.state.patientInfo.birthday).toLocaleString()}
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
              <Col span={12}>
                <strong>主诉：</strong>
                <div className="setformat">{this.state.patientInfo.chief}</div>
              </Col>
              <Col span={12}>
                <strong>既往史：</strong>
                <div className="setformat">
                  {this.state.patientInfo.medicalHistory}{" "}
                </div>
              </Col>
            </Row>
            <Row>
              {/* <Col span={12}>
                <strong>症状：</strong>
                <div className="setformat">
                  {this.state.patientInfo.patientSign}{" "}
                </div>
              </Col> */}
              <Col span={12}>
                <strong>病种：</strong>
                <div className="setformat">
                  {this.state.patientInfo.disease}{" "}
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col span={12}>
                <strong>主药：</strong>
                <div className="setformat">
                  {this.state.patientInfo.westernMedicine}
                </div>
              </Col>
              <Col span={12}>
                <strong>辅药：</strong>
                <div className="setformat">
                  {this.state.patientInfo.chineseMedicine}
                </div>
              </Col>
            </Row> */}
            <Row>
              <Col>
                <Button type="primary" onClick={() => this.showHelp()}>
                  用药帮助
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
                {this.state.patientInfo.gender === 0 ? "男" : "女"}
              </p>
            </Form.Item>
            <Form.Item label="主诉" style={{ marginLeft: 27 }}>
              <p style={{ marginBottom: 0 }}> {this.state.patientInfo.chief}</p>
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
                {(this.state.diseaseList || []).map((item, index) => (
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
        <UpdateModal
          visible={this.state.updateInfoModalVisible}
          handleModalVisible={this.handleModalVisible}
          modalPatientInfo={this.state.modalPatientInfo}
        />
      </div>
    );
  }
}

export default PatientQuery;
