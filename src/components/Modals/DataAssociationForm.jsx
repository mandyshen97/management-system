import React, { Component } from "react";
import { Button, Form, Input, Modal } from "antd";

class DataAssociationForm extends Component {
  constructor(props){
    super(props)
    this.state={}
  }

  handleFormSubmit = () => {
    //todo
  };

  renderForm() {
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
    const initial =this.props.currentRecord===0? `${this.props.currentRecord.task.id}_W`:`${this.props.currentRecord.task.id}_S`;

    return (
      <Form {...formItemLayout} onSubmit={this.handleFormSubmit}>
        <Form.Item label="采集数据一存储名">
          {getFieldDecorator("path1", {
            initialValue: initial
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            更新数据关联信息
          </Button>
        </Form.Item>
      </Form>
    );
  }

  render() {
    const { modalVisible, handleModalVisible } = this.props;
    return (
      <Modal
        visible={modalVisible}
        title="采集数据存储关联"
        width="40%"
        onCancel={() => handleModalVisible(false, "dataPath")}
        destroyOnClose
        footer={[
          <Button
            key="cancel"
            onClick={() => handleModalVisible(false, "dataPath")}
          >
            取消
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={() => handleModalVisible(false, "dataPath")}
          >
            确定
          </Button>
        ]}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

export default Form.create()(DataAssociationForm);
