import React, { Component, Fragment } from 'react';
import './record-query.less';
import { Input, Icon, Button, Select, Table, Form, Row, Divider, Tooltip, Page, DatePicker, Message, Drawer, Col, Modal } from "antd";
import API from "../../api/api";
import { Link } from 'react-router-dom';
class RecordQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientInfo: {},
      drawerSwitch: false,
      modalSwitch: false,
      tableSwitch: false,
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
      scaleColumns: [
        {
          title: '时间',
          width: 110,
          dataIndex: 'testTime'
        },
        {
          title: '入睡得分',
          dataIndex: 'sleepScore'
        },
        {
          title: '入睡时长',
          dataIndex: 'fallSleepTime'
        },
        {
          title: '睡眠时长',
          dataIndex: 'sleepTime'
        },
        {
          title: '睡眠效率',
          dataIndex: 'sleepEffiency'
        },
        {
          title: '睡眠障碍',
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
          title: '用户名',
          dataIndex: 'name',
          width: 50
        },
        {
          title: '性别',
          dataIndex: 'gender',
          width: 50,
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
          width: 50,
          render: birthday => {
            return this.calculateAge(birthday)
          }
        },
        {
          title: '就诊时间',
          dataIndex: 'createAt',
          width: 80,
          // render: (h, params) => {
          //     return h('div', this.formatDate(params.row.createAt));
          // }
        },
        {
          title: '病人主诉',
          dataIndex: 'chfCmp',
          ellipsis: true,
          width: 70,
          tooltip: true,
        },
        {
          title: '诊断结果',
          dataIndex: 'disease',
          width: 70,
          render: disease => {
            // let disease = params.row.disease;
            return this.getDisease(disease)
          }
        },
        {
          title: '操作',
          width: 230,
          key: 'action',
          align: 'center',
          render: (text, record, index) => {
            return (
              <div>
                <Button type="primary" size="small" style={{ marginRight: '5px' }}
                  onClick={() => this.show(record)
                  }>查看详情
                    </Button>
                <Button type="primary" size="small" style={{ marginRight: '5px', backgroundColor: 'green' }}
                  onClick={() => this.detectionData(record.patientId)
                  }>检测数据
                    </Button>
                <Link to={`/admin/textAnalysis/${record.id}`}>
                  <Button type="primary" size="small" style={{ marginRight: '5px', backgroundColor: '#EAC100' }}
                  >文本分析
                </Button></Link>
                <Button type="primary" size="small" style={{ marginRight: '5px', backgroundColor: 'red' }}
                  onClick={() => this.remove(index)
                  }>删除
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
        word: null
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

  // 查看详情按钮实现
  show(record) {
    let newPatientInfo = {};
    console.log(record)
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

  // 获取病历列表
  fetchData = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let param = {
          recordId: values.recordId,
          startDate: values.startDate,
          endDate: values.endDate,
          doctorId: null,
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
              style={{ width: 130, marginRight: 15 }}
              // prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入查询id"
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
                <strong>治疗建议：</strong><div className='setformat'>{this.state.patientInfo.treAdv} </div>
              </Col>
            </Row>
          </div>
        </Drawer>

        <Drawer
          title="测量量表数据"
          placement="right"
          width="900"
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
                <Button type="primary" onClick="registerSwitch = true">开始分析</Button>
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
      </div>
    );
  }
}

export default Form.create()(RecordQuery);