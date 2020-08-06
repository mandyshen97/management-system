import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Card, Col, Row } from "antd";
import { Switch, Redirect, Route } from "react-router-dom";

import "./home.less";

const { Header, Content, Footer } = Layout;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

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
          <h1>脊椎康复辅助系统</h1>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "20px 50px",height:'100vh', marginTop: 64, background:'rgb(236,236,236)' }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Card title="新建患者信息" bordered={false}>
                患者个人基本信息
              </Card>
            </Col>
            <Col span={8}>
              <Card title="患者信息查询管理" bordered={false}>
              患者信息查询管理
              </Card>
            </Col>
            <Col span={8}>
              <Card title="新增治疗记录" bordered={false}>
                新增诊疗流程，包括治疗前后的记录对比
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default Home;
