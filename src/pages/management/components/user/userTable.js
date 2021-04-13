import React, {Component} from 'react';
import {Button, message, Table, Tag,} from 'antd';
import request from "@/utils/request";
import {getLocalData} from '@/utils/common.js';

export default class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '用户 ID',
          dataIndex: 'userId',
          key: 'userId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: '用户姓名',
          dataIndex: 'userName',
          key: 'userName',
          align: 'center',
          sorter: (a, b) => a.userName.length - b.userName.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
          align: 'center',
          sorter: (a, b) => a.email.length - b.email.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '得分',
          dataIndex: 'score',
          key: 'score',
          align: 'center',
          sorter: (a, b) => a.score - b.score,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '党支部',
          dataIndex: 'partyBranch',
          key: 'partyBranch',
          align: 'center',
          sorter: (a, b) => a.partyBranch.length - b.partyBranch.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          align: 'center',
          sorter: (a, b) => a.createTime - b.createTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
          align: 'center',
          sorter: (a, b) => a.updateTime - b.updateTime,
          sortDirections: ['descend', 'ascend'],
        },
      ],

      dataSource: [
        {
          userId: '1',
          userName: 'test',
          email: 'test',
          score: 3,
          partyBranch: 'ggg',
          createTime: 4894189,
          updateTime: 32,
        },
      ],
    };

    this.updateTable();
  }

  updateTable = () => {
    request({
      url: '/v1.0/api/user/userList',
      method: 'GET',
      autoAdd: false, //不添加v1.0
      headers: {
        userId: getLocalData({dataName: 'userId'}),
        token: getLocalData({dataName: 'token'})
      },
      data: {
        length: 1000
      }
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.setState({dataSource: res.list})
        message.success('更新用户表格成功');
      } else {
        this.setState({dataSource: []})
        message.error('更新用户表格失败,' + res.message);
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
