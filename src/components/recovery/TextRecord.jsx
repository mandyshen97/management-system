import React, { Component, Fragment } from 'react';
import { Drawer, Input, Icon, Button, Table, Form, Row, img, Divider, Page, DatePicker, Message, Col, Modal, Popconfirm } from "antd";
import './text-record.less';
import ReactEcharts from "echarts-for-react";
class TextRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            totalNum: 3,
            visible:false,
            drawerSwitch: false,
            dataSource : [
              {
                key: '1',
                count: '1',
                healthScore: 55,
                medicine: '旋覆花，全瓜蒌，碧桃干，老鹳草，五味子，生甘草，黄芪，仙灵脾，巴戟天，苁蓉',
              },
              {
                key: '2',
                count: '2',
                healthScore: 65,
                medicine: '甘草，干姜，乌梅，黑附子，细辛，炒苍术，秦艽，百部，黄芪，制黄精，百合，黄柏炭，制鳖甲，红花，灵磁石，野丹参',
              },
              {
                key: '3',
                count: '3',
                healthScore: 82,
                medicine: '诃子肉、生晒参片、炙甘草、砂仁、黄柏',
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
                    title: '主诉',
                    dataIndex: 'chfCmp',
                    key: 'chfCmp',
                    width: 100, 
                },
                {
                    title: '现病史',
                    dataIndex: 'hisPreIll',
                    key: 'hisPreIll',
                    ellipsis: true,
                    width: 150,
                    tooltip: true,
                },
                {
                  title: '既往史',
                  dataIndex: 'prvMedHis',
                  key: 'prvMedHis',
                  ellipsis: true,
                  width: 150,
                  tooltip: true,
                },
                {
                  title: '诊断结果',
                  dataIndex: 'disease',
                  key: 'disease',
                  width: 70
                },
                {
                    title: '健康得分',
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
                    "id": 24,
                    "name": "匿名",
                    "createAt": "2018-10-23",
                    "chfCmp": "咳嗽、咳痰伴憋喘1月余",
                    "hisPreIll": "1月前患者无明显诱因出现咳嗽，阵发性，夜间重，咳痰，量多，憋喘呈阵发性，无明显胸痛，无咽痛、无发热、无肌肉关节疼痛，无畏寒、寒战，无鼻塞流涕，无恶心呕吐，无腹痛腹泻等，于齐鲁医院就诊，诊断为“慢性支气管炎急性发作”，给予“舒利迭、莫西沙星、顺尔宁”口服治疗，效果一般，症状未见明显减轻，患者仍有咳嗽、咳痰憋喘症状，5天前患者于我院门诊就诊，行胸部CT示“右肺炎症、肺气肿、肺大泡、胸膜肥厚，双肺钙化灶。”表现，今日为进一步诊治，收入我院。",
                    "prvMedHis": "否认“高血压、冠心病、糖尿病”病史。否认肝炎、结核等传染病史。否认外伤史及手术史。无输血史。否认药物食物过敏史。预防接种史不详。",
                    "disease": "肺癌",
                    "diseaseProb": "55"
                },
                {
                    "key": "2",
                    "id": 234,
                    "name": "匿名",
                    "createAt": "2019-03-04",
                    "chfCmp": "咳嗽3周。",
                    "hisPreIll": "缘患者于3周前无明显诱因起出现咳嗽，咯黄白色痰，无咯血，无发热，无气促，间胸闷心悸，胃纳差，曾以肺结核在我院门诊就诊，给予中药调理，咳痰明显好转，但仍有咳嗽，稍气促，无心慌胸闷，今日来我院门诊就诊，为进一步诊治收入我科。入院症见：神志清，精神一般，咳嗽，咳少量白痰，不易咳出，无发热，无恶寒，口干口苦，无明显气促，无鼻塞流涕，无咽痛，间有胸闷心悸，无头晕头痛，睡眠欠佳，胃纳差，无尿频尿急尿痛，二便调。",
                    "prvMedHis": "既往有'先天性心脏病'病史，长期服用阿司匹林，地高辛；否认高血压、糖尿病等内科病史；否认肝炎、结核等传染病病史；否认重大外伤史。",
                    "disease": "肺癌",
                    "diseaseProb": "65"
                },
                {
                    "key": "3",
                    "id": 532,
                    "name": "匿名",
                    "createAt": "2020-02-15",
                    "chfCmp": "寒闭肺气咳嗽肋痛",
                    "hisPreIll": "2年前来所求诊，以手按右肋部，疼痛难忍，呻吟不已。发热、咳嗽、气粗，夜不安寐，面目黧黑。脉弦紧，舌苔白腻。脉症合参，此系风寒外束，痰饮内伏，郁久酿热所致。",
                    "prvMedHis": "暂无",
                    "disease": "肺癌",
                    "diseaseProb": "82"
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
              data: ['1','2','3']
          },
          yAxis: {
              type: 'value' //数值轴，适用于连续数据
          },
          series : [
              {
                  name:'健康得分', //坐标点名称
                  type:'line', //线类型
                  data:[55, 65, 82] //坐标点数据
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
                <strong>健康得分：</strong><div ><ReactEcharts option={this.getOption()} theme="ThemeStyle" /></div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />;
              </Modal>
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
                        <strong>性别:</strong><span style={{ marginLeft: 50 }}>男</span>
                      </Col>
                      <Col span={12}>
                        <strong>生日:</strong><span style={{ marginLeft: 72 }}>1969-03-22</span>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <strong>身高(cm):</strong><span style={{ marginLeft: 20 }}>172 </span>
                      </Col>
                      <Col span={12}>
                        <strong>体重(kg)：</strong><span style={{ marginLeft: 37 }}>67 </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>主诉：</strong><div className='setformat'>初起头痛、恶寒身热、咽痒、咳嗽、有痰咯出不爽。在某区医院诊断为上呼吸道感染，用解热药后症情稍有好转。但因饮食不节，旋又热起，咳逆气促，又去医院，拟用青霉素，但对该药过敏，故来我院求诊。诊查见面部发红，体温40℃，自觉潮热、口渴，咳逆气喘，痰涎壅盛，胸闷腹胀，大便二日未行，舌红苔黄而燥，脉右寸实大。查血象：白细胞13600/mm中性粒细胞86%.</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>现病史：</strong><div className='setformat'>手太阴肺与手阳明大肠同病，即肺热肠结之证。痰热阻肺，肺失宣肃则痰壅喘促；腹胀，大便不畅，为肠腑热结气阻之象。肺气不降，则腑气难行；肠腑不通，则肺气不能下降，邪热无外泄之机。</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>既往史：</strong><div className='setformat'>暂无</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>辅助检查：</strong><div className='setformat'>CT：双肺未见明显异常，肝右叶小占位</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>初步诊断：</strong><div className='setformat'>发热原因待查：大叶性肺炎</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>诊断依据</strong><div className='setformat'>以发热为主要就诊原因，伴轻咳少痰；本院门诊查胸部正位片示左肺占位，考虑是炎性改变；查体咽红，双侧扁桃体二度肿大，双肺呼吸音粗，未闻及明显啰音</div>
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

export default Form.create()(TextRecord);