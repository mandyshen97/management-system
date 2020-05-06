import React, { Component, Fragment } from 'react';
import { Drawer, Input, Icon, Button, Table, Form, Row, img, Divider, Page, DatePicker, Message, Col, Modal, Popconfirm } from "antd";
import ReactEcharts from "echarts-for-react";
class Pulse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerSwitch: false,
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
                  title: '脉象描述',
                  dataIndex: 'pulse',
                  key: 'pulse',
                  width: 150,
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
                "id": 43,
                "name": "匿名",
                "createAt": "2017-05-04",
                "pulse": "端直而长，挺然指下，如按琴弦。",
                "complain": "咳嗽短气7月余，加重1月",
                "HPI": "患者于7月前无明显诱因出现咳嗽咳痰，痰黄易咳吐，肺部CT：双肺慢性炎症改变，两肺间质纤维化，于我院抗感染，化痰等治疗后好转，1月前受凉后出现咳嗽，凌晨及晨起咳嗽加重，咳痰，为白色泡沫痰，乏力短气，缓行约200米则喘息伴心悸，无胸闷胸痛，无发热寒战，无头痛头晕，为求进一步治疗以双肺间质性肺病合并感染收入院",
                "PH": "7月前诊断为双眼病毒性结膜炎，老年性白内障，予妥布霉素滴眼液、更昔洛韦眼用凝胶、贝复舒眼膏，发现2型糖尿病7个月，每日规律胰岛素皮下注射，血糖控制可否认乙肝结核等传染病，否认高血压、心脏病，否认食物药物过敏史，否认输血史。",
                "disease": "咳嗽温热蕴肺",
                "diseaseProb": "80%"
            },
            {
                "key": "2",
                "id": 54,
                "name": "匿名",
                "createAt": "2017-07-21",
                "pulse": "脉来急数，时而一止，止无定数，即脉搏快有不规则的间歇。",
                "complain": "间断头晕6月余。",
                "HPI": "患者于6月前无明显诱因出现头昏沉，头晕，持续约数小时后好转，无双眼一过性黑蒙，无视物旋转，无恶心呕吐，未予重视，此后头晕间断发作，劳累及卧立位变化后明显，于外院行头颅核磁示：左颞软化灶，双侧基底节，双侧额叶及右侧丘脑腔隙性梗塞及软化灶。现为求中西医结合治疗收入我院。刻下症见：头晕间断发作，头昏沉，无视物旋转，无恶心呕吐，偶有头痛，头痛隐隐，纳眠可，二便调。",
                "PH": "高血压病病史2年，血压控制可；否认糖尿病，否认肺结核、肝炎，否认输血史，否认手术史。",
                "disease": "头晕痰湿中阻证",
                "diseaseProb": "80%"
            },
            {
                "key": "3",
                "id": 78,
                "name": "匿名",
                "createAt": "2018-01-13",
                "pulse": "脉按之细小如线，起落明显。",
                "complain": "间断胸闷、心慌、气短、乏力8月，加重1月。",
                "HPI": "患者8月前晚上睡觉时无明显诱因出现胸闷喘憋，咳嗽，心慌，乏力，就诊于当地医院，诊断为酒精性心肌病，心律失常，治疗后好转出院。出院后规律服用拜阿司匹林肠溶片，欣康片，地高辛等药物，此后多次因胸闷喘憋，心慌，乏力就诊于当地医院。近1月患者上述症状加重，胸闷，喘憋，不能平卧，夜间和活动后加重，气短乏力，腹胀，纳差。为求中西医结合治疗，收入我院。",
                "PH": "扩张型心肌病病史9年，高血压病病史30年，否认糖尿病，否认脑血管病病史，否认肺结核、肝炎病史，否认输血、外伤史、手术史。",
                "disease": "心衰病",
                "diseaseProb": "90%"
            },
            {
                "key": "4",
                "id": 106,
                "name": "匿名",
                "createAt": "2018-05-27",
                "pulse": "不浮不沉，不大不小，节律均匀，从容和缓，流利有力。",
                "complain": "左下肢疼痛麻木伴行走不利两周。",
                "HPI": "患者两周前安静状态下突然出现左腿疼痛伴麻木，起身行走时左下肢无力，左上肢无明显活动不利，无头晕头痛，无视物旋转。于我院门诊就诊，考虑脑梗塞。为求进一步治疗，收入我院。现患者左大腿部疼痛，麻木，活动后加重，休息可缓解，左下肢。行走时拖沓，左上肢偶有麻木感。无发热，无鼻塞，流涕。",
                "PH": "既往高血压病史八年，服用硝苯地平缓释片。血压控制可。高血脂症数年，自服药物治疗。否认肺结核、肝炎病史，否认输血、外伤史、手术史。否认食物药物过敏史。",
                "disease": "中风气阴两虚，淤血阻络",
                "diseaseProb": "10%"
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

    getOption = ()=>{
      let option = {
          title: {  //标题
              // text: '折线图一',
              x: 'center',
              textStyle: { //字体颜色
                  color: '#ccc'
              }
          },
          tooltip:{ //提示框组件
              trigger: 'axis'
          },
          xAxis: { //X轴坐标值
              data: ['1','2','3','4','5','6','7', '8', '9', '10', '11','12','13','14','15','16','17', '18', '19', '20', '21','22','23','24','25','26','27', '28', '29', '30', '31', '32', '33']
          },
          yAxis: {
              type: 'value' //数值轴，适用于连续数据
          },
          series : [
              {
                  name:'数值', //坐标点名称
                  type:'line', //线类型
                  data:[100, 90, 150, 300, 500, 1000, 900, 450, 500, 400, 152, 110, 87, 150, 310, 487, 1020, 910, 437, 501, 430, 150, 105, 80, 157, 310, 506, 989, 906,  460, 505, 389, 150] //坐标点数据
              }
          ]
      }
      return option;
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
                        simple: true,
                        current: this.state.pageNum,
                        total: this.state.totalNum,
                        onChange: this.pageChange,
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
                        <strong>主治医生:</strong><span style={{ marginLeft: 45 }}>刘凯</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <strong>性别:</strong><span style={{ marginLeft: 50 }}>男</span>
                      </Col>
                      <Col span={12}>
                        <strong>生日:</strong><span style={{ marginLeft: 72 }}>1946-02-10</span>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <strong>身高(cm):</strong><span style={{ marginLeft: 20 }}>164 </span>
                      </Col>
                      <Col span={12}>
                        <strong>体重(kg)：</strong><span style={{ marginLeft: 37 }}>55 </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>主诉：</strong><div className='setformat'>咳嗽短气7月余，加重1月</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>现病史：</strong><div className='setformat'>患者于7月前无明显诱因出现咳嗽咳痰，痰黄易咳吐，肺部CT：双肺慢性炎症改变，两肺间质纤维化，于我院抗感染，化痰等治疗后好转，1月前受凉后出现咳嗽，凌晨及晨起咳嗽加重，咳痰，为白色泡沫痰，乏力短气，缓行约200米则喘息伴心悸，无胸闷胸痛，无发热寒战，无头痛头晕，为求进一步治疗以双肺间质性肺病合并感染收入院</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>既往史：</strong><div className='setformat'>7月前诊断为双眼病毒性结膜炎，老年性白内障，予妥布霉素滴眼液、更昔洛韦眼用凝胶、贝复舒眼膏，发现2型糖尿病7个月，每日规律胰岛素皮下注射，血糖控制可否认乙肝结核等传染病，否认高血压、心脏病，否认食物药物过敏史，否认输血史。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>辅助检查：</strong><div className='setformat'>血常规+CRP：CRP16.55mg/L生化：GLU17.27mmol/LALT85TP57.7ALB29.5TG2.08</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>脉象：</strong><div className='setformat'><ReactEcharts option={this.getOption()} theme="ThemeStyle" /></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>脉象描述</strong><div className='setformat'>端直而长，挺然指下，如按琴弦。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>初步诊断：</strong><div className='setformat'>咳嗽温热蕴肺</div>
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

export default Form.create()(Pulse);