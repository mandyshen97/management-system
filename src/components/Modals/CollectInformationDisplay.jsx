import React, { Component, Fragment } from "react";
import { Form, Modal, Divider, Descriptions, Button } from "antd";
import API from "../../api/algorithm"
class CollectInformationDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
    medicineList:[],
    medicineName:[]
    }
  }

  componentDidMount(){
    API.getMedicineList({}).then(res=>{
      let newMedicineList = ["无"];
      res.data.map((item, index) => {
        newMedicineList.push(item.name);
      });
      this.setState({
       medicineList: newMedicineList
        }
        )
      }
    )
  }

  renderDescription() {
    const WCSTTask = {
      应答总数: "ta",
      正确应答数: "cr",
      正确应答百分比: "pcr",
      错误应答数: "te",
      错误应答数百分比: "pe",
      持续性应答数: "pr",
      持续性应答数百分比: "ppr",
      持续性错误数: "pse",
      持续性错误的百分数: "ppe",
      非持续性错误: "npe",
      非持续性错误百分比: "pnpe",
      概念化水平应答数: "clr",
      概念化水平百分数: "pclr",
      完成分类数: "cc",
      完成第一个分类所需应答数: "tcfc",
      不能维持完整分类: "fm",
      学习到学会: "l2l",
      用时: "useTime"
    };
    // let keys = Object.keys(WCSTTask)
    // console.log(keys);
    // let value = WCSTTask['不能维持完整分类']
    // console.log(value)

    const { currentRecord } = this.props;
    const patientInfo = currentRecord.patient;
    const task = currentRecord.task;
    const nonMedicineList = ["无","rTMs","CBT-I"]

    var medicineName = [];

    if(task.medicineId && task.medicineId.indexOf("-")){
      var med_ids = task.medicineId.split("-") 
      for (var i=0;i<med_ids.length;i++){
        medicineName.push(this.state.medicineList[Number(med_ids[i])])
        medicineName.push(",")
      }
      medicineName.pop()
    }
    else if (task.medicineId.length>0){
      medicineName.push(this.state.medicineList[Number(task.medicineId)])
    }


    var nonMedicineName = [];

    if(task.nonMedicineId && task.nonMedicineId.indexOf("-")){
      var non_med_ids = task.nonMedicineId.split("-") 
      for (var i=0;i<med_ids.length;i++){
        nonMedicineName.push(nonMedicineList[Number(non_med_ids[i])])
        nonMedicineName.push(",")
      }
      nonMedicineName.pop()
    }
    else if (task.nonMedicineId.length>0){
      nonMedicineName.push(nonMedicineList[Number(task.nonMedicineId)])
    }




    
    
    return (
      <div>
        <Descriptions title="患者信息">
          <Descriptions.Item label="患者姓名">
            {currentRecord.name}
          </Descriptions.Item>
          <Descriptions.Item label="任务类型">
            {currentRecord.testType}
          </Descriptions.Item>
          <Descriptions.Item label="患者编号">
            {currentRecord.medId}
          </Descriptions.Item>
          <Descriptions.Item label="患者失眠类型">
            {patientInfo.disease}
          </Descriptions.Item>
          <Descriptions.Item label="患者性别">
            {currentRecord.gender === 1 ? "男" : "女"}
          </Descriptions.Item>
          <Descriptions.Item label="患者年龄">
            {currentRecord.age}
          </Descriptions.Item>
          <Descriptions.Item label="患者体重(kg)">
            {patientInfo.weight}
          </Descriptions.Item>
          <Descriptions.Item label="患者身高(cm)">
            {patientInfo.height}
          </Descriptions.Item>
          <Descriptions.Item label="测试前服用药物">
            {medicineName}
          </Descriptions.Item>
          <Descriptions.Item label="药物剂量">
            {medicineName}
          </Descriptions.Item>
          <Descriptions.Item label="服药后多久进行测试">
            {task.medInt}
          </Descriptions.Item>
          <Descriptions.Item label="非药物干预">
            {nonMedicineName}
          </Descriptions.Item>
          <Descriptions.Item label="测试近红外时间">
            {task.time}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        {currentRecord.type === 0 && (
          <Fragment>
            <Descriptions title="任务测试得分">
              {Object.keys(WCSTTask).map((item, index) => {
                let k = WCSTTask[item];
                return (
                  <Descriptions.Item key={index} label={item}>
                    {task[k]}
                  </Descriptions.Item>
                );
              })}
            </Descriptions>
            <Divider />
          </Fragment>
        )}
        <Descriptions title="临床信息">
          <Descriptions.Item label="症状持续时间">
            {patientInfo.symptomTime}
          </Descriptions.Item>
          <Descriptions.Item label="现病史">
            {patientInfo.presentIllnessHistory}
          </Descriptions.Item>
          <Descriptions.Item label="主诉">
            {patientInfo.chiefComplaint}
          </Descriptions.Item>
          <Descriptions.Item label="用药疗效">
            {patientInfo.treatmentHistory}
          </Descriptions.Item>
          <Descriptions.Item label="既往史">
            {patientInfo.pastHistory}
          </Descriptions.Item>
          <Descriptions.Item label="个人史">
            {patientInfo.personalHistory}
          </Descriptions.Item>
          <Descriptions.Item label="家族史">
            {patientInfo.familyHistory}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }

  render() {
    console.log(this.props);
    const { currentRecord } = this.props;
    const title = `采集信息展示——${currentRecord.medId}_${currentRecord.name}`;
    return (
      <Modal
        visible={this.props.modalVisible}
        title={title}
        width="60%"
        onCancel={() => this.props.handleModalVisible(false, "description")}
        destroyOnClose
        footer={[
          <Button
            key="cancel"
            onClick={() => this.props.handleModalVisible(false, "description")}
          >
            取消
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={() => this.props.handleModalVisible(false, "description")}
          >
            确定
          </Button>
        ]}
      >
        {this.renderDescription()}
      </Modal>
    );
  }
}

export default Form.create()(CollectInformationDisplay);
