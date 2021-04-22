import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, DatePicker, Modal, Row, Col } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import API from "../../api/api";
import "./new-patient.less";
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

function NewPatient(props) {
  const [form] = Form.useForm();
  const [diseaseList, setDiseaseList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    API.getDisease().then((res) => {
      if (res.code === "200") {
        setDiseaseList(res.data);
      } else {
        warning(res.msg);
      }
    });
    API.getDoctors().then((res) => {
      if (res.code === "200") {
        setDoctorList(res.data);
      } else {
        warning(res.msg);
      }
    });
  }, [props]);
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
      dieseaseId: values.diseaseId,
    };

    // 提交接口 调试成功
    API.addPatient(param).then((res) => {
      if (res.code === "200") {
        success("提交成功！");
        props.history.push("/admin/patientQuery");
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
  const diseaseOptions = diseaseList.map((item) => {
    return (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    );
  });

  const doctorOptions = doctorList.map((item) => {
    return (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    );
  });
  return (
    <div className="main-content">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          department: "骨科",
        }}
        scrollToFirstError
      >
        <Row>
          <Col span={8}>
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
          </Col>
          <Col span={8}>
            <Form.Item
              name="doctorId"
              label="主治医生"
              rules={[
                {
                  required: true,
                  message: "请输入主治医生!",
                },
              ]}
            >
              <Select placeholder="请选择医生">{doctorOptions}</Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="patientId"
              label="患者编号"
              rules={[
                {
                  required: true,
                  message: "请输入患者编号",
                },
              ]}
            >
              <Input placeholder="请填写患者编号" type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
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
              <Input placeholder="请填写患者姓名" />
            </Form.Item>
          </Col>
          <Col span={8}>
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
              <DatePicker
                placeholder="请输入患者出生日期"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
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
              <Select placeholder="请选择患者性别">
                <Option value={1}>男</Option>
                <Option value={0}>女</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              name="height"
              label="身高(cm)"
              rules={[
                {
                  required: true,
                  message: "请输入患者身高",
                },
              ]}
            >
              <Input placeholder="请填写患者身高" type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="weight"
              label="体重(kg)"
              rules={[
                {
                  required: true,
                  message: "请输入患者体重",
                },
              ]}
            >
              <Input placeholder="请填写患者体重" type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="diseaseId" label="疾病">
              <Select placeholder="请填写疾病">{diseaseOptions}</Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="chief"
              label="主诉"
              labelCol={{ span: 2, offeset: 12 }}
              wrapperCol={{ span: 22 }}
              rules={[
                {
                  required: true,
                  message: "请输入病人主诉",
                },
              ]}
            >
              <TextArea placeholder="请输入病人主诉" style={{ width: "88%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="medical_history"
              label="既往史"
              labelCol={{ span: 2, offeset: 12 }}
              wrapperCol={{ span: 22 }}
              rules={[
                {
                  message: "请输入病人既往史",
                },
              ]}
            >
              <TextArea
                placeholder="请输入病人既往史"
                style={{ width: "88%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="medical_history"
              label="现病史"
              labelCol={{ span: 2, offeset: 12 }}
              wrapperCol={{ span: 22 }}
              rules={[
                {
                  message: "请输入病人现病史",
                },
              ]}
            >
              <TextArea
                placeholder="请输入病人现病史"
                style={{ width: "88%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="opinion"
              label="诊断意见"
              labelCol={{ span: 2, offeset: 12 }}
              wrapperCol={{ span: 22 }}
              rules={[{ required: true, message: "请输入诊断意见" }]}
            >
              <TextArea placeholder="请输入诊断意见" style={{ width: "88%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: 150,
                  marginLeft: 100,
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
                  marginLeft: 100,
                }}
              >
                去添加病历
              </Button>
            </Link>
          </Col>
          <Col span={8}></Col>
        </Row>
      </Form>
    </div>
  );
}

export default NewPatient;
