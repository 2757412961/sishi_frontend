import React, {Component} from 'react';
import {Table, Tag,} from 'antd';

export default class AudioTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Audio ID',
          dataIndex: 'audioId',
          key: 'audioId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Audio Title',
          dataIndex: 'audioTitle',
          key: 'audioTitle',
          align: 'center',
          sorter: (a, b) => a.audioTitle.length - b.audioTitle.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Audio Source',
          dataIndex: 'audioSource',
          key: 'audioSource',
          align: 'center',
          sorter: (a, b) => a.audioSource.length - b.audioSource.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Audio Content',
          dataIndex: 'audioContent',
          key: 'audioContent',
          align: 'center',
          sorter: (a, b) => a.audioContent.length - b.audioContent.length,
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
          audioId: '1',
          audioTitle: 'test',
          audioSource: 'test',
          audioContent: 'ggg',
          publishTime: 4894189,
          createTime: 32,
        },
        {
          audioId: '2',
          audioTitle: 'qwe',
          audioSource: 'test',
          audioContent: 'h d',
          publishTime: 4894189,
          createTime: 123,
        },
        {
          audioId: '3',
          audioTitle: 'eq w eq s d e qwe',
          audioSource: 'test',
          audioContent: 'sss',
          publishTime: 123,
          createTime: 3,
        },
        {
          audioId: '4',
          audioTitle: 'das df a sf',
          audioSource: 'test',
          audioContent: 'hhhh',
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
