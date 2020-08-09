import React, { Component, Fragment } from "react";
import { getAge } from "../../utils/dateUtils";
import {
  Input,
  Icon,
  Button,
  Select,
  Table,
  Form,
  Row,
  Tooltip,
  Tag
} from "antd";
import PersonalForm from "../Modals/PersonalForm";
import ClinicalForm from "../Modals/ClinicalForm";
import MissionInfoForm from "../Modals/MissionInfoForm";
import PatientsDescriptionForm from "../Modals/PatientsDescriptionForm";
import UpdatePersonalForm from "../Modals/UpdatePersonalForm";
import JingzhuiForm from "../Modals/jingzhui";
import RuxianForm from "../Modals/ruxian"
import ScaleForm from "../Modals/ScaleForm";
import "./user-information-management.less";
//import API from "../../api/api";
import API from "../../api/algorithm"

const { Option } = Select;

class kangfuManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPatientModalVisible: false, // 新建患者
      clinicalModalVisible: false, // 患者临床信息填写
      missionModalVisible: false, // 新建近红外信息
      scaleModalVisible: false, // 量表信息查看
      jingzhuiVisible: false,
      ruxianVisible: false,
      PatientsDescriptionModalVisible: false, //患者基本信息展示
      UpdatePersonalFormVisible: false, // 更新患者个人信息弹框是否显示
      edit: false,
      currentRecordId: -1,
      currentUserName: "undefined",
      currentRecord: undefined,
      tableData: [], // 表格数据
      doctorList: [], // 医生数据
      diseaseList: [] // 疾病列表
    };
  }

  componentDidMount() {
    API.getPatientList({}).then(res => {
      this.getTableDate(res);
    });

    // 获取医生列表
    API.getDoctorList({}).then(res => {
      let newDoctorList = [];
      res.data.map((item) => {
        newDoctorList.push(item);
      });
      this.setState({
        doctorList: newDoctorList
      });
    });

    // 获取疾病列表
    API.getDiseaseList({}).then(res => {
      this.setState({
        diseaseList: res.data
      });
    });
  }

  // 处理表格数据
  getTableDate = res => {
    let patientTableData = [];
    res.data.map((item, index) => {
      let patientTableDataItem = {};
      patientTableDataItem.key = index;
      patientTableDataItem.name = item.name;
      patientTableDataItem.medId = item.medId;
      patientTableDataItem.gender = item.gender;
      patientTableDataItem.age = getAge(item.birthday);
      // patientTableDataItem.age = item.birthday;
      patientTableDataItem.disease = item.disease;
      patientTableDataItem.doctorName = item.doctorName;
      // patientTableData.push(patientTableDataItem);
      Object.assign(item, patientTableDataItem);
      item.key = index;
      patientTableData.push(item);
    });
    this.setState({
      tableData: patientTableData
    });
  };

  // 处理查询提交
  handleSearchSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let param = {
          medId: values.patientId ? values.patientId : undefined,
          name: values.patientName ? values.patientName : undefined,
          doctorId: values.doctorId ? values.doctorId : undefined,
          disId: values.wcstType ? values.wcstType : undefined
        };
        API.getPatientList(param).then(res => {
          this.getTableDate(res);
        });
      }
    });
  };

  // 处理重置
  handleReset = () => {
    this.props.form.resetFields();
    API.getPatientList({}).then(res => {
      this.getTableDate(res);
    });
  };

  handleClick = (flag, record, msg) => {
    if (msg === "personalInfo") {
      this.setState({
        edit: true,
        newPatientModalVisible: flag,
        currentRecord: record
      });
    }
    if (msg === "updatePersonalInfo") {
      this.setState({
        edit: true,
        UpdatePersonalFormVisible: flag,
        currentRecord: record
      });
    }
    if (msg === "clinicalInfo") {
      this.setState({
        edit: true,
        clinicalModalVisible: flag,
        currentRecord: record
      });
    }
    if (msg === "scaleInfo") {
      this.setState({
        edit: true,
        scaleModalVisible: flag,
        currentRecord: record
      });
    }
    if (msg === "jingzhuiInfo") {
    
      this.setState({
        edit: true,
        jingzhuiVisible: flag,
        currentRecord: record
      });
    }
    if (msg === "ruxianInfo") {
    
      this.setState({
        edit: true,
        ruxianVisible: flag,
        currentRecord: record
      });
    }
    if (msg === "missionBasicInfo") {
      this.setState({
        edit: true,
        missionModalVisible: flag,
        currentRecord: record
      });
    }
    if (msg === "patientsDescription") {
      this.setState({
        edit: true,
        PatientsDescriptionModalVisible: flag,
        currentRecord: record
      });
    }
  };

  // 查询表单
  renderSearch = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline" onSubmit={this.handleSearchSubmit}>
        <Form.Item>
          {/* <span className="input-text">患者编号</span> */}
          {getFieldDecorator("patientId", {})(
            <Input
              style={{ width: 200 }}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="患者编号"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("patientName", {})(
            <Input
              style={{ width: 200 }}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="患者姓名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("doctorId", {})(
            <Select
              allowClear={true}
              showSearch
              style={{ width: 200 }}
              placeholder="选择医生"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.doctorList.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("wcstType", {})(
            <Select
              allowClear={true}
              showSearch
              style={{ width: 200 }}
              placeholder="选择失眠类型"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.diseaseList.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询患者信息
          </Button>
          <Button style={{ marginLeft: "20px" }} onClick={this.handleReset}>
            重置
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: "20px" }}
            className="new-information-button"
            onClick={() => this.handleModalVisible(true, "personalInfo")}
          >
            新建患者个人信息
          </Button>
        </Form.Item>
      </Form>
    );
  };

  // 显示弹框;
  handleModalVisible = (flag, msg) => {
    if (msg === "personalInfo") {
      this.setState({
        edit: false,
        newPatientModalVisible: flag
      });
    }
    if (msg === "updatePersonalInfo") {
      this.setState({
        edit: false,
        UpdatePersonalFormVisible: flag
      });
    }
    if (msg === "clinicalInfo") {
      this.setState({
        edit: false,
        clinicalModalVisible: flag
      });
    }
    if (msg === "scaleInfo") {
      this.setState({
        edit: false,
        scaleModalVisible: flag
      });
    }
    if (msg === "jingzhuiInfo") {
      this.setState({
        edit: false,
        jingzhuiVisible: flag
      });
    }
    if (msg === "ruxianInfo") {
      this.setState({
        edit: false,
        ruxianVisible: flag
      });
    }
    if (msg === "missionBasicInfo") {
      this.setState({
        edit: false,
        missionModalVisible: flag
      });
    }
    if (msg === "patientsDescription") {
      this.setState({
        edit: false,
        PatientsDescriptionModalVisible: flag
      });
    }
  };

  colums = [
    {
      title: "患者姓名",
      dataIndex: "name",
      width: "10%"
    },
    {
      title: "唯一编号",
      dataIndex: "medId",
      width: "10%",
      render: medId => {
        return <span>{medId}</span>;
      }
    },
    {
      title: "患者性别",
      dataIndex: "gender",
      width: "10%",
      render: text => {
        const gender = [{ label: 0, value: "女" }, { label: 1, value: "男" }];
        const item = gender.find(v => v.label === text);
        if (item) {
          return <Tag color="red">{item.value}</Tag>;
        }
      }
    },
    {
      title: "患者年龄",
      dataIndex: "age",
      width: "10%"
    },
    {
      title: "患病类型",
      dataIndex: "disease",
      width: "10%",
      render: text => {
        const item = this.state.diseaseList.find(v => v.name === text);
        if (!item) {
          return <Tag color="#2db7f5">{"未诊断"}</Tag>;
        } else {
          return <Tag color="#2db7f5">{item.name}</Tag>;
        }
      }
    },
    {
      title: "主治医生",
      dataIndex: "doctorName",
      width: "10%"
    },
    {
      title: "患者信息展示",
      width: "10%",
      render: (text, record) => {
        return (
          <Fragment>
            <Row type="flex" justify="center">
              <Tooltip title="采集信息展示">
                <div
                  onClick={() =>
                    this.handleClick(true, record, "patientsDescription")
                  }
                >
                  <Icon type="book" />
                  <span
                    style={{
                      cursor: "pointer",
                      marginLeft: "5px",
                      lineHeight: "1"
                    }}
                  >
                    展示
                  </span>
                </div>
              </Tooltip>
            </Row>
          </Fragment>
        );
      }
    },
    // {
    //   title: "添加/修改采集信息",
    //   width: "40%",
    //   render: (text, record) => {
    //     return (
    //       <Fragment>
    //         <Tooltip title="个人信息采集">
    //           <span
    //             onClick={() =>
    //               this.handleClick(true, record, "updatePersonalInfo")
    //             }
    //           >
    //             <Icon type="edit" style={{ justifyContent: "center" }} />
    //             <span
    //               style={{
    //                 cursor: "pointer",
    //                 marginLeft: "5px",
    //                 lineHeight: "1"
    //               }}
    //             >
    //               更新个人信息
    //             </span>
    //           </span>
    //         </Tooltip>
    //         <Divider type="vertical" />
    //         <Tooltip title="临床信息采集">
    //           <span
    //             onClick={() => this.handleClick(true, record, "clinicalInfo")}
    //           >
    //             <Icon
    //               type="codepen-circle"
    //               style={{ justifyContent: "center" }}
    //             />
    //             <span
    //               style={{
    //                 cursor: "pointer",
    //                 marginLeft: "5px",
    //                 lineHeight: "1"
    //               }}
    //             >
    //               临床信息采集
    //             </span>
    //           </span>
    //         </Tooltip>
    //         <Divider type="vertical" />
    //         <Tooltip title="查看量表信息">
    //           <span
    //             onClick={() => this.handleClick(true, record, "scaleInfo")}
    //           >
    //             <Icon type="copy" style={{ justifyContent: "center" }} />
    //             <span
    //               style={{
    //                 cursor: "pointer",
    //                 marginLeft: "5px",
    //                 lineHeight: "1"
    //               }}
    //             >
    //               查看量表
    //             </span>
    //           </span>
    //         </Tooltip>
    //         <Divider type="vertical" />
    //         <Tooltip title="新建近红外采集信息">
    //           <span
    //             onClick={() =>
    //               this.handleClick(true, record, "missionBasicInfo")
    //             }
    //           >
    //             <Icon type="arrow-right" style={{ justifyContent: "center" }} />
    //             <span
    //               style={{
    //                 cursor: "pointer",
    //                 marginLeft: "5px",
    //                 lineHeight: "1"
    //               }}
    //             >
    //               添加测试任务
    //             </span>
    //           </span>
    //         </Tooltip>
    //       </Fragment>
    //     );
    //   }
    // },
    {
      title: "查看历史诊疗记录",
      width: "40%",
      render: (text, record) => {
        return (
          
          <Button type="primary" 
           onClick={() => this.handleClick(true, record, "jingzhuiInfo")}
             style={{ marginLeft: "20px" }}>
              查看并进行评估
          </Button>
          
        )
    }
  }]


  render() {
    return (
      <div className="main-content">
        {this.renderSearch()}
        <div className="information-tabel-content">
          <Table
            bordered
            columns={this.colums}
            dataSource={this.state.tableData}
          ></Table>
        </div>
        {/* 新建患者/个人信息采集弹框 */}
        {this.state.newPatientModalVisible && (
          <PersonalForm
            modalVisible={this.state.newPatientModalVisible}
            handleModalVisible={this.handleModalVisible}
            diseaseList={this.state.diseaseList}
            doctorList={this.state.doctorList}
            getTableDate={this.getTableDate}
          />
        )}
        {/* 更新个人信息 */}
        {this.state.UpdatePersonalFormVisible && (
          <UpdatePersonalForm
            modalVisible={this.state.UpdatePersonalFormVisible}
            handleModalVisible={this.handleModalVisible}
            currentRecord={this.state.currentRecord}
            doctorList={this.state.doctorList}
            getTableDate={this.getTableDate}
            diseaseList={this.state.diseaseList}
          />
        )}
        {/* 临床信息采集弹框 */}
        {this.state.clinicalModalVisible && (
          <ClinicalForm
            modalVisible={this.state.clinicalModalVisible}
            handleModalVisible={this.handleModalVisible}
            currentRecord={this.state.currentRecord}
          />
        )}
        {/* 查看量表弹框 */}
        {this.state.scaleModalVisible && (
          <ScaleForm
            modalVisible={this.state.scaleModalVisible}
            handleModalVisible={this.handleModalVisible}
            currentRecord={this.state.currentRecord}
          />
        )}
        {/* 查看颈椎病弹框 */}
        {this.state.jingzhuiVisible && (
          <JingzhuiForm 
            modalVisible={this.state.jingzhuiVisible}
            handleModalVisible={this.handleModalVisible}
            currentRecord={this.state.currentRecord}
          />
        )}
        {this.state.ruxianVisible && (
          <RuxianForm 
            modalVisible={this.state.ruxianVisible}
            handleModalVisible={this.handleModalVisible}
            currentRecord={this.state.currentRecord}
          />
        )}
        {/* 新建近红外采集信息 */}
        {this.state.missionModalVisible && (
          <MissionInfoForm
            modalVisible={this.state.missionModalVisible}
            handleModalVisible={this.handleModalVisible}
            currentRecord={this.state.currentRecord}
          />
        )}
        {/* 患者信息展示弹框 */}
        {this.state.PatientsDescriptionModalVisible && (
          <PatientsDescriptionForm
            modalVisible={this.state.PatientsDescriptionModalVisible}
            handleModalVisible={this.handleModalVisible}
            currentRecord={this.state.currentRecord}
          />
        )}
      </div>
    );
  }
}
export default Form.create()(kangfuManagement);
