import React, {Component} from 'react';
import {Table, message, Button,} from 'antd';
import request from "@/utils/request";

export default class ArticleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Article ID',
          dataIndex: 'articleId',
          key: 'articleId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Article Title',
          dataIndex: 'articleTitle',
          key: 'articleTitle',
          align: 'center',
          sorter: (a, b) => a.articleTitle.length - b.articleTitle.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Article Author',
          dataIndex: 'articleAuthor',
          key: 'articleAuthor',
          align: 'center',
          sorter: (a, b) => a.articleAuthor.length - b.articleAuthor.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Article Content',
          dataIndex: 'articleContent',
          key: 'articleContent',
          align: 'center',
          sorter: (a, b) => a.articleContent.length - b.articleContent.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Article Publish Time',
          dataIndex: 'articlePublishTime',
          key: 'articlePublishTime',
          align: 'center',
          sorter: (a, b) => a.articlePublishTime - b.articlePublishTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Article Create Time',
          dataIndex: 'articleCreateTime',
          key: 'articleCreateTime',
          align: 'center',
          sorter: (a, b) => a.articleCreateTime - b.articleCreateTime,
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
          articleId: '1',
          articleAuthor: 'test',
          articleTitle: 'test',
          articleContent: 'ggg',
          articlePublishTime: 4894189,
          articleCreateTime: 32,
        },
        {
          articleId: '2',
          articleAuthor: 'tst',
          articleTitle: 'qwe',
          articleContent: 'h d',
          articlePublishTime: 4894189,
          articleCreateTime: 123,
        },
      ],
    };

    this.updateTable();
  }

  updateTable = () => {
    let requestUrl = '';
    if (this.props.cascadeValue.length === 0) {
      requestUrl = '/v1.0/api/articles';
    } else {
      requestUrl = '/v1.0/api/articles/tagName/' + this.props.cascadeValue.join('@');
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
        this.setState({dataSource: res.articles})
        message.success('更新文章表格成功');
      } else {
        this.setState({dataSource: []})
        message.error('更新文章表格失败,' + res.message);
      }
    });
  }

  deleteRecord = (text, record) => {
    if (this.props.cascadeValue.length === 0) {
      message.warning('标签名称为空');
      return;
    }

    request({
      url: '/v1.0/api/article/' + record.articleId + '/tagName/' + this.props.cascadeValue.join("@"),
      method: 'DELETE',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.props.updateCascade();
        this.updateTable();
        message.success('删除文章成功');
      } else {
        message.error('删除文章失败,' + res.message);
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
