import React, { Component, Fragment } from 'react';
import {Input, Button, Table,Tabs, Form, DatePicker} from "antd";
import './text-record.less';
import ReactEcharts from "echarts-for-react";
const TabPane = Tabs.TabPane;
class TextRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:[
              "http://10.13.81.189:8001/ruxian1.png",
              "http://10.13.81.189:8001/ruxian2.png",
              "http://10.13.81.189:8001/ruxian3.png"
            ],
            url1:[
              "http://10.13.81.189:8001/tongue1.jpg",
              "http://10.13.81.189:8001/tongue4.jpg",
              "http://10.13.81.189:8001/tongue3.jpg"
            ],
            dataColumns: [
              {
                title: '就诊时间',
                dataIndex: 'time',
                key: 'time',
                width: 70,
                align:"center"
              },
              {
                title: '红外热成像图谱',
                dataIndex: 'infrared',
                key: 'infrared',
                width: 100,
                align:"center",
                render: (record,url,index) => {
                  return (
                    <div>
                      <img src={this.state.url[index]}  alt="" width="200px" height="200px"/>
                      <br/>
                      <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green'}}
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
                align:"center",
                render: (record,url1,index) => {
                  return (
                    <div>
                      <img src={this.state.url1[index]} alt="" width="200px" height="200px"/>
                      <br/>
                      <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green'}}
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
                align:"center",
                render: (record,url,index) => {
                  return (
                    <div >
                      <ReactEcharts option={this.getOption(index)} style={{height:'200px',width:"",align:'center'}}/>
                      <Button type="primary" size="small" style={{ marginTop: '5px', backgroundColor: 'green', borderColor: 'green'}}
                      onClick={() => this.show(record)
                      }>脉象报告
                      </Button>
                    </div>
                  );
                }
              },
            ],
            data: [
              {
                  "key": "1",
                  "time": "2019-08-02",
              },
              {
                  "key":"2",
                  "time":"2020-02-04"
              },
              {
                "key":"3",
                "time":"2020-02-05"
              }
            ],
        };
    }
    // 抽屉等组件关闭
    getOption = (index)=>{
      
      let option1 = {
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
      let option2 = {
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
                data:[60, 90, 75, 200, 300, 500, 700, 550, 500, 400, 152, 
                  210, 107, 160, 330, 487, 250, 140, 437, 501, 420, 130, 
                  165, 96, 240, 310, 532, 768, 940,  450, 505, 389, 150] //坐标点数据
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
              data:[70, 90, 120, 260, 430, 800, 600, 650, 550, 850, 520, 310, 165, 150, 340, 285, 850, 900, 740, 501, 430, 100, 75, 125, 170, 310, 500, 900, 909,  840, 540, 390, 250] //坐标点数据
          }
      ]
  }
      return index==0?option1:(index==1?option2:option3);
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
                  scroll={{y:true, y: 450}}
                  columns={this.state.dataColumns}
                  dataSource={this.state.data}>
                </Table>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="红外热成像图变化" key="1">
                        scasfa
                    </TabPane>
                    <TabPane tab="舌象图谱变化" key="2">
                        fsafsaf
                    </TabPane>
                    <TabPane tab="脉象数据变化" key="3">
                        afsafaf
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Form.create()(TextRecord);