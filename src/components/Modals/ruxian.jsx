/**
 * 量表查看弹窗
 */

import React, { Component } from "react";
import { Card,Form, Input, Button, Modal, Row,Typography, Menu, Select,Descriptions,Table,Collapse} from "antd";
import ReactEcharts from 'echarts-for-react';
import imgURL from '../../assets/images/ruxian1.png';
import imgURL2 from '../../assets/images/ruxian4.png';
import imgURL3 from '../../assets/images/ruxian3.png';
import imgURL4 from '../../assets/images/ruxian2.png';

const { Option } = Select;
const { Title } = Typography;
const { Panel } = Collapse;
class RuxianForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jingzhuiInfo: {
        count: undefined, //次数
        week: undefined, //周数
        scaleTime: undefined, //评估时间
        sleepQuality: undefined, //睡眠质量
        sleepTime: undefined,  //入睡时间
        sleepingTime: undefined, //睡眠时间
        sleepEfficiency: undefined, //睡眠效率
        sleepDisorder: undefined, // 睡眠障碍
        sleepMedicine: undefined, // 催眠药物
        daytimeDysfunction: undefined, //日间功能障碍
        PSQI: undefined,
        GAD7: undefined,
        PHQ9: undefined,
        PHQ15: undefined,
        ESS: undefined,
        isSnoring: false, //是否打鼾
        isPain: false, //是否抽动酸痛
        isItch: false, //是否虫爬感，刺痛感
        isMoveLegs: false, //是否有移动双腿的冲动
        isFirst: false, //是都首次失眠
        isNowMedicine: false, //现在是否服用药物
        isPastMedicine: false, //过往是否服用药物
        isGenetic: false, //父母兄弟是否失眠
        lastingTime: "", //失眠持续时间
      }
    };
  }
  componentDidMount() {
    // todo
  }

  // 提交处理
  handleClinicalSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(err) return;
      if(!err){
        // todo
        // 哪个接口？？？
      }
      this.props.handleModalVisible(false, "jingzhuiInfo");
    });
  }



  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { jingzhuiInfo } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    
    const option =  {
        title:{
            text:'量表指标变化柱状图',
        },
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: ['week', 'PSQI', 'GAD7', 'PHQ9','PHQ15','ESS'],
            source: [
                {week: '2019.11.01', 'PSQI': 19, 'GAD7': 16, 'PHQ9': 22,'PHQ15':8,'ESS':1},
                {week: '2019.11.09', 'PSQI': 13, 'GAD7': 12, 'PHQ9': 15,'PHQ15':4,'ESS':2},
                {week: '2019.11.15', 'PSQI': 14, 'GAD7': 8, 'PHQ9': 10,'PHQ15': 6,'ESS':1},
                {week: '2019.11.21', 'PSQI': 12, 'GAD7': 5, 'PHQ9': 3,'PHQ15':2,'ESS':1}
            ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
        ]
    };

    const columns = [
        {
          title: '测试时间',
          dataIndex: 'week',
          key: 'week',
        },
        {
          title: '睡眠质量评分',
          dataIndex: 'sleepQuality',
          key: 'sleepQuality',
        },
        {
          title: '入睡时间',
          dataIndex: 'sleepTime',
          key: 'sleepTime',
        },
        {
          title: '睡眠时间',
          key: 'sleepingTime',
          dataIndex: 'sleepingTime',
        },
        {
          title: '睡眠效率',
          key: 'sleepEfficiency',
          dataIndex: 'sleepEfficiency',
        },
        {
            title: '睡眠障碍',
            key: 'sleepDisorder',
            dataIndex: 'sleepDisorder',
          },
          {
            title: '催眠药物',
            key: 'sleepMedicine',
            dataIndex: 'sleepMedicine',
          },
          {
            title: '日间功能障碍',
            key: 'daytimeDysfunction',
            dataIndex: 'daytimeDysfunction',
          },
        
      ];

      const columns2 = [
        {
          title: '测试时间',
          dataIndex: 'week',
          key: 'week',
        },
        {
          title: '采用药物',
          dataIndex: 'medicine',
          key: 'medicine',
        },
        {
          title: '药物剂量',
          dataIndex: 'medicine_dose',
          key: 'medicine_dose',
        },
        {
          title: '非药物干预',
          key: 'non_medicine',
          dataIndex: 'non_medicine',
        },
      ];

      const columns3= [
        {title: '2019.11.01',
        dataIndex: 'img1',
        key: 'img1',
        render: () => 
        <div align="center">
          <img src={imgURL} width="200px" height="200px"/>
          <br/>
          <br/>
          <Button type='primary'>查看详细报告</Button>
          </div>,
          
      },
        {title: '2019.11.15',
        dataIndex: 'img2',
        key: 'img2',
        render: () =>
        <div align="center">
          <img src={imgURL2} width="200px" height="200px"/>
          <br/>
          <br/>
          <Button type='primary'>查看详细报告</Button>
          </div>,
      
      },
        {title: '2019.12.01',
        dataIndex: 'img3',
        key: 'img3',
        render: () => 
        <div align="center">
          <img src={imgURL3} width="200px" height="200px"/>
          <br/>
          <br/>
          <Button type='primary'>查看详细报告</Button>
          </div>,
       },
        {title: '2019.12.21',
        dataIndex: 'img4',
        key: 'img4',
        render:() => 
        <div align="center">
          <img src={imgURL4} width="200px" height="200px"/>
          <br/>
          <br/>
          <Button type='primary'>查看详细报告</Button>
          </div>,
       },
      ];

      const columns4 = [
        {
          title: '测试时间',
          dataIndex: 'week',
          key: 'week',
        },
        {
          title: '查看详细报告',
          dataIndex: 'records',
          key: 'records',
          render:() => 
          <Button type='primary'>查看详细报告</Button>
       },
        {
          title: '总应答数',
          dataIndex: 'ta',
          key: 'ta',
        },
        {
          title: '正确应答数',
          dataIndex: 'cr',
          key: 'cr',
        },
        {
          title: '正确应答百分比',
          dataIndex: 'pcr',
          key: 'pcr',
        },
        {
          title: '错误应答数',
          dataIndex: 'te',
          key: 'te',
        },
        {
          title: '错误应答数百分比',
          dataIndex: 'pe',
          key: 'pe',
        },
        {
          title: '持续性应答数',
          dataIndex: 'pr',
          key: 'pr',
        },
        {
          title: '持续性应答数百分比',
          dataIndex: 'ppr',
          key: 'ppr',
        },
        {
          title: '持续性错误数',
          dataIndex: 'pse',
          key: 'pse',
        },
        {
          title: '持续性错误数百分比',
          dataIndex: 'ppe',
          key: 'ppe',
        },
        {
          title: '非持续性错误',
          dataIndex: 'npe',
          key: 'npe',
        },
    ];

      
      const data4 = [
        {
          key: '1',
          week: '2019.11.01',
          ta: 25,
          cr: 15,
          pcr: 0.6,
          te: 10,
          pe: 0.4,
          pr: 4,
          ppr: 0.12,
          pse: 5,
          ppe: 0.34,
          npe: 3
        },
        {
          key: '2',
          week: '2019.11.09',
          ta: 26,
          cr: 14,
          pcr: 0.54,
          te: 12,
          pe: 0.46,
          pr: 7,
          ppr: 0.23,
          pse: 4,
          ppe: 0.38,
          npe: 2
        },
        {
          key: '3',
          week: '2019.11.15',
          ta: 31,
          cr: 18,
          pcr: 0.58,
          te: 13,
          pe: 0.42,
          pr: 7,
          ppr: 0.33,
          pse: 2,
          ppe: 0.36,
          npe: 5
        },
        {
          key: '3',
          week: '2019.11.21',
          ta: 32,
          cr: 24,
          pcr: 0.75,
          te: 8,
          pe: 0.25,
          pr: 8,
          ppr: 0.42,
          pse: 3,
          ppe: 0.29,
          npe: 6
        },
      ]

      const data3 = [
        {
          render:() => <img src={imgURL} />, 
          
        },
      ]
      
      
      const data = [
        {
          key: '1',
          week: '2019.11.01',
          sleepQuality: '2' ,
          sleepTime: '2',
          sleepingTime: '2',
          sleepEfficiency: '2',
          sleepDisorder: '1',
          sleepMedicine: '2',
          daytimeDysfunction: '3'
        },
        {
            key: '3',
            week: '2019.11.15',
            sleepQuality: '3' ,
            sleepTime: '3',
            sleepingTime: '3',
            sleepEfficiency: '3',
            sleepDisorder: '1',
            sleepMedicine: '3',
            daytimeDysfunction: '3'
          },
          {
            key: '3',
            week: '2019.12.01',
            sleepQuality: '3' ,
            sleepTime: '1.5',
            sleepingTime: '3',
            sleepEfficiency: '3',
            sleepDisorder: '1',
            sleepMedicine: '2',
            daytimeDysfunction: '3'
          },

          {
            key: '4',
            week: '2019.12.21',
            sleepQuality: '2' ,
            sleepTime: '1',
            sleepingTime: '3',
            sleepEfficiency: '2',
            sleepDisorder: '1',
            sleepMedicine: '4',
            daytimeDysfunction: '3'
          },
      ];
      
      const data2 = [
        { 
          key: '1',
          week: '2019.11.01',
          medicine: '他莫昔芬，来曲唑',
          medicine_dose: '早中晚各一次，每次他莫昔芬两片，来曲唑三片',
          non_medicine: '无'
        },
        { 
          key: '2',
          week: '2019.11.15',
          medicine: '他莫昔芬，来曲唑',
          medicine_dose: '早中晚各一次，每次他莫昔芬两片，来曲唑三片',
          non_medicine: '无'
        },
        { 
          key: '3',
          week: '2019.12.01',
          medicine: '他莫昔芬，来曲唑',
          medicine_dose: '早中晚各一次，每次他莫昔芬两片，来曲唑三片',
          non_medicine: '靶向治疗'
        },
        { 
          key: '4',
          week: '2019.12.21',
          medicine: '他莫昔芬，来曲唑',
          medicine_dose: '早中晚各一次，每次他莫昔芬两片，来曲唑三片',
          non_medicine: '靶向治疗'
        },
    ]

    return (
        <div>
          <Collapse defaultActiveKey={['1']} >
         <Panel header="患者治疗状况表" key="1">
        <Card className="table"> 
        

        <Descriptions title="患者治疗状况表"></Descriptions>
       <Table columns={columns2} dataSource={data2} />
       </Card>
       </Panel>
       <Panel header="患者红外热像图变化" key="2">
       <Card className="table"> 
        <Descriptions title="患者红外热像图变化"></Descriptions>
       <Table columns={columns3} dataSource={data3}/>
       <Descriptions title="结论：右侧乳腺见片状条索状低热区，代谢增强"></Descriptions>
       </Card>
       </Panel>
       <Panel header="填写康复评估意见" key="3" >
       <Card>
           <Descriptions title="综合各方历史信息，请医生填写康复评估意见"></Descriptions>
          <Input placeholder="综合各方历史信息，请医生填写康复评估意见" />
        </Card>
        </Panel>
        </Collapse>
        </div>
    );
  };
  render() {
    console.log(this.props)
    const title = `康复评估——${this.props.currentRecord.medId}_${this.props.currentRecord.name}`;
    return (
      <Modal
        visible={this.props.modalVisible}
        title={title}
        width= "1200px"
        onCancel={() => this.props.handleModalVisible(false, "ruxianInfo")}
        onOk={this.handleClinicalSubmit}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

export default Form.create()(RuxianForm);
