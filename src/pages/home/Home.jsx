import React, { Component } from "react";
import { Layout, Card, Col, Row, Divider } from "antd";
import { Link } from "react-router-dom";
import "./home.less";

const { Header, Content } = Layout;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <div style={{ display: "flex" }}>
            <h1>脊椎康复辅助系统</h1>
            <img
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                right: 100,
              }}
              src=""
              // alt="头像"
            />
            <p
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                right: 40,
                color: "#ffffff",
              }}
            >
              骨科
            </p>
          </div>
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: "20px 50px",
            height: "100vh",
            marginTop: 64,
            background: "rgb(236,236,236)",
          }}
        >
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
