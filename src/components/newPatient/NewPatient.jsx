import React from "react";
import { Form, Input, Select, Button, DatePicker, Modal } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import API from "../../api/api";
// require("react-dom");
// window.React2 = require("react");
// console.log(window.React1 === window.React2);
const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 10 },
  },
};

function NewPatient() {
  const [form] = Form.useForm();

  const success = (msg) => {
    Modal.success({
      title: msg,
    });
  };

  const warning = (msg) => {
    Modal.warning({
      title: msg,
    });
  };

  const onFinish = (values) => {
    let param = {
      id: values.patientId,
      name: values.name,
      birthday: moment(values.birthday).format("YYYY-MM-DD"),
      gender: values.gender,
      weight: values.weight,
      height: values.height,
      department: values.department,
      doctorId: values.doctorId,
      chief: values.chief,
      medicalHistory: values.medical_history,
      opinion: values.opinion,
      diseaseId: 1,
    };

    // 提交接口
    API.addPatient(param).then((res) => {
      if (res.code === "200") {
        success("提交成功！");
      } else {
        warning(res.msg);
      }
    });
  };

  // 医院科室
  const departmentList = [
    "脊柱骨科",
    "骨外科",
    "普通外科",
    "神经外科",
    "心胸外科",
  ];

  return (
    <div className="main-content">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          department: "脊柱骨科",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="department"
          label="科室"
          rules={[
            {
              required: true,
              message: "请选择科室!",
            },
          ]}
        >
          <Select placeholder="请选择科室">
            {departmentList.map((item) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="doctorId"
          label="主治医生id"
          rules={[
            {
              required: true,
              message: "请输入主治医生Id!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="patientId"
          label="患者id"
          rules={[
            {
              required: true,
              message: "请输入患者id",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="患者姓名"
          rules={[
            {
              required: true,
              message: "请输入患者姓名",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="birthday"
          label="出生日期"
          rules={[
            {
              required: true,
              message: "请输入患者出生日期",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="gender"
          label="患者性别"
          rules={[
            {
              required: true,
              message: "请选择患者性别",
            },
          ]}
        >
          <Select>
            <Option value={1}>男</Option>
            <Option value={0}>女</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="height"
          label="身高"
          rules={[
            {
              required: true,
              message: "请输入患者身高",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="weight"
          label="体重"
          rules={[
            {
              required: true,
              message: "请输入患者体重",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="chief"
          label="主诉"
          rules={[
            {
              required: true,
              message: "请输入病人主诉",
            },
          ]}
        >
          <TextArea placeholder="请输入病人主诉" />
        </Form.Item>

        <Form.Item
          name="medical_history"
          label="既往史"
          rules={[
            {
              message: "请输入病人既往史",
            },
          ]}
        >
          <TextArea placeholder="请输入病人主诉" />
        </Form.Item>

        <Form.Item
          name="opinion"
          label="诊断意见"
          rules={[{ required: true, message: "请输入诊断意见" }]}
        >
          <TextArea placeholder="请输入病人主诉" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: 150,
              marginLeft: 400,
            }}
          >
            提交
          </Button>
        </Form.Item>
        <Link to="/admin/addRecord">
          <Button
            type="primary"
            style={{
              width: 150,
              marginLeft: 400,
            }}
          >
            去添加病历
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default NewPatient;
