import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Icon, Input, Button, Message, Checkbox } from "antd";
import "./login.less";
import logo from "../../assets/images/logo.jpg";
import memoryUtils from "../../utils/memoryUtils";
import API from "../../api/api";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let param = {
          username: values.username,
          password: values.password
        };
        API.doctorLogin(param)
          .then(res => {
            console.log(res);
            if (res.code !== '200') {
              Message.error("登录失败，用户名或密码错误！");
            } else {
              Message.success("登录成功！");
              this.props.history.push("/");
            }
          })
          .catch(err => {
            Message.error("登录失败！请重试！");
          });
      }
    });
  };
  render() {
    const user = memoryUtils.user;
    if (user && user._id) {
      return <Redirect to="/" />;
    }
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
            <h2>用户登录</h2>
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
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox className="login-form-check">记住我</Checkbox>)}
                <Link className="login-form-forgot" to="/login">
                  忘记密码
                </Link>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
                <span style={{ color: "white", marginRight: "5px" }}>或</span>
                <Link to="/register">现在注册!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="footer">——————— 失眠症辅助诊断平台 —————————</div>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);
export default WrappedNormalLoginForm;
