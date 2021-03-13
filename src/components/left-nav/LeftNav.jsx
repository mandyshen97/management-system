import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import {
  UserAddOutlined,
  SolutionOutlined,
  FileAddOutlined,
  MonitorOutlined,
  AlertOutlined,
  SettingOutlined,
  LineChartOutlined
} from "@ant-design/icons";
// import logo from "../../assets/images/logo.jpg";
import kangfu from "../../assets/images/kangfu.jpg";
import "./left-nav.less";

const SubMenu = Menu.SubMenu;

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: "/admin/home",
      menuList: [
        {
          title: "整体数据统计",
          path: "/admin/statistics",
          icon: <MonitorOutlined />,
        },
        {
          title: "患者信息管理",
          // path: "/admin/patientQuery",
          icon: <SolutionOutlined />,
          children: [
            {
              title: "新建患者个人信息",
              path: "/admin/newPatient",
              // icon: <UserAddOutlined />,
            },
            {
              title: "患者信息查询",
              path: "/admin/patientQuery",
              // icon: <SolutionOutlined />,
            },
          ],
        },
        {
          title: "病历管理",
          // path: "/admin/addRecord",
          icon: <FileAddOutlined />,
          children: [
            {
              title: "新增治疗记录",
              path: "/admin/addRecord",
              // icon: <FileAddOutlined />,
            },
            {
              title: "病历查询",
              path: "/admin/recordQuery",
              // icon: <MonitorOutlined />,
            },
          ],
        },

        {
          title: "智能分析",
          path: "/admin/AIAnalysis",
          icon: <AlertOutlined />,
        },
        {
          title: "康复评估",
          path: "/admin/rehabAss",
          icon: <LineChartOutlined />,
        },
        {
          title: "权限控制",
          path: "/admin/accessControl",
          icon: <SettingOutlined />,
        },
      ],
    };
  }

  handleChangeColor = (path) => {
    this.setState({
      currentPath: path,
    });
  };

  /**
   * 根据menu的数组生成对应的数组标签
   * 使用 map() + 递归
   */
  getMenuNodes_map = (menuList) => {
    return menuList.map((item) => {
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
              {item.icon}
              <span style={{ fontSize: "18px" }}>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.path}
            className={
              this.state.currentPath === item.path ? "blueColor" : null
            }
            title={
              <span>
                {/* <Icon type={item.icon} /> */}
                {item.icon}
                <span style={{ fontSize: "18px" }}>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        );
      }
    });
  };
  componentDidMount() {
    this.setState({
      currentPath: this.props.path,
    });
  }

  render() {
    const { menuList } = this.state;
    return (
      <div className="left-nav">
        <Link
          to="/home"
          className="left-nav-header"
          onClick={() => this.handleChangeColor("/admin/home")}
        >
          <img src={kangfu} alt="logo" />
          <h2>脊椎康复辅助诊疗</h2>
        </Link>
        <Menu mode="inline" theme="dark" selectable={false}>
          {this.getMenuNodes_map(menuList)}
        </Menu>
      </div>
    );
  }
}
export default LeftNav;
