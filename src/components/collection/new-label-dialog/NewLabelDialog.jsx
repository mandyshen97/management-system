import React, { Component } from 'react';
import { Modal, Button, Steps, Input, Select, Checkbox } from 'antd';
import './new-label-dialog.less';
const { Step } = Steps;
const { Option } = Select;

class NewLabelDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0
		};
	}

	onChange = (current) => {
		console.log('onChange:', current);
		this.setState({ current });
  };
  
  handleCancel = () => {
    if(this.props.handleCancelDialog){
      this.props.handleCancelDialog()
    }
  }

	render() {
		const { current } = this.state;
		const { dialogVisiable } = this.props;
		return (
			<Modal title="新建标注信息" visible={dialogVisiable} onOk={this.handleOk} onCancel={this.handleCancel}>
				<Steps current={current} onChange={this.onChange}>
					<Step title="Step 1" description="选择标注数据" />
					<Step title="Step 2" description="标注信息填写" />
					<Step title="Step 3" description="确认标注" />
				</Steps>
				{current === 0 && (
					<div className="select-path">
						选择数据存储路径
						<input type="file" />
					</div>
				)}
				{current === 1 && (
					<div className="information-fill">
						<div className="input-select">
							<span>患者姓名</span>
							<Input />
						</div>
						<div className="input-select">
							<span>患者性别</span>
							<Select>
								<Option value="0">男</Option>
								<Option value="1">女</Option>
							</Select>
						</div>
						<div className="input-select">
							<span>患者年龄</span>
							<Input />
						</div>
						<div className="input-select">
							<span>是否服药</span>
							<Select>
								<Option value="0">是</Option>
								<Option value="1">否</Option>
							</Select>
						</div>
						<div className="input-select">
							<span>服药时间</span>
							<Input />
						</div>
						<div className="input-select">
							<span>行为干涉类型</span>
							<Select>
								<Option value="0">是</Option>
								<Option value="1">否</Option>
							</Select>
						</div>
						<div className="input-select">
							<span>疑似患有多动症</span>
							<Checkbox />
						</div>
          <Button type="primary">上一步</Button>
          <Button type="primary">下一步</Button>
					</div>
				)}
			</Modal>
		);
	}
}

export default NewLabelDialog;
