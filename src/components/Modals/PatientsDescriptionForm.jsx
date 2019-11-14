/**
 * 患者信息展示弹框
 */

import React, { Component } from "react";
import { Form, Modal, Divider, Descriptions } from "antd";

const WCSTItem = [
  { label: "短期性失眠", value: 1 },
  { label: "慢性失眠", value: 2 },
  { label: "混合型", value: 3 },
  { label: "正常", value: 0 }
];

const gender = [{ label: 0, value: "女" }, { label: 1, value: "男" }];

class PatientsDescriptionForm extends Component {
  state = {};

  renderDescription() {
    const { currentRecord } = this.props;
    return (
      <div>
        <Descriptions title="患者信息">
          <Descriptions.Item label="患者姓名">
            {currentRecord.name}
          </Descriptions.Item>
          <Descriptions.Item label="患病类型">
            {currentRecord.disease}
          </Descriptions.Item>
          <Descriptions.Item label="患者编号">
            {currentRecord.medId}
          </Descriptions.Item>
          <Descriptions.Item label="患者性别">
            {currentRecord.gender === 1 ? "男" : "女"}
          </Descriptions.Item>
          <Descriptions.Item label="患者年龄">
            {currentRecord.age}
          </Descriptions.Item>
          <Descriptions.Item label="患者体重(kg)">
            {currentRecord.weight}
          </Descriptions.Item>
          <Descriptions.Item label="患者身高(cm)">
            {currentRecord.height}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions title="临床信息">
          <Descriptions.Item label="症状持续时间">
            {currentRecord.symptomTime}
          </Descriptions.Item>
          <Descriptions.Item label="现病史">
            {currentRecord.presentIllnessHistory}
          </Descriptions.Item>
          <Descriptions.Item label="主诉">
            {currentRecord.chiCom}
          </Descriptions.Item>
          <Descriptions.Item label="用药疗效">
            {currentRecord.treatmentHistory}
          </Descriptions.Item>
          <Descriptions.Item label="既往史">
            {currentRecord.pastHistory}
          </Descriptions.Item>
          <Descriptions.Item label="个人史">
            {currentRecord.personalHistory}
          </Descriptions.Item>
          <Descriptions.Item label="家族史">
            {currentRecord.familyHistory}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }

  render() {
    console.log(this.props);
    const { currentRecord } = this.props;
    const title = `患者信息展示——${currentRecord.medId}_${currentRecord.name}`;
    return (
      <Modal
        visible={this.props.modalVisible}
        width="60%"
        title={title}
        onOk={() => {
          this.props.handleModalVisible(false, "patientsDescription");
        }}
        onCancel={() =>
          this.props.handleModalVisible(false, "patientsDescription")
        }
        destroyOnClose
      >
        {this.renderDescription()}
      </Modal>
    );
  }
}
export default Form.create()(PatientsDescriptionForm);
