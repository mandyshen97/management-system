import React, { Component, Fragment } from 'react';
import { Input, Button, Table, Form, DatePicker, List, Card } from "antd";
import { Tabs } from "antd"
import './text-record.less';
import ReactEcharts from "echarts-for-react";

const TabPane = Tabs.TabPane;
class TextRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: [
        "http://10.13.81.189:8001/ruxian1.png",
        "http://10.13.81.189:8001/ruxian2.png",
        "http://10.13.81.189:8001/ruxian3.png"
      ],
      url1: [
        "http://10.13.81.189:8001/tongue1.jpg",
        "http://10.13.81.189:8001/tongue4.jpg",
        "http://10.13.81.189:8001/tongue3.jpg"
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
                <img src={this.state.url[index]} alt="" width="200px" height="200px" />
              </div>
            );
          }
        },
        {
          title: '状态描述',
          dataIndex: 'description',
          key: 'time',
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
                <img src={this.state.url1[index]} alt="" width="200px" height="200px" />
              </div>
            );
          }
        },
        {
          title: '状态描述',
          dataIndex: 'description',
          key: 'time',
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
          key: 'time',
          width: 70,
          align: "center"
        },
      ],
      dataColumns: [
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
          key: 'tongue',
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
          key: 'pulse',
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
        { "key": '1', "time": "2019-08-02", "description": "舌苔薄,唾液粘稠，偏黄，湿气重" },
        { "key": '2', "time": "2019-08-02", "description": "舌苔干薄，颜色偏黄，与肺病相关" },
        { "key": '3', "time": "2019-08-02", "description": "暂无描述" }
      ],
      pulseData: [
        { "key": '1', "time": "2019-08-02", "description": "浮脉行于皮肤表，似同枯木水上漂，沉脉浮于筋骨间，推筋至骨用力寻" },
        { "key": '2', "time": "2019-08-02", "description": "迟脉一息唯三至，分钟少于六十行，数脉一息五六至，九十以上为数频" },
        { "key": '3', "time": "2019-08-02", "description": "滑脉滑利如走珠，虚如葱管弱如棉，实脉举按力均强，如按竹棍好思量" }
      ],
      infraredData: [
        { "key": '1', "time": "2019-08-02", "description": "胸廓对称，无畸形，双肺呼吸音清，未闻及干湿啰音,双侧胸腔少量积液,符合左肺下叶周围型肺Ca并左肺门淋巴结、肝多发转移表现" },
        { "key": '2', "time": "2019-08-02", "description": "腹水、盆腔积液,考虑左肺上叶周围型肺癌并右肺转移，建议进一步检查" },
        { "key": '3', "time": "2019-08-02", "description": "左肺上叶病灶，结合临床考虑肿瘤性病变及治疗后改变（病灶较前2017-05-29显示减小）；右肺中叶少许感染性病变；右肺中叶点状钙化灶；左侧包裹型胸腔积液，伴左下肺肺不张；左侧部分肋骨内侧缘骨皮质密度显示增高。头颅MRI示:颅内转移性病灶," }
      ],
      data: [
        {
          "key": "1",
          "time": "2019-08-02",
        },
        {
          "key": "2",
          "time": "2020-02-04"
        },
        {
          "key": "3",
          "time": "2020-02-05"
        }
      ],
    };
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
          data: [100, 90, 150, 300, 500, 1000, 900, 450, 500, 400, 152, 110, 87, 150, 310, 487, 1020, 910, 437, 501, 430, 150, 105, 80, 157, 310, 506, 989, 906, 460, 505, 389, 150] //坐标点数据
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
            210, 107, 160, 330, 487, 250, 140, 437, 501, 420, 130,
            165, 96, 240, 310, 532, 768, 940, 450, 505, 389, 150] //坐标点数据
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
          data: [70, 90, 120, 260, 430, 800, 600, 650, 550, 850, 520, 310, 165, 150, 340, 285, 850, 900, 740, 501, 430, 100, 75, 125, 170, 310, 500, 900, 909, 840, 540, 390, 250] //坐标点数据
        }
      ]
    }
    return index == 0 ? option1 : (index == 1 ? option2 : option3);
  }
  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
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
          scroll={{ y: true, y: 450 }}
          columns={this.state.dataColumns}
          dataSource={this.state.data}>
        </Table>
        <Tabs defaultActiveKey="1">
          <TabPane tab="红外热成像图变化" key="1">
            <Table
              bordered
              pagination={false}
              scroll={{ y: true, y: 450 }}
              columns={this.state.infraredColumns}
              dataSource={this.state.infraredData}>
            </Table>
          </TabPane>
          <TabPane tab="舌象图谱变化" key="2">
            <Table
              bordered
              pagination={false}
              scroll={{ y: true, y: 450 }}
              columns={this.state.tongueColumns}
              dataSource={this.state.tongueData}>
            </Table>
          </TabPane>
          <TabPane tab="脉象数据变化" key="3">
            <Table
              bordered
              pagination={false}
              scroll={{ y: true, y: 450 }}
              columns={this.state.pulseColumns}
              dataSource={this.state.pulseData}>
            </Table>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Form.create()(TextRecord);