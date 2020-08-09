import React, {Component } from 'react';
import AssistDescriptionForm from '../assist/AssistDescription'
import InfradJingAnalysisForm from "../Modals/JingInfradForm"
import RuxianAnalysisForm from "../Modals/ruxianForm"
import { 
  Upload,
  Modal,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Descriptions,
  Card,
  Divider,} from 'antd'



class Assist2 extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      picName: "",
      previewVisible: false,
      previewImage: '',
      jingInfradAnalysisVisible: false,
      ruxianAnalysisVisible: false,
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
    }
  };

  handleModalVisible = (flag, msg) => {
    if (msg === "jingInfradAnalysisInfo") {
      this.setState({
        jingInfradAnalysisVisible: flag
      });
    }
    if (msg === "ruxianAnalysisInfo") {
      this.setState({
        ruxianAnalysisVisible: flag
      });
    }
  }

  handlePreview = file => {
    console.log(file)
    this.setState({
      picName: file.name,
      //previewImage: file.url || file.thumbUrl,
      previewImage: "http://10.13.81.190:5000/static/images2/" + file.name,
      previewVisible: true,
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleDownload = file => {
    const aLink = document.createElement('a');
    const filename = file.name;
    const objectUrl = "http://10.13.81.190:5000/static/images2/" + file.name;
    aLink.href = objectUrl;
    aLink.download = filename;
    aLink.click();
    document.body.removeChild(aLink);
  }

  handleUploaderChange = (file) => {
    let fileList = [...file.fileList];
    fileList = fileList.slice(-2);
    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        this.setState({
      picName: file.name,
    })
        file.url = file.response.url;
      }
      return file;
    });
    
  };


  render() { 
    const { previewVisible, previewImage} = this.state
    var nowCurrentRecord = this.state.currentRecord
    console.log(this.props.location)
    if (this.props.location.state!=null){
       nowCurrentRecord = this.props.location.state.currentRecord}

    return (  
      <div className="main-content">
        <AssistDescriptionForm
            //currentRecord={this.props.location.state.currentRecord}
            currentRecord = {nowCurrentRecord}
        />
        <Divider/>
        <Descriptions title="上传红外热像">
        <Card>
        <Upload 
          accept= ".jpg,.png,.JPG,.bmp,.PNG"
          action="http://10.13.81.190:5000/analysis/uploadImg2"
          listType="picture-card"
          data= {this.state}
          onPreview = {this.handlePreview}
          onDownload = {this.handleDownload}
          onChange = {this.handleUploaderChange}
        >
      <Button>
        <Icon type="upload" /> Upload
      </Button>
      </Upload>
       <Modal visible={previewVisible} width="900px" footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Button type="primary" onClick= {()=>this.handleModalVisible(true, "jingInfradAnalysisInfo")}>
          查看智能分析结果
        </Button>
        </Card>
        </Descriptions>
        {this.state.jingInfradAnalysisVisible && (
          <InfradJingAnalysisForm
            modalVisible={this.state.jingInfradAnalysisVisible}
            handleModalVisible={this.handleModalVisible}
            filename={this.state.picName}
          />
        )}
        {this.state.ruxianAnalysisVisible && (
          <RuxianAnalysisForm 
            modalVisible={this.state.RuxianAnalysisVisible}
            handleModalVisible={this.handleModalVisible}
            filename={this.state.picName}
          />
        )}
      </div>
    );
  }
}

export default Assist2;