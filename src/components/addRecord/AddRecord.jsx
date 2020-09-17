import React, { Component } from "react";
import {
  Upload,
  Input,
  Form,
  Icon,
  Row,
  Divider,
  Col,
  Modal,
  Select,
  Table,
  DatePicker,
  Button,
  Message,
  Descriptions,
} from "antd";
import "./add-record.less";
import API from "../../api/api";
const { TextArea } = Input;
const { Option } = Select;
const { Column, ColumnGroup } = Table;
class AddRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: "",
      name: "",
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
      // 照片墙 start
      previewVisible: false,
      previewImage: "",
      fileList: [],
      // 照片墙 end
    };
  }

  // 照片墙 start
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  // 照片墙 end

  //   根据生日获取年龄
  getAge(birthday) {
    //出生时间 毫秒
    var birthDayTime = new Date(birthday).getTime();
    //当前时间 毫秒
    var nowTime = new Date().getTime();
    //一年毫秒数(365 * 86400000 = 31536000000)
    return Math.ceil((nowTime - birthDayTime) / 31536000000);
  }

  handleTreatChange = (value) => {
    console.log("selected", value);
  };

  //   页面渲染前执行函数
  componentDidMount() {
    let id = this.props.match.params.id;
    console.log("this.props.match.params", this.props.match.params);
    // this.getMedRecord(id);
    // this.getDiseaseList();
  }

  // 查询表单
  renderSearch = () => {
    return (
      <Form
        layout="inline"
        style={{ marginBottom: 30 }}
        onFinish={this.queryPatient}
        ref="patientQueryForm"
      >
        <Form.Item name="patientId" label="患者id：">
          <Input style={{ width: 100, marginRight: 15 }} placeholder="患者id" />
        </Form.Item>
        <Form.Item name="name" label="患者姓名：">
          <Input
            style={{ width: 100, marginRight: 15 }}
            placeholder="患者姓名"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
    );
  };

  // 患者基本信息查询
  queryPatient = () => {
    let values = this.refs.patientQueryForm.getFieldsValue();
    let param = {
      id: values.patientId,
      name: values.name,
    };
    this.setState({
      patientId: values.patientId,
      name: values.name,
    });
    // todo
    // 获取患者列表的API
    // API.getPatientList(param).then((res) => {
    //   const { data, code, msg } = res;
    //   if(code==='200'){
    //     let newListData = []

    //   }
    // });

    fetch(
      "https://www.fastmock.site/mock/9df39432386360a59e2d0557525f4887/query/query/getPatientList"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        const { data, code, msg } = res;
        if (code === "200") {
          // let newListData = [];
          // data.map((item, index) => {
          //   let newListDataItem = {};
          //   // newListDataItem.key = index+item.patientId;
          //   newListData.push(item);
          // });
          this.setState({
            listData: data,
          });
        }
      });
  };

  // 获取历史治疗记录
  queryHistory = () => {
    let param = {
      id: this.state.patientId,
      name: this.state.name,
    };

    API.getHistoryRecords(param).then((res) => {
      // todo
      console.log('res',res)
    });
  };

  // 上传治疗前的内容
  handleSaveBeforeTreat = () => {
    const values = this.refs.beforeTreatForm.getFieldsValue();
    let { infraFile, infraDesc, infraExcp, pulseExcp } = values;
    let param = values;
    param.time = new Date();
    API.saveBeforeTreat(param).then((res) => {
      if ((res.code = "200")) {
        Message.success("上传成功！");
      } else {
        Message.error("上传失败！");
      }
    });
  };


  // 本次治疗的记录
  handleTreat = () => {
    const values = this.refs.treatForm.getFieldsValue();
    let param = values;
    API.treat(param).then((res) => {
      if ((res.code = "200")) {
        Message.success("上传成功！");
      } else {
        Message.error("上传失败！");
      }
    });
  };

  // 上传本次治疗后的内容
  handleSaveAfterTreat = () => {
    console.log("treatafter");
    const values = this.refs.afterTreatForm.getFieldsValue();
    let { infraDesc, infraExcp, infraFile, pulseExcp } = values;
    console.log(values);
    let param = values;
    API.saveAfterTreat(param).then((res) => {
      if ((res.code = "200")) {
        Message.success("上传成功！");
      } else {
        Message.error("上传失败！");
      }
    });
  };

  //   渲染的页面
  render() {
    // 照片墙start
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // 照片墙end
    const treatList = [
      "针灸",
      "推拿",
      "药物",
      "康复训练",
      "理疗",
      "爬行训练",
      "手术",
      "其他方法",
    ];
    const dataSource = [
      {
        firstDate: "2020-02-20",
        iniSymptoms: "腰酸背痛",
      },
    ];
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <div className="main-content">
        {this.renderSearch()}
        <b>基本信息</b>
        <Divider className="divide" />
        <Row justify="space-between" className="basicInformation">
          <Col>
            <strong>患者id:</strong>
            <span style={{ marginLeft: 15, padding: 8 }}>
              {this.state.medRecord.patientId}
            </span>
          </Col>
          <Col>
            <strong>姓名:</strong>
            <span style={{ marginLeft: 15, padding: 8 }}>
              {this.state.medRecord.name}
            </span>
          </Col>
          <Col>
            <strong>性别:</strong>
            <span style={{ marginLeft: 15 }}>
              {this.state.medRecord.gender == 1 ? "男" : "女"}
            </span>
          </Col>
          <Col>
            <strong>年龄:</strong>
            <span style={{ marginLeft: 15 }}>
              {this.getAge(this.state.medRecord.birthday)}
            </span>
          </Col>
          <Col>
            <strong>病人主诉:</strong>
            <span style={{ marginLeft: 15 }}>
              {this.state.medRecord.chfCmp}
            </span>
          </Col>
          <Col>
            <strong>诊断:</strong>
            <span style={{ marginLeft: 15 }}>
              {this.state.medRecord.disease}
            </span>
          </Col>
        </Row>
        <Divider className="divide" />
        <b>历史治疗记录</b>
        <Table dataSource={dataSource} bordered>
          <Column title="初次就诊时间" dataIndex="firstDate" key="firstDate" />
          <Column title="初始症状" dataIndex="iniSymptoms" key="iniSymptoms" />
          <ColumnGroup title="第1次治疗">
            <Column title="就诊时间" dataIndex="date" key="date" />
            <Column title="红外热像图" dataIndex="infImage" key="firstName" />
            <Column title="描述" dataIndex="description" key="lastName" />
          </ColumnGroup>
          <ColumnGroup title="第2次治疗">
            <Column title="就诊时间" dataIndex="date" key="date" />
            <Column title="红外热像图" dataIndex="firstName" key="firstName" />
            <Column title="描述" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <ColumnGroup title="第3次治疗">
            <Column title="就诊时间" dataIndex="date" key="date" />
            <Column title="红外热像图" dataIndex="firstName" key="firstName" />
            <Column title="描述" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <ColumnGroup title="第4次治疗">
            <Column title="就诊时间" dataIndex="date" key="date" />
            <Column title="红外热像图" dataIndex="firstName" key="firstName" />
            <Column title="描述" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
        </Table>
        <Divider />
        <b>本次治疗前</b>
        <br />
        <Form {...layout} layout="horizontal" ref="beforeTreatForm">
          <div style={{ display: "flex" }}>
            <Form.Item label="红外热像" className="imageFile" name="infraFile">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
            <Form.Item label="描述" style={{ marginLeft: 0 }} name="infraDesc">
              <TextArea
                // style={{ width: 400, height: 32 }}
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder="请输入..."
              />
            </Form.Item>
            <Form.Item label="异常" name="infraExcp">
              <TextArea
                // style={{ width: 400, height: 32 }}
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder="请输入..."
              />
            </Form.Item>
            <Form.Item label="用药情况" name="pulseExcp">
              <TextArea
                // style={{ width: 400, height: 32 }}
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder="请输入..."
              />
            </Form.Item>
            <Button
              onClick={this.handleSaveBeforeTreat}
              type="primary"
              style={{ marginLeft: 5 }}
            >
              保存
            </Button>
          </div>
        </Form>
        <br />
        <Divider />
        <b>选择或新增治疗方案</b>
        <Form className="treat" ref="treatForm">
          <Form.Item label="选择治疗方案" name="treat">
            <Select
              mode="multiple"
              showArrow="true"
              style={{ width: 400 }}
              placeholder="Please select"
              onChange={this.handleTreatChange}
            >
              {treatList.map((item, index) => {
                return (
                  <Option value={item} key={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="就诊时间" name="date">
            <DatePicker style={{ width: 400 }}></DatePicker>
          </Form.Item>
          <Form.Item label="治疗情况说明" name="treatDetail">
            <TextArea
              style={{ width: 400, height: 32 }}
              autoSize={{ minRows: 4, maxRows: 10 }}
              placeholder="请输入..."
            />
          </Form.Item>
          <Button
            onClick={this.handleTreat}
            type="primary"
            style={{ marginLeft: 200 }}
          >
            确定
          </Button>
        </Form>
        <Divider />
        <b>本次治疗后</b>
        <Form {...layout} layout="horizontal" ref="afterTreatForm">
          <div style={{ display: "flex" }}>
            <Form.Item label="红外热像" className="imageFile" name="infraFile">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
            <Form.Item label="描述" style={{ marginLeft: 0 }} name="infraDesc">
              <TextArea
                // style={{ width: 400, height: 32 }}
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder="请输入..."
              />
            </Form.Item>
            <Form.Item label="异常" name="infraExcp">
              <TextArea
                // style={{ width: 400, height: 32 }}
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder="请输入..."
              />
            </Form.Item>
            <Form.Item label="用药情况" name="pulseExcp">
              <TextArea
                // style={{ width: 400, height: 32 }}
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder="请输入..."
              />
            </Form.Item>
            <Button
              type="primary"
              style={{ marginLeft: 5 }}
              onClick={this.handleSaveAfterTreat}
            >
              保存
            </Button>
          </div>
        </Form>
        <br />
        <Button type="primary">
          点击进行本次治疗红外热成像图像变化智能分析
        </Button>
        <h2>结论</h2>
        <p>背部炎症减少，有好转趋势</p>
      </div>
    );
  }
}

export default AddRecord;
