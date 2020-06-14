import React, { Component, Fragment } from 'react';
import { Input, Icon, Button, Table, Form, Row, img, Divider, Page, DatePicker, Message, Col, Modal, Popconfirm } from "antd";
import './tongue.less';
import ReactEcharts from "echarts-for-react";
class Tongue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            totalNum: 4,
            dataSource : [
              {
                key: '1',
                count: '1',
                healthScore: 50,
                medicine: '甘草，芦根，麸炒枳壳，姜半夏，当归，太子参，桑寄生，青皮，陈皮，苦杏仁，金荞麦，山药',
              },
              {
                key: '2',
                count: '2',
                healthScore: 53,
                medicine: '青黛，蛤蚧，白芥子，苏子，莱菔子，麻黄，杏仁，僵蚕，陈皮，半夏，茯苓，甘草',
              },
              {
                key: '3',
                count: '3',
                healthScore: 61,
                medicine: '金银花，连翘，芦根，桔梗，荆芥，紫菀，百部，白术，甘草，陈皮',
              },
              {
                key: '3',
                count: '3',
                healthScore: 77,
                medicine: '附片，枣仁，生石膏，麻黄，法夏，牡蛎，薤白，全瓜萎，郁金，白芥子，石菖蒲',
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
                  "id": 92,
                  "name": "匿名",
                  "createAt": "2017-3-14",
                  "imagePath": "http://10.13.81.189:8001/tongue2.jpg",
                  "complain": "因“腰痛3个月，面色苍白1个月，发热2周”入院。",
                  "HPI": "患者3个月来长久站立后觉腰痛，休息后缓解，无关节红肿及发热等不适。1个月来腰痛加重，伴左腹股沟部位疼痛及左下肢隐痛不适，脸色渐苍白，无自觉头晕、心慌及气短等不适，未经特殊处理。半个月来无诱因午后发热，体温可达38．0℃以上，不伴寒战，夜间出汗较多，晨起可自行退热，时感心慌，无咳嗽、咳痰，无腹痛、腹泻，无便血、黑便，无尿急、尿痛、尿频、血尿及酱油色尿。因腰痛日渐加重，发热不退，需卧床休息，偶服布洛芬止痛。在当地医院发现重度贫血，怀疑“骨髓瘤”转入我院。发病以来无消瘦，大便0～2次／d，黄色成形便，小便正常。",
                  "PH": "既往体健，无烟酒嗜好。父母体健，家族史无特殊。",
                  "disease": "胃癌",
                  "diseaseProb": "50"
                },
                {
                    "key": "2",
                    "id": 74,
                    "name": "匿名",
                    "createAt": "2017-10-10",
                    "imagePath": "http://10.13.81.189:8001/tongue1.jpg",
                    "complain": "间断上腹痛3年，再发加重1周。",
                    "HPI": "患者3年前无明显诱因出现上腹部疼痛，部位固定，空腹及夜间疼痛明显，每次发作半小时左右，就诊于外院，行胃镜示：十二指肠球部溃疡，门诊予抑酸治疗（具体药物不详），服药后症状得到控制。此后3年间患者自诉上腹痛反复发作，伴反酸、烧心、恶心、腹胀，每次均自行口服奥美拉唑肠溶胶囊后症状稍有缓解。1周钱患者因上述症状再发加重且口服奥美拉唑肠溶胶囊未见明显缓解，再次就诊于外院，胃镜示：慢性胃炎，Barrett食管，十二指肠球部溃疡。现为求中西医结合治疗，于我院就诊。",
                    "PH": "否认冠心病、高血压、糖尿病病史。否认脑血管病病史，否认肺结核、肝炎病史，否认输血、外伤史、手术史。",
                    "disease": "胃癌",
                    "diseaseProb": "53"
                },
                {
                    "key": "3",
                    "id": 158,
                    "name": "匿名",
                    "createAt": "2018-07-15",
                    "imagePath": "http://10.13.81.189:8001/tongue3.jpg",
                    "complain": "胃术后24天，上腹部饱胀不适20天。",
                    "HPI": "患者24天前在外院行“胃癌根治术”，术后3天开始少量饮水，饮水后出现上腹部饱胀感，偶有恶心，未呕吐，行上消化道造影检查提示：“胃潴留”，诊断：“手术后胃排空障碍”，给予禁饮食、胃肠减压、静脉营养支持治疗。患者术后15天出院回家，继续胃肠减压、肠内营养及输液治疗。目前患者仍有上腹部饱胀不适，胃管每日引出黄绿色液体约500ml，每日进肠内营养粉约200-400ml。昨日患者出现恶性呕吐2次，为淡黄色液体，略有反酸烧心，无畏寒发热，无胸闷憋气及呼吸困难，今来我院就诊，门诊医师以“手术后胃排空障碍”收住院。患者近日精神差，睡眠差，肛门排气正常，口服乳酸果糖后每日排除少量黄色稀便，小便正常。近日体重下降8千克",
                    "PH": "24天前在外院行“胃癌根治术”。患有“痛风”病史8年，常服用“尼美舒利”。否认高血压、心脏病、糖尿病等慢性病病史。无肝炎、结核等传染病及其密切接触史。否认输血史。有“头孢咪唑”过敏史。预防接种随当地。",
                    "disease": "胃癌",
                    "diseaseProb": "61"
                },
                {
                    "key": "4",
                    "id": 279,
                    "name": "匿名",
                    "createAt": "2019-05-20",
                    "imagePath": "http://10.13.81.189:8001/tongue4.jpg",
                    "complain": "胃癌化疗后进展化疗后1月",
                    "HPI": "患者因“上腹部隐痛不适1年余”于2018-08-23查胃镜提示贲门、胃体至胃窦见广泛溃烂及肉芽坏死，质硬，触之易出血，皱襞僵硬，活动度差。病理（本院，2018-08-23）：（胃角）低分化恶性肿瘤，倾向低分化腺癌。2018-08-25增强CT提示贲门及胃体部胃壁广泛增厚、腹腔淋巴结肿大、腹腔局部网膜增厚，造影提示考虑为皮革胃可能性大。考虑患者全胃增厚，皮革胃表现，胃周淋巴结多发肿大，考虑转移可能大，故手术可能不能根治性切除，并且长期疗效差，建议行辅助化疗后复查决定何时手术治疗。2018-08-27始反复出现呕血，予输血、止血、生长抑素等治疗，2018-08-31行“经股动脉介入下胃血管栓塞术”，后未再出血，于2018-09-08、2018-10-04行“奥沙利铂0.25D1+卡培他滨2.0bidD1-14”方案化疗2次。2018-10查彩超：甲状腺双侧叶结节,TI-RADS3类,甲状腺右侧叶小囊肿,TI-RADS2类,左侧锁骨上淋巴结稍大。增强CT：1、胃癌化疗后；2、腹腔淋巴结肿大、腹腔局部网膜增厚；3、腹盆腔积液；4、右肾代谢异常；右侧输尿管扩张、下段增厚并异常强化，考虑转移；5、双肾囊肿；肝血管瘤；6、肝脏乏血供病变--转移不除外，建议随访；7、两肺微结节；迷走右锁骨下动脉；8、甲状腺结节。10-30在B超引导下穿刺抽出250ml洗肉水样液体，腹水常规：单个核细胞比例0.27，多核细胞比例0.73，细胞计数4.100(*10^9/L)，李凡它试验阳性+。腹水生化检查:乳酸脱氢酶269(U/L)↑，腺苷酸脱氨酶13(U/L)，氯103.2(mmol/L)。腹水癌胚抗原159.8(ng/ml)↑。2018-11MRU：1、腹腔积液2、双肾囊肿可能；3、右侧输尿管下段病变伴梗阻。结合患者腹水明显增加，腹水CEA明显高于正常，CT提示右侧输尿管下段新发病灶，提示肿瘤进展，行基因检测示HER-2阴性，不推荐赫赛汀靶向治疗，于2018-11-10予二线方案化疗，具体为：替吉奥60mgbidd1-14+紫杉醇90mg静滴、30mg腹腔灌注d1、d8，化疗1周期,腹水消失，分别于2018-12-01、12-22、2019-01-12始予替吉奥60mgbidd1-14+紫杉醇120mgd1、d8静滴化疗，化疗过程顺利，化疗2周期后于2018-12-20复查胸腹部CT：1、胃癌化疗后；2、腹腔淋巴结肿大、腹腔局部网膜增厚；3、腹盆腔积液；4、右侧输尿管稍扩张、下段管壁稍厚；5、双肾囊肿；肝血管瘤；6、肝脏乏血供病变--转移不除外，建议随访；7、两肺微结节；迷走右锁骨下动脉；8、甲状腺结节。较前明显好转。今患者来院继续化疗。目前患者无畏寒发热，无恶心呕吐，无腹痛腹泻，无咳嗽咳痰，无咯血，精神、食纳、睡眠可，大小便如常。",
                    "PH": "平素健康状况一般，否认肝炎、结核等传染病史，否认高血压、糖尿病、癫痫等慢性病史，否认手术、外伤史，有输血史，否认食物、药物过敏史，预防接种史随社会。",
                    "disease": "胃癌",
                    "diseaseProb": "77"
                },
            ]
        };
    }

    show(record) {
        
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
    showModal= () => {
      this.setState({
        visible: true,
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
              data: ['1','2','3','4']
          },
          yAxis: {
              type: 'value' //数值轴，适用于连续数据
          },
          series : [
              {
                  name:'健康得分', //坐标点名称
                  type:'line', //线类型
                  data:[50, 53, 61, 77] //坐标点数据
              }
          ]
      }
      return option;
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
                    <Form.Item>
                    <Button type="primary" onClick={this.showModal}>
                        康复趋势图
                    </Button>
                    </Form.Item>
                </Form>
                <Modal title="康复趋势图" visible={this.state.visible}
                onOk={this.handleOk} onCancel={this.handleCancel} width="600px">
                <strong>健康得分：</strong><div><ReactEcharts option={this.getOption()} theme="ThemeStyle" /></div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />;
              </Modal>
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