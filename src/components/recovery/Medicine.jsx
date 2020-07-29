import React, { Component } from 'react';
import { Message, Input, Button, Table, Form, Tabs, DatePicker, Modal, Select, TreeSelect, Row } from "antd";
import ReactEcharts from "echarts-for-react";
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
            value: undefined,
            emptyVisible: false,
            reportVisible: false,
            reportDesc: "",
            reportExcp: "",
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
                {
                    "key": "1",
                    "date": "2018-08-02",
                    "iniSymptoms": "反复咯血",
                    "mainMedcine": "环磷酰胺，异环磷酰胺",
                    "auxMedicine": "旋覆花，全瓜蒌，碧桃干，老鹳草，五味子，甘草，黄芪，仙灵脾，巴戟天，苁蓉",
                    "effect": "咳嗽、咳痰带血、发热",
                    "bloodDetection": "红细胞计数偏低，血红蛋白浓度偏低，癌胚抗原CEA偏高",
                    "infraredDetection": "肺部出现炎症",
                    "tongueDetection": "舌苔白厚，腻",
                    "pulseDetection": "端直而长，挺然指下，如按琴弦。",
                },
                {
                    "key": "2",
                    "date": "2018-12-04",
                    "iniSymptoms": "咳嗽、咳痰带血、发热",
                    "mainMedcine": "环磷酰胺，阿霉素",
                    "auxMedicine": "甘草，干姜，乌梅，黑附子，细辛，炒苍术，秦艽，百部，黄芪，制黄精，百合，黄柏炭，制鳖甲，红花，灵磁石，野丹参",
                    "effect": "憋喘、咳嗽、咳痰",
                    "bloodDetection": "癌胚抗原CEA偏高，肝脏转氨酶等指标升高",
                    "infraredDetection": "左右肺瓣不均衡",
                    "tongueDetection": "无异常",
                    "pulseDetection": "脉来急数，时而一止，止无定数",
                },
                {
                    "key": "3",
                    "date": "2019-02-24",
                    "iniSymptoms": "憋喘、咳嗽、咳痰",
                    "mainMedcine": "长春新碱",
                    "auxMedicine": "百合，甘草，生晒参片，炙甘草，砂仁，黄柏",
                    "effect": "发热，咳嗽，咳痰不出",
                    "bloodDetection": "癌胚抗原CEA及癌抗原CA125偏高，红细胞、血红蛋白降低",
                    "infraredDetection": "无异常",
                    "tongueDetection": "舌苔厚",
                    "pulseDetection": "脉搏快有不规则的间歇。",
                },
            ],
            infraredColumns: [
                {
                    title: '就诊时间',
                    dataIndex: 'infraTime',
                    key: 'infraTime',
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
                    dataIndex: 'tongueTime',
                    key: 'tongueTime',
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
                    dataIndex: 'pulseTime',
                    key: 'pulseTime',
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
            infraredData: [
                { "key": '1', "infraTime": "2018-08-02", "description": "肺部局部和其他部位存在一定温差,考虑左肺上叶周围型肺癌并右肺转移，建议进一步检查", "exception": "肺部出现炎症", "url": "http://10.13.81.189:8001/feiai1.jpg" },
                { "key": '2', "infraTime": "2018-12-04", "description": "胸廓对称，无畸形,双侧胸腔少量积液,肺部温差明显降低，考虑癌细胞数量减少，建议按照既定治疗方案继续治疗", "exception": "左右肺瓣不均衡", "url": "http://10.13.81.189:8001/feiai2.jpg" },
                { "key": '3', "infraTime": "2019-02-24", "description": "胸廓对称，现与常人无疑", "exception": "无异常", "url": "http://10.13.81.189:8001/feiai3.jpg" }
            ],
            tongueData: [
                { "key": '1', "tongueTime": "2018-08-02", "description": "舌苔薄,唾液粘稠，偏黄，湿气重", "exception": "舌苔白厚，腻", "url": "http://10.13.81.189:8001/tongue3.jpg" },
                { "key": '2', "tongueTime": "2018-12-04", "description": "舌苔干薄，颜色偏黄，与肺病相关", "exception": "无异常", "url": "http://10.13.81.189:8001/tongue4.jpg" },
                { "key": '3', "tongueTime": "2019-02-24", "description": "暂无描述", "exception": "舌苔厚", "url": "http://10.13.81.189:8001/tongue1.jpg" }
            ],
            pulseData: [
                { "key": '1', "pulseTime": "2018-08-02", "description": "浮脉行于皮肤表，似同枯木水上漂，沉脉浮于筋骨间，推筋至骨用力寻", "exception": "端直而长，挺然指下，如按琴弦", "series": [100, 90, 150, 300, 500, 1000, 900, 450, 500, 400, 152, 110, 87, 150, 310, 487, 1020, 910, 437, 501, 430, 150, 105, 80, 157, 310, 506, 989, 906, 460, 505, 389, 150] },
                { "key": '2', "pulseTime": "2018-12-04", "description": "迟脉一息唯三至，分钟少于六十行，数脉一息五六至，九十以上为数频", "exception": "脉来急数，时而一止，止无定数", "series": [60, 90, 75, 200, 300, 500, 700, 550, 500, 400, 152, 210, 107, 160, 330, 487, 512, 450, 437, 501, 420, 130, 165, 96, 240, 310, 532, 768, 601, 450, 505, 389, 150] },
                { "key": '3', "pulseTime": "2019-02-24", "description": "滑脉滑利如走珠，虚如葱管弱如棉，实脉举按力均强，如按竹棍好思量", "exception": "脉搏快有不规则的间歇", "series": [70, 90, 120, 200, 400, 600, 800, 680, 450, 600, 520, 310, 165, 150, 340, 285, 850, 900, 740, 430, 501, 100, 75, 125, 170, 310, 500, 900, 909, 840, 540, 390, 250] }
            ],
            data: [
                {
                    "key": "1",
                    "time": "2018-08-02",
                },
                {
                    "key": "2",
                    "time": "2018-12-04"
                },
                {
                    "key": "3",
                    "time": "2019-02-24"
                }
            ],
            selectPrescription: [

            ],
            selectMedicine: [

            ]
        };
    }

    handleOk = () => {
        this.setState({
            visible: false,
            emptyVisible: false,
            reportVisible: false,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            emptyVisible: false,
            reportVisible: false,
        });
    }
    medicineHelp = (record) => {
        let tmpPriscription = [];
        let tmpMedicine = [];
        let tmpData = ["柴胡(1.00)", "当归(0.72)", "白芍(0.85)", "白术(0.74)", "茯苓(0.70)", "郁金(0.65)", "香附(0.55)", "八月札(0.40)"];
        tmpData.forEach(item => {
            tmpPriscription.push(<Option key={item}>{item}</Option>,)
        });

        tmpData = ["与甘草关联的太子参(0.84)", "与白术关联的麦冬(0.72)"];
        tmpData.forEach(item => {
            tmpMedicine.push(<Option key={item}>{item}</Option>,)
        });
        /*
        let param = {
            medicines: record.chineseMedicine
        };
        API.proMedicineHelp(param).then(res => {
            let _data = res.data;
            let _code = res.code;
            let _msg = res.msg;
            if (_code === "200") {
              _data.data.map((item, index) => {
                let selectItem = "与" + item.base + "关联的" + item.target + "(" + item.score + ")";
                tmpMedicine.push(<Option key={selectItem}>{selectItem}</Option>,)
              });
            } else {
              Message.error(_msg);
            }
          });
          let param = {
            medicines: record.simRecId
        };
        
        API.simMedicineHelp(param).then(res => {
        let _data = res.data;
        let _code = res.code;
        let _msg = res.msg;
        if (_code === "200") {
            _data.data.map((item, index) => {
            let selectItem = item.name + "(" + item.score + ")";
            tmpPriscription.push(<Option key={selectItem}>{selectItem}</Option>)
            });
        } else {
            Message.error(_msg);
        }
        });
        */

        this.setState({
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
            xData.push(i.toString())
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
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    search() {

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

    fetchData() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let param = {
                    patientId: values.patientId,
                    startTime: values.startDate,
                    endTime: values.endDate,
                    pageNo:1,
                    pageSize:10,
                };
                API.recordTrace(param).then(res => {
                    let _data = res.data;
                    let _code = res.code;
                    let _msg = res.msg;
                    if (_code === "200") {
                        _data.data.map((item, index) => {
                            // 在这了更新irtUrl tongueUrl pulseSeries patientInfo
                        });
                        this.setState({

                        })
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

    readPulse() {
        var url = "http://10.13.81.189:8001/pulse1.txt";
        var ajx = new XMLHttpRequest()
        ajx.open("get", url, true)
        ajx.onreadystatechange = function () {
            console.log(ajx);
            if (ajx.readyState != 4) {
                return;
            }
            if (ajx.status >= 200) {
                console.log(ajx.responseText);
            }
        }
    }

    emptyFunction = () => {
        this.setState({
            emptyVisible: true,
        });
    }
    componentDidMount() {
        this.readPulse();
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
                    <Column title="血液检测异常" dataIndex="bloodDetection" key="bloodDetection" align="center" width="120px" />
                    <Column title="红外检测异常" dataIndex="infraredDetection" key="infraredDetection" align="center" width="120px" />
                    <Column title="舌象检测异常" dataIndex="tongueDetection" key="tongueDetection" align="center" width="120px" />
                    <Column title="脉象检测异常" dataIndex="pulseDetection" key="pulseDetection" align="center" width="120px" />
                    <Column title="操作" dataIndex="action" key="action" align="center"
                        render={(text, record, index) => {
                            return (
                                <div>
                                    <Button type="primary" size="small"
                                        onClick={() => this.search()
                                        }>同类检索
                        </Button>
                                    <br></br>
                                    <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green' }}
                                        onClick={() => this.medicineHelp()
                                        }>用药帮助
                        </Button>
                                </div>
                            );
                        }} />
                </Table>
                <Modal title="用药帮助" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel} width="1000px">
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                        <TreeNode value="sweetGrass" title="地黄" />
                                        <TreeNode value="goldSilverFlower" title="枸杞子" />
                                    </TreeNode>
                                    <TreeNode value="stomach" title="治心肌损伤">
                                        <TreeNode value="chaihu" title="黄芪" />
                                        <TreeNode value="huangqi" title="银杏叶" />
                                    </TreeNode>
                                </TreeNode>
                                <TreeNode value="IFO" title="异环磷酰胺">
                                    <TreeNode value="spleen" title="抗骨髓抑制">
                                        <TreeNode value="baishao" title="鸡血藤" />
                                        <TreeNode value="shudi" title="熟地" />
                                    </TreeNode>
                                    <TreeNode value="spleen" title="护肾">
                                        <TreeNode value="baishao" title="猪苓" />
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