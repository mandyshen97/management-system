/**
 * 红外热像分析结果弹框
 */
import React, { Component } from "react";
import { Form, Modal, Divider,Card,Spin, message,notification,  Input,Radio,Layout } from "antd";
import API from "../../api/algorithm"
import { throwStatement } from "@babel/types";
import ReactEcharts from 'echarts-for-react'
import img1 from "../../assets/images/chenqiang.jpg"
import img2 from "../../assets/images/jing.png"
import "./infrad.less"
const { Header, Footer, Sider, Content } = Layout;

class InfradJingAnalysisForm extends Component {
  state = {
     label: "",
     score0: undefined,
     score1: undefined,
     score2: undefined,
     bboxPic: "",
     loading: true,
     labelData: undefined,
  };

  getOption = (data) => {
    return {
      title: {
        text: '红外热像人工智能分析',
       // subtext: '纯属虚构',
        x: 'center',       
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: data,
      },
      series: [
        {
          name: '红外热像人工智能分析',
          type: 'pie',
          radius: '60%',
          center: ['50%', '60%'],
          //data: this.state.labelData,
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  // getOption = () => {
  //   return {
  //     title: {
  //       text: '红外热像人工智能分析',
  //      // subtext: '纯属虚构',
  //       x: 'center',       
  //     },
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: "{a} <br/>{b} : {c} ({d}%)"
  //     },
  //     legend: {
  //       orient: 'vertical',
  //       left: 'left',
  //       data: ['颈肌劳损','退行性变化','正常'],
  //     },
  //     series: [
  //       {
  //         name: '红外热像人工智能分析',
  //         type: 'pie',
  //         radius: '60%',
  //         center: ['50%', '60%'],
  //         data: [
  //           {value: 0.17, name: '颈肌劳损'},
  //           {value: 0.76, name: '退行性变化'},
  //           {value: 0.07, name: '正常'},
  //       ],
  //         itemStyle: {
  //           emphasis: {
  //             shadowBlur: 10,
  //             shadowOffsetX: 0,
  //             shadowColor: 'rgba(0, 0, 0, 0.5)'
  //           }
  //         }
  //       }
  //     ]
  //   }
  // }


  // getOption = () => {
  //   return {
  //     title: {
  //       text: '红外热像人工智能分析',
  //      // subtext: '纯属虚构',
  //       x: 'center',       
  //     },
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: "{a} <br/>{b} : {c} ({d}%)"
  //     },
  //     legend: {
  //       orient: 'vertical',
  //       left: 'left',
  //       data: ['乳腺增生','乳腺癌','正常'],
  //     },
  //     series: [
  //       {
  //         name: '红外热像人工智能分析',
  //         type: 'pie',
  //         radius: '60%',
  //         center: ['50%', '60%'],
  //         data: [
  //           {value: 0.82, name: '乳腺增生'},
  //           {value: 0.10, name: '正常'},
  //           {value: 0.08, name: '乳腺癌'},
  //       ],
  //         itemStyle: {
  //           emphasis: {
  //             shadowBlur: 10,
  //             shadowOffsetX: 0,
  //             shadowColor: 'rgba(0, 0, 0, 0.5)'
  //           }
  //         }
  //       }
  //     ]
  //   }
  // }

  componentDidMount() {
    this._isMounted = true
    const { filename } = this.props;
    let param = {
      filename: filename
    }
    API.preAnalysis2(param).then(res=>{
        if (res.code=="200"){
            API.infradJingAnalysis(param).then(res=>{           
                if (res.code=="200"){
                    var data =[];
                    data = [{value:res.data.score0,name:"正常"},{value:res.data.score1,name:"颈肌劳损"},{value:res.data.score2,name:"退行性变化"}]                                    
                    this.setState({
                        label: res.data.label,
                        score0: res.data.score0,
                        score1: res.data.score1,
                        score2: res.data.score2,
                        bboxPic: res.data.head_pic_url,
                        loading: false,
                        labelData: data
                    }) }             
                 if (res.code=="300"){
                     notification.open({
                         message: "人工智能分析失败",
                         description: "找不到相关图片，请重新上传",    
                         style: {
                             width: 600,
                             marginLeft: 335 - 600,
                           }
                     })
                 }
                 if (res.code=="301"){
                     notification.open({
                         message: "人工智能分析失败",
                         description: "请确定上传的是红外热像图，若不是，请重新上传",    
                         style: {
                             width: 600,
                             marginLeft: 335 - 600,
                           }
                     })
                 }
                 console.log("++++++++")
                 console.log(this.state)
                
             });
        }
    })
}

  
  render(){
    const { filename } = this.props;
    const title = "红外热像智能分析";
    const formItemLayout =

         {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          };
      
    const buttonItemLayout =
         {
            wrapperCol: { span: 14, offset: 4 },
          };
    return (
        <Modal
          visible={this.props.modalVisible}
          width="60%"
          title={title}
          onOk={() => {
            this.props.handleModalVisible(false, "jingInfradAnalysisInfo");
          }}
          onCancel={() =>
            this.props.handleModalVisible(false, "jingInfradAnalysisInfo")
          }
          destroyOnClose
        >    
             
            <div class="infrad" style={{display: 'flex' }}>
              <div class="left" >
              <Card title="上传的红外热像图">
                <div>
                {/* <img src={img1} width="200px" height="300px" /> */}
                <img src={"http://10.13.81.190:5000/static/images2/"+filename} width="200px" height="300px" /> 
                </div>
                    
                <Divider></Divider>
                <div>
                 {/* <img src={img2} width="200px" height="200px" /> */}
                 <Spin spinning={this.state.loading} delay={500}>  
                  <img src={this.state.bboxPic} width="200px" height="150px" /> 
                  </Spin> 
                 </div>
                
                
            </Card>

                 </div>
                <div class="right" style={{width: 1555}}>
               <Card title="智能分析结果">
            <Spin spinning={this.state.loading} delay={500}>               
                <div className="div-inline">
                <ReactEcharts option={this.getOption(this.state.labelData)}></ReactEcharts>
                </div>              
            </Spin>   
            <Form layout={formItemLayout}>
          <Form.Item label="医生填写诊断意见" >
          <Input placeholder="请医生填写诊断意见" />
          </Form.Item>
          <Form.Item label="人工智能分析结果是否正确" >
          <Radio.Group onChange={this.onChange} value={1}>
        <Radio value={1}>正确</Radio>
        <Radio value={2}>错误</Radio>
        
        </Radio.Group>
          </Form.Item>
          </Form>
            </Card>       
                  </div>
              </div>       
        </Modal>
    )
  }
  
}
export default InfradJingAnalysisForm;