import React, {Component} from 'react';
import {Button, message, Table, Tag,} from 'antd';
import request from "@/utils/request";
import {getLocalData} from '@/utils/common.js';

export default class VideoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '视频 ID',
          dataIndex: 'videoId',
          key: 'videoId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: '视频标题',
          dataIndex: 'videoTitle',
          key: 'videoTitle',
          align: 'center',
          sorter: (a, b) => a.videoTitle.length - b.videoTitle.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '视频来源',
          dataIndex: 'videoSource',
          key: 'videoSource',
          align: 'center',
          sorter: (a, b) => a.videoSource.length - b.videoSource.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '视频内容',
          dataIndex: 'videoContent',
          key: 'videoContent',
          align: 'center',
          sorter: (a, b) => a.videoContent.length - b.videoContent.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true,
        },
        {
          title: '事件发生时间',
          dataIndex: 'eventTime',
          key: 'eventTime',
          align: 'center',
          sorter: (a, b) => a.eventTime.length - b.eventTime.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '视频发布时间',
          dataIndex: 'videoPublishTime',
          key: 'videoPublishTime',
          align: 'center',
          sorter: (a, b) => a.videoPublishTime - b.videoPublishTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '视频创建时间',
          dataIndex: 'videoCreateTime',
          key: 'videoCreateTime',
          align: 'center',
          sorter: (a, b) => a.videoCreateTime - b.videoCreateTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '视频预览',
          key: 'preview',
          align: 'center',
          render: (text, record) => (
            <Button icon="link" onClick={() => this.previewVideo(text, record)}>预览</Button>
          ),
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

  previewVideo = (text, record) => {
    window.previewWindow = window.open();
    window.previewWindow.location = record.videoContent;
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

  updatePublicState = (text, record) => {
    request({
      url: '/v1.0/api/video/public/' + record.videoId,
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
