import React, { Component } from "react";
import { Modal, Form, Input, Select, Button, Message } from "antd";
import API from "../../api/api";

const { Option } = Select;
const ADHDItem = [
  { label: "单纯性失眠", value: 1 },
  { label: "伴过度觉醒", value: 2 },
  { label: "伴焦虑", value: 3 },
  { label: "伴抑郁", value: 4 },
  { label: "正常", value: 0 }
];
class UpdatePersonalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 提交个人信息到数据库
  handlePersonInfoSubmit = e => {
    //阻止表单提交默认事件
    e.preventDefault();
    //验证
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      const { currentRecord } = this.props;
      if (!err) {
        let doctorId;
        if (typeof values.doctor === "int") {
          doctorId = values.doctor;
        } else {
          this.props.doctorList.map((item, index) => {
            doctorId = values.doctor === item.name ? item.id : undefined;
          });
        }
        let param = {
          medId: currentRecord.medId,
          doctorId: doctorId,
          name: values.name,
          gender: values.gender,
          birthday: currentRecord.birthday,
          weight: values.weight,
          height: values.height,
          disease: values.disease,
          chiCom: currentRecord.chiCom,
          drugHis: currentRecord.drugHis
        };
        API.patientRegister(param).then(res => {
          Message.success("更新信息成功！");
        }).then(resolve=>{
          API.getPatientList({}).then(res => {
            this.props.getTableDate(res);
          });
        })
        this.props.handleModalVisible(false, 'updatePersonalInfo')
      }
    });

    //todo
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
    const { currentRecord } = this.props;
    console.log(currentRecord);

    return (
      <Form {...formItemLayout} onSubmit={this.handlePersonInfoSubmit}>
        <Form.Item label="患者姓名">
          {getFieldDecorator("name", {
            initialValue: currentRecord.name,
            rules: [
              {
                required: true,
                message: "请选择一个用户"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="患者性别">
          {getFieldDecorator("gender", {
            initialValue: currentRecord.gender
          })(
            <Select>
              <Option value={1}>男</Option>
              <Option value={0}>女</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="患者年龄">
          {getFieldDecorator("age", {
            initialValue: currentRecord.age
          })(<Input />)}
        </Form.Item>
        <Form.Item label="患者体重(kg)">
          {getFieldDecorator("weight", {
            initialValue: currentRecord.weight
          })(<Input />)}
        </Form.Item>
        <Form.Item label="患者身高(cm)">
          {getFieldDecorator("height", {
            initialValue: currentRecord.height
          })(<Input />)}
        </Form.Item>
        <Form.Item label="患者患病类型">
          {getFieldDecorator("disease", {
            initialValue: currentRecord.disease
          })(
            <Select placeholder="请选择患者患病类型">
              {ADHDItem.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="主治医生">
          {getFieldDecorator("doctor", {
            initialValue: currentRecord.doctorName
          })(
            <Select
              allowClear={true}
              showSearch
              placeholder="选择主治医生"
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
            更新采集个人信息
          </Button>
        </Form.Item>
      </Form>
    );
  };

  render() {
    console.log(this.props.doctorList);
    const { currentRecord } = this.props;
    const title = `更新个人信息——${currentRecord.medId}_${currentRecord.name}`;
    return (
      <Modal
        visible={this.props.modalVisible}
        title={title}
        width="60%"
        onCancel={() =>
          this.props.handleModalVisible(false, "updatePersonalInfo")
        }
        footer={[
          <Button
            key="back"
            onClick={() =>
              this.props.handleModalVisible(false, "updatePersonalInfo")
            }
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
export default Form.create()(UpdatePersonalForm);
