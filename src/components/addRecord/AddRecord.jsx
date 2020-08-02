import React, { Component } from "react";
import {
  Input,
  Form,
  TextArea,
  Icon,
  Button,
  Upload,
  br,
  Row,
  Divider,
  Tooltip,
  Tag,
  DatePicker,
  Message,
  Drawer,
  Col,
  Modal,
  Descriptions,
} from "antd";
import "./add-record.less";
import API from "../../api/api";
class AddRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medRecord: {
        patientId: "000001",
        name: "张三",
        gender: 0,
        birthday: "1993-02-23",
        chfCmp: "腰酸背痛腿抽筋",
        disease: "脊椎疾病——腰椎间盘突出",
      },
      simMedRecordId: null,
      simMedRecord: {},
      diseaseList: [],
      helpSwitch: false,
    };
  }

  //   根据生日获取年龄
  getAge(birthday) {
    //出生时间 毫秒
    var birthDayTime = new Date(birthday).getTime();
    //当前时间 毫秒
    var nowTime = new Date().getTime();
    //一年毫秒数(365 * 86400000 = 31536000000)
    return Math.ceil((nowTime - birthDayTime) / 31536000000);
  }

  //   页面渲染前执行函数
  componentDidMount() {
    let id = this.props.match.params.id;
    console.log("this.props.match.params", this.props.match.params);
    // this.getMedRecord(id);
    // this.getDiseaseList();
  }

  //   渲染的页面
  render() {
    const { form } = this.props;
    // const { getFieldDecorator } = form;
    return (
      <div className="main-content">
        <b>基本信息</b>
        <Divider className="divide" />
        <Row justify="space-between">
          <Col span={3}>
            <strong>患者id:</strong>
            <span style={{ marginLeft: 15, padding: 8 }}>
              {this.state.medRecord.patientId}
            </span>
          </Col>
          <Col span={2}>
            <strong>姓名:</strong>
            <span style={{ marginLeft: 15, padding: 8 }}>
              {this.state.medRecord.name}
            </span>
          </Col>
          <Col span={2}>
            <strong>性别:</strong>
            <span style={{ marginLeft: 15 }}>
              {this.state.medRecord.gender == 1 ? "男" : "女"}
            </span>
          </Col>
          <Col span={2}>
            <strong>年龄:</strong>
            <span style={{ marginLeft: 15 }}>
              {this.getAge(this.state.medRecord.birthday)}
            </span>
          </Col>
          <Col span={4}>
            <strong>病人主诉:</strong>
            <span style={{ marginLeft: 15 }}>
              {this.state.medRecord.chfCmp}
            </span>
          </Col>
          <Col span={4}>
            <strong>诊断</strong>
            <span style={{ marginLeft: 15 }}>
              {this.state.medRecord.disease}
            </span>
          </Col>
        </Row>
        <Divider className="divide" />
        <b>治疗历史记录</b>
        {/* <Descriptions title="历史治疗记录"> */}
        <div
          style={{
            height: 80,
            fontSize: 20,
            fontWeight: "bold",
            color: "red",
            marginLeft: "100px",
          }}
        >
          展示病历中的历史治疗记录
        </div>
        {/* <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Remark">empty</Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item> */}
        {/* </Descriptions> */}
        <Divider />
        <b>上传治疗前的红外热像图</b>
        <div>
          <Form.Item label="红外热像">
            {/* {getFieldDecorator(
              "infraFile",
              {}
            )( */}
              <Upload action="路径" beforeUpload={this.beforeUploadIrtFile}>
                <Button style={{ width: 200 }} type="primary" icon="upload">
                  选择要上传的文件
                </Button>
              </Upload>
            {/* )} */}
          </Form.Item>
          {/* <Form.Item label="描述" style={{ marginLeft: 0 }}>
            {getFieldDecorator(
              "infraDesc",
              {}
            )(
              <TextArea
                style={{ width: 200, height: 32 }}
                autoSize={{ minRows: 1, maxRows: 10 }}
                placeholder="请输入..."
              />
            )}
          </Form.Item> */}
          {/* <Form.Item label="异常">
            {getFieldDecorator(
              "infraExcp",
              {}
            )(
              <TextArea
                style={{ width: 200, height: 32 }}
                autoSize={{ minRows: 1, maxRows: 10 }}
                placeholder="请输入..."
              />
            )}
          </Form.Item> */}
        </div>
        F
        <Divider />
        <b>治疗建议</b>
        <Divider />
       
      </div>
    );
  }
}

export default Form.create()(AddRecord);
