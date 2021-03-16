import React, {Component} from 'react';
import {Table, Tag,} from 'antd';

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
          title: 'Publish Time',
          dataIndex: 'publishTime',
          key: 'publishTime',
          align: 'center',
          sorter: (a, b) => a.publishTime - b.publishTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Create Time',
          dataIndex: 'createTime',
          key: 'createTime',
          align: 'center',
          sorter: (a, b) => a.createTime - b.createTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          render: (text, record) => (
            <a>Delete</a>
          ),
        },
      ],

      dataSource: [
        {
          articleId: '1',
          articleAuthor: 'test',
          articleTitle: 'test',
          articleContent: 'ggg',
          publishTime: 4894189,
          createTime: 32,
        },
        {
          articleId: '2',
          articleAuthor: 'test',
          articleTitle: 'qwe',
          articleContent: 'h d',
          publishTime: 4894189,
          createTime: 123,
        },
        {
          articleId: '3',
          articleAuthor: 'test',
          articleTitle: 'eq w eq s d e qwe',
          articleContent: 'sss',
          publishTime: 123,
          createTime: 3,
        },
        {
          articleId: '4',
          articleAuthor: 'test',
          articleTitle: 'das df a sf',
          articleContent: 'hhhh',
          publishTime: 4894189,
          createTime: 123312,
        },
      ],
    };
  }

  render() {
    return (
      <>
        <Table columns={this.state.columns} dataSource={this.state.dataSource}/>
      </>
    );
  }
}
