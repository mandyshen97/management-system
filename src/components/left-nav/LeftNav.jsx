import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import menuList from "../../config/menuConfig";
import logo from "../../assets/images/logo.jpg";
import "./left-nav.less";

const SubMenu = Menu.SubMenu;

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: undefined
    };
  }

  handleChangeColor = path => {
    this.setState({
      currentPath: path
    });
  };

  /**
   * 根据menu的数组生成对应的数组标签
   * 使用 map() + 递归
   */
  getMenuNodes_map = menuList => {
    console.log(this.state.currentPath)
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item
            key={item.path}
            onClick={() => this.handleChangeColor(item.path)}
            className={
              this.state.currentPath === item.path ? "blueColor" : null
            }
          >
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.path}
            onClick={() => this.handleChangeColor(item.path)}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        );
      }
    });
  };
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   if (this.props.path !== nextProps)
  //     this.setState({
  //       currentPath: nextProps
  //     });
  // }

  // UNSAFE_componentWillMount() {
  //   this.setState({
  //     currentPath: this.props.path
  //   });
  // }

  /*
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
   */
  componentDidMount() {
    this.setState({
      currentPath: this.props.path
    });
  }

  render() {
    return (
      <div className="left-nav">
        <Link
          to="/home"
          className="left-nav-header"
          onClick={() => this.handleChangeColor("/home")}
        >
          <img src={logo} alt="logo" />
          <h1>失眠辅助</h1>
        </Link>
        <Menu mode="inline" theme="dark" selectable={false}>
          {this.getMenuNodes_map(menuList)}
        </Menu>
      </div>
    );
  }
}
export default LeftNav;
