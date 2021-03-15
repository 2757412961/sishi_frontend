import React, {Component} from 'react';
import {Table, Tag,} from 'antd';

export default class VideoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Video ID',
          dataIndex: 'videoId',
          key: 'videoId',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Video Title',
          dataIndex: 'videoTitle',
          key: 'videoTitle',
          sorter: (a, b) => a.videoTitle.length - b.videoTitle.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Video Source',
          dataIndex: 'videoSource',
          key: 'videoSource',
          sorter: (a, b) => a.videoSource.length - b.videoSource.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Video Content',
          dataIndex: 'videoContent',
          key: 'videoContent',
          sorter: (a, b) => a.videoContent.length - b.videoContent.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Publish Time',
          dataIndex: 'publishTime',
          key: 'publishTime',
          sorter: (a, b) => a.publishTime - b.publishTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Create Time',
          dataIndex: 'createTime',
          key: 'createTime',
          sorter: (a, b) => a.createTime - b.createTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <a>Delete</a>
          ),
        },
      ],

      dataSource: [
        {
          videoId: '1',
          videoTitle: 'test',
          videoSource: 'test',
          videoContent: 'ggg',
          publishTime: 4894189,
          createTime: 32,
        },
        {
          videoId: '2',
          videoTitle: 'qwe',
          videoSource: 'test',
          videoContent: 'h d',
          publishTime: 4894189,
          createTime: 123,
        },
        {
          videoId: '3',
          videoTitle: 'eq w eq s d e qwe',
          videoSource: 'test',
          videoContent: 'sss',
          publishTime: 123,
          createTime: 3,
        },
        {
          videoId: '4',
          videoTitle: 'das df a sf',
          videoSource: 'test',
          videoContent: 'hhhh',
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
