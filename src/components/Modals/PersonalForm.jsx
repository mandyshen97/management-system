import React, { Component } from "react";
import { Modal, Form, Input, Select, Button, Message, DatePicker } from "antd";
import API from "../../api/api";
import { formatDate } from "../../utils/dateUtils";

const { Option } = Select;
const ADHDItem = [
  { label: "单纯性失眠", value: 1 },
  { label: "伴过度觉醒", value: 2 },
  { label: "伴焦虑", value: 3 },
  { label: "伴抑郁", value: 4 },
  { label: "正常", value: 0 }
];
class PersonalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 提交新建个人信息到数据库
  handlePersonInfoSubmit = e => {
    e.preventDefault();
    //验证
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      if (!err) {
        console.log(values);
        console.log(formatDate(values.birthday));

        let param = {
          medId: values.medId,
          doctorId: values.docId,
          name: values.name,
          gender: values.gender,
          birthday:
            values.birthday === undefined
              ? undefined
              : formatDate(values.birthday),
          weight: values.weight,
          height: values.height,
          disease: values.disType,
          chiCom: values.chiCom,
          drugHis: values.drugHis
        };
        API.patientRegister(param).then(res => {
          Message.success('新建患者个人信息成功！')
          API.getPatientList({}).then(res => {
            this.props.getTableDate(res);
          });
        });
        this.props.handleModalVisible(false, "personalInfo");
      }
    });
  };

  // 个人信息采集的表单
  renderPersonalInfoForm = () => {
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
      <Form {...formItemLayout} onSubmit={this.handlePersonInfoSubmit}>
        <Form.Item label="患者姓名">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "请填写一个用户姓名"
              }
            ]
          })(<Input placeholder="请填写患者姓名" />)}
        </Form.Item>
        <Form.Item label="患者唯一编号">
          {getFieldDecorator("medId", {
            rules: [
              {
                required: true,
                message: "请输入患者唯一编号"
              }
            ]
          })(<Input placeholder="请输入患者唯一编号" />)}
        </Form.Item>
        <Form.Item label="患者性别">
          {getFieldDecorator("gender", {})(
            <Select placeholder="请选择患者性别">
              <Option value={1}>男</Option>
              <Option value={0}>女</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="患者出生日期">
          {getFieldDecorator("birthday", {})(
            <DatePicker placeholder="请选择患者生日" />
          )}
        </Form.Item>
        <Form.Item label="患者体重(kg)">
          {getFieldDecorator("weight", {})(
            <Input placeholder="请填写患者体重" />
          )}
        </Form.Item>
        <Form.Item label="患者身高(cm)">
          {getFieldDecorator("height", {})(
            <Input placeholder="请填写患者身高" />
          )}
        </Form.Item>
        <Form.Item label="患者患病类型">
          {getFieldDecorator("disType", {})(
            <Select placeholder="请选择患者患病类型">
              {this.props.diseaseList.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="主诉">
          {getFieldDecorator("chiCom", {})(
            <Input placeholder="请填写患者主诉" />
          )}
        </Form.Item>
        <Form.Item label="用药史">
          {getFieldDecorator("drugHis", {})(
            <Input placeholder="请填写患者用药史" />
          )}
        </Form.Item>
        <Form.Item label="主治医生">
          {getFieldDecorator("doctorId", {})(
            <Select
              allowClear={true}
              showSearch
              placeholder="请选择主治医生"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.props.doctorList.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            新建患者个人信息
          </Button>
        </Form.Item>
      </Form>
    );
  };

  render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        title="新建患者个人信息"
        width="60%"
        onCancel={() => this.props.handleModalVisible(false, "personalInfo")}
        footer={[
          <Button
            key="back"
            onClick={() => this.props.handleModalVisible(false, "personalInfo")}
          >
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={this.handlePersonInfoSubmit}
          >
            确定
          </Button>
        ]}
      >
        {this.renderPersonalInfoForm()}
      </Modal>
    );
  }
}
export default Form.create()(PersonalForm);
