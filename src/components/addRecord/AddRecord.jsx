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
} from "antd";
import "./add-record.less";
import API from "../../api/api";
const { TextArea } = Input;
const { Option } = Select;
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
    return (
      <div className="main-content">
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
        {/* </Descriptions> */}
        <Divider />
        <b>治疗前</b>
        <div className="uploadFile">
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
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form.Item>
          <Form.Item label="描述" name="infraDesc">
            <TextArea
              style={{ width: 400, height: 32 }}
              autoSize={{ minRows: 4, maxRows: 10 }}
              placeholder="请输入..."
            />
          </Form.Item>
          <Form.Item label="异常" name="infraExcp">
            <TextArea
              style={{ width: 400, height: 32, marginLeft: 10 }}
              autoSize={{ minRows: 4, maxRows: 10 }}
              placeholder="请输入..."
            />
          </Form.Item>
        </div>
        <Form.Item label="用药情况" name="pulseExcp">
          <TextArea
            // style={{ width: 200, height: 32 }}
            autoSize={{ minRows: 3, maxRows: 10 }}
            placeholder="请输入..."
          />
        </Form.Item>
        <Divider />
        <b>选择或新增治疗方案</b>
        <div className="treat">
          <Form.Item label="选择治疗方案" name="treat">
            <Select
              mode="multiple"
              showArrow="true"
              style={{ width: "50%" }}
              placeholder="Please select"
              // defaultValue={["a10", "c12"]}
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
          <Form.Item label="治疗情况说明" name="treatDetail">
            <TextArea
              style={{ width: 400, height: 32 }}
              autoSize={{ minRows: 4, maxRows: 10 }}
              placeholder="请输入..."
            />
          </Form.Item>
        </div>
        <Divider />
        <b>治疗后</b>
        <div className="uploadFile">
          <Form.Item label="红外热像" className="imageFile" name="infraFile">
            {/* // <Upload action="路径" beforeUpload={this.beforeUploadIrtFile}>
              //   <Button style={{ width: 200 }} type="primary" icon="upload">
              //     选择要上传的文件
              //   </Button>
              // </Upload> */}
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
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form.Item>
          <Form.Item label="描述" name="infraDesc">
            <TextArea
              style={{ width: 400, height: 32 }}
              autoSize={{ minRows: 4, maxRows: 10 }}
              placeholder="请输入..."
            />
          </Form.Item>
          <Form.Item label="异常" name="infraExcp">
            <TextArea
              style={{ width: 400, height: 32, marginLeft: 10 }}
              autoSize={{ minRows: 4, maxRows: 10 }}
              placeholder="请输入..."
            />
          </Form.Item>
        </div>
      </div>
    );
  }
}

export default AddRecord;
