import React, { Component, Fragment } from 'react';
import { Input, Icon, Button, Table, Form, Row, img, Divider, Page, DatePicker, Message, Col, Modal, Popconfirm } from "antd";
import './tongue.less';
class Tongue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            totalNum: 4,
            tableColumns: [
                {
                  title: '病历id',
                  dataIndex: 'id',
                  key: 'id',
                  width: 50
                },
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                  width: 50
                },
                {
                  title: '就诊时间',
                  dataIndex: 'createAt',
                  key: 'createdAt',
                  width: 80,
                },
                {
                    title: '舌象图谱',
                    dataIndex: 'imagePath',
                    key: 'imagePath',
                    width: 100,
                    render: (imagePath) => 
                    <img src={imagePath} width="100px" alt=""/> 
                },
                {
                    title: '主述',
                    dataIndex: 'complain',
                    key: 'complain',
                    ellipsis: true,
                    width: 150,
                    tooltip: true,
                },
                {
                  title: '现病史',
                  dataIndex: 'HPI',
                  key: 'HPI',
                  ellipsis: true,
                  width: 150,
                  tooltip: true,
                },
                {
                    title: '既往史',
                    dataIndex: 'PH',
                    key: 'PH',
                    ellipsis: true,
                    width: 150,
                    tooltip: true,
                  },
                {
                  title: '初步诊断',
                  dataIndex: 'disease',
                  key: 'disease',
                  width: 100
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
                    "id": 74,
                    "name": "匿名",
                    "createAt": "2017-03-14",
                    "imagePath": "http://10.13.81.189:8001/tongue1.jpg",
                    "complain": "间断上腹痛3年，再发加重1周。",
                    "HPI": "患者3年前无明显诱因出现上腹部疼痛，部位固定，空腹及夜间疼痛明显，每次发作半小时左右，就诊于外院，行胃镜示：十二指肠球部溃疡，门诊予抑酸治疗（具体药物不详），服药后症状得到控制。此后3年间患者自诉上腹痛反复发作，伴反酸、烧心、恶心、腹胀，每次均自行口服奥美拉唑肠溶胶囊后症状稍有缓解。1周钱患者因上述症状再发加重且口服奥美拉唑肠溶胶囊未见明显缓解，再次就诊于外院，胃镜示：慢性胃炎，Barrett食管，十二指肠球部溃疡。现为求中西医结合治疗，于我院就诊。",
                    "PH": "否认冠心病、高血压、糖尿病病史。否认脑血管病病史，否认肺结核、肝炎病史，否认输血、外伤史、手术史。",
                    "disease": "胃痛肝胃气滞",
                    "diseaseProb": "30%"
                },
                {
                    "key": "2",
                    "id": 92,
                    "name": "匿名",
                    "createAt": "2017-10-10",
                    "imagePath": "http://10.13.81.189:8001/tongue2.jpg",
                    "complain": "患者主因\"咳嗽10余天\"入院",
                    "HPI": "患者于10余天前无明显诱因出现咳嗽，气逆作咳，咳则连声，感恶心，无呕吐，咳时面红目赤，口干口苦，胸胁胀痛，进食量可，无二便异常。在当地给予输液治疗，具体药物不详，效果欠佳，上述症状仍持续存在，现为进一步诊治而来我院。现症见：咳嗽，咳白色泡沫样痰，量少，呈阵发性，感恶心，无呕吐，咳时面红目赤，口干口苦，胸胁胀痛，舌红，苔薄黄少津，脉弦数。自发病以来，神志清楚，精神尚可，进食量可，睡眠欠佳，二便无异常。",
                    "PH": "既往体健。否认糖尿病、冠心等慢性病史，否认肝炎、结核及其他传染病满史，否认外伤、手术及输血史，否认药物及其他过敏史。预防接种史不详。",
                    "disease": "咳嗽肝火犯肺证",
                    "diseaseProb": "70%"
                },
                {
                    "key": "3",
                    "id": 158,
                    "name": "匿名",
                    "createAt": "2018-07-15",
                    "imagePath": "http://10.13.81.189:8001/tongue3.jpg",
                    "complain": "患者主因\"腹痛10余天\"入院；",
                    "HPI": "患者于入院前10余天无明显诱因出现腹痛，伴胀闷不舒，走窜不定，痛连两胁，嗳气稍舒，郁怒则痛剧，伴呃逆，伴头晕、心悸，在当地未予特殊处理，患者上述症状持续加重，无缓解，现为求进一步治疗来院.现症见：腹痛、腹泻，伴胀闷不舒，走窜不定，痛连两胁，嗳气稍舒，郁怒则痛剧，伴呃逆，伴头晕、心悸；患者自发病以来，神志清楚，精神差，纳差，睡眠欠佳，大小便正常。",
                    "PH": "既往体健。否认糖尿病、冠心等慢性病史，否认肝炎、结核及其他传染病满史，否认外伤、手术及输血史，否认药物及其他过敏史。预防接种史不详。个人史：生于原籍，久居当地，未到过疫区及牧区，无放射性物质及有毒物质接触史，否认性病史及接触史。",
                    "disease": "腹痛肝郁气滞",
                    "diseaseProb": "90%"
                },
                {
                    "key": "4",
                    "id": 279,
                    "name": "匿名",
                    "createAt": "2019-05-20",
                    "imagePath": "http://10.13.81.189:8001/tongue4.jpg",
                    "complain": "腹痛、恶心、呕吐7小时。",
                    "HPI": "现病史：7小时前，患者饭后，出现腹痛呈持续性疼痛不适，针扎样疼痛，伴恶心、呕吐，呕吐4次，呕吐物为胃内容物，非喷射状。无腹泻、黑便，无头晕、头痛、头沉，无胸痛、心悸、胸闷、呼吸困难，无明确不洁饮食史。在外未治疗，为进一步系统治疗，现来诊。门诊以“急性胃炎”收入院，患者自发病以来，神志清，精神差，饮食差，睡眠可，大小便正常体重无明显变化。中医望、闻、问、切诊：患者神疲乏力，舌苔厚腻，脉滑实。",
                    "PH": "既往“冠心病”病史1年余。否认肝炎和结核等传染病病史，否认高血压、冠心病、糖尿病病史，无外伤、手术、输血史，无药物和食物等过敏史，预防接种史不详。系统回顾无其他重要病史记载。",
                    "disease": "急性胃炎",
                    "diseaseProb": "尚未分析"
                },
            ]
        };
    }

    show(record) {
        
    }
      // 分页页数改变触发函数
    pageChange = (page) => {
        this.setState({
        pageNum: page
        })
        this.fetchData()
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
                        pageSize: 50,
                    }}
                    columns={this.state.tableColumns}
                    dataSource={this.state.patientData}
                    ></Table>
            </div>
        )
    }
}

export default Form.create()(Tongue);