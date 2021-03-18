import React, {Component} from 'react';
import {Table, Tag, Button, message} from 'antd';
import request from "@/utils/request";

export default class TagTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Tag ID',
          dataIndex: 'tagId',
          key: 'tagId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Tag Name',
          dataIndex: 'tagName',
          key: 'tagName',
          sorter: (a, b) => a.tagName.length - b.tagName.length,
          sortDirections: ['descend', 'ascend'],
          align: 'center',
          render: (text, record, index) => (
            <>
              {record.tagName.split('@')
                .map(tag => {
                  return (<Tag color="green">{tag}</Tag>);
                })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          render: (text, record) => (
            <Button type="danger" onClick={() => this.deleteRecord(text, record)}>Delete</Button>
          ),
        },
      ],

      dataSource: [
        {
          tagId: '1',
          tagName: '党史新学@中共一大',
        },
        {
          tagId: '2',
          tagName: '新中国史@十四五计划',
        },
        {
          tagId: '3',
          tagName: '改革开放史@建立经济特区',
        },
        {
          tagId: '4',
          tagName: '社会主义发展史@中国特色社会主义',
        },
      ],
    };

    this.updateTable();
  }

  updateTable = () => {
    let requestUrl = '';
    if (this.props.cascadeValue.length === 0) {
      requestUrl = '/v1.0/api/tags';
    } else {
      requestUrl = '/v1.0/api/tag/' + this.props.cascadeValue.join('@');
    }

    request({
      url: requestUrl,
      method: 'GET',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.setState({dataSource: res.list})
        message.success('更新标签表格成功');
      } else {
        message.error('更新标签表格失败,' + res.message);
      }
    });
  }

  deleteRecord = (text, record) => {
    request({
      url: '/v1.0/api/tag/' + record.tagName,
      method: 'DELETE',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.props.updateCascade();
        this.updateTable();
        message.success('删除标签成功');
      } else {
        message.error('删除标签失败,' + res.message);
      }
    });
  }

  render() {
    return (
      <>
        <Table columns={this.state.columns} dataSource={this.state.dataSource}/>
      </>
    );
  }
}
