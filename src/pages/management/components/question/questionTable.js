import React, {Component} from 'react';
import {Button, message, Table, Tag,} from 'antd';
import request from "@/utils/request";
import {getLocalData, toDBC} from '@/utils/common.js';

export default class QuestionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '题目 ID',
          dataIndex: 'questionId',
          key: 'questionId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: '题目内容',
          dataIndex: 'questionContent',
          key: 'questionContent',
          align: 'center',
          sorter: (a, b) => a.questionContent.length - b.questionContent.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true,
        },
        {
          title: '选项 A',
          dataIndex: 'optionA',
          key: 'optionA',
          align: 'center',
          sorter: (a, b) => a.optionA.length - b.optionA.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '选项 B',
          dataIndex: 'optionB',
          key: 'optionB',
          align: 'center',
          sorter: (a, b) => a.optionB.length - b.optionB.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '选项 C',
          dataIndex: 'optionC',
          key: 'optionC',
          align: 'center',
          sorter: (a, b) => a.optionC.length - b.optionC.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '选项 D',
          dataIndex: 'optionD',
          key: 'optionD',
          align: 'center',
          sorter: (a, b) => a.optionD.length - b.optionD.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '选项 E',
          dataIndex: 'optionE',
          key: 'optionE',
          align: 'center',
          sorter: (a, b) => a.optionE.length - b.optionE.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '答案',
          dataIndex: 'answer',
          key: 'answer',
          align: 'center',
          sorter: (a, b) => a.answer.length - b.answer.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '公开',
          dataIndex: 'isPublic',
          key: 'isPublic',
          align: 'center',
          render: (text, record) => (
            <>
              {record.isPublic ?
                <Tag color="blue">公开</Tag> :
                <Button onClick={() => this.updatePublicState(text, record)}>点击公开</Button>}
            </>
          ),
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (text, record) => (
            <Button type="danger" onClick={() => this.deleteRecord(text, record)}>删除</Button>
          ),
        },
      ],

      dataSource: [
        {
          questionId: '1',
          questionContent: 'ggg',
          optionA: 'optionA',
          optionB: 'optionB',
          optionC: 'optionC',
          optionD: 'optionD',
          optionE: 'optionE',
          answer: 'answer',
        },
      ],
    };

    this.updateTable();
  }

  updateTable = () => {
    let requestUrl = '';
    if (this.props.cascadeValue.length === 0) {
      requestUrl = '/v1.0/api/questions/selectques';
    } else {
      requestUrl = '/v1.0/api/questions/tagName/' + this.props.cascadeValue.join('@');
    }

    request({
      url: requestUrl,
      method: 'GET',
      autoAdd: false, //不添加v1.0
      data:{
        length: 1000
      },
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.setState({dataSource: res.list})
        message.success('更新题目表格成功');
      } else {
        this.setState({dataSource: []})
        message.error('更新题目表格失败,' + res.message);
      }
    });
  }

  deleteRecord = (text, record) => {
    if (this.props.cascadeValue.length === 0) {
      message.warning('标签名称为空');
      return;
    }

    request({
      url: '/v1.0/api/question/' + record.questionId + '/tagName/' + this.props.cascadeValue.join("@"),
      method: 'DELETE',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        // this.props.updateCascade();
        this.updateTable();
        message.success('删除题目成功');
      } else {
        message.error('删除题目失败,' + res.message);
      }
    });
  }

  updatePublicState = (text, record) => {
    request({
      url: '/v1.0/api/question/public/' + record.questionId,
      method: 'PUT',
      headers: {
        userId: getLocalData({dataName: 'userId'}),
        token: getLocalData({dataName: 'token'})
      },
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.updateTable();
        message.success('更新状态成功');
      } else {
        message.error('更新状态失败,' + res.message);
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
