import React, { Component } from "react";
import "./record-query.less";
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
  Tag,
} from "antd";
import API from "../../api/api";
import { Link } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
const { Option } = Select;
const { TextArea } = Input;
// const baseURL = "http://10.13.81.189:8001/"
const baseURL = "";
const mockData = [
  {
    id: 110023,
    name: "张小玹",
    gender: 0,
    birthday: "1967-06-04",
    createAt: "2020-11-14",
    chief: "颈项部疼痛、活动受限8小时",
    jDisease: "颈肌劳损或炎性改变",
    yDisease: "疲劳",
  },
  {
    id: 200421,
    name: "刘坤",
    gender: 1,
    birthday: "1962-06-04",
    createAt: "2020-11-25",
    chief: "颈部僵直，腰痛一年，伴双下肢麻痛半月",
    jDisease: "疲劳",
    yDisease: "腰肌劳损",
  },
  {
    id: "008629",
    name: "张新",
    gender: 1,
    birthday: "1973-06-04",
    createAt: "2020-11-05",
    chief: "颈部疼痛2年，加重5天",
    jDisease: "颈椎退行性病变",
    yDisease: "正常",
  },
  {
    id: "001367",
    name: "王群",
    gender: 0,
    birthday: "1967-06-04",
    createAt: "2020-11-23",
    chief: "腰部酸痛伴左大腿放射痛1年，加重7天",
    jDisease: "颈椎负荷过重",
    yDisease: "肌筋膜炎",
  },
  {
    id: "008629",
    name: "赵文",
    gender: 1,
    birthday: "1981-06-04",
    createAt: "2020-11-27",
    chief: "腰痛伴双下肢抽痛、麻木2个月 ",
    jDisease: "疲劳",
    yDisease: "腰椎退行性病变",
  },
];
class RecordQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientInfo: {},
      recPrescription: "",
      checkPrescription: "",
      medCheck: "",
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
      tableColumns: [
        {
          title: "病历编号",
          dataIndex: "id",
          width: "10%",
          align: "center",
        },
        {
          title: "患者姓名",
          dataIndex: "name",
          width: "10%",
          align: "center",
        },
        {
          title: "患者性别",
          dataIndex: "gender",
          width: "10%",
          align: "center",
          render: (gender) => {
            return gender === 1 ? (
              <Tag color="blue">男</Tag>
            ) : (
              <Tag color="red">女</Tag>
            );
          },
        },
        {
          title: "患者年龄",
          dataIndex: "birthday",
          width: "10%",
          align: "center",
          render: (birthday) => {
            return this.calculateAge(birthday);
          },
        },
        {
          title: "就诊时间",
          dataIndex: "createAt",
          width: "12%",
          align: "center",
          render: (createAt) => {
            return this.formatDate(new Date(createAt));
          },
        },
        {
          title: "病人主诉",
          dataIndex: "chief",
          // ellipsis: true,
          width: "15%",
          align: "center",
          tooltip: true,
        },
        {
          title: "颈椎诊断结果",
          dataIndex: "jDisease",
          width: "15%",
          align: "center",
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
          title: "腰椎诊断结果",
          dataIndex: "yDisease",
          width: "15%",
          align: "center",
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
        {
          title: "操作",
          width: "14%",
          key: "action",
          align: "center",
          render: (text, record, index) => {
            return (
              <div>
                <Button
                  // type="primary"
                  size="small"
                  style={{ marginRight: "5px" }}
                  onClick={() => this.show(record)}
                >
                  病历详情
                </Button>
                <Button
                  // type="primary"
                  size="small"
                  style={{
                    marginRight: "5px",
                    marginTop: "5px",
                    // backgroundColor: "red",
                    // borderColor: "red",
                  }}
                  onClick={() => this.remove(index)}
                >
                  删除
                </Button>
              </div>
            );
          },
        },
      ],
      doctorList: [],
      chineseMedicine: [],
      westernMedicine: [],
      defaultWesternMedicine: [],
      defaultChineseMedicine: [],
    };
  }
  formatDate = (now) => {
    var year = now.getFullYear(); //取得4位数的年份
    var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
    var date = now.getDate(); //返回日期月份中的天数（1到31）
    return year + "-" + month + "-" + date;
  };
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

  showUpdate() {
    let tmpRecPrescrition = "",
      tmpCheckPrescription = "";
    if (
      this.state.patientInfo.medCheck !== null &&
      this.state.patientInfo.medCheck !== ""
    ) {
      this.state.patientInfo.medCheck.split(" ").forEach((element) => {
        tmpCheckPrescription += element.match(/的(\S*)\(/)[1] + " ";
      });
    }
    if (
      this.state.patientInfo.recPrescription !== null &&
      this.state.patientInfo.recPrescription !== ""
    ) {
      this.state.patientInfo.recPrescription.split(" ").forEach((element) => {
        tmpRecPrescrition += element.split("(")[0] + " ";
      });
    }
    this.setState({
      updateSwitch: true,
      checkPrescription: tmpCheckPrescription,
      recPrescription: tmpRecPrescrition,
      defaultChineseMedicine:
        this.state.patientInfo.chinesePrescription === null
          ? null
          : this.state.patientInfo.chinesePrescription.split(","),
      defaultWesternMedicine:
        this.state.patientInfo.westernPrescription === null
          ? null
          : this.state.patientInfo.westernPrescription.split(","),
    });
  }

  // 查看详情按钮实现
  show(record) {
    let newPatientInfo = {};
    const param = {
      patientId: record.patientId,
    };
    console.log(1111111, param);
    API.getPatient(param).then((res) => {
      console.log("getPatient", res);
      const { data, code, msg } = res;
      if (code === "200") {
        this.setState({
          drawerSwitch: true,
          patientInfo: data[0],
        });
      } else {
        Message.error(msg);
      }
    });
  }

  //  检测数据按钮实现
  async detectionData(record) {
    // let newPatientInfo = {};
    // let tmpSeries = [];
    // Object.keys(record).map((item) => {
    //   newPatientInfo[item] = record[item] === null ? "" : record[item];
    // });
    // newPatientInfo["irtFileName"] = baseURL + newPatientInfo["irtFileName"];
    // newPatientInfo["tongueFileName"] =
    //   baseURL + newPatientInfo["tongueFileName"];
    // await fetch(baseURL + newPatientInfo["pulseFileName"], {
    //   method: "GET",
    //   mode: "cors",
    // })
    //   .then((res) => {
    //     return res.text();
    //   })
    //   .then((res) => {
    //     return res.split(",").forEach((element) => tmpSeries.push(element));
    //   });
    // newPatientInfo["pulseSeries"] = tmpSeries;
    // this.setState({
    //   tableSwitch: true,
    //   patientInfo: newPatientInfo,
    // });
  }

  helpConfirm = () => {
    this.setState({
      helpSwitch: false,
    });
  };

  updateConfirm = () => {
    let values = this.refs.updateForm.getFieldsValue();
    let param = {
      id: this.state.patientInfo.id,
      patientSign: values.patientSign,
      tcmType: values.tcmType,
      diseaseId: this.getDiseaseId(values.disease),
      westernMedicine:
        values.mainMedicine === null ? null : values.mainMedicine.join(","),
      chineseMedicine:
        values.auxMedicine === null ? null : values.auxMedicine.join(","),
    };
    console.log(values.disease);
    API.updateRecord(param)
      .then((response) => {
        let _data = response.data;
        let _code = response.code;
        let _msg = response.msg;
        if (_code === "200") {
          Message.info("病历更新成功");
          this.fetchData();
          this.setState({
            updateSwitch: false,
            drawerSwitch: false,
          });
        } else {
          Message.info("病历更新失败，请稍后重试！");
          this.setState({
            updateSwitch: false,
            drawerSwitch: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
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
        if (_code === "200" && _data === 1) {
          Message.info("该病历已删除！");
          this.state.listData.splice(this.state.chosenIndex, 1);
          this.setState({
            modalSwitch: false,
          });
          this.fetchData();
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
        disease = element.name;
      }
    });
    return disease;
  }
  //   根据病种获取病种idIIdd
  getDiseaseId(disease) {
    let diseaseId = 0;
    this.state.diseaseList.forEach((element) => {
      if (element.name === disease) {
        diseaseId = element.id;
      }
    });
    return diseaseId;
  }
  getOption = () => {
    console.log("pulseSeries", this.state.patientInfo["pulseSeries"]);
    let xData = [];
    let len =
      this.state.patientInfo["pulseSeries"] === null
        ? 0
        : this.state.patientInfo["pulseSeries"];
    for (let i = 1; i <= len; i++) {
      xData.push(i.toString());
    }
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
        data: xData,
      },
      yAxis: {
        type: "value", //数值轴，适用于连续数据
      },
      series: [
        {
          name: "数值", //坐标点名称
          type: "line", //线类型
          data: this.state.patientInfo["pulseSeries"], //坐标点数据
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
          _code = response.code;
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

  fetchMedicine() {
    let tmpWesternMedicine = [],
      tmpChineseMedicine = [];
    API.getWesternMedicine()
      .then((response) => {
        let _data = response.data,
          _code = response.code;
        if (_code === "200") {
          _data.forEach((element) => {
            tmpWesternMedicine.push(
              <Option key={element.name}>{element.name}</Option>
            );
          });
          this.setState({
            westernMedicine: tmpWesternMedicine,
          });
        } else {
          Message.info("获取西医药品列表失败");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    API.getChineseMedicine()
      .then((response) => {
        let _data = response.data,
          _code = response.code;
        if (_code === "200") {
          _data.forEach((element) => {
            tmpChineseMedicine.push(
              <Option key={element.name}>{element.name}</Option>
            );
          });
          this.setState({
            chineseMedicine: tmpChineseMedicine,
          });
        } else {
          Message.info("获取中医药品列表失败");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  valueOrDefault(value) {
    return value === null || value === "" ? "暂无" : value;
  }

  // 获取病历列表
  fetchData = () => {
    console.log("查询条件数据", this.refs.queryForm.getFieldsValue());
    let values = this.refs.queryForm.getFieldsValue();
    let param = {
      id: values.recordId,
      startDate: values.startDate,
      endDate: values.endDate,
      diseaseId: values.diseaseId,
      pageNo: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    console.log(param);
    API.getRecordList(param).then((res) => {
      let _data = res.data;
      let _code = res.code;
      let _msg = res.msg;
      if (_code === "200") {
        let newListData = [];
        // Todo 重写
        _data.data.map((item, index) => {
          let newListDataItem = {};
          newListDataItem.key = index;
          newListDataItem.id = item.id;
          Object.assign(item, newListDataItem);
          item.key = index;
          newListData.push(item);
        });
        this.setState({
          listData: newListData,
          totalNum: _data.totalNum,
        });
      } else if (_code === "302") {
        Message.error(_msg);
        setTimeout(() => {
          this.props.history.replace("/login");
        }, 1000);
      } else {
        Message.error(_msg);
      }
    });
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

  // 页面渲染前执行函数
  componentDidMount() {
    this.fetchData();
    this.fetchDisease();
  }
  // 查询表单
  renderSearch = () => {
    return (
      <Form layout="inline" ref="queryForm">
        <Form.Item name="recordId" label="病历编号">
          <Input
            style={{ width: 100, marginRight: 15 }}
            placeholder="病历编号"
          />
        </Form.Item>
        <Form.Item name="startDate" label="起始时间">
          <DatePicker
            style={{ width: 130, marginRight: 5 }}
            placeholder="就诊起始时间"
          />
        </Form.Item>
        <Form.Item name="endDate" label="结束时间">
          <DatePicker
            style={{ width: 130, marginRight: 5 }}
            placeholder="就诊结束时间"
          />
        </Form.Item>
        <Form.Item name="diseaseId" label="病种">
          <Select
            allowClear={true}
            showSearch
            style={{ width: 120 }}
            placeholder="请选择病种"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {(this.state.diseaseList || []).map((item, index) => (
              <Option value={item.id} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.fetchData}>
            查询
          </Button>
        </Form.Item>
      </Form>
    );
  };

  // 渲染的页面
  render() {
    return (
      <div className="main-content">
        {this.renderSearch()}
        <Table
          style={{ marginTop: 20 }}
          bordered
          pagination={{
            showTotal: (total) => {
              return `共${total}条`;
            },
            total: 347, //数据总数
            defaultCurrent: 1, //默认当前页
            current: 1, //当前页
            pageSize: 5, //每页条数
          }}
          columns={this.state.tableColumns}
          // dataSource={this.state.listData}
          dataSource={mockData}
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
                  {this.formatDate(new Date(this.state.patientInfo.birthday))}
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
                <div className="setformat">
                  {this.valueOrDefault(this.state.patientInfo.chief)}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>既往史：</strong>
                <div className="setformat">
                  {this.valueOrDefault(this.state.patientInfo.medicalHistory)}{" "}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>病种：</strong>
                <div className="setformat">
                  {this.valueOrDefault(this.state.patientInfo.disease)}{" "}
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col>
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
            </Row> */}
          </div>
        </Drawer>

        <Drawer
          title="实验检查数据"
          placement="right"
          width="750"
          closable={false}
          onClose={this.onClose}
          visible={this.state.tableSwitch}
        >
          <Row>
            <Col span={8}>
              <strong>患者姓名:</strong>
              <span style={{ marginLeft: 20 }}>
                {this.state.patientInfo.patientName}
              </span>
            </Col>
            <Col span={8}>
              <strong>性别:</strong>
              <span style={{ marginLeft: 50 }}>
                {this.state.patientInfo.gender === 0 ? "男" : "女"}
              </span>
            </Col>
            <Col span={8}>
              <strong>生日:</strong>
              <span style={{ marginLeft: 45 }}>
                {this.state.patientInfo.birthday}
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <strong>身高(cm):</strong>
              <span style={{ marginLeft: 20 }}>
                {this.state.patientInfo.height}{" "}
              </span>
            </Col>
            <Col span={8}>
              <strong>体重(kg)：</strong>
              <span style={{ marginLeft: 10 }}>
                {this.state.patientInfo.weight}{" "}
              </span>
            </Col>
            <Col span={8}>
              <strong>病种：</strong>
              <span style={{ marginLeft: 37 }}>
                {this.getDisease(this.state.patientInfo.disease)}
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <strong>血液检测</strong>
            </Col>
            <Col span={12}>
              <strong style={{ marginLeft: 37 }}>检测异常</strong>
            </Col>
          </Row>
          <Row>
            <Col span={12}>{this.state.patientInfo.bloodTest}</Col>
            <Col span={12}>
              <p style={{ marginLeft: 37 }}>
                {this.state.patientInfo.bloodExcp}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <strong>红外热成像图</strong>
            </Col>
            <Col span={8}>
              <strong style={{ marginLeft: 37 }}>检测描述</strong>
            </Col>
            <Col span={8}>
              <strong style={{ marginLeft: 37 }}>检测异常</strong>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <img
                src={this.state.patientInfo.irtFileName}
                width="200px"
                alt=""
              />{" "}
            </Col>
            <Col span={8}>
              <p style={{ marginLeft: 37 }}>{this.state.patientInfo.irtDesc}</p>
            </Col>
            <Col span={8}>
              <p style={{ marginLeft: 37 }}>{this.state.patientInfo.irtExcp}</p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <strong>舌象图谱</strong>
            </Col>
            <Col span={8}>
              <strong style={{ marginLeft: 37 }}>检测描述</strong>
            </Col>
            <Col span={8}>
              <strong style={{ marginLeft: 37 }}>检测异常</strong>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <img
                src={this.state.patientInfo.tongueFileName}
                width="200px"
                alt=""
              />
            </Col>
            <Col span={8}>
              <p style={{ marginLeft: 37 }}>
                {this.state.patientInfo.tongueDesc}
              </p>
            </Col>
            <Col span={8}>
              <p style={{ marginLeft: 37 }}>
                {this.state.patientInfo.tongueExcp}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <strong>脉象数据</strong>
            </Col>
            <Col span={8}>
              <strong style={{ marginLeft: 37 }}>检测描述</strong>
            </Col>
            <Col span={8}>
              <strong style={{ marginLeft: 37 }}>检测异常</strong>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <ReactEcharts
                option={this.getOption()}
                style={{ height: "200px", width: "", align: "center" }}
              />
            </Col>
            <Col span={8}>
              <p style={{ marginLeft: 37 }}>
                {this.state.patientInfo.pulseDesc}
              </p>
            </Col>
            <Col span={8}>
              <p style={{ marginLeft: 37 }}>
                {this.state.patientInfo.pulseExcp}
              </p>
            </Col>
          </Row>
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
          visible={this.state.updateSwitch}
          width={550}
          title="更新电子病历"
          onOk={this.updateConfirm}
          onCancel={this.updateCancel}
        >
          <Form layout="inline" ref="updateForm">
            <Form.Item label="姓名" style={{ marginLeft: 27 }}>
              <p style={{ width: 50, marginBottom: 0 }}>
                {this.state.patientInfo.patientName}
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
              <p style={{ marginBottom: 0 }}>
                {" "}
                {this.state.patientInfo.chfCmp}
              </p>
            </Form.Item>

            <Form.Item
              label="病人症状"
              style={{ marginLeft: 0 }}
              name="patientSign"
            >
              <TextArea
                style={{ width: 400 }}
                autoSize={{ minRows: 1, maxRows: 3 }}
                initialValue={this.state.patientInfo.patientSign}
              />
            </Form.Item>
            <Form.Item
              label="中医证型"
              style={{ marginLeft: 0 }}
              name="tcmType"
            >
              <TextArea
                style={{ width: 400 }}
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
            <Form.Item label="诊断" style={{ marginLeft: 27 }} name="disease">
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
                initialValue={this.state.patientInfo.disease}
              >
                {(this.state.diseaseList || []).map((item, index) => (
                  <Option value={item.name} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="矫正处方">
              <span>{this.state.patientInfo.corPrescription}</span>
            </Form.Item>
            <Form.Item label="推荐处方">
              <p style={{ width: 400, margin: "0px 0px 0px" }}>
                <span style={{ color: "red", margin: "0px 2px" }}>
                  {this.state.recPrescription}
                </span>
                <br />
                <span style={{ margin: "0px 2px 2px 2px" }}>
                  {this.state.checkPrescription}
                </span>
              </p>
            </Form.Item>
            <Form.Item
              label="西医主药"
              style={{ marginLeft: 0 }}
              name="mainMedicine"
            >
              <Select
                style={{ width: 400 }}
                placeholder="请选择"
                mode="multiple"
                initialValue={this.state.defaultWesternMedicine}
              >
                {this.state.westernMedicine}
              </Select>
            </Form.Item>
            <Form.Item label="中医辅药" name="auxMedicine">
              <Select
                style={{ width: 400 }}
                placeholder="请选择"
                mode="multiple"
                initialValue={this.state.defaultChineseMedicine}
              >
                {this.state.chineseMedicine}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default RecordQuery;
