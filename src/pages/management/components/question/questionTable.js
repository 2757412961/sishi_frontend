import React, {Component} from 'react';
import {Button, message, Table, Tag,} from 'antd';
import request from "@/utils/request";

export default class QuestionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Question ID',
          dataIndex: 'questionId',
          key: 'questionId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Question Content',
          dataIndex: 'questionContent',
          key: 'questionContent',
          align: 'center',
          sorter: (a, b) => a.questionContent.length - b.questionContent.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true,
        },
        {
          title: 'Option A',
          dataIndex: 'optionA',
          key: 'optionA',
          align: 'center',
          sorter: (a, b) => a.optionA.length - b.optionA.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Option B',
          dataIndex: 'optionB',
          key: 'optionB',
          align: 'center',
          sorter: (a, b) => a.optionB.length - b.optionB.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Option C',
          dataIndex: 'optionC',
          key: 'optionC',
          align: 'center',
          sorter: (a, b) => a.optionC.length - b.optionC.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Option D',
          dataIndex: 'optionD',
          key: 'optionD',
          align: 'center',
          sorter: (a, b) => a.optionD.length - b.optionD.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Option E',
          dataIndex: 'optionE',
          key: 'optionE',
          align: 'center',
          sorter: (a, b) => a.optionE.length - b.optionE.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Answer',
          dataIndex: 'answer',
          key: 'answer',
          align: 'center',
          sorter: (a, b) => a.answer.length - b.answer.length,
          sortDirections: ['descend', 'ascend'],
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
        this.props.updateCascade();
        this.updateTable();
        message.success('删除题目成功');
      } else {
        message.error('删除题目失败,' + res.message);
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
