import React, { Component } from 'react';
import { Message, Input, Button, Table, Form, Tabs, DatePicker, Modal, Select, TreeSelect, Row } from "antd";
import ReactEcharts from "echarts-for-react";
import { Link } from 'react-router-dom';
import "./Medicine.less";
import API from "../../api/api";

const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;
const { TreeNode } = TreeSelect;
const { Option } = Select;
class Medicine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            treeValue: undefined,
            medicineValue: undefined,
            prescriptionValue: undefined,
            emptyVisible: false,
            reportVisible: false,
            reportDesc: "",
            reportExcp: "",
            recordId: undefined,
            patientInfo: {},
            mainMedColumn: [
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                    width: 50,
                    align: "center",
                    className: "column-medicine-name"
                },
                {
                    title: '药理作用',
                    dataIndex: 'medUse',
                    key: 'medUse',
                    width: 70,
                    align: "center"
                },
                {
                    title: '用药效果',
                    dataIndex: 'badEffect',
                    key: 'badEffect',
                    width: 70,
                    align: "center"
                }
            ],
            mainMedData: [
                {
                    'key': '1',
                    'name': '环磷酰胺',
                    'medUse': '作为抗肿瘤药，用于恶性淋巴瘤、多发性骨髓瘤、乳腺癌、小细胞肺癌、卵巢癌以及急性白血病和慢性淋巴细胞白血病等',
                    'badEffect': '用药后，癌细胞数量得到明显抑制，但是环磷酰胺可杀伤精子，超高剂量时（>120mg/kg）可引起心肌损伤及肾毒性'
                },
                {
                    'key': '2',
                    'name': '异环磷酰胺',
                    'medUse': '用于抗肿瘤：白血病，精原细胞睾丸癌，肺癌，非何杰金氏淋巴瘤，宫颈癌，卵巢癌及复发性、难治性实体瘤。',
                    'badEffect': '骨髓抑制较严重，大多数病例均有恶心、呕吐及脱发等症状'
                },
            ],
            secondaryMedColumn: [
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                    width: 40,
                    align: "center",
                    className: "column-medicine-name"
                },
                {
                    title: '功效',
                    dataIndex: 'medUse',
                    key: 'medUse',
                    width: 70,
                    align: "center"
                },
                {
                    title: '毒性',
                    dataIndex: 'toxicity',
                    key: 'toxicity',
                    width: 70,
                    align: "center"
                }
            ],
            secondaryMedData: [
                {
                    'key': '1',
                    'name': '旋覆花',
                    'medUse': '降气化痰用于咳喘痰多及痰饮蓄结，胸膈痞满等',
                    'toxicity': '有绒毛，易刺激咽喉作痒而致呛咳呕吐'
                },
                {
                    'key': '2',
                    'name': '全瓜蒌',
                    'medUse': '主治乳痈溃烂，日久不愈，乳腺癌，肿块坚硬疼痛等',
                    'toxicity': '暂无',
                },
                {
                    'key': '3',
                    'name': '碧桃干',
                    'medUse': '敛汗涩精，活血止血，止痛。用于盗汗，遗精，心腹痛，吐血，妊娠下血',
                    'toxicity': '肠胃不好不宜食用',
                },
                {
                    'key': '4',
                    'name': '老鹤草',
                    'medUse': '对福氏痢疾杆菌、大肠杆菌、金黄葡萄球菌、绿脓杆菌均有较强的抑制作用',
                    'toxicity': '胃肠道反应(表现为恶心、呕吐、腹泻等)，中枢神经系统反应(表现为头晕、耳鸣、听力下降)，心血管系统反应(如心律失常)等',
                },
                {
                    'key': '5',
                    'name': '五味子',
                    'medUse': '有敛肺止咳、滋补涩精、止泻止汗之效',
                    'toxicity': '用量不当会出现打嗝、反酸、胃痛、胃部烧灼感、肠鸣、乏力、困倦等不良反应'
                },
            ],
            options: [
                {
                    value: 'tlk',
                    label: '特罗凯',
                    children: [
                        {
                            value: 'liver',
                            label: '护肝',
                            children: [
                                {
                                    value: 'sweetGrass',
                                    label: '甘草',
                                },
                            ],
                        },
                        {
                            value: 'stomach',
                            label: '护胃',
                            children: [
                                {
                                    value: 'goldSilverFlower',
                                    label: '金银花',
                                },
                            ],
                        }
                    ],
                },
                {
                    value: 'ed',
                    label: '恩度',
                    children: [
                        {
                            value: 'spleen',
                            label: '护脾',
                            children: [
                                {
                                    value: 'goldSilverFlower',
                                    label: '金银花',
                                },
                            ],
                        },
                        // {
                        //     value: 'stomach',
                        //     label: '护胃',
                        //     children: [
                        //         {
                        //             value: 'goldSilverFlower',
                        //             label: '金银花',
                        //         },
                        //     ],
                        // }
                    ],
                },
            ],
            patientData: [
            ],
            infraredColumns: [
                {
                    title: '就诊时间',
                    dataIndex: 'time',
                    key: 'time',
                    width: 70,
                    align: "center"
                },
                {
                    title: '红外热成像图谱',
                    dataIndex: 'infrared',
                    key: 'infrared',
                    width: 100,
                    align: "center",
                    render: (record, url, index) => {
                        return (
                            <div>
                                <img src={this.state.infraredData[index].url} alt="" width="200px" height="200px" />
                            </div>
                        );
                    }
                },
                {
                    title: '状态描述',
                    dataIndex: 'description',
                    key: 'description',
                    width: 70,
                    align: "center"
                },
            ],
            tongueColumns: [
                {
                    title: '就诊时间',
                    dataIndex: 'time',
                    key: 'time',
                    width: 70,
                    align: "center"
                },
                {
                    title: '舌像图谱',
                    dataIndex: 'tongue',
                    key: 'tongue',
                    width: 100,
                    align: "center",
                    render: (record, url, index) => {
                        return (
                            <div>
                                <img src={this.state.tongueData[index].url} alt="" width="200px" height="200px" />
                            </div>
                        );
                    }
                },
                {
                    title: '状态描述',
                    dataIndex: 'description',
                    key: 'description',
                    width: 70,
                    align: "center"
                },
            ],
            pulseColumns: [
                {
                    title: '就诊时间',
                    dataIndex: 'time',
                    key: 'time',
                    width: 70,
                    align: "center"
                },
                {
                    title: '脉象数据',
                    dataIndex: 'pulse',
                    key: 'pulse',
                    width: 100,
                    align: "center",
                    render: (record, url, index) => {
                        return (
                            <div>
                                <ReactEcharts option={this.getOption(index)} style={{ height: '200px', width: "", align: 'center' }} />
                            </div>
                        );
                    }
                },
                {
                    title: '状态描述',
                    dataIndex: 'description',
                    key: 'description',
                    width: 70,
                    align: "center"
                },
            ],
            dataColumns: [
                {
                    title: '就诊时间',
                    dataIndex: 'time',
                    // key: 'time',
                    width: 70,
                    align: "center"
                },
                {
                    title: '红外热成像图谱',
                    dataIndex: 'infrared',
                    // key: 'infrared',
                    width: 100,
                    align: "center",
                    render: (record, url, index) => {
                        return (
                            <div>
                                <img src={this.state.infraredData[index].url} alt="" width="200px" height="200px" />
                                <br />
                                <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green' }}
                                    onClick={() => this.show("infrared", index)
                                    }>红外报告
                                </Button>
                            </div>
                        );
                    }
                },
                {
                    title: '舌像图谱',
                    dataIndex: 'tongue',
                    // key: 'tongue',
                    width: 100,
                    align: "center",
                    render: (record, url1, index) => {
                        return (
                            <div>
                                <img src={this.state.tongueData[index].url} alt="" width="200px" height="200px" />
                                <br />
                                <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green' }}
                                    onClick={() => this.show("tongue", index)
                                    }>舌像报告
    </Button>
                            </div>
                        );
                    }
                },
                {
                    title: '脉象数据',
                    dataIndex: 'pulse',
                    // key: 'pulse',
                    width: 300,
                    align: "center",
                    render: (record, url, index) => {
                        return (
                            <div >
                                <ReactEcharts option={this.getOption(index)} style={{ height: '200px', width: "", align: 'center' }} />
                                <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green' }}
                                    onClick={() => this.show("pulse", index)
                                    }>脉象报告
                                </Button>
                            </div>
                        );
                    }
                },
            ],
            infraredData: [],
            tongueData: [],
            pulseData: [],
            data: [],
            selectPrescription: [

            ],
            selectMedicine: [

            ]
        };
    }

    handleOk = () => {
        this.setState({
            emptyVisible: false,
            reportVisible: false,
        });
    }
    handleHelp = () => {
        let medicines = [];
        this.state.medicineValue.forEach(element => {
            medicines.push(element.match(/的(\S*)\(/)[1]);
        })
        this.state.prescriptionValue.forEach(element => {
            medicines.push(element.split("(")[0]);
        })
        this.state.value.forEach(element => {
            medicines.push(element);
        })
        medicines = Array.from(new Set(medicines)).join(",");
        console.log("medicines: ", medicines);
        let param = {
            id: this.state.recordId,
            corPrescription: medicines
        };
        API.updateRecord(param).then((response) => {
            let _data = response.data;
            let _code = response.code;
            let _msg = response.msg;
            if (_code === "200") {
                Message.info('矫正处方写入成功');
            } else {
                Message.info('矫正处方写入失败，请稍后重试！');
            }
        }).catch((error) => {
            console.log(error);
        });
        this.setState({
            visible: false,
            value: undefined,
            medicineValue: undefined,
            prescriptionValue: undefined
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            emptyVisible: false,
            reportVisible: false,
        });
    }
    medicineHelp = (index) => {
        let record = this.state.patientData[index];
        let tmpPriscription = [];
        let tmpMedicine = [];
        record.recPrescription.split(" ").forEach(item => {
            tmpPriscription.push(<Option key={item}>{item}</Option>)
        });

        record.medCheck.split(" ").forEach(item => {
            tmpMedicine.push(<Option key={item}>{item}</Option>)
        });

        this.setState({
            recordId: record.id,
            selectMedicine: tmpMedicine,
            selectPrescription: tmpPriscription,
            visible: true,
        });
    }

    // 抽屉等组件关闭
    getOption = (index) => {
        let xData = []
        let len = this.state.pulseData[index].series.length
        for (let i = 1; i <= len; i++) {
            xData.push(i.toString());
        }
        let option = {
            title: {  //标题
                x: 'center',
                textStyle: { //字体颜色
                    color: '#ccc'
                }
            },
            tooltip: { //提示框组件
                trigger: 'axis'
            },
            xAxis: { //X轴坐标值
                data: xData
            },
            yAxis: {
                type: 'value' //数值轴，适用于连续数据
            },
            series: [
                {
                    name: '数值', //坐标点名称
                    type: 'line', //线类型
                    data: this.state.pulseData[index].series
                }
            ]
        }
        return option;
    }
    onChange = value => {
        console.log('onChange ', value);
        this.setState({ value });
    }
    handleMedicineChange = value => {
        this.setState({
            medicineValue: value
        });
    }
    handlePrescriptionChange = value => {
        this.setState({
            prescriptionValue: value
        });
    }
    search(index) {

    }

    show = (label, index) => {
        let desc = label == "infra" ? this.state.infraredData[index].description : label == "tongue" ? this.state.tongueData[index].description : this.state.pulseData[index].description
        let excp = label == "infra" ? this.state.infraredData[index].exception : label == "tongue" ? this.state.tongueData[index].exception : this.state.pulseData[index].exception
        this.setState({
            reportDesc: desc,
            reportExcp: excp,
            reportVisible: true,
        })
    }

    fetchData = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let param = {
                    patientId: values.patientId,
                    startTime: values.startDate,
                    endTime: values.endDate,
                };
                let tmpInfraredData = [];
                let tmpTongueData = [];
                let tmpPulseData = [];
                let tmpPatientInfo = {};
                let tmpData = [];
                let tmpPatientData = [];
                API.recordTrace(param).then(async res => {
                    let _data = res.data;
                    let _code = res.code;
                    let _msg = res.msg;
                    if (_code === "200") {
                        if (_data.length >= 1) {
                            tmpPatientInfo = {
                                "gender": _data[0].gender,
                                "height": _data[0].height,
                                "weight": _data[0].weight,
                                "allergy": _data[0].allergy,
                                "firstTime": _data[0].createAt,
                            }
                        }
                        for (let index = 0; index < _data.length; index++) {
                            let item = _data[index]
                            let tmpSeries = [];
                            tmpInfraredData.push({
                                "key": index,
                                "time": item.createAt,
                                "description": item.irtDesc,
                                "exception": item.irtExcp,
                                "url": "http://10.13.81.189:8001/" + item.irtPath
                            });
                            tmpTongueData.push({
                                "key": index,
                                "time": item.createAt,
                                "description": item.tongueDesc,
                                "exception": item.tongueExcp,
                                "url": "http://10.13.81.189:8001/" + item.tonguePath
                            });
                            await fetch("http://10.13.81.189:8001/" + item.pulsePath, {
                                method: 'GET',
                                mode: "cors",
                            }).then(res => {
                                return res.text()
                            }).then(res => {
                                return res.split(",").forEach(element => tmpSeries.push(element));
                            });
                            tmpPulseData.push({
                                "key": index,
                                "time": item.createAt,
                                "description": item.pulseDesc,
                                "exception": item.pulseExcp,
                                "series": tmpSeries,
                                // "series": await this.readPulse("http://10.13.81.189:8001/" + item.pulsePath),
                            });
                            tmpData.push({
                                "key": index,
                                "time": item.createAt,
                            });
                            tmpPatientData.push({
                                "key": index,
                                "id": item.id,
                                "date": item.createAt,
                                "iniSymptoms": index > 0 ? _data[index - 1].chfCmp : "",
                                "mainMedcine": item.westernMedicine,
                                "auxMedicine": item.chineseMedicine,
                                "effect": item.chfCmp,
                                "bloodExcp": item.bloodExcp,
                                "infraredExcp": item.irtExcp,
                                "tongueExcp": item.tongueExcp,
                                "pulseExcp": item.pulseExcp,
                                "medCheck": item.medCheck,
                                "recPrescription": item.recPrescription
                            })
                        }
                        this.setState({
                            patientInfo: tmpPatientInfo,
                            infraredData: tmpInfraredData,
                            tongueData: tmpTongueData,
                            pulseData: tmpPulseData,
                            data: tmpData,
                            patientData: tmpPatientData
                        });
                    } else if (_code === "302") {
                        Message.error(_msg);
                        setTimeout(() => {
                            this.props.history.replace("/login");
                        }, 1000);
                    } else {
                        Message.error(_msg);
                    }
                });
            }
        });
    }

    // async readPulse(url) {
    //     let res = await fetch(url, {
    //         method: 'GET',
    //         mode: "cors",
    //     });
    //     let num = [];
    //     await res.text().then(data => {
    //         data.split(",").forEach(element => num.push(parseInt(element.trim())));
    //     })
    //     return num;
    // }

    emptyFunction = () => {
        this.setState({
            emptyVisible: true,
        });
    }
    componentDidMount() {
        // this.readPulse("http://10.13.81.189:8001/pulse1.txt");
        // this.readPulse("http://10.13.81.189:8001/pulse2.txt");
        // this.readPulse("http://10.13.81.189:8001/pulse3.txt");
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div className="main-content">
                <Form layout="inline" >
                    <Form.Item>
                        <span className="input-text">患者id</span>
                        {getFieldDecorator("patientId", {})(
                            <Input
                                style={{ width: 100, marginRight: 15 }}
                                placeholder="患者id"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-text">起始时间</span>
                        {getFieldDecorator("startDate", {})(
                            <DatePicker
                                style={{ width: 130, marginRight: 5 }}
                                placeholder="就诊起始时间"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-text">结束时间</span>
                        {getFieldDecorator("endDate", {})(
                            <DatePicker
                                style={{ width: 130, marginRight: 5 }}
                                placeholder="就诊结束时间"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.fetchData}>
                            查询
                    </Button>
                    </Form.Item>
                </Form>
                <Table
                    bordered
                    pagination={false}
                    scroll={{ y: 450 }}
                    columns={this.state.dataColumns}
                    dataSource={this.state.data}>
                </Table>
                <br />
                <hr />
                <br />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="红外热成像图变化" key="1">
                        <Table
                            bordered
                            pagination={false}
                            scroll={{ y: 500 }}
                            columns={this.state.infraredColumns}
                            dataSource={this.state.infraredData}>
                        </Table>
                        <Button type="primary" onClick={this.emptyFunction} style={{ marginRight: '10px' }}> 红外图像分析</Button>
                        <strong style={{ fontSize: "18px" }}>结论：左右肺瓣对称，肺部炎症减少，有好转趋势</strong>
                    </TabPane>
                    <TabPane tab="舌象图谱变化" key="2">
                        <Table
                            bordered
                            pagination={false}
                            scroll={{ y: 500 }}
                            columns={this.state.tongueColumns}
                            dataSource={this.state.tongueData}>
                        </Table>
                        <Button type="primary" onClick={this.emptyFunction} style={{ marginRight: '10px' }}> 舌象分析</Button>
                        <strong style={{ fontSize: "18px" }}>结论：舌色红润，视为健康</strong>
                    </TabPane>
                    <TabPane tab="脉象数据变化" key="3">
                        <Table
                            bordered
                            pagination={false}
                            scroll={{ y: 500 }}
                            columns={this.state.pulseColumns}
                            dataSource={this.state.pulseData}>
                        </Table>
                        <Button type="primary" onClick={this.emptyFunction} style={{ marginRight: '10px' }}> 脉象分析</Button>
                        <strong style={{ fontSize: "18px" }}>结论：脉象逐渐稳定，规律，起落明显</strong>
                    </TabPane>
                </Tabs>
                <br />
                <hr />
                <br />
                <div style={{ fontSize: "20px" }}>
                    <span><strong>患者ID：</strong>{this.state.patientInfo.patientId}</span>
                    <span style={{ marginLeft: "70px" }}><strong>性别：</strong>{this.state.patientInfo.gender == 1 ? "男" : "女"}</span>
                    <span style={{ marginLeft: "70px" }}><strong>身高：</strong>{this.state.patientInfo.height} </span>
                    <span style={{ marginLeft: "70px" }}><strong>体重：</strong>{this.state.patientInfo.weight}</span>
                    <span style={{ marginLeft: "70px" }}><strong>过敏史：</strong>{this.state.patientInfo.allergy}</span>
                    <span style={{ marginLeft: "70px" }}><strong>初始就诊时间：</strong>{this.state.patientInfo.firstTime}</span>
                </div>
                <br />
                <Table
                    bordered
                    pagination={false}
                    scroll={{ y: 300 }}
                    dataSource={this.state.patientData}
                >
                    <Column title="就诊时间" dataIndex="date" key="date" align="center" width="120px" />
                    <Column title="初始症状" dataIndex="iniSymptoms" key="iniSymptoms" align="center" width="140px" className="column-text" />
                    <ColumnGroup title="用药情况">
                        <Column title="主药" dataIndex="mainMedcine" key="mainMedcine" align="center" width="120px" />
                        <Column title="辅药" dataIndex="auxMedicine" key="auxMedicine" align="center" width="150px" />
                    </ColumnGroup>
                    <Column title="用药效果" dataIndex="effect" key="effect" align="center" width="140px" className="column-text" />
                    <Column title="血液检测异常" dataIndex="bloodExcp" key="bloodExcp" align="center" width="120px" />
                    <Column title="红外检测异常" dataIndex="infraredExcp" key="infraredExcp" align="center" width="120px" />
                    <Column title="舌象检测异常" dataIndex="tongueExcp" key="tongueExcp" align="center" width="120px" />
                    <Column title="脉象检测异常" dataIndex="pulseExcp" key="pulseExcp" align="center" width="120px" />
                    <Column title="操作" dataIndex="action" key="action" align="center"
                        render={(text, record, index) => {
                            return (
                                <div>
                                    <Link to={`/admin/textAnalysis/${record.id}`} target="_blank">
                                        <Button type="primary" size="small"
                                        >同类检索
                                                    </Button></Link>
                                    <br></br>
                                    <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green' }}
                                        onClick={() => this.medicineHelp(index)
                                        }>用药帮助
                        </Button>
                                </div>
                            );
                        }} />
                </Table>
                <Modal title="用药帮助" visible={this.state.visible}
                    onOk={this.handleHelp} onCancel={this.handleCancel} width="1000px">
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '500px' }}>
                            <div style={{ fontSize: '20px' }}>
                                <span><strong style={{ marginRight: '100px' }}>患者ID:</strong>256</span>
                            </div>
                            <Row className="table-frame">
                                <div style={{ fontSize: '20px' }}>
                                    <strong>现有主药概述:</strong>
                                    <Table
                                        bordered
                                        pagination={false}
                                        scroll={{ y: 200 }}
                                        columns={this.state.mainMedColumn}
                                        dataSource={this.state.mainMedData}
                                    ></Table>
                                </div>
                            </Row>
                            <Row className="table-frame">
                                <div style={{ fontSize: '20px' }}>
                                    <strong>现有辅药概述:</strong>
                                    <Table
                                        bordered
                                        pagination={false}
                                        scroll={{ y: 200 }}
                                        columns={this.state.secondaryMedColumn}
                                        dataSource={this.state.secondaryMedData}
                                    ></Table>
                                </div>
                            </Row>
                        </div>
                        <div style={{ marginLeft: '60px' }}>
                            <strong style={{ fontSize: "20px" }}>基于专家用药模型的用药检查</strong>
                            <br />
                            <br />
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                defaultValue={[]}
                                value={this.state.medicineValue}
                                onChange={this.handleMedicineChange}
                            >
                                {this.state.selectMedicine}
                            </Select>
                            <br />
                            <br />
                            <hr />
                            <br />
                            <strong style={{ fontSize: "20px" }}>基于相似电子病历的处方推荐</strong>
                            <br />
                            <br />
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                defaultValue={[]}
                                value={this.state.prescriptionValue}
                                onChange={this.handlePrescriptionChange}
                            >
                                {this.state.selectPrescription}
                            </Select>

                            <br />
                            <br />
                            <hr style={{ width: '400px' }} />
                            <br />
                            <strong style={{ fontSize: "20px" }}>基于树状结构的医生自选药物</strong>
                            <br />
                            <br />
                            <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                value={this.state.value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="请选择"
                                allowClear
                                multiple
                                treeDefaultExpandAll
                                onChange={this.onChange}
                            >
                                <TreeNode value="CTX" title="环磷酰胺">
                                    <TreeNode value="liver" title="补精">
                                        <TreeNode value="地黄" title="地黄" />
                                        <TreeNode value="枸杞子" title="枸杞子" />
                                    </TreeNode>
                                    <TreeNode value="stomach" title="治心肌损伤">
                                        <TreeNode value="黄芪" title="黄芪" />
                                        <TreeNode value="银杏叶" title="银杏叶" />
                                    </TreeNode>
                                </TreeNode>
                                <TreeNode value="IFO" title="异环磷酰胺">
                                    <TreeNode value="spleen" title="抗骨髓抑制">
                                        <TreeNode value="鸡血藤" title="鸡血藤" />
                                        <TreeNode value="熟地" title="熟地" />
                                    </TreeNode>
                                    <TreeNode value="kidney" title="护肾">
                                        <TreeNode value="猪苓" title="猪苓" />
                                    </TreeNode>
                                </TreeNode>
                            </TreeSelect>
                        </div>
                    </div>
                </Modal>
                <Modal
                    title="提示"
                    visible={this.state.emptyVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>敬请期待！</p>
                </Modal>
                <Modal
                    title="报告详情"
                    visible={this.state.reportVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <strong style={{ fontSize: "18px" }}>检测描述</strong>
                    <br />
                    {this.state.reportDesc}
                    <br />
                    <br />
                    <strong style={{ fontSize: "18px" }}>检测异常</strong>
                    <br />
                    {this.state.reportExcp}
                </Modal>
            </div>
        )
    }

}
export default Form.create()(Medicine);