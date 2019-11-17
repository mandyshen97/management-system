import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Message } from "antd";
import "../login/login.less";
import logo from "../../assets/images/logo.jpg";
import API from "../../api/api";

class Register extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let param = {
          username: values.username,
          password: values.password
        };
        API.doctorRegister(param)
          .then(res => {
            if (res.code !== '200') {
              Message.error("注册失败！");
            } else {
              Message.success("注册成功！");
              this.props.history.push("/login");
            }
          })
          .catch(err => {
            Message.warning("注册失败！");
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login-wrapper">
          <div className="login-left">
            <div className="login-left-container">
              <img src={logo} alt="logo" />
              <h1>失眠症辅助诊断平台</h1>
            </div>
          </div>
          <div className="login-right">
            <h2>用户注册</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请输入用户名!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="用户名"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  className="login-form-button"
                >
                  注册
                </Button>
                <span style={{ color: "white", marginRight: "5px" }}>
                  或已存在账号
                </span>
                <Link to="/login">现在登录!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="footer">——————— 失眠症辅助诊断平台 —————————</div>
      </div>
    );
  }
}
export default Form.create()(Register);
