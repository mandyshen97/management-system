import React, { Component } from "react";
import { Layout, Card, Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import "./home.less";

const { Header, Content } = Layout;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    this.props.history.replace("/login");
  };

  render() {
    return (
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            background: "rgb(57,141,238)",
          }}
        >
          <div style={{ display: "flex" }}>
            <h1 style={{ color: "#ffffff" }}>脊椎康复辅助系统</h1>
            <div
              style={{
                width: 300,
                height: 40,
                position: "absolute",
                right: 40,
                color: "#ffffff",
              }}
            >
              <UserOutlined
                style={{ color: "blue", fontSize: "30px", marginRight: "10px" }}
              />
              <span>科室：骨科 </span>
              <span style={{ marginLeft: 10 }}> 医生id: 002342</span>
              <span
                style={{ marginLeft: 10 }}
                className="logout"
                onClick={this.logout}
              >
                退出
              </span>
            </div>
          </div>
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: "20px 50px",
            height: "89vh",
            marginTop: 64,
            marginBottom: 0,
            background: "rgb(236,236,236)",
          }}
        >
          <a
            href="/operationGuide/operation-guide.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginBottom: "20px",
              display: "block",
              fontWeight: "bold",
            }}
          >
            点击查看操作指南
          </a>
          <Row gutter={16}>
            <Col span={8}>
              <Link to="/admin/newPatient">
                <Card
                  title="新建患者个人信息"
                  bordered={true}
                  className="cardSelect"
                >
                  点击添加新患者信息
                </Card>
              </Link>
            </Col>
            <Col span={8}>
              <Link to="/admin/patientQuery">
                <Card
                  title="患者信息查询管理"
                  bordered={true}
                  className="cardSelect"
                >
                  患者信息查询管理
                </Card>
              </Link>
            </Col>
            <Col span={8}>
              <Link to="/admin/addRecord">
                <Card
                  title="新增治疗（病历）记录"
                  bordered={false}
                  className="cardSelect"
                >
                  新增诊疗流程，包括治疗前后的记录对比
                </Card>
              </Link>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 30 }}>
            <Col span={8}>
              <Link to="/admin/recordQuery">
                <Card title="病历查询" bordered={true} className="cardSelect">
                  病历信息查询管理
                </Card>
              </Link>
            </Col>
            <Col span={8}>
              <Link to="/admin/AIAnalysis">
                <Card title="智能分析" bordered={true} className="cardSelect">
                  人工智能分析治疗结果
                </Card>
              </Link>
            </Col>
            <Col span={8}>
              <Link to="/admin/newTreatMethod">
                <Card
                  title="新增治疗方案"
                  bordered={false}
                  className="cardSelect"
                >
                  新增治疗方案
                </Card>
              </Link>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default Home;
