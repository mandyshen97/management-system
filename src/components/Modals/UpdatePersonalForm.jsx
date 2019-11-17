import React, { Component } from "react";
import { Modal, Form, Input, Select, Button, Message, DatePicker } from "antd";
import API from "../../api/api";
import moment from "moment";
import { formatDate } from "../../utils/dateUtils";

const { Option } = Select;
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
      if (!err) {
        const { currentRecord } = this.props;
        let doctorId;
        if (typeof values.doctor === "number") {
          doctorId = values.doctor;
        } else {
          this.props.doctorList.map(item => {
            doctorId = values.doctor === item.name ? item.id : undefined;
          });
        }
        let param = {
          id: currentRecord.id,
          medId: currentRecord.medId,
          doctorId: doctorId,
          name: values.name,
          gender: values.gender,
          birthday: formatDate(values.birthday),
          weight: values.weight,
          height: values.height,
          disease: values.disease,
          chiCom: values.chiCom,
          drugHis: values.drugHis
        };
        API.updatePatientInformation(param).then(res => {
          Message.success("更新信息成功！");
          API.getPatientList({}).then(res => {
            this.props.getTableDate(res);
          });
        });
        this.props.handleModalVisible(false, "updatePersonalInfo");
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
    const { currentRecord } = this.props;
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
          {getFieldDecorator("birthday", {
            initialValue: moment(currentRecord.birthday)
          })(<DatePicker />)}
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
              {this.props.diseaseList.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="主诉">
          {getFieldDecorator("chiCom", {
            initialValue: currentRecord.chiCom
          })(<Input />)}
        </Form.Item>
        <Form.Item label="用药史">
          {getFieldDecorator("drugHis", {
            initialValue: currentRecord.drugHis
          })(<Input />)}
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
    console.log(this.props.diseaseList)
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
