import React, { Component, Fragment } from 'react';
import { Drawer, Input, Icon, Button, Table, Form, Row, img, Divider, Page, DatePicker, Message, Col, Modal, Popconfirm } from "antd";
import ReactEcharts from "echarts-for-react";
class Pulse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerSwitch: false,
            dataSource : [
              {
                key: '1',
                count: '1',
                healthScore: 40,
                medicine: '黄芩，黄连，瓜，杏仁，干姜，党参',
              },
              {
                key: '2',
                count: '2',
                healthScore: 52,
                medicine: '麻黄，杏仁，甘草，石膏，桔梗，寸冬',
              },
              {
                key: '3',
                count: '3',
                healthScore: 71,
                medicine: '白蔻仁、藿香、茵陈、滑石、通草、菖蒲、黄芩、连翘、浙贝、射干、薄荷、桔梗、杏仁、前胡',
              },
            ],
            columns : [
              {
                title: '就诊次数',
                dataIndex: 'count',
                key: 'count',
                width:100
              },
              {
                title: '健康得分',
                dataIndex: 'healthScore',
                key: 'healthScore',
                width:100
              },
              {
                title: '用药处方',
                dataIndex: 'medicine',
                key: 'medicine',
              },
            ],
            tableColumns: [
              {
                title: '病历id',
                dataIndex: 'id',
                key: 'id',
                width: 60
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
                  ellipsis: true,
                  tooltip: true,
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
              // {
              //     title: '既往史',
              //     dataIndex: 'PH',
              //     key: 'PH',
              //     ellipsis: true,
              //     width: 150,
              //     tooltip: true,
              //   },
                {
                  title: '临床诊断',
                  dataIndex: 'disease',
                  key: 'disease',
                  width: 70
                },
                {
                    title: '健康得分',
                    dataIndex: 'diseaseProb',
                    key: 'diseaseProb',
                    width: 60
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
                "complain": "发现乙肝10年余，发现肝占位1天。",
                "HPI": "患者缘于10年余前体检发现乙肝，于3年余前口服“阿德福韦酯胶囊”抗病毒治疗，间断口服“肝爽颗粒”，未定期复查肝功能，乙肝病毒定量，腹部彩超。半月前感腹胀，在当地医院给予输液治疗(具体不详)，疗效差，今日为求进一步诊治来我院，门诊行甲胎蛋白示171ng/ml，肝脏MRI示:1.肝硬化，脾大，肝周少量积液；2.肝内弥漫性病变(左叶为主)，符合肝癌表现。3.门脉左支显示不清楚，内异常信号，考虑门脉癌栓形成。遂以“1.乙肝肝硬化；2.肝占位”收入我科，自发病以来，精神状态欠佳，饮食正常，睡眠状况正常，大小便正常，体力下降，体重无变化。",
                "PH": "平素身体一般，患者10年前查体发现乙肝标志物阳性，肝功能正常，未予治疗及定期复查，否认高血压、心脏病史，否认糖尿病、脑血管疾病病史，否认外伤、输血、献血史，否认食物、药物过敏史，预防接种史不详。",
                "disease": "肝癌",
                "diseaseProb": "40"
              },
              {
                "key": "2",
                "id": 54,
                "name": "匿名",
                "createAt": "2017-07-21",
                "pulse": "脉来急数，时而一止，止无定数，即脉搏快有不规则的间歇。",
                 "complain": "因突发上腹部疼痛伴腹胀3小时余入院。",
                "HPI": "发病后腹痛迅速累及全腹。无外伤病史。",
                "PH": "既往有发现乙肝病史10多年。",
                "disease": "肝癌",
                "diseaseProb": "52"
              },
              {
                "key": "3",
                "id": 78,
                "name": "匿名",
                "createAt": "2018-01-13",
                "pulse": "脉按之细小如线，起落明显。",
                "complain": "因发现肝脏占位性病变",
                "HPI": "入院前9d患者无明显诱因出现血糖升高。当地医院腹部彩色多普勒超声检查：肝脏实性占位性病变。CT平扫：肝右叶见大小约6.2cm×5.6cm稍低密度影，边缘欠清晰。以“肝脏占位性病变，2型糖尿病”收治入院。",
                "PH": "该患者无长期酗酒史，无胰腺炎病史。",
                "disease": "肝癌",
                "diseaseProb": "71"
              },
            ]
        };
    }

    show(record) {
      this.setState({
        drawerSwitch: true,
      })
    }
    showModal= () => {
      this.setState({
        visible: true,
      });
    }
    handleOk= () => {
      this.setState({
        visible: false,
      });
    }
    handleCancel= () => {
      this.setState({
        visible: false,
      });
    }
    getOption1 = ()=>{
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
              data: ['1','2','3']
          },
          yAxis: {
              type: 'value' //数值轴，适用于连续数据
          },
          series : [
              {
                  name:'健康得分', //坐标点名称
                  type:'line', //线类型
                  data:[40, 52, 71] //坐标点数据
              }
          ]
      }
      return option;
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
                    <Form.Item>
                    <Button type="primary" onClick={this.showModal}>
                        康复趋势图
                    </Button>
                    </Form.Item>
                </Form>
                <Modal title="康复趋势图" visible={this.state.visible}
                onOk={this.handleOk} onCancel={this.handleCancel} width="600px">
                <strong>健康得分：</strong><div><ReactEcharts option={this.getOption1()} theme="ThemeStyle" /></div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />;
              </Modal>
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
                        <strong>主诉：</strong><div className='setformat'>因突发上腹部疼痛伴腹胀3小时余入院。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>现病史：</strong><div className='setformat'>发病后腹痛迅速累及全腹。无外伤病史。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>既往史：</strong><div className='setformat'>既往有发现乙肝病史10多年。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>辅助检查：</strong><div className='setformat'>查体:Bp83/52mmHg，P136次/分，精神萎靡不振，肢端冷，烦渴。脉搏微弱。腹饱满，未见腹壁静脉曲张，腹肌紧张，全腹压痛，轻反跳痛，以上腹部剑突下稍偏右处为甚。腹水征阳性。肠鸣音弱，未闻及气过水音。B超提示腹腔大量积液，右上腹不均质包块，肝左内叶占位性实质肿块。腹穿由出不凝血。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>脉象：</strong><div className='setformat'><ReactEcharts option={this.getOption()} theme="ThemeStyle" /></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>脉象描述</strong><div className='setformat'>脉来急数，时而一止，止无定数，即脉搏快有不规则的间歇。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>初步诊断：</strong><div className='setformat'>肝癌</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      </Col>
                    </Row>
                  </div>
                </Drawer>
            </div>
        )
    }
}

export default Form.create()(Pulse);