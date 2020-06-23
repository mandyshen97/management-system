import React, { Component } from 'react';
import { Input, Button, Table, Form, Tabs, DatePicker, Modal, Select, TreeSelect} from "antd";
import ReactEcharts from "echarts-for-react";

const { SHOW_PARENT } = TreeSelect;
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
                    "mainMedcine": "酰胺，异环磷酰胺",
                    "auxMedicine": "旋覆花，全瓜蒌，碧桃干，老鹳草，五味子，甘草，黄芪，仙灵脾，巴戟天，苁蓉",
                    "effect": "咳嗽、咳痰带血、发热",
                    "abnDetection": "红细胞计数偏低，血红蛋白浓度偏低",
                    "infraredDetection": "肺部出现炎症",
                    "tongueDetection": "舌苔白厚，腻",
                    "pulseDetection": "端直而长，挺然指下，如按琴弦。",
                },
                {
                    "key": "2",
                    "date": "2018-12-04",
                    "iniSymptoms": "咳嗽、咳痰带血、发热",
                    "mainMedcine": "酰胺，阿霉素",
                    "auxMedicine": "甘草，干姜，乌梅，黑附子，细辛，炒苍术，秦艽，百部，黄芪，制黄精，百合，黄柏炭，制鳖甲，红花，灵磁石，野丹参",
                    "effect": "憋喘、咳嗽、咳痰",
                    "abnDetection": "肝脏转氨酶等指标升高",
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
                    "abnDetection": "红细胞、血红蛋白降低",
                    "infraredDetection": "无异常",
                    "tongueDetection": "舌苔厚",
                    "pulseDetection": "脉搏快有不规则的间歇。",
                },
            ],
            url: [
                "http://10.13.81.189:8001/feiai1.jpg",
                "http://10.13.81.189:8001/feiai2.jpg",
                "http://10.13.81.189:8001/feiai3.jpg"
            ],
            url1: [
                "http://10.13.81.189:8001/tongue3.jpg",
                "http://10.13.81.189:8001/tongue4.jpg",
                "http://10.13.81.189:8001/tongue1.jpg"
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
                                <img src={this.state.url[index]} alt="" width="200px" height="200px" />
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
                                <img src={this.state.url1[index]} alt="" width="200px" height="200px" />
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
                                <img src={this.state.url[index]} alt="" width="200px" height="200px" />
                                <br />
                                <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green' }}
                                    onClick={() => this.show(record)
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
                                <img src={this.state.url1[index]} alt="" width="200px" height="200px" />
                                <br />
                                <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green' }}
                                    onClick={() => this.show(record)
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
                                    onClick={() => this.show(record)
                                    }>脉象报告
    </Button>
                            </div>
                        );
                    }
                },
            ],
            tongueData: [
                { "key": '1', "tongueTime": "2018-08-02", "description": "舌苔薄,唾液粘稠，偏黄，湿气重" },
                { "key": '2', "tongueTime": "2018-12-04", "description": "舌苔干薄，颜色偏黄，与肺病相关" },
                { "key": '3', "tongueTime": "2019-02-24", "description": "暂无描述" }
            ],
            pulseData: [
                { "key": '1', "pulseTime": "2018-08-02", "description": "浮脉行于皮肤表，似同枯木水上漂，沉脉浮于筋骨间，推筋至骨用力寻" },
                { "key": '2', "pulseTime": "2018-12-04", "description": "迟脉一息唯三至，分钟少于六十行，数脉一息五六至，九十以上为数频" },
                { "key": '3', "pulseTime": "2019-02-24", "description": "滑脉滑利如走珠，虚如葱管弱如棉，实脉举按力均强，如按竹棍好思量" }
            ],
            infraredData: [
                { "key": '1', "infraTime": "2018-08-02", "description": "腹水、盆腔积液,考虑左肺上叶周围型肺癌并右肺转移，建议进一步检查" },
                { "key": '2', "infraTime": "2018-12-04", "description": "胸廓对称，无畸形，双肺呼吸音清，未闻及干湿啰音,双侧胸腔少量积液,符合左肺下叶周围型肺Ca并左肺门淋巴结、肝多发转移表现" },
                { "key": '3', "infraTime": "2019-02-24", "description": "左肺上叶病灶，结合临床考虑肿瘤性病变及治疗后改变（病灶较前2018-12-04显示减小）；右肺中叶少许感染性病变；右肺中叶点状钙化灶；左侧包裹型胸腔积液，伴左下肺肺不张；左侧部分肋骨内侧缘骨皮质密度显示增高。头颅MRI示:颅内转移性病灶," }
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
                <Option key={"柴胡(1.00)"}>{"柴胡(1.00)"}</Option>,
                <Option key={"当归(0.90"}>{"当归(0.90"}</Option>,
                <Option key={"白芍(0.85)"}>{"白芍(0.85)"}</Option>,
                <Option key={"白术(0.74)"}>{"白术(0.74)"}</Option>,
                <Option key={"茯苓(0.70)"}>{"茯苓(0.70)"}</Option>,
                <Option key={"郁金(0.65)"}>{"郁金(0.65)"}</Option>,
                <Option key={"香附(0.55)"}>{"香附(0.55)"}</Option>,
                <Option key={"八月札(0.40)"}>{"八月札(0.40)"}</Option>
            ],
            selectMedicine: [
                <Option key={"与甘草关联的太子参(0.84)"}>{"与甘草关联的太子参(0.84)"}</Option>,
                <Option key={"与白术关联的麦冬(0.72)"}>{"与白术关联的麦冬(0.72)"}</Option>,
            ]
        };
    }

    handleOk = () => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    medicineHelp = () => {
        this.setState({
            visible: true,
        });
    }
    medicineHelp() {

    }
    // 抽屉等组件关闭
    getOption = (index) => {

        let option1 = {
            title: {  //标题
                // text: '折线图一',
                x: 'center',
                textStyle: { //字体颜色
                    color: '#ccc'
                }
            },
            tooltip: { //提示框组件
                trigger: 'axis'
            },
            xAxis: { //X轴坐标值
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33']
            },
            yAxis: {
                type: 'value' //数值轴，适用于连续数据
            },
            series: [
                {
                    name: '数值', //坐标点名称
                    type: 'line', //线类型
                    data: [100, 90, 150, 300, 500, 1000, 900, 450, 500, 400, 152, 
                        110, 87, 150, 310, 487, 1020, 910, 437, 501, 430, 150, 
                        105, 80, 157, 310, 506, 989, 906, 460, 505, 389, 150] //坐标点数据
                }
            ]
        }
        let option2 = {
            title: {  //标题
                // text: '折线图一',
                x: 'center',
                textStyle: { //字体颜色
                    color: '#ccc'
                }
            },
            tooltip: { //提示框组件
                trigger: 'axis'
            },
            xAxis: { //X轴坐标值
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33']
            },
            yAxis: {
                type: 'value' //数值轴，适用于连续数据
            },
            series: [
                {
                    name: '数值', //坐标点名称
                    type: 'line', //线类型
                    data: [60, 90, 75, 200, 300, 500, 700, 550, 500, 400, 152,
                        210, 107, 160, 330, 487, 512, 450, 437, 501, 420, 130,
                        165, 96, 240, 310, 532, 768, 601, 450, 505, 389, 150] //坐标点数据
                }
            ]
        }
        let option3 = {
            title: {  //标题
                // text: '折线图一',
                x: 'center',
                textStyle: { //字体颜色
                    color: '#ccc'
                }
            },
            tooltip: { //提示框组件
                trigger: 'axis'
            },
            xAxis: { //X轴坐标值
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33']
            },
            yAxis: {
                type: 'value' //数值轴，适用于连续数据
            },
            series: [
                {
                    name: '数值', //坐标点名称
                    type: 'line', //线类型
                    data: [70, 90, 120, 200, 400, 600, 800, 680, 450, 600, 520, 
                        310, 165, 150, 340, 285, 850, 900, 740, 430, 501, 100, 
                        75, 125, 170, 310, 500, 900, 909, 840, 540, 390, 250] //坐标点数据
                }
            ]
        }
        return index == 0 ? option1 : (index == 1 ? option2 : option3);
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
                                // prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
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
                <Tabs defaultActiveKey="1">
                    <TabPane tab="红外热成像图变化" key="1">
                        <Table
                            bordered
                            pagination={false}
                            scroll={{ y: true, y: 500 }}
                            columns={this.state.infraredColumns}
                            dataSource={this.state.infraredData}>
                        </Table>
                        <strong style={{fontSize: "18px"}}>结论：左右肺瓣对称，肺部炎症减少，有好转趋势</strong>
                    </TabPane>
                    <TabPane tab="舌象图谱变化" key="2">
                        <Table
                            bordered
                            pagination={false}
                            scroll={{ y: true, y: 500 }}
                            columns={this.state.tongueColumns}
                            dataSource={this.state.tongueData}>
                        </Table>
                        <strong style={{fontSize: "18px"}}>结论：舌色红润，视为健康</strong>
                    </TabPane>
                    <TabPane tab="脉象数据变化" key="3">
                        <Table
                            bordered
                            pagination={false}
                            scroll={{ y: true, y: 500 }}
                            columns={this.state.pulseColumns}
                            dataSource={this.state.pulseData}>
                        </Table>
                        <strong style={{fontSize: "18px"}}>结论：脉象逐渐稳定，规律，起落明显</strong>
                    </TabPane>
                </Tabs>
                <br/>
                <Table
                    bordered
                    pagination={false}
                    scroll={{ y: true, y: 300 }}
                    dataSource={this.state.patientData}
                >
                    <Column title="就诊时间" dataIndex="date" key="date" align="center" width="120px" />
                    <Column title="初始症状" dataIndex="iniSymptoms" key="iniSymptoms" align="center" pxwidth="150px" />
                    <ColumnGroup title="用药情况">
                        <Column title="主药" dataIndex="mainMedcine" key="mainMedcine" align="center" width="150px" />
                        <Column title="辅药" dataIndex="auxMedicine" key="auxMedicine" align="center" width="200px" />
                    </ColumnGroup>
                    <Column title="用药效果" dataIndex="effect" key="effect" align="center" width="150px" />
                    <Column title="异常检测结果" dataIndex="abnDetection" key="abnDetection" align="center" width="150px" />
                    <Column title="红外检测分析" dataIndex="infraredDetection" key="infraredDetection" align="center" width="150px" />
                    <Column title="舌象检测分析" dataIndex="tongueDetection" key="tongueDetection" align="center" width="150px" />
                    <Column title="脉象检测分析" dataIndex="pulseDetection" key="pulseDetection" align="center" width="150px" />
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
                    onOk={this.handleOk} onCancel={this.handleCancel} width="600px">
                    <strong style={{ fontSize: "20px" }}>基于专家用药模型的用药检查</strong>
                    <br/>
                    <br/>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="请选择"
                        defaultValue={[]}
                        onChange={this.handleChange}
                    > 
                        {this.state.selectMedicine}
                    </Select>
                    {/* <p>
                        <br />
                        是否加入与甘草关联的<span style={{ color: 'red' }}>太子参(0.84)</span>?
                        <br />
                        是否加入与白术关联的<span style={{ color: 'red' }}>麦冬(0.72)</span>?
                        </p>
                    <br /> */}
                    <strong style={{ fontSize: "20px" }}>基于相似电子病历的处方推荐</strong>
                    <br/>
                    <br/>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="请选择"
                        defaultValue={[]}
                        onChange={this.handleChange}
                    > 
                        {this.state.selectPrescription}
                    </Select>
                        {/* <br />
                        <span style={{ color: 'red', margin: '2px 8px 2px 0px' }}>柴胡(1.00)</span>
                        <span style={{ color: 'red', margin: '2px 8px' }}>当归(0.90)</span>
                        <span style={{ color: 'red', margin: '2px 8px' }}>白芍(0.85)</span>
                        <span style={{ color: 'red', margin: '2px 8px' }}>白术(0.74)</span>
                        <span style={{ color: 'red', margin: '2px 8px' }}>茯苓(0.70)</span>
                        <span style={{ color: 'red', margin: '2px 8px' }}>郁金(0.65)</span>
                        <br />
                        <span style={{ margin: '2px 8px 2px 0px' }}>香附(0.55)</span>
                        <span style={{ margin: '2px 8px' }}>八月札(0.40)</span> */}
                    <strong style={{ fontSize: "20px" }}>基于决策树的医生自选药物</strong>
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
                     <TreeNode value="CTX" title="酰胺">
                        <TreeNode value="liver" title="护肝">
                            <TreeNode value="sweetGrass" title="六味乌灵片" />
                            <TreeNode value="goldSilverFlower" title="金银花" />
                        </TreeNode>
                        <TreeNode value="stomach" title="护胃">
                            <TreeNode value="chaihu" title="柴胡" />
                        </TreeNode>
                     </TreeNode>
                     <TreeNode value="IFO" title="异环磷酰胺">
                        <TreeNode value="spleen" title="护脾">
                            <TreeNode value="baishao" title="白芍" />
                        </TreeNode>
                     </TreeNode>   
                    </TreeSelect>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(Medicine);