/**
 * 更新任务信息弹框
 */
import React, { Component } from "react";
import { Form, Input, Button, Modal, Row, Typography, Divider } from "antd";
//import API from "../../api/api";
import API from "../../api/algorithm"

const { Title } = Typography;

class TaskInformationCollection extends Component {
  state = {};

  handleMissionSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      const { currentRecord } = this.props;
      const task = currentRecord.task;
      console.log(values);
      let param = {
        wcstId: task.id,
        time: task.time
      };
      Object.assign(param, values);
      API.updateWcstTask(param).then(res => {
        console.log(res);
      }).then(resolve=>{
        API.getTaskList({}).then(res => {
          this.props.getTableDate(res);
        });
      })
      this.props.handleModalVisible(false, "taskInfo");
    });
  };

  //加载任务表单数据
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
    // const WCSTTask = {
    //   应答总数: "ta",
    //   正确应答数: "cr",
    //   正确应答百分比: "pcr",
    //   错误应答数: "te",
    //   错误应答数百分比: "pe",
    //   持续性应答数: "pr",
    //   持续性应答数百分比: "ppr",
    //   持续性错误数: "pse",
    //   持续性错误的百分数: "ppe",
    //   非持续性错误: "npe",
    //   非持续性错误百分比: "pnpe",
    //   概念化水平应答数: "clr",
    //   概念化水平百分数: "pclr",
    //   完成分类数: "cc",
    //   完成第一个分类所需应答数: "tcfc",
    //   不能维持完整分类: "fm",
    //   学习到学会: "l2l",
    //   用时: "useTime"
    // };

    const { currentRecord } = this.props;
    const task = currentRecord.task;
    //填写测试任务结果
    return (
      <Form {...formItemLayout} onSubmit={this.handleMissionSubmit}>
        <Row justify="start" type="flex">
          <Title level={4}>WCST认知测试</Title>
        </Row>
        <Divider />
        {/* {Object.keys(WCSTTask).map((item, index) => {   //todo 不知为什么这样遍历会报错，还没找到原因
          let taskName = WCSTTask[item];
          debugger
          return (
            <Form.Item key={index} label={item}>
              {getFieldDecorator({taskName}, {
                initialValue: task[taskName]
              })(<Input />)}
            </Form.Item>
          );
        })} */}
        <Form.Item label="总应答数">
          {getFieldDecorator("ta", {
            initialValue: task.ta
          })(<Input />)}
        </Form.Item>
        <Form.Item label="正确应答数">
          {getFieldDecorator("cr", {
            initialValue: task.cr
          })(<Input />)}
        </Form.Item>
        <Form.Item label="正确应答百分比">
          {getFieldDecorator("pcr", {
            initialValue: task.pcr
          })(<Input />)}
        </Form.Item>
        <Form.Item label="错误应答数">
          {getFieldDecorator("te", {
            initialValue: task.te
          })(<Input />)}
        </Form.Item>
        <Form.Item label="错误应答数百分比">
          {getFieldDecorator("pe", {
            initialValue: task.pe
          })(<Input />)}
        </Form.Item>
        <Form.Item label="持续性应答数">
          {getFieldDecorator("pr", {
            initialValue: task.pr
          })(<Input />)}
        </Form.Item>
        <Form.Item label="持持续性应答数百分比">
          {getFieldDecorator("ppr", {
            initialValue: task.ppr
          })(<Input />)}
        </Form.Item>
        <Form.Item label="持续性错误数">
          {getFieldDecorator("pse", {
            initialValue: task.pse
          })(<Input />)}
        </Form.Item>
        <Form.Item label="持续性错误数百分比">
          {getFieldDecorator("ppe", {
            initialValue: task.ppe
          })(<Input />)}
        </Form.Item>
        <Form.Item label="非持续性错误">
          {getFieldDecorator("npe", {
            initialValue: task.npe
          })(<Input />)}
        </Form.Item>
        <Form.Item label="非持续性错误百分比">
          {getFieldDecorator("pnpe", {
            initialValue: task.pnpe
          })(<Input />)}
        </Form.Item>
        <Form.Item label="概念化水平应答数">
          {getFieldDecorator("clr", {
            initialValue: task.clr
          })(<Input />)}
        </Form.Item>
        <Form.Item label="概念化水平百分数">
          {getFieldDecorator("pclr", {
            initialValue: task.pclr
          })(<Input />)}
        </Form.Item>
        <Form.Item label="完成分类数">
          {getFieldDecorator("cc", {
            initialValue: task.cc
          })(<Input />)}
        </Form.Item>
        <Form.Item label="完成第一个分类所需应答数">
          {getFieldDecorator("tcfc", {
            initialValue: task.tcfc
          })(<Input />)}
        </Form.Item>
        <Form.Item label="不能维持完整分类">
          {getFieldDecorator("fm", {
            initialValue: task.fm
          })(<Input />)}
        </Form.Item>
        <Form.Item label="学习到学会">
          {getFieldDecorator("l2l", {
            initialValue: task.l2l
          })(<Input />)}
        </Form.Item>
        <Form.Item label="用时">
          {getFieldDecorator("time", {
            initialValue: task.useTime
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }

  render() {
    console.log(this.props);
    const { currentRecord, modalVisible, handleModalVisible } = this.props;
    const title =
      "任务信息采集——" + currentRecord.medId + "_" + currentRecord.name;
    return (
      <Modal
        visible={modalVisible}
        title={title}
        width="60%"
        onCancel={() => handleModalVisible(false, "taskInfo")}
        destroyOnClose
        footer={[
          <Button
            key="cancel"
            onClick={() => this.props.handleModalVisible(false, "taskInfo")}
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

export default Form.create()(TaskInformationCollection);
