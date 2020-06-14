import React, { Component, Fragment } from 'react';
import './text-record.less';
import { Input, Icon, Button, Select, Table, Form, Row, Divider, Tooltip, Page, DatePicker, Message, Drawer, Col, Modal, Popconfirm } from "antd";
import API from "../../api/api";
import ReactEcharts from "echarts-for-react";
import { Link } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

class TextRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientInfo: {},
      drawerSwitch: false,
      modalSwitch: false,
      helpSwitch: false,
      tableSwitch: false,
      updateSwitch: false,
      chosenIndex: 0,
      dataSource : [
        {
          key: '1',
          count: '1',
          healthScore: 40,
          medicine: '甘草，芦根，麸炒枳壳，姜半夏，当归，太子参，桑寄生，青皮，陈皮，苦杏仁，金荞麦，山药',
        },
        {
          key: '2',
          count: '2',
          healthScore: 50,
          medicine: '甘草，芦根，麸炒枳壳，姜半夏，当归，太子参，桑寄生，青皮，陈皮，苦杏仁，金荞麦，山药',
        },
        {
          key: '3',
          count: '3',
          healthScore: 60,
          medicine: '甘草，芦根，麸炒枳壳，姜半夏，当归，太子参，桑寄生，青皮，陈皮，苦杏仁，金荞麦，山药',
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
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      listData: [],
      totalNum: 0,
      pageNum: 1,
      pageSize: 10,
      diseaseList: [],
      scaleColumns: [
        {
          title: '时间',
          width: 120,
          dataIndex: 'testTime'
        },
        {
          title: '入睡得分',
          width: 110,
          dataIndex: 'sleepScore'
        },
        {
          title: '入睡时长',
          width: 110,
          dataIndex: 'fallSleepTime'
        },
        {
          title: '睡眠时长',
          width: 110,
          dataIndex: 'sleepTime'
        },
        {
          title: '睡眠效率',
          width: 110,
          dataIndex: 'sleepEffiency'
        },
        {
          title: '睡眠障碍',
          width: 110,
          dataIndex: 'sleepDisorder'
        },
        {
          title: 'PSQI',
          width: 80,
          dataIndex: 'PSQI'
        },
        {
          title: 'GAD7',
          width: 80,
          dataIndex: 'GAD7'
        },
        {
          title: 'PHQ9',
          width: 80,
          dataIndex: 'PHQ9'
        },
        {
          title: 'PHQ15',
          width: 85,
          dataIndex: 'PHQ15'
        },
        {
          title: 'ESS',
          width: 70,
          dataIndex: 'ESS'
        },

      ],
      scaleList: [
        {
          "testTime": "2019-09-18",
          "sleepScore": 2,
          "fallSleepTime": 1,
          "sleepTime": 2,
          "sleepEffiency": 2,
          "sleepDisorder": 1,
          "PSQI": 13,
          "GAD7": 3,
          "PHQ9": 3,
          "PHQ15": 5,
          "ESS": 2,
        },
        {
          "testTime": "2019-05-13",
          "sleepScore": 3,
          "fallSleepTime": 3,
          "sleepTime": 3,
          "sleepEffiency": 3,
          "sleepDisorder": 1,
          "PSQI": 19,
          "GAD7": 16,
          "PHQ9": 22,
          "PHQ15": 7,
          "ESS": 1,
        }
      ],
      tableColumns: [
        {
          title: '病历id',
          dataIndex: 'id',
          width: 50
        },
        {
          title: '姓名',
          dataIndex: 'name',
          width: 50
        },
        {
          title: '就诊时间',
          dataIndex: 'createAt',
          width: 50,
          // render: (h, params) => {
          //     return h('div', this.formatDate(params.row.createAt));
          // }
        },
        {
          title: '病人主诉',
          dataIndex: 'chfCmp',
          ellipsis: true,
          width: 150,
          tooltip: true,
        },
        {
            title: '现病史',
            dataIndex: 'hisPreIll',
            ellipsis: true,
            width: 150,
            tooltip: true,
        },
        {
            title: '既往史',
            dataIndex: 'prvMedHis',
            ellipsis: true,
            width: 150,
            tooltip: true,
        },
        {
          title: '诊断结果',
          dataIndex: 'disease',
          width: 50,
          render: disease => {
            // let disease = params.row.disease;
            return this.getDisease(disease)
            }
        },
        {
            title: '健康得分',
            dataIndex: 'healthScore',
            ellipsis: true,
            width: 150,
            tooltip: true,
        },
        {
          title: '操作',
          width: 150,
          key: 'action',
          align: 'center',
          render: (text, record, index) => {
            return (
              <div>
                <Button type="primary" size="small" style={{ marginRight: '5px' }}q
                  onClick={() => this.show(record)
                  }>查看详情
                    </Button>
                <Button type="primary" size="small" style={{ marginRight: '5px', backgroundColor: 'green', borderColor: 'green' }}
                  onClick={() => this.show(record)
                  }>智能分析
                    </Button>
              </div>
            );
          }
        }
      ],
      formData: {
        recordId: null,
        startDate: null,
        endDate: null,
        doctorId: null,
        word: null,
        diseaseId: null
      },
      doctorList: []
    };
  }

  // 抽屉等组件关闭
  onClose = () => {
    this.setState({
      drawerSwitch: false,
      tableSwitch: false
    })
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
            data: ['1','2','3','4','5','6','7', '8', '9', '10', '11','12','13']
        },
        yAxis: {
            type: 'value' //数值轴，适用于连续数据
        },
        series : [
            {
                name:'健康得分', //坐标点名称
                type:'line', //线类型
                data:[35, 40, 50, 53, 58, 65, 75, 80, 82, 85, 90, 96, 100] //坐标点数据
            }
        ]
    }
    return option;
}
  // textAnalysis(id) {
  //   console.log(id)
  //   this.props.history.push('/admin/textAnanlysis');
  // }

  // 删除按钮实现
  remove(id) {
    this.setState({
      chosenIndex: id,
      modalSwitch: true
    })
  }

  showHelp() {
    this.setState({
      helpSwitch: true
    })
  }

  showUpdate() {
      this.setState({
        updateSwitch: true
      })
  }

  // 查看详情按钮实现
  show(record) {
    let newPatientInfo = {};
    // console.log(record)
    Object.keys(record).map(item => {
      newPatientInfo[item] = record[item] === null ? '暂无' : record[item];
    })
    this.setState({
      drawerSwitch: true,
      patientInfo: newPatientInfo
    })
  }

  //  检测数据按钮实现
  detectionData(id) {
    // this.$router.push('/detectionData');
    this.setState({
      tableSwitch: true
    })

  }

  helpConfirm = () => {
    this.setState({
      helpSwitch: false
    })
  }

  updateConfirm = () => {
    this.setState({
      updateSwitch: false
    })
  }
  updateCancel = () => {
    this.setState({
      updateSwitch: false
    })
  }

  // 删除确认
  confirm = () => {
    let param = {
      id: this.state.listData[this.state.chosenIndex].id
    }
    API.removeRecord(param).then((response) => {
      let _data = response.data;
      let _code = response.code;
      let _msg = response.msg;
      if (_code === "200" && _data === 1) {
        Message.info('该病历已删除！');
        this.state.listData.splice(this.state.chosenIndex, 1);
        this.setState({
          modalSwitch: false
        })
      } else {
        Message.info('病历删除失败，请稍后重试！');
        this.setState({
          modalSwitch: false
        })
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  // 删除取消
  cancel = () => {
    Message.info('删除操作已取消');
    this.setState({
      modalSwitch: false
    })
  }

  // 计算年龄
  calculateAge(time) {
    let date = new Date(time);
    let today = new Date().getTime();
    return Math.ceil((today - date) / 31536000000);
  }

  // 获取病种id对应的病种
  getDisease(diseaseId) {
    let disease = "未诊断";
    this.state.diseaseList.forEach(element => {
      if (element.id == diseaseId) {
        disease = element.disease;
      }
    });
    return disease;
  }

  // 获取病种列表
  fetchDisease() {
    API.getDisease()
      .then((response) => {
        let _data = response.data,
          _code = response.code,
          _msg = response.msg;
        if (_code === "200") {
          this.setState({
            diseaseList: _data
          })

        } else {
          this.setState({
            diseaseList: null
          })
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  scaleAnalyse = () => {

  }

  // 获取病历列表
  fetchData = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let param = {
          recordId: values.recordId,
          startDate: values.startDate,
          endDate: values.endDate,
          // doctorId: null,
          diseaseId:values.diseaseId,
          word: values.word,
          pageNo: this.state.pageNum,
          pageSize: this.state.pageSize,
        };
        API.getRecordList(param).then(res => {
          let _data = res.data;
          let _code = res.code;
          let _msg = res.msg;
          if (_code === "200") {
            let newListData = [];
            _data.data.map((item, index) => {
              let newListDataItem = {};
              newListDataItem.key = index;
              newListDataItem.id = item.id;
              Object.assign(item, newListDataItem);
              item.key = index;
              newListData.push(item);
            });
            this.setState({
              listData: newListData,
              totalNum: _data.totalNum
            })
            // console.log(this.state.listData)
            // this.setState({
            //   listData: _data.data,
            //   totalNum: _data.totalNum
            // }) 
          } else if (_code === "302") {
            Message.error(_msg);
            setTimeout(() => {
              this.props.history.replace("/login");
            }, 1000);
          } else {
            Message.error(_msg);
          }
        });
      }
    });

  }

  // 分页页数改变触发函数
  pageChange = (page) => {
    this.setState({
      pageNum: page
    })
    this.fetchData()
  }

  // 页面渲染前执行函数
  componentDidMount() {
    this.fetchData();
    this.fetchDisease();
  }
  // 查询表单
  renderSearch = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
      <Form layout="inline" >
        <Form.Item>
          <span className="input-text">病历id</span>
          {getFieldDecorator("recordId", {})(
            <Input
              style={{ width: 100, marginRight: 15 }}
              // prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="病历id"
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
      onOk={this.handleOk} onCancel={this.handleCancel}>
      <strong>健康得分：</strong><div className='setformat'><ReactEcharts option={this.getOption()} theme="ThemeStyle" /></div>
      <Table dataSource={this.state.dataSource} columns={this.state.columns} />;
    </Modal></div>
    )
  }

  // 渲染的页面
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="main-content">
        {this.renderSearch()}
        <Table
          bordered
          pagination={{
            simple: true,
            current: this.state.pageNum,
            total: this.state.totalNum,
            onChange: this.pageChange,
          }}
          columns={this.state.tableColumns}
          dataSource={this.state.listData}
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
                <strong>患者姓名:</strong><span style={{ marginLeft: 20 }}>{this.state.patientInfo.name}</span>
              </Col>
              <Col span={12}>
                <strong>主治医生:</strong><span style={{ marginLeft: 45 }}>{this.state.patientInfo.doctorName}</span>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <strong>性别:</strong><span style={{ marginLeft: 50 }}>{this.state.patientInfo.gender == 1 ? "男" : "女"}</span>
              </Col>
              <Col span={12}>
                <strong>生日:</strong><span style={{ marginLeft: 72 }}>{this.state.patientInfo.birthday}</span>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <strong>身高(cm):</strong><span style={{ marginLeft: 20 }}>{this.state.patientInfo.height} </span>
              </Col>
              <Col span={12}>
                <strong>体重(kg)：</strong><span style={{ marginLeft: 37 }}>{this.state.patientInfo.weight} </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>主诉：</strong><div className='setformat'>{this.state.patientInfo.chfCmp}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>现病史：</strong><div className='setformat'>{this.state.patientInfo.hisPreIll} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>治疗史：</strong><div className='setformat'>{this.state.patientInfo.hisTre} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>既往史：</strong><div className='setformat'>{this.state.patientInfo.prvMedHis} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>个人史：</strong><div className='setformat'>{this.state.patientInfo.perHis} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>家族史：</strong><div className='setformat'>{this.state.patientInfo.famHis} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>中医证型：</strong><div className='setformat'>{this.state.patientInfo.tcmType} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>病人体征：</strong><div className='setformat'>{this.state.patientInfo.patientSigns} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>病种：</strong><div className='setformat'>{this.getDisease(this.state.patientInfo.disease)} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>处方：</strong><div className='setformat'>{this.state.patientInfo.prescription}</div>
              </Col>
            </Row>
          </div>
        </Drawer>

        <Drawer
          title="测量量表数据"
          placement="right"
          width="1000"
          closable={false}
          onClose={this.onClose}
          visible={this.state.tableSwitch}>
          <div className="demo-drawer-profile">
            <Row>
              <Col span={6}>
                <strong>患者姓名:</strong><span style={{ marginLeft: 20 }}>匿名</span>
              </Col>
              <Col span={6}>
                <strong>学历:</strong><span style={{ marginLeft: 45 }}>高中</span>
              </Col>
              <Col span={6}>
                <strong>性别:</strong><span style={{ marginLeft: 50 }}>男</span>
              </Col>
              <Col span={6}>
                <strong>年龄:</strong><span style={{ marginLeft: 72 }}>47</span>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <strong>身高(cm):</strong><span style={{ marginLeft: 20 }}>170 </span>
              </Col>
              <Col span={6}>
                <strong>体重(kg)：</strong><span style={{ marginLeft: 37 }}>80 </span>
              </Col>
              <Col span={6}>
                <strong>病种：</strong><span style={{ marginLeft: 37 }}>伴焦虑</span>
              </Col>
              <Col span={6}>
                <Button type="primary" onClick={() => this.scaleAnalyse()}>开始分析</Button>
              </Col>
            </Row>
            <Table
              columns={this.state.scaleColumns}
              dataSource={this.state.scaleList} stripe></Table>
          </div>
        </Drawer>

        <Modal
          visible={this.state.modalSwitch}
          title="请确认操作"
          onOk={this.confirm}
          onCancel={this.cancel}>
          <p>本次删除操作不可逆 确认删除本条数据？</p>
        </Modal>
        <Modal
          visible={this.state.helpSwitch}
          title="基于专家用药模型的用药帮助"
          onOk={this.helpConfirm}
          onCancel={this.helpConfirm}>
          <p>是否加入与甘草关联的<span style={{color: 'red'}}>太子参(0.84)</span>?
            <br/>
          是否加入与白术关联的<span style={{color: 'red'}}>麦冬(0.72)</span>?
          </p>
        </Modal>
        <Modal
          visible={this.state.updateSwitch}
          width={550}
          title="更新电子病历"
          onOk={this.updateConfirm}
          onCancel={this.updateCancel}>
            <Form layout="inline">
          <Form.Item label="姓名" style={{ marginLeft: 27 }}>
              <p style={{ width: 50 }}>{this.state.patientInfo.name}</p>
          </Form.Item>
    
          <Form.Item label="主治医生">
          <p style={{ width: 50 }}>{this.state.patientInfo.doctorName}</p>
          </Form.Item>
          <Form.Item label="年龄">
          <p style={{ width: 50 }}> {this.calculateAge(this.state.patientInfo.birthday)}</p>
          </Form.Item>
          <Form.Item label="性别">
          <p style={{ width: 50 }}>{this.state.patientInfo.gender == 1 ? "男" : "女"}</p>
          </Form.Item>
          <Form.Item label="主诉" style={{ marginLeft: 27 }}>
            {getFieldDecorator("chfCmp", {
              initialValue: this.state.patientInfo.chfCmp
            })(
              <TextArea style={{ width: 400 }} autoSize={{ minRows: 2, maxRows: 3 }}/>
            )}
          </Form.Item>
          <Form.Item label="现病史" style={{ marginLeft: 13 }}>
            {getFieldDecorator("hisPreIll", {
              initialValue: this.state.patientInfo.hisPreIll
            })(
              <TextArea style={{ width: 400 }} autoSize={{ minRows: 2, maxRows: 3 }}/>
            )}
          </Form.Item>
          <Form.Item label="病人体征" style={{ marginLeft: 0 }}>
            {getFieldDecorator("patientSigns", {
              initialValue: this.state.patientInfo.patientSigns
            })(
              <TextArea style={{ width: 400 }} autoSize={{ minRows: 1, maxRows: 3 }}/>
            )}
          </Form.Item>
          <Form.Item label="中医证型" style={{ marginLeft: 0 }}>
            {getFieldDecorator("tcmType", {
              initialValue: this.state.patientInfo.tcmType
            })(
              <TextArea style={{ width: 400 }} autoSize={{ minRows: 1, maxRows: 3 }}/>
            )}
          </Form.Item>
          <Form.Item label="诊断" style={{ marginLeft: 27 }}>
            {getFieldDecorator("prvMedHis", {
              initialValue : this.getDisease(this.state.patientInfo.disease),
            })(
              <TextArea style={{ width: 400 }} autoSize={{ minRows: 1, maxRows: 3 }} />
            )}
          </Form.Item>
          {/* <Form.Item label="治法" style={{ marginLeft: 27 }}>
            {getFieldDecorator("perHis", {
              initialValue: "暂无"
            })(
              <TextArea style={{ width: 400 }} autoSize={{ minRows: 1, maxRows: 10 }}/>
            )}
          </Form.Item> */}
          <Form.Item label="上次处方">
            <p style={{width: 400, margin: '0px 0px 0px'}}>
                <span style={{color:'red', margin: '0px 2px'}}>柴胡(1.00)</span>
                <span style={{color:'red', margin: '0px 2px'}}>当归(0.90)</span>
                <span style={{color:'red', margin: '0px 2px'}}>白芍(0.85)</span>
                <span style={{color:'red', margin: '0px 2px'}}>太子参(0.84)</span>
                <span style={{color:'red', margin: '0px 2px'}}>白术(0.74)</span>
                <span style={{color:'red', margin: '0px 2px'}}>麦冬(0.72)</span>
                <span style={{color:'red', margin: '0px 2px'}}>茯苓(0.70)</span>
                <span style={{color:'red', margin: '0px 2px'}}>郁金(0.65)</span>
                <br/>
                <span style={{margin: '0px 2px 2px 2px'}}>香附(0.55)</span>
                <span style={{margin: '0px 2px'}}>八月札(0.40)</span>
            </p>
          </Form.Item>
          <Form.Item label="推荐处方">
            <p style={{width: 400, margin: '0px 0px 0px'}}>
                <span style={{color:'red', margin: '0px 2px'}}>柴胡(1.00)</span>
                <span style={{color:'red', margin: '0px 2px'}}>当归(0.90)</span>
                <span style={{color:'red', margin: '0px 2px'}}>白芍(0.85)</span>
                <span style={{color:'red', margin: '0px 2px'}}>太子参(0.84)</span>
                <span style={{color:'red', margin: '0px 2px'}}>白术(0.74)</span>
                <span style={{color:'red', margin: '0px 2px'}}>麦冬(0.72)</span>
                <span style={{color:'red', margin: '0px 2px'}}>茯苓(0.70)</span>
                <span style={{color:'red', margin: '0px 2px'}}>郁金(0.65)</span>
                <br/>
                <span style={{margin: '0px 2px 2px 2px'}}>香附(0.55)</span>
                <span style={{margin: '0px 2px'}}>八月札(0.40)</span>
            </p>
          </Form.Item>
          <Form.Item label="处方" style={{ marginLeft: 27}}>
            {getFieldDecorator("prescription", {
              initialValue: this.state.patientInfo.prescription
            })(
              <TextArea style={{ width: 400 }} autoSize={{ minRows: 2, maxRows: 10 }}/>
            )}
          </Form.Item>          
        </Form>
          
        </Modal>
      </div>
    );
  }
}

export default Form.create()(TextRecord);