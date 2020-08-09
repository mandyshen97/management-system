/**
 * 患者信息展示弹框
 */

import React, { Component } from "react";
import { Form, Modal, Divider, Descriptions,Card} from "antd";
class AssistDescriptionForm extends Component {
  state = {
    currentRecord :{
      name: undefined,
      disease: undefined,
      medId: undefined,
      gender: undefined,
      age: undefined,
      weight: undefined,
      height: undefined,
      symptomTime:undefined,
      presentIllnessHistory:undefined,
      chiCom: undefined,
      treatmentHistory:undefined,
      pastHistory:undefined,
      personalHistory:undefined,
      familyHistory:undefined
    }

  };

  renderDescription() {
    const { currentRecord } = this.props;
    var gender = ""
    if  (currentRecord. gender ===1) {
      gender = "男"
    }
    if (currentRecord. gender ===0) {
      gender = "女"
    } 
    return (
      <div>
        <Card>
        <Descriptions bordered title="Custom Size" title="患者信息">
          <Descriptions.Item label="患者姓名">
            {/* {currentRecord.name} */}
            陈强
          </Descriptions.Item>
          <Descriptions.Item label="患病类型">
            {/* {currentRecord.disease} */}
            未诊断
          </Descriptions.Item>
          <Descriptions.Item label="患者编号">
            {/* {currentRecord.medId} */}
            000021
          </Descriptions.Item>
          <Descriptions.Item label="患者性别">
            {/* {gender} */}
            男
          </Descriptions.Item>
          <Descriptions.Item label="患者年龄">
           62
          </Descriptions.Item>
          <Descriptions.Item label="患者体重(kg)">
            67
          </Descriptions.Item>
          <Descriptions.Item label="患者身高(cm)">
            172
          </Descriptions.Item>
          <Descriptions.Item label="症状持续时间">
            三个月
          </Descriptions.Item>
          <Descriptions.Item label="现病史">
            {/* {currentRecord.presentIllnessHistory} */}
            心烦易怒、入睡困难，多梦，睡后易醒；乏力，神疲；食欲稍差，胃脘饱胀
          </Descriptions.Item>
          <Descriptions.Item label="主诉">
            {/* {currentRecord.chiCom} */}
            失眠已近2个多月
          </Descriptions.Item>
          <Descriptions.Item label="用药疗效">
          给于安定，佐匹克隆，初效，后无效，伴随嘴唇颤抖
            {/* {currentRecord.treatmentHistory} */}
          </Descriptions.Item>
          <Descriptions.Item label="既往史">
            {/* {currentRecord.pastHistory} */}
            既往高血压病史8年，糖尿病病史6年，肥厚性心肌病10年
          </Descriptions.Item>
          <Descriptions.Item label="个人史">
           出生并长大于杭州，有抽烟喝酒等嗜好
            {/* {currentRecord.personalHistory} */}
          </Descriptions.Item>
          <Descriptions.Item label="家族史">
            无家族遗传病
            {/* {currentRecord.familyHistory} */}
          </Descriptions.Item>
        </Descriptions>
        </Card>
      </div>
    );
  }

  render() {
    console.log(this.props);
    const { currentRecord } = this.props;
    const title = `患者信息展示——${currentRecord.medId}_${currentRecord.name}`;
    return (
      <div>
        {this.renderDescription()}
      </div>
    );
  }
}
export default Form.create()(AssistDescriptionForm);
