import React, { Component } from "react";
import { Table } from "antd";
import _ from "lodash";
import moment from "moment";

class RenderHistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 渲染历史治疗记录表格
  renderHistoryTable = () => {
    const columns = [
      {
        title: "治疗次数",
        dataIndex: "count",
        key: "count",
        render: (count) => `第${count}次治疗`,
        width: 110,
      },
      {
        title: "就诊时间",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "红外热像图",
        dataIndex: "infImage",
        key: "infImage",
        render: (infImage) => {
          return <img src={'http://10.16.98.192:8001/infraFile/after/'+infImage} alt="" width='100px' height='100px'/>;
        },
      },
      {
        title: "红外热像图描述",
        dataIndex: "infImageDes",
        key: "infImageDes",
      },
      // {
      //   title: "核磁共振图像",
      //   dataIndex: "MRI",
      //   key: "MRI",
      // },
      // {
      //   title: "核磁共振图像描述",
      //   dataIndex: "MRIDes",
      //   key: "MRIDes",
      // },
      // {
      //   title: "核磁共振图像",
      //   dataIndex: "CT",
      //   key: "CT",
      // },
      // {
      //   title: "核磁共振图像描述",
      //   dataIndex: "CTDes",
      //   key: "CTDes",
      // },
    ];

    const data = [];

    function getDesFromClassification(classification) {
      const map = {
        0: "正常",
        1: "疲劳",
        2: "炎性改变",
        3: "颈椎负荷过重",
        4: "颈肩综合症，颈椎退行性，颈椎病",
        100: "",
      };
      return map[classification];
    }

    (this.props.historyRecords || []).map((item, index) => {
      let record = {};
      record.key = index;
      record.count = item.treatCount;
      record.time = moment(item.timeBefore).format("YYYY-MM-DD HH:mm:ss");
      console.log(item.timeBefore);
      record.infImage = item.infraAfterPath;
      record.infImageDes = getDesFromClassification(
        _.get(item, "classificationBefore", 100)
      );
      record.MRI = "";
      record.MRIDes = "";
      record.CT = "";
      record.CTDes = "";
      data.push(record);
    });

    const paginationProps = {
      showTotal: (total) => {
        return `共${total}条`;
      },
      showSizeChanger: false,
      total: data.length, //数据总数
      defaultCurrent: 1, //默认当前页
      pageSize: 3, //每页条数
    };

    return (
      <Table
        bordered="true"
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content", y: 600 }}
        pagination={paginationProps}
      />
    );
  };

  render() {
    return <>{this.renderHistoryTable()}</>;
  }
}

export default RenderHistoryTable;
