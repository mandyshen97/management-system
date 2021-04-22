import React, { useState, useEffect } from "react";
import { Table, Form, Checkbox, Row, Col, Button, Message } from "antd";
import API from "../../api/api";
import _ from "lodash";

const initialData = [];

export default function AccessControl() {
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // todo
    // 发送请求获取权限列表
    // API.getAccessList().then((res) => {
    //   if (res.code === "200") {
    //     setData(res.data);
    //   }
    // });
    fetch("http://mockjs.docway.net/mock/1XRHOKNxZ7h/api/getAccessList")
      .then((res) => res.json())
      .then((res) => {
        const doctorAccessData = _.get(res, "data");
        setData(doctorAccessData);
      });
  }, []);

  // 根据权限的id得到对应的权限名称
  const accessNames = [
    { accessId: 0, accessName: "新建患者个人信息" },
    { accessId: 1, accessName: "患者信息查询管理" },
    { accessId: 2, accessName: "新增治疗记录" },
    { accessId: 3, accessName: "病历查询" },
    { accessId: 4, accessName: "智能分析" },
    { accessId: 5, accessName: "新增治疗方案" },
    { accessId: 6, accessName: "权限控制" },
  ];

  const getNames = (accessArray) => {
    let result = [];
    accessArray.map((v) => {
      accessNames.map((item) => {
        if (v === item.accessId) {
          result.push(item.accessName);
        }
      });
    });
    return result;
  };
  const change = (record, values) => {
    record.accessArray = values;
  };

  const update = (record) => {
    console.log(record);
    let param = {
      doctorName: record.doctorName,
      doctorId: record.doctorId,
      department: record.department,
      accessArray: record.accessArray,
    };
    try {
      API.updataAccess(param).then((res) => {
        if (res.code === "200") {
          Message.success("更新成功");
        } else {
          Message.error("更新失败，请重试！");
        }
      });
    } catch (e) {
      Message.error(e + "更新失败，请重试！");
    }
  };
  const columns = [
    {
      title: "医生编号",
      dataIndex: "doctorId",
      width: "12%",
    },
    {
      title: "医生姓名",
      dataIndex: "doctorName",
      width: "12%",
    },
    {
      title: "角色",
      dataIndex: "role",
      width: "10%",
    },
    {
      title: "所属科室",
      dataIndex: "department",
      width: "10%",
    },
    {
      title: "权限",
      dataIndex: "access",
      width: "50%",
      editable: true,
      render: (_, record) => {
        console.log("record", record);
        console.log(
          "getNames(record.accessArray)",
          getNames(record.accessArray)
        );
        return (
          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={(values) => change(record, values)}
            defaultValue={record.accessArray}
          >
            <Row>
              {accessNames.map((item) => {
                return (
                  <Col span={8} key={item.accessName}>
                    <Checkbox value={item.accessId}>{item.accessName}</Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      width:"8%",
      render: (_, record) => {
        return (
          <Button type="primary" onClick={() => update(record)}>
            确定
          </Button>
        );
      },
    },
  ];

  return (
    <div className="main-content">
      {/* <h1
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        权限控制
      </h1> */}
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
        ></Table>
      </Form>
    </div>
  );
}
