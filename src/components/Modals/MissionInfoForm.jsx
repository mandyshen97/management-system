/**
 * 任务基本信息填写弹框
 */
import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
//import API from "../../api/api";
import API from "../../api/algorithm"
import {
  Form,
  Modal,
  Row,
  Typography,
  Select,
  Divider,
  DatePicker,
  TimePicker,
  Button,
  Message
} from "antd";
import { connect } from "tls";
const { Option } = Select;
const { Title } = Typography;
class MissionInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missionFormData: {
        testTime: undefined, //测试时间
        testType: undefined, //测试类型，一共两类：WCST或者整晚
        medicine: undefined, //测试前服用的药物
        timeAfterMed: undefined, //吃完药之后多久进行测试
        otherInter: undefined //非药物干预
      },
      medicineList: [],
      hourList: [],
      
    };
    for (let i = 0; i < 24; i++) {
      this.state.hourList.push(<Option key={i}>{i.toString()}</Option>);
    }
  }

  componentDidMount(){
    API.getMedicineList({}).then(res=>{
      let newMedicineList = ["无"];
      res.data.map((item, index) => {
        newMedicineList.push(item.name);
      });
      this.setState({
       medicineList: newMedicineList
        }
        )
      }
    )
  }

  handleMissionSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      if (!err) {
        console.log(values); // {testTime: undefined, testType: undefined, medicine: undefined, timeAfterMed: undefined, otherInter: undefined}
        const { currentRecord } = this.props;
        console.log(currentRecord);
        //age: 25
        //birthday: "1994-10-11T00:00:00.000+0800"
        //chiCom: "失眠 嗜睡"
        //disease: "单纯性失眠"
        //doctorName: "毛主任"
        //drugHis: "无"
        //gender: 1
        //height: 171
        //id: 1
        //key: 0
        //medId: "000001"
        //name: "邵洋"
        //weight: 64
        if (values.testType==0){
        let param = {
          patientId: currentRecord.id,
          time: values.testTime,
          medicine: values.medicine,
          timeAfterMed: values.timeAfterMed,
          nonMedicineId: values.otherInter,
          };
        console.log("++++++")
        console.log(param)  
        API.addWcstTask(param).then(res => {
          Message.success('添加wcst任务成功！')
        });
        }
        else{
          let param = {
            patientId: currentRecord.id,
            time: values.testTime,
            medicine: values.medicine,
            timeAfterMed: values.timeAfterMed,
            nonMedicineId: values.otherInter,
            };
          console.log(param)
          API.addTask(param).then(res => {
            console.log(res)
            Message.success('添加整晚任务成功！')
          });
          }
        }
      this.props.handleModalVisible(false, "missionBasicInfo");
    });
  };

  renderForm = () => {
    const { missionFormData } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    
    
    return (
      <Form {...formItemLayout} onSubmit={this.handleMissionSubmit}>
        <Row justify="start" type="flex">
          <Title level={4}>测试基本信息填写</Title>
        </Row>
        <Divider />
        <Form.Item label="测试时间">
          {getFieldDecorator("testTime", {
            initialValue: missionFormData.testTime
          })(<DatePicker style={{ width: 200 }} />)}
          <TimePicker
            style={{ width: 200 }}
            defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
          />
        </Form.Item>
        <Form.Item label="选择测试类型">
          {getFieldDecorator("testType", {
            initialValue: missionFormData.testType
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择测试类型"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="0">WCST</Option>
              <Option value="1">整晚测量</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="测试前服用药物">
          {getFieldDecorator("medicine", {
            initialValue: missionFormData.medicine
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              mode="multiple"
              placeholder="选择药物"
              initialValue={["SSRI", "SNRI"]}
            >
              {this.state.medicineList.map((item, index) => (
                <Option key={index}>{item}</Option>
              ))}
            </Select>
            
     
          )}
        </Form.Item>
        <Form.Item label="服用药物剂量">
          {getFieldDecorator("medicine", {
            initialValue: missionFormData.medicine
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              mode="multiple"
              placeholder="选择药物"
              initialValue={["SSRI", "SNRI"]}
            >
              {this.state.medicineList.map((item, index) => (
                <Option key={index}>{item}</Option>
              ))}
            </Select>
            
     
          )}
        </Form.Item>
        <Form.Item label="服药后多久进行测试(h)">
          {getFieldDecorator("timeAfterMed", {
            initialValue: missionFormData.timeAfterMed
          })(
            // <TimePicker
            //   style={{ width: 200 }}
            //   initialValue={moment("1", "hh")}
            //   format={"hh"}
            // />
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择时间（小时）"
              >
              {this.state.hourList}
            </Select>

          )}
        </Form.Item>
        <Form.Item label="其他干预方式">
          {getFieldDecorator("otherInter", {
            initialValue: missionFormData.otherInter
          })(
            <Select
              mode="multiple"
              style={{ width: 200 }}
              placeholder="选择其他干预方式"
              initislValue={["SSRI", "SNRI"]}
            >
              <Option value="0">无</Option>
              <Option value="1">rTMs</Option>
              <Option value="2">CBT-I</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            添加任务
          </Button>
          <Link to="/labelInformationManagement">
            <Button htmlType="submit" style={{ marginLeft: "20px" }}>
              查看任务
            </Button>
          </Link>
        </Form.Item>
      </Form>
    );
  };

  render() {
    const { currentRecord, modalVisible, handleModalVisible } = this.props;
    const title = `任务基本信息填写——${currentRecord.medId}_${currentRecord.name}`;
    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={this.handleMissionSubmit}
        onCancel={() => {
          handleModalVisible(false, "missionBasicInfo");
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => handleModalVisible(false, "missionBasicInfo")}
          >
            取消
          </Button>,
          <Button key="ok" type="primary" onClick={this.handleMissionSubmit}>
            确定
          </Button>
        ]}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

export default Form.create()(MissionInfoForm);
