import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';


class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      editingKey: ''
    }
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },]


  }
  render() {
    console.log(this.props)
    return (
      <div>jjj</div>
    );
  }
}

// 包装后this.props中会有form,可以调用form的方法
const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable;