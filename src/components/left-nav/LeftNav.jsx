import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.jpg'
import './left-nav.less'

const SubMenu = Menu.SubMenu

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  /**
   * 根据menu的数组生成对应的数组标签
   * 使用 map() + 递归
   */
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        )
      }
    })
  }

  /*
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
   */
  componentWillMount() {
    this.menuNodes = this.getMenuNodes_map(menuList)
  }

  render() {
    return (
      <div className="left-nav">
        <Link to='/' className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>管理系统</h1>
        </Link>

        <Menu
          mode='inline'
          theme='dark'
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}
export default LeftNav; 