import React, { Component } from 'react';
import { Button, Card, Table, Badge, Menu, Dropdown, Icon } from 'antd';
import ReactEcharts from 'echarts-for-react';
import './data-collection.less';
import NewLabelDialog from './../new-label-dialog/NewLabelDialog';

class DataCollection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogVisiable: false
		};
  }
  
  handleCancelDialog = () => {
    this.setState({
      dialogVisiable: false
    })
  }

  showDialog = () => {
    this.setState({
      dialogVisiable: true
    })
  }

	getOption = (data) => {
		return {
			title: {
				text: '标注量折线图'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: [ '总数据量', '标注数据量' ]
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: '总数据量',
					type: 'line',
					stack: '总量',
					data: [ 120, 132, 101, 134, 90, 230, 210 ]
				},
				{
					name: '标注数据量',
					type: 'line',
					stack: '总量',
					data: [ 220, 182, 191, 234, 290, 330, 310 ]
				}
			]
		};
	};

	render() {
		return (
			<div className="data-collection-main-container">
				<Button type="primary" onClick={this.showDialog}>新建标注</Button>
				<Card className="label-line-chart">
					<ReactEcharts option={this.getOption()} />
				</Card>
				{/* <Card>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            expandedRowRender={expandedRowRender}
            dataSource={data}
          />
        </Card> */}
				<NewLabelDialog
					dialogVisiable={this.state.dialogVisiable}
					handleCancelDialog={this.handleCancelDialog}
				/>
			</div>
		);
	}
}

export default DataCollection;
