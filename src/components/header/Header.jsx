import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './header.less'
import { formatDateToSecond } from '../../utils/dateUtils'
import { Icon, Modal, Button, Table } from 'antd'

import menuList from './../../config/menuConfig';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: formatDateToSecond(Date.now()), // 当前时间字符串
      dayPictureUrl: '', // 天气图片url
      weather: '', // 天气的文本
      ModalVisiable: false,
    }
  }

  getTime = () => {
    // 每隔1s获取当前时间, 并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formatDateToSecond(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }

  getWeather = async () => {
    // todo
    // 调用接口请求异步获取数据
    fetch('https://www.tianqiapi.com/api/?version=v6&cityid=101210101&appid=[81135576]&appsecret=[17HDf3Q1]').then(res=>{
      console.log(res)
    })
    // const {dayPictureUrl, weather} = await reqWeather('北京')
    // // 更新状态
    // this.setState({dayPictureUrl, weather})
  }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      // 如果当前item对象的key与path一样,item的title就是需要显示的title
      if (item.path === path) {
        title = item.title
      } else if (item.children) {
        // 如果当前item有子项，在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.path) === 0)
        if (cItem) {
          // 如果存在说明匹配成功
          title = cItem.title
        }
      }
    })
    return title
  }

  /**
   * 退出登录
   */
  logout = () => {
    this.props.history.replace('/login')
  }
  
  componentDidMount() {
    this.getTime()
    this.getWeather()
  }

  /*
  当前组件卸载之前调用
   */
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  handleCancel = () => {
    this.setState({
      ModalVisiable: false
    })
  }

  showDialog = () => {
    this.setState({
      ModalVisiable: true
    })
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const title = this.getTitle()
    const columns = [
      {
        title: '系统名称',
        dataIndex: 'name',
      },
      {
        title: '版本号',
        dataIndex: 'version',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
      }

    ]
    const data = [
      {
        key: '1',
        name: '失眠症辅助诊疗平台',
        version: '1.1.0',
        updateTime: '2019-11-15',
      }
    ]
    return (
      <div className="header">
        <span className='page-title'>{title}</span>
        <div className="header-right">
          <span className='currentTime'>{currentTime}</span>
          <span style={{marginRight:'10px'}}>
            <img src={require('./banana/lei.png')} alt="天气"/>
          </span>
          <Icon type="global" />
          <Icon type="question-circle" onClick={this.showDialog} />
          <span className="logout" onClick={this.logout}>退出</span>
        </div>
        <Modal
          title="关于"
          visible={this.state.ModalVisiable}
          onCancel={this.handleCancel}
          footer={[
            <Button onClick={this.handleCancel}>关闭</Button>
          ]}
        >
          <div className="about-content">
            <h3 className='table-title'>失眠症辅助诊疗平台</h3>
            <Table columns={columns} dataSource={data} bordered pagination={false} />
          </div>
        </Modal>

      </div>
    );
  }
}

export default withRouter(Header);  