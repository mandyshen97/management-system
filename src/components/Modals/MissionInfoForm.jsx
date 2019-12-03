/**
 * 任务基本信息填写弹框
 */
import React, { Component } from "react";
import API from "../../api/api";
import moment from "moment";
import { formatDate } from "../../utils/dateUtils";
import locale from "antd/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";

import {
  Form,
  Modal,
  Row,
  Input,
  Typography,
  Select,
  Divider,
  DatePicker,
  TimePicker,
  Button,
  Message
} from "antd";
const { Option } = Select;
const { Title } = Typography;
moment.locale("zh-cn");
class MissionInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "date",
      medcineList: [],
      nonMedicineList: []
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
  }

  handleMissionSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      if (!err) {
        const { currentRecord } = this.props;
        let param = {
          patientId: currentRecord.id,
          time: values.testDate
            ? moment(values.testDate).format("YYYY-MM-DDTHH:mm:ss")
            : undefined, // 测试时间
          nonMedArray: values.nonMed
            ? values.nonMed.map(item => Number(item))
            : [], // 非药物干预id数组
          medArray: values.medicine
            ? values.medicine.map(item => Number(item))
            : [], // 药品id数组
          medInt: Number(values.timeAfterMed) // 干预药物间隔
          // l2l: values.l2l
        };
        if (values.testType === "0") {
          API.addWCST(param).then(res => {
            if (res.code === "200") {
              Message.success("添加任务成功！");
            } else {
              Message.error("添加任务失败！");
            }
          });
        } else if (values.testType === "1") {
          API.addNirData(param).then(res => {
            if (res.code === "200") {
              Message.success("添加任务成功！");
            } else {
              Message.error("添加任务失败！");
            }
          });
        }
      }
      this.props.handleModalVisible(false, "missionBasicInfo");
    });
  };

  handleViewClick = () => {
    this.handleMissionSubmit();
    // console.log(this.props.history);
    this.props.history.push("/labelInformationManagement");
  };
  handleOpenChange = open => {
    if (open) {
      this.setState({ mode: "date" });
    }
  };

  handlePanelChange = (value, mode) => {
    this.setState({ mode });
  };

  renderForm = () => {
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
          {getFieldDecorator(
            "testDate",
            {}
          )(
            // <DatePicker showTime={true} style={{ width: 200 }} />
            <DatePicker
              locale={locale}
              placeholder="选择测试时间"
              mode={this.state.mode}
              showTime
              onOpenChange={this.handleOpenChange}
              onPanelChange={this.handlePanelChange}
            />
          )}
          {/* {getFieldDecorator(
            "testTime",
            {}
          )(<TimePicker style={{ width: 200 }} defaultOpenValue={moment("00:00:00", "HH:mm:ss")} />)} */}
        </Form.Item>
        <Form.Item label="选择测试类型">
          {getFieldDecorator("testType", { rules: [{ required: true }] })(
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
              <Option value="1">整测量晚</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="测试前服用药物">
          {getFieldDecorator(
            "medicine",
            {}
          )(
            <Select
              showSearch
              style={{ width: 200 }}
              mode="multiple"
              placeholder="选择药物"
              initialValue={["SSRI", "SNRI"]}
            >
              {this.state.medcineList.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="服药后多久进行测试(h)">
          {getFieldDecorator(
            "timeAfterMed",
            {}
          )(<Input style={{ width: 200 }} placeholder="服药后的时间间隔" />)}
        </Form.Item>
        {/* <Form.Item label="开始学习到学会(h)">
          {getFieldDecorator(
            "l2l",
            {}
          )(<Input style={{ width: 200 }} placeholder="开始学习到学会" />)}
        </Form.Item> */}
        <Form.Item label="其他干预方式">
          {getFieldDecorator(
            "nonMed",
            {}
          )(
            <Select
              mode="multiple"
              style={{ width: 200 }}
              placeholder="选择其他干预方式"
              initislValue={["SSRI", "SNRI"]}
            >
              {this.state.nonMedicineList.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            添加任务
          </Button>
          <Button
            htmlType="submit"
            onClick={this.handleViewClick}
            style={{ marginLeft: "20px" }}
          >
            查看任务
          </Button>
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
