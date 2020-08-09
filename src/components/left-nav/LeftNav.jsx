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
      // } else {
      //   return (
      //     <SubMenu
      //       key={item.path}
      //       onClick={() => this.handleChangeColor(item.path)}
      //       title={
      //         <span>
      //           <Icon type={item.icon} />
      //           <span>{item.title}</span>
      //         </span>
      //       }
      //     >
      //       <Menu.Item key="infradAna"
      //       onClick={() => this.handleChangeColor("/infradAna")}
      //       className={
      //         this.state.currentPath === '/infradAna' ? "blueColor" : null
      //       }>红外热像辅助诊断
      //       <Link to="/infradAna">
      //         <span>失眠症辅助诊断</span>
      //       </Link>
      //       </Menu.Item>
      //       <Menu.Item key="nirsAna"
      //        onClick={() => this.handleChangeColor("/nirsAna")}
      //        className={
      //         this.state.currentPath === '/nirsAna'? "blueColor" : null
      //       }>
      //         <Link to="/nirsAna">
      //         <span>颈椎病辅助诊断</span>
      //       </Link>
      //       </Menu.Item>
            
      //       {/* {this.getMenuNodes_map(item.children)}  */}
      //     </SubMenu>
      //   );
      }
    });
  };

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
          <h1>失眠症智能辅助诊疗系统</h1>
        </Link>
        <Menu mode="inline" theme="dark" selectable={false}>
          {this.getMenuNodes_map(menuList)}
          <SubMenu
            key={"/assist1"}
            onClick={() => this.handleChangeColor("/assist1")}
            title={
              <span>
                <Icon type="bulb" />
                <span>红外热像智能分析</span>
              </span>
            }
          >
            <Menu.Item key="/infradAna"
            onClick={() => this.handleChangeColor("/infradAna")}
            className={
              this.state.currentPath === '/infradAna' ? "blueColor" : null
            }>
            <Link to="/infradAna">
              <span>失眠症辅助诊断</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="/infradAna2"
             onClick={() => this.handleChangeColor("/infradAna2")}
             className={
              this.state.currentPath === '/infradAna2'? "blueColor" : null
            }>
              <Link to="/infradAna2">
              <span>颈椎病辅助诊断</span>
            </Link>
            </Menu.Item>
            
            {/* {this.getMenuNodes_map(item.children)}  */}
          </SubMenu>
          <SubMenu
            key={"/assist2"}
            onClick={() => this.handleChangeColor("/assist2")}
            title={
              <span>
                <Icon type="bulb" />
                <span>近红外光谱智能分析</span>
              </span>
            }
          >
            <Menu.Item key="/nirsAna"
            onClick={() => this.handleChangeColor("/nirsAna")}
            className={
              this.state.currentPath === '/nirsAna' ? "blueColor" : null
            }>
            <Link to="/nirsAna">
              <span>失眠症辅助诊断</span>
            </Link>
            </Menu.Item>
            {/* {this.getMenuNodes_map(item.children)}  */}
          </SubMenu>
          <Menu.Item
            key={"/kangfu"}
            onClick={() => this.handleChangeColor("/kangfu")}
            className={
              this.state.currentPath === "/kangfu" ? "blueColor" : null
            }
          >
            <Link to="/kangfu">
              <Icon type="user" />
              <span>康复评估</span>
            </Link>
          </Menu.Item>
          <Menu.Item
            key={"/kangfu"}
            onClick={() => this.handleChangeColor("/kangfu")}
            className={
              this.state.currentPath === "/kangfu" ? "blueColor" : null
            }
          >
            <Link to="/kangfu">
              <Icon type="user" />
              <span>用户权限管理</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export default LeftNav;
