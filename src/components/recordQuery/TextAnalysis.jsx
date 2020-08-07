import React, { Component } from 'react';
import { Button, Row, Divider, Message, Col, Modal } from "antd";
import './text-analysis.less';
import API from '../../api/api';
class TextAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medRecord: {},
            simMedRecordId: null,
            simMedRecord: {},
            diseaseList: [],
            helpSwitch: false,
            recPresciption: ""
        }
    }

    // 处理下载按钮
    handleDownload() {
        this.callDownload(this.props.match.params.id)
    }
    callDownload(record_id) {
        window.location.href = "http://localhost:8081/record/download?id="+record_id;
    }
    async medicineHelp(record) {
        let tmpMessage = "";
        if (record.disease != "肺癌") {
            tmpMessage = "非癌症患者不提供用药帮助"; 
        } else if(record.recPrescription != null && record.recPrescription != "") {
            tmpMessage = "<span style='color:red;'>" + record.recPrescription +"</span>";
        } else {
            let param = {
                simRecIds: record.simRecIds
            }
            await API.simMedicineHelp(param).then((response) => {
                let _data = response.data,
                    _code = response.code,
                    _msg = response.msg;
                if (_code === "200") {
                    let recMedicines = "";
                    _data.rec_medicines.forEach(element => {
                        recMedicines += "<span style='color:red;'>" + element[0] + "11111(" + element[1].toFixed(2) + ")" + "</span>" + " ";
                    })
                    tmpMessage = recMedicines.trim();
                    this.handleAnalyseResult(null, null, recMedicines.trim(), 0);    // 更新电子病历的响应字段
                } else {
                    Message.error(_msg);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        console.log(tmpMessage);
        setTimeout(()=>{
            this.refs.p.innerHTML = tmpMessage;
        })
        this.setState({
            recPrescription: tmpMessage,
            helpSwitch: true
        })
    }
    helpConfirm = () => {
        this.setState({
            helpSwitch: false
        })
    }

    handleAnalyse(record) {
        let param = {
            recordId: record.id,
            diseaseId: this.getDiseaseId(record.disease)
        }
        API.getAnalyseResult(param).then((response) => {
            let _data = response.data,
                _code = response.code,
                _msg = response.msg;
            if (_code === "200") {
                let diseaseId = _data.disease_id;
                let simRecordId = _data.sim_records;
                this.handleAnalyseResult(diseaseId, simRecordId, null, 1);    // 更新电子病历的相应字段
            } else {
                Message.error(_msg);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    //   将分析结果更新数据库
    handleAnalyseResult(diseaseId, simRecordId, recMedicines, doReload) {
        let param = {
            id: this.props.match.params.id,
            auxDiseaseId: diseaseId,
            simRecIds: simRecordId,
            recPrescription: recMedicines
        }
        API.updateRecord(param).then((response) => {
            let _data = response.data,
                _code = response.code,
                _msg = response.msg;
            console.log(_data);
            if (_code === "200") {
                if (doReload == 1) {
                    window.location.reload();  // 刷新页面
                }
            } else {
                Message.error(_msg);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    //   根据生日获取年龄
    getAge(birthday) {
        if(birthday == null) {
            return '';
        }
        //出生时间 毫秒
        var birthDayTime = new Date(birthday).getTime();
        //当前时间 毫秒
        var nowTime = new Date().getTime();
        //一年毫秒数(365 * 86400000 = 31536000000)
        return Math.ceil((nowTime - birthDayTime) / 31536000000);
    }

    //   根据病种id获取病种
    getDisease(diseaseId) {
        let disease = "尚未分析";
        this.state.diseaseList.forEach(element => {
            if (element.id == diseaseId) {
                disease = element.name;
            }
        });
        return disease;
    }
    //   根据病种获取病种idIIdd
    getDiseaseId(disease) {
        let diseaseId = 0;
        this.state.diseaseList.forEach(element => {
            if (element.name == disease) {
                diseaseId = element.id;
            }
        });
        return diseaseId;
    }
    //   获取病种列表
    getDiseaseList() {
        API.getDisease()
            .then((response) => {
                let _data = response.data,
                    _code = response.code,
                    _msg = response.msg;
                if (_code === "200") {
                    this.setState({
                        diseaseList: _data
                    })

                } else {
                    this.setState({
                        diseaseList: null
                    })
                }
            }).catch(function (error) {
                console.log(error);
            });
    }
    // 获取相似电子病历
    getSimMedRecord(medRecordId) {
        let firstId = parseInt(medRecordId.split(" ")[0]);
        let param = {
            id: firstId
        }
        API.getRecord(param).then((response) => {
            let _data = response.data,
                _code = response.code,
                _msg = response.msg;
            if (_code === "200") {
                this.setState({
                    simMedRecord: _data,
                })
            } else if (_code === "302") {
                Message.error(_msg);
                setTimeout(() => {
                    this.props.history.replace("/login");
                }, 1000);
            } else {
                Message.error(_msg);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    //   获取相似电子病历id
    getMedRecord(medRecordId) {
        let param = {
            id: medRecordId
        }
        API.getRecord(param).then((response) => {
            let _data = response.data,
                _code = response.code,
                _msg = response.msg;
            if (_code === "200") {
                this.setState({
                    medRecord: _data,
                }, () => {
                    if(this.state.medRecord.simRecIds != null && this.state.medRecord.simRecIds != ""){
                        this.getSimMedRecord(this.state.medRecord.simRecIds);
                    }
                })
            } else if (_code === "302") {
                Message.error(_msg);
                setTimeout(() => {
                    this.props.history.replace("/login");
                }, 1000);
            } else {
                Message.error(_msg);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    //   页面渲染前执行函数
    componentDidMount() {
        // console.log(1)
        let id = this.props.match.params.id
        // console.log(id)
        this.getMedRecord(id)
        this.getDiseaseList()
    }

    //   渲染的页面
    render() {
        return (
            <div className="main-content">
                <b>基本信息</b>
                <Divider className="divide" />
                <Row justify="space-between">
                    <Col span={4}>
                        <strong>姓名:</strong><span style={{ marginLeft: 15, padding: 8 }}>{this.state.medRecord.patientName}</span>
                    </Col>
                    <Col span={4}>
                        <strong>主治医生:</strong><span style={{ marginLeft: 15 }}>{this.state.medRecord.doctorName}</span>
                    </Col>
                    <Col span={3}>
                        <strong>性别:</strong><span style={{ marginLeft: 15 }}>{this.state.medRecord.gender == 1 ? "男" : "女"}</span>
                    </Col>
                    <Col span={3}>
                        <strong>年龄:</strong><span style={{ marginLeft: 15 }}>{this.getAge(this.state.medRecord.birthday)}</span>
                    </Col>
                    <Col span={3}>
                        <strong>病种:</strong><span style={{ marginLeft: 15 }}>{this.getDisease(this.state.medRecord.auxDiseaseId)}</span>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" onClick={() => this.handleAnalyse(this.state.medRecord)}>开始分析</Button>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={() => this.handleDownload()}>病历下载</Button>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" style={{ backgroundColor: 'red', borderColor: 'red' }} onClick={() => this.medicineHelp(this.state.medRecord)}>用药帮助</Button>
                    </Col>
                </Row>

                <Divider className="divide" />
                <b>病历对比</b>
                <Divider />
                <Row justify="space-between">
                    <Col span={2}>
                        <div className="m-box">病历字段</div>
                    </Col>
                    <Col span={10}>
                        <div className="m-box">患者病历</div>
                    </Col>
                    <Col span={10}>
                        <div className="m-box">相似病历</div>
                    </Col>
                </Row>
                <br />
                <Row justify="space-between">
                    <Col span={2}>
                        <div className="m-box">主诉</div>
                    </Col>
                    <Col span={10}>
                        {this.state.medRecord.chfCmp}
                    </Col>
                    <Col span={10} style={{ marginLeft: 15 }}>
                        {this.state.simMedRecord.chfCmp}
                    </Col>
                </Row>
                <br />
                <Row justify="space-between">
                    <Col span={2}>
                        <div className="m-box">现病史</div>
                    </Col>
                    <Col span={10}>{this.state.medRecord.hisPreIll}</Col>
                    <Col span={10} style={{ marginLeft: 15 }}> {this.state.simMedRecord.hisPreIll}</Col>
                </Row>
                <br />
                <Row justify="space-between">
                    <Col span={2}>
                        <div className="m-box">既往史</div>
                    </Col>
                    <Col span={10}>{this.state.medRecord.prvMedHis}</Col>
                    <Col span={10} style={{ marginLeft: 15 }}>{this.state.simMedRecord.prvMedHis}</Col>
                </Row>
                <br />
                <Row justify="space-between">
                    <Col span={2}>
                        <div className="m-box">中医证型</div>
                    </Col>
                    <Col span={10}>{this.state.medRecord.tcmType}</Col>
                    <Col span={10} style={{ marginLeft: 15 }}>{this.state.simMedRecord.tcmType}</Col>
                </Row>
                <br />
                <Row justify="space-between">
                    <Col span={2}>
                        <div className="m-box">病人体征</div>
                    </Col>
                    <Col span={10}>{this.state.medRecord.patientSign}</Col>
                    <Col span={10} style={{ marginLeft: 15 }}>{this.state.simMedRecord.patientSign}</Col>
                </Row>
                <br />
                <Row justify="space-between">
                    <Col span={2}>
                        <div className="m-box">西医主药</div>
                    </Col>
                    <Col span={10}>{this.state.medRecord.westernPrescription}</Col>
                    <Col span={10} style={{ marginLeft: 15 }}>{this.state.simMedRecord.westernPrescription}</Col>
                </Row>
                <Row justify="space-between">
                    <Col span={2}>
                        <div className="m-box">中医辅药</div>
                    </Col>
                    <Col span={10}>{this.state.medRecord.chinesePrescription}</Col>
                    <Col span={10} style={{ marginLeft: 15 }}>{this.state.simMedRecord.chinesePrescription}</Col>
                </Row>
                <Modal
                    visible={this.state.helpSwitch}
                    title="基于相似电子病历的用药帮助"
                    onOk={this.helpConfirm}
                    onCancel={this.helpConfirm}>
                    <h3>推荐处方用药</h3>
                    <p ref='p'>
                        {this.state.recPrescription}
                        {/* <span style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: '16px', fontWeight: '500' }}>推荐处方用药：</span>
                        <br />
                        <span style={{ color: 'red', margin: '2px 8px 2px 10px' }}>柴胡(1.00)</span>
                        <span style={{ color: 'red', margin: '2px 8px' }}>当归(0.91)</span>
                        <span style={{ color: 'red', margin: '2px 8px' }}>白芍(0.85)</span>
                        <span style={{ color: 'red', margin: '2px 8px' }}>白术(0.77)</span>
                        <span style={{ color: 'red', margin: '2px 8px' }}>茯苓(0.74)</span>
                        <span style={{ color: 'red', margin: '2px 8px' }}>郁金(0.65)</span> */}
                        {/* <br />
                        <span style={{ margin: '2px 8px 2px 10px' }}>香附(0.58)</span>
                        <span style={{ margin: '2px 8px' }}>八月札(0.44)</span> */}
                    </p>
                </Modal>
            </div>)
    }
}

export default TextAnalysis;