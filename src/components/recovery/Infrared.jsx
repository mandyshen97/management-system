import React, { Component, Fragment } from 'react';
import { Drawer, Input, Icon, Button, Table, Form, Row, img, Divider, Page, DatePicker, Message, Col, Modal, Popconfirm } from "antd";

class Infrared extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            totalNum: 3,
            drawerSwitch: false,
            tableColumns: [
                {
                  title: '病历id',
                  dataIndex: 'id',
                  key: 'id',
                  width: 70
                },
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                  width: 70
                },
                {
                  title: '就诊时间',
                  dataIndex: 'createAt',
                  key: 'createdAt',
                  width: 100,
                },
                {
                    title: '红外热成像图',
                    dataIndex: 'imagePath',
                    key: 'imagePath',
                    width: 100,
                    render: (imagePath) => 
                    <img src={imagePath} width="100px" alt=""/> 
                },
                {
                    title: '诊治经过',
                    dataIndex: 'treatment',
                    key: 'treatment',
                    ellipsis: true,
                    width: 150,
                    tooltip: true,
                },
                {
                  title: '初步诊断',
                  dataIndex: 'diagnosis',
                  key: 'diagnosis',
                  ellipsis: true,
                  width: 150,
                  tooltip: true,
                },
                {
                  title: '临床诊断',
                  dataIndex: 'disease',
                  key: 'disease',
                  width: 70
                },
                {
                    title: '患病概率',
                    dataIndex: 'diseaseProb',
                    key: 'diseaseProb',
                    width: 70
                },
                {
                  title: '操作',
                  width: 70,
                  key: 'action',
                  align: 'center',
                  render: (text, record, index) => {
                    return (
                      <div>
                        <Button type="primary" size="small" style={{}}
                          onClick={() => this.show(record)
                          }>病历详情
                            </Button>
                        <br/>
                        <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green'}}
                        onClick={() => this.show(record)
                        }>智能分析
                        </Button>
                      </div>
                    );
                  }
                }
            ],
            patientData: [
                {
                    "key": "1",
                    "id": 21,
                    "name": "匿名",
                    "createAt": "2019-01-24",
                    "imagePath": "http://10.13.81.189:8001/ruxian1.png",
                    "treatment": "完善相关检查，无化疗禁忌，给予TC方案化疗，具体:环磷酰胺0.6g/m2.1.0g.d1静点，多西他赛75mg/m2.120mgd1静点，21天为一周期，化疗同时给予护胃、防过敏及对症支持治疗。",
                    "diagnosis": "乳腺癌保乳术后化疗后",
                    "disease": "乳腺癌",
                    "diseaseProb": "90%"
                },
                {
                    "key": "2",
                    "id": 234,
                    "name": "匿名",
                    "createAt": "2019-08-04",
                    "imagePath": "http://10.13.81.189:8001/ruxian2.png",
                    "treatment": "患者入院后完善相关辅助检查，排除化疗禁忌症，继续给予第2周期AC方案全身化疗:表柔比星60mgd1＋环磷酰胺0．8gd1，出现1度胃肠道反应，2度骨髓抑制，给予帕洛诺司琼止吐、瑞白升血后，好转出院。",
                    "diagnosis": "右乳浸润性小叶癌术后pT1N0M0I期",
                    "disease": "乳腺癌",
                    "diseaseProb": "100%"
                },
                {
                    "key": "3",
                    "id": 532,
                    "name": "匿名",
                    "createAt": "2020-02-15",
                    "imagePath": "http://10.13.81.189:8001/ruxian3.png",
                    "treatment": "患者入院后完善相关辅助检查，例如胸部CT、肿瘤标志物、腹部B超+乳腺+腋窝淋巴结彩超、骨扫描，提示病情稳定，疗效评价为SD，给予中药抗肿瘤、免疫增强治疗，好转出院。",
                    "diagnosis": "乳腺癌根治切除术后化疗后(pT2N3M0，IIIC期)",
                    "disease": "乳腺癌",
                    "diseaseProb": "尚未分析"
                },
            ]
        };
    }

    show(record) {
        this.setState({
            drawerSwitch: true,
          })
    }
    // 抽屉等组件关闭
    onClose = () => {
        this.setState({
        drawerSwitch: false,
        })
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
                    pagination={{
                        pageSize: 50
                    }}
                    columns={this.state.tableColumns}
                    dataSource={this.state.patientData}
                    ></Table>
                <Drawer
                  title="患者病历"
                  placement="right"
                  width="640"
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.drawerSwitch}>
                  <div className="demo-drawer-profile">
                    <Row>
                      <Col span={12}>
                        <strong>患者姓名:</strong><span style={{ marginLeft: 20 }}>匿名</span>
                      </Col>
                      <Col span={12}>
                        <strong>主治医生:</strong><span style={{ marginLeft: 45 }}>林虎</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <strong>性别:</strong><span style={{ marginLeft: 50 }}>女</span>
                      </Col>
                      <Col span={12}>
                        <strong>生日:</strong><span style={{ marginLeft: 72 }}>1962-09-14</span>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <strong>身高(cm):</strong><span style={{ marginLeft: 20 }}>160 </span>
                      </Col>
                      <Col span={12}>
                        <strong>体重(kg)：</strong><span style={{ marginLeft: 37 }}>60 </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>主诉：</strong><div className='setformat'>左乳腺癌术后半年余，第8次化疗后1周，发烧2天。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>现病史：</strong><div className='setformat'>患者因“发现左乳肿物一年”于2018年7月6日行左乳癌简化根治术，术中见左乳腺8点处1.5x1.5cm大小肿物，术后病理:乳腺癌，浸润性导管癌，非特殊型二级，淋巴结见癌转移4/10;免疫组化:ER(95%++),PR(-),hre-2(-),ki67(5%-10%+)，P53(+)。2018年8月6日始行8周期4EC--4T方案化疗，前4次化疗后出现脱发，白细胞及粒细胞下降III度，给予GCSF升高白细胞，第5次化疗后出现周身疼痛，乏力严重，第6-8周期多西他赛减量，现第8周期化疗结束后1周，近2天咽部疼痛，发冷发烧，体温未测，咳嗽，有痰咳不出，自服蒲地蓝药物无改善，急诊来院，病来食欲欠佳，头昏，乏力，无尿频，尿急尿痛及肉眼血尿。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>既往史：</strong><div className='setformat'>健康，否认高血压，冠心病，糖尿病病史，否认肝炎，肺结核等传染病病史，否认药物食物过敏史，无外伤，输血史。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>辅助检查：</strong><div className='setformat'>入院急查血常规:白细胞0.3x10~9/L中性粒细胞绝对值0.01x10~9,血红蛋白115g/L.血小板152x10~9。心电图:正常。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>检查图像：</strong><div className='setformat'><img src={"http://10.13.81.189:8001/ruxian1.png"} width="400px" alt=""/></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>初步诊断：</strong><div className='setformat'>乳腺癌保乳术后化疗后</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>诊断依据</strong><div className='setformat'>1、发现左乳腺肿物。2、行左乳腺癌简化根治术，术后病理提示。3、术后辅助化疗后出现咽喉部疼痛，发烧咳嗽，有痰咳不出。4、查:体温:39.4℃，咽粘膜充血红肿，桃体II°肿大，左乳房缺如，见手术疤痕，右乳正常。5、血常规:白细胞0.3x10~9,中性粒细胞绝对值0.01x10~9,血红蛋白115g/L,血小板152x10~9</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="primary" style={{backgroundColor: 'green', borderColor: 'green' }} onClick={() => this.showUpdate()}>
                          更新病历
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Drawer>
            </div>
        )
    }
}

export default Form.create()(Infrared);