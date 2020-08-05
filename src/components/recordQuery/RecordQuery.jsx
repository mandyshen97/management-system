import React, { Component } from "react";
import "./record-query.less";
import {
  Input,
  Button,
  Select,
  Checkbox,
  Table,
  Form,
  Row,
  DatePicker,
  Message,
  Drawer,
  Col,
  Modal,
} from "antd";
import API from "../../api/api";
import { Link } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
const { Option } = Select;
const { TextArea } = Input;

class RecordQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
    };
  }

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    
    const Demo = () => {
      const onFinish = values => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    }
    return (
      <div>
        <Button type="primary">Primary Button</Button>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default RecordQuery;
