import React, {Component} from 'react';
import {Button, message, Table, Tag,} from 'antd';
import request from "@/utils/request";

export default class VideoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Video ID',
          dataIndex: 'videoId',
          key: 'videoId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Video Title',
          dataIndex: 'videoTitle',
          key: 'videoTitle',
          align: 'center',
          sorter: (a, b) => a.videoTitle.length - b.videoTitle.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Video Source',
          dataIndex: 'videoSource',
          key: 'videoSource',
          align: 'center',
          sorter: (a, b) => a.videoSource.length - b.videoSource.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Video Content',
          dataIndex: 'videoContent',
          key: 'videoContent',
          align: 'center',
          sorter: (a, b) => a.videoContent.length - b.videoContent.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true,
        },
        {
          title: 'Video Publish Time',
          dataIndex: 'videoPublishTime',
          key: 'videoPublishTime',
          align: 'center',
          sorter: (a, b) => a.videoPublishTime - b.videoPublishTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Create Time',
          dataIndex: 'videoCreateTime',
          key: 'videoCreateTime',
          align: 'center',
          sorter: (a, b) => a.videoCreateTime - b.videoCreateTime,
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
          videoId: '1',
          videoTitle: 'test',
          videoSource: 'test',
          videoContent: 'ggg',
          videoPublishTime: 4894189,
          videoCreateTime: 32,
        },
        {
          videoId: '2',
          videoTitle: 'qwe',
          videoSource: 'test',
          videoContent: 'h d',
          videoPublishTime: 4894189,
          videoCreateTime: 123,
        },
      ],
    };

    this.updateTable();
  }

  updateTable = () => {
    let requestUrl = '';
    if (this.props.cascadeValue.length === 0) {
      requestUrl = '/v1.0/api/videos';
    } else {
      requestUrl = '/v1.0/api/videos/tagName/' + this.props.cascadeValue.join('@');
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
        this.setState({dataSource: res.videos})
        message.success('更新视频表格成功');
      } else {
        this.setState({dataSource: []})
        message.error('更新视频表格失败,' + res.message);
      }
    });
  }

  deleteRecord = (text, record) => {
    if (this.props.cascadeValue.length === 0) {
      message.warning('标签名称为空');
      return;
    }

    request({
      url: '/v1.0/api/video/' + record.videoId + '/tagName/' + this.props.cascadeValue.join("@"),
      method: 'DELETE',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.props.updateCascade();
        this.updateTable();
        message.success('删除视频成功');
      } else {
        message.error('删除视频失败,' + res.message);
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
