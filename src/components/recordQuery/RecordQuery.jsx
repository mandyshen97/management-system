import React, { Component, Fragment } from 'react';
import './record-query.less';
import { Input, Icon, Button, Select, Table, Form, Row, Divider, Tooltip, Page, DatePicker, Message, Drawer, Col, Modal, Popconfirm } from "antd";
import API from "../../api/api";
import { Link } from 'react-router-dom';
import ReactEcharts from "echarts-for-react";
const { Option } = Select;
const { TextArea } = Input;

class RecordQuery extends Component {
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
      tableColumns: [
        {
          title: '病历id',
          dataIndex: 'id',
          width: 50
        },
        {
          title: '患者姓名',
          dataIndex: 'name',
          width: 50
        },
        {
          title: '性别',
          dataIndex: 'gender',
          width: 30,
          render: gender => {
            return gender === 1 ? '男' : '女'
            // return h(
            //     'div',
            //     params.row.gender === 1 ? '男' : '女'
            // )
          }
        },
        {
          title: '年龄',
          dataIndex: 'birthday',
          width: 40,
          render: birthday => {
            return this.calculateAge(birthday)
          }
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
          title: '诊断结果',
          dataIndex: 'disease',
          width: 50,
          render: disease => {
            // let disease = params.row.disease;
            return this.getDisease(disease)
          }
        },
        {
          title: '操作',
          width: 150,
          key: 'action',
          align: 'center',
          render: (text, record, index) => {
            return (
              <div>
                <Button type="primary" size="small" style={{ marginRight: '5px' }}
                  onClick={() => this.show(record)
                  }>病历详情
                    </Button>
                <Button type="primary" size="small" style={{ marginRight: '5px', backgroundColor: 'green', borderColor: 'green' }}
                  onClick={() => this.detectionData(record.patientId)
                  }>检测数据
                    </Button>
                <Link to={`/admin/textAnalysis/${record.id}`}>
                  <Button type="primary" size="small" style={{ marginRight: '5px', backgroundColor: '#EAC100', borderColor: '#EAC100'  }}
                  >文本分析
                </Button></Link>
                <Button type="primary" size="small" style={{ marginRight: '5px', backgroundColor: 'red', borderColor: 'red' }}
                  onClick={() => this.remove(index)
                  }>删除
                    </Button>
              </div>
            );
          }
        }
      ],
      doctorList: [],
      selectAuxliMedicine: [
        <Option key={"柴胡"}>{"柴胡"}</Option>,
        <Option key={"当归"}>{"当归"}</Option>,
        <Option key={"白芍"}>{"白芍"}</Option>,
        <Option key={"白术"}>{"白术"}</Option>,
        <Option key={"茯苓"}>{"茯苓"}</Option>,
        <Option key={"郁金"}>{"郁金"}</Option>,
        <Option key={"香附"}>{"香附"}</Option>,
        <Option key={"八月札"}>{"八月札"}</Option>,
        <Option key={"桂枝"}>{"桂枝"}</Option>,
        <Option key={"炙甘草"}>{"炙甘草"}</Option>,
        <Option key={"乌药"}>{"乌药"}</Option>,
        <Option key={"生姜"}>{"生姜"}</Option>,
        <Option key={"大枣"}>{"大枣"}</Option>,
        <Option key={"沉香"}>{"沉香"}</Option>,
    ],
    selectMainMedicine: [
        <Option key={"环磷酰胺"}>{"环磷酰胺"}</Option>,
        <Option key={"阿霉素"}>{"阿霉素"}</Option>,
        <Option key={"依托泊甙"}>{"依托泊甙"}</Option>,
    ]
    };
  }

  // 抽屉等组件关闭
  onClose = () => {
    this.setState({
      drawerSwitch: false,
      tableSwitch: false
    })
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

  getOption = () => {
    let option = {
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
    return option;
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
          <span className="input-text">病种</span>
          {getFieldDecorator("diseaseId", {})(
            <Select
            allowClear={true}
            showSearch
            style={{ width: 120 }}
            placeholder="请选择病种"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.diseaseList.map((item, index) => (
              <Option value={item.id} key={index}>
                {item.disease}
              </Option>
            ))}
          </Select>
          )}
        </Form.Item>
        <Form.Item>
          <span className="input-text">检索字段</span>
          {getFieldDecorator("word", {})(
            <Input
              style={{ width: 130, marginRight: 5 }}
              placeholder="请输入关键词"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.fetchData}>
            查询
          </Button>
        </Form.Item>
      </Form>
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
                <strong>既往史：</strong><div className='setformat'>{this.state.patientInfo.prvMedHis} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>现病史：</strong><div className='setformat'>{this.state.patientInfo.hisPreIll} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>中医证型：</strong><div className='setformat'>{this.state.patientInfo.tcmType} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>症状：</strong><div className='setformat'>{this.state.patientInfo.patientSigns} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>病种：</strong><div className='setformat'>{this.getDisease(this.state.patientInfo.disease)} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>主药：</strong><div className='setformat'>阿霉素，长春新碱</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>辅药：</strong><div className='setformat'>{this.state.patientInfo.prescription}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="primary" onClick={() => this.showHelp()}>
                  用药帮助
                </Button>
                <Button type="primary" style={{ margin: '0 8px', backgroundColor: 'green', borderColor: 'green' }} onClick={() => this.showUpdate()}>
                  更新病历
                </Button>
              </Col>
            </Row>
          </div>
        </Drawer>

        <Drawer
          title="实验检查数据"
          placement="right"
          width="750"
          closable={false}
          onClose={this.onClose}
          visible={this.state.tableSwitch}>
            <Row>
              <Col span={8}>
                <strong>患者姓名:</strong><span style={{ marginLeft: 20 }}>匿名</span>
              </Col>
              <Col span={8}>
                <strong>性别:</strong><span style={{ marginLeft: 50 }}>男</span>
              </Col>
              <Col span={8}>
                <strong>年龄:</strong><span style={{ marginLeft: 50 }}>47</span>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <strong>身高(cm):</strong><span style={{ marginLeft: 20 }}>170 </span>
              </Col>
              <Col span={8}>
                <strong>体重(kg)：</strong><span style={{ marginLeft: 10 }}>80 </span>
              </Col>
              <Col span={8}>
                <strong>病种：</strong><span style={{ marginLeft: 37 }}>肺癌</span>
              </Col>
            </Row>
            <Row>
              <Col span={12}><strong>血液检测</strong></Col>
              <Col span={12}><strong style={{ marginLeft: 37 }}>检测异常</strong></Col>
            </Row>
            <Row>
              <Col span={12}>白细胞计数4.85*10^9/L，中性粒细胞百分比80.20%↑。电解质：钾3.44mmol/L↓，二氧化碳27.6mmol/L，乳酸脱氢酶1141U/L↑，超敏C反应蛋白6.10mg/L。NT-ProBNP229.0pg/ml。</Col>
              <Col span={12}><p style={{ marginLeft: 37 }}>中性粒细胞百分比偏高</p></Col>
            </Row>
            <Row>
              <Col span={8}><strong>红外热成像图</strong></Col>
              <Col span={8}><strong style={{ marginLeft: 37 }}>检测描述</strong></Col>
              <Col span={8}><strong style={{ marginLeft: 37 }}>检测异常</strong></Col>
            </Row>
            <Row>
              <Col span={8}><img src="http://10.13.81.189:8001/feiai04.jpg" width="200px" alt=""/> </Col>
              <Col span={8}><p style={{ marginLeft: 37 }}>左肺上叶病灶，结合临床考虑肿瘤性病变及治疗后改变；右肺中叶少许感染性病变；右肺中叶点状钙化灶；左侧包裹型胸腔积液，伴左下肺肺不张；左侧部分肋骨内侧缘骨皮质密度显示增高。</p></Col>
              <Col span={8}><p style={{ marginLeft: 37 }}>左右肺瓣均有病变</p></Col>
            </Row>
            <Row>
              <Col span={8}><strong>舌象图谱</strong></Col>
              <Col span={8}><strong style={{ marginLeft: 37 }}>检测描述</strong></Col>
              <Col span={8}><strong style={{ marginLeft: 37 }}>检测异常</strong></Col>
            </Row>
            <Row>
              <Col span={8}><img src="http://10.13.81.189:8001/tongue2.jpg" width="200px" alt=""/></Col>
              <Col span={8}><p style={{ marginLeft: 37 }}>舌苔厚，白苔满布</p></Col>
              <Col span={8}><p style={{ marginLeft: 37 }}>有寒</p></Col>
            </Row>
            <Row>
              <Col span={8}><strong>脉象数据</strong></Col>
              <Col span={8}><strong style={{ marginLeft: 37 }}>检测描述</strong></Col>
              <Col span={8}><strong style={{ marginLeft: 37 }}>检测异常</strong></Col>
            </Row>
            <Row>
              <Col span={8}><ReactEcharts option={this.getOption()} style={{ height: '200px', width: "", align: 'center' }} /></Col>
              <Col span={8}><p style={{ marginLeft: 37 }}>端直而长，挺然指下，如按琴弦。</p></Col>
              <Col span={8}><p style={{ marginLeft: 37 }}>无异常</p></Col>
            </Row>
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
              <p style={{ width: 50, marginBottom: 0  }}>{this.state.patientInfo.name}</p>
          </Form.Item>
    
          <Form.Item label="主治医生">
          <p style={{ width: 50, marginBottom: 0  }}>{this.state.patientInfo.doctorName}</p>
          </Form.Item>
          <Form.Item label="年龄">
          <p style={{ width: 50, marginBottom: 0  }}> {this.calculateAge(this.state.patientInfo.birthday)}</p>
          </Form.Item>
          <Form.Item label="性别">
          <p style={{ width: 50, marginBottom: 0  }}>{this.state.patientInfo.gender == 1 ? "男" : "女"}</p>
          </Form.Item>
          <Form.Item label="主诉" style={{ marginLeft: 27}}>
            <p  style={{ marginBottom: 0}}> {this.state.patientInfo.chfCmp}</p>
          </Form.Item>
          {/* <Form.Item label="现病史" style={{ marginLeft: 13 }}>
            <p style={{ marginBottom: 0}}> {this.state.patientInfo.hisPreIll}</p>
          </Form.Item> */}
          <Form.Item label="病人症状" style={{ marginLeft: 0 }}>
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
              <Select
                  allowClear={true}
                  showSearch
                  style={{ width: 400 }}
                  placeholder="请选择病种"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.diseaseList.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.disease}
                    </Option>
                  ))}
                </Select>
            )}
          </Form.Item>

          <Form.Item label="上次处方" style={{ marginLeft: 0}}>
            
          <span>龙眼肉，沙参，芦根，麸炒枳壳，姜半夏，当归，白术，桑寄生，</span>
          <br/>
          <span>麦冬,茯苓,郁金</span>
          
          </Form.Item>
          <Form.Item label="矫正处方">
            <span>太子参，浙贝，金银花</span>
          </Form.Item>
          <Form.Item label="推荐处方">
            <p style={{width: 400, margin: '0px 0px 0px'}}>
                <span style={{color:'red', margin: '0px 2px'}}>柴胡</span>
                <span style={{color:'red', margin: '0px 2px'}}>当归</span>
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
          <Form.Item label="西医主药" style={{ marginLeft: 0 }}>
            {getFieldDecorator("mainMedicine", {})(
                <Select style={{ width: 400}} placeholder="请选择" mode="multiple">
                  {this.state.selectMainMedicine}
                </Select>
              )}
          </Form.Item>
          <Form.Item label="中医辅药">
            {getFieldDecorator("auxMedicine", {})(
                <Select style={{ width: 400}} placeholder="请选择" mode="multiple">
                  {this.state.selectAuxliMedicine}
                </Select>
              )}
          </Form.Item>
          {/* <Form.Item label="处方" style={{ marginLeft: 27}}>
            {getFieldDecorator("prescription", {
              initialValue: this.state.patientInfo.prescription
            })(
              <TextArea style={{ width: 400 }} autoSize={{ minRows: 2, maxRows: 10 }}/>
            )}
          </Form.Item>           */}
        </Form>
          
        </Modal>
      </div>
    );
  }
}

export default Form.create()(RecordQuery);