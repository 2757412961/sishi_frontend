import React, {Component} from 'react';
import {Button, message, Table, Tag,} from 'antd';
import request from "@/utils/request";
import {getLocalData} from '@/utils/common.js';

export default class TagResourceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '标签 ID',
          dataIndex: 'tagId',
          key: 'tagId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: '标签名',
          dataIndex: 'tagName',
          key: 'tagName',
          align: 'center',
          sorter: (a, b) => a.tagName.length - b.tagName.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '资源 ID',
          dataIndex: 'resourceId',
          key: 'resourceId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: '资源类型',
          dataIndex: 'resourceType',
          key: 'resourceType',
          align: 'center',
          sorter: (a, b) => a.resourceType.length - b.resourceType.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '上传用户 ID',
          dataIndex: 'userId',
          key: 'userId',
          align: 'center',
          sorter: (a, b) => a.userId.length - b.userId.length,
          sortDirections: ['descend', 'ascend'],
        },
      ],

      dataSource: [
        {
          tagId: '1',
          tagName: 'test',
          resourceId: 'test',
          resourceType: 'ggg',
          userId: 'ggg',
        },
      ],
    };

    this.updateTable();
  }

  updateTable = () => {
    let requestUrl = '';
    if (this.props.cascadeValue.length === 0) {
      requestUrl = '/v1.0/api/tagResources';
    } else {
      requestUrl = '/v1.0/api/tagResources/tagName/' + this.props.cascadeValue.join('@');
    }

    request({
      url: requestUrl,
      method: 'GET',
      autoAdd: false, //不添加v1.0
      data: {
        length: 1000
      }
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.setState({dataSource: res.tagResources})
        // message.success('更新关联表格成功');
      } else {
        this.setState({dataSource: []})
        message.error('更新关联表格失败,' + res.message);
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
