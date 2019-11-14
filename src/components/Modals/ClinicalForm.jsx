/**
 * 临床信息采集弹窗
 */

import React, { Component } from "react";
import { Form, Input, Button, Modal, Row,Typography, Divider, Select } from "antd";

const { Option } = Select;
const { Title } = Typography;

class ClinicalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicalInfo: {
        symptomTime: undefined,
        presentIllnessHistory: "",
        chiefComplaint: "",
        treatmentHistory: undefined,
        pastHistory: undefined,
        personalHistory: undefined,
        familyHistory: ""
      }
    };
  }
  componentDidMount() {
    // todo
  }

  // 提交处理
  handleClinicalSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(err) return;
      if(!err){
        // todo
        // 哪个接口？？？
      }
      this.props.handleModalVisible(false, "clinicalInfo");
    });
  }

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { clinicalInfo } = this.state;
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
    const pastHistoryItem = [
      "高热惊厥",
      "癫痫",
      "鼻炎",
      "扁桃体炎",
      "头颅外伤",
      "食物、药物过敏史"
    ];

    const personHistoryItem = [
      "父母高龄孕产",
      "早产",
      "产伤",
      "产时缺氧",
      "黄疸",
      "走路、说话等发育不良"
    ];
    const medication = [
      {
        value: "unused",
        label: "未用药"
      },
      {
        value: "noEffect",
        label: "无疗效"
      },
      {
        value: "lowEffect",
        label: "低疗效"
      },
      {
        value: "highEffect",
        label: "高疗效"
      }
    ];
    return (
      <Form {...formItemLayout} onSubmit={this.handleClinicalSubmit}>
        <Row justify="start" type="flex">
          <Title level={4}>现病史</Title>
        </Row>
        <Divider />
        <Form.Item label="症状持续时间（月）">
          {getFieldDecorator("symptomTime", {
            initialValue: clinicalInfo.symptomTime
          })(<Input />)}
        </Form.Item>
        <Form.Item label="现病史">
          {getFieldDecorator("presentIllnessHistory", {
            initialValue: clinicalInfo.presentIllnessHistory
          })(<Input />)}
        </Form.Item>
        <Row justify="start" type="flex">
          <Title level={4}>主诉/治疗史</Title>
        </Row>
        <Divider />
        <Form.Item label="主诉">
          {getFieldDecorator("chiefComplaint", {
            initialValue: clinicalInfo.chiefComplaint
          })(<Input />)}
        </Form.Item>
        <Form.Item label="用药疗效">
          {getFieldDecorator("treatmentHistory", {
            initialValue: clinicalInfo.treatmentHistory
          })(
            <Select>
              {medication.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Row justify="start" type="flex">
          <Title level={4}>既往史/个人史/家族史</Title>
        </Row>
        <Divider />
        <Form.Item label="既往史">
          {getFieldDecorator("pastHistory", {
            initialValue: clinicalInfo.pastHistory
          })(
            <Select>
              {pastHistoryItem.map((v, index) => (
                <Option key={index} value={v}>
                  {v}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="个人史">
          {getFieldDecorator("personalHistory", {
            initialValue: clinicalInfo.personalHistory
          })(
            <Select>
              {personHistoryItem.map((v, index) => (
                <Option key={index} value={v}>
                  {v}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="家族史">
          {getFieldDecorator("familyHistory", {
            initialValue: clinicalInfo.familyHistory
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  };
  render() {
    console.log(this.props)
    const title = `临床信息采集——${this.props.currentRecord.medId}_${this.props.currentRecord.name}`;
    return (
      <Modal
        visible={this.props.modalVisible}
        title={title}
        onCancel={() => this.props.handleModalVisible(false, "clinicalInfo")}
        onOk={this.handleClinicalSubmit}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

export default Form.create()(ClinicalForm);
