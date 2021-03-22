import React, {Component} from 'react';
import {Button, message, Table, Tag,} from 'antd';
import request from "@/utils/request";

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
          ellipsis: true,
        },
        {
          title: 'Audio Publish Time',
          dataIndex: 'audioPublishTime',
          key: 'audioPublishTime',
          align: 'center',
          sorter: (a, b) => a.audioPublishTime - b.audioPublishTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Create Time',
          dataIndex: 'audioCreateTime',
          key: 'audioCreateTime',
          align: 'center',
          sorter: (a, b) => a.audioCreateTime - b.audioCreateTime,
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
          audioId: '1',
          audioTitle: 'test',
          audioSource: 'test',
          audioContent: 'ggg',
          audioPublishTime: 4894189,
          audioCreateTime: 32,
        },
        {
          audioId: '2',
          audioTitle: 'qwe',
          audioSource: 'test',
          audioContent: 'h d',
          audioPublishTime: 4894189,
          audioCreateTime: 123,
        },
      ],
    };

    this.updateTable();
  }

  updateTable = () => {
    let requestUrl = '';
    if (this.props.cascadeValue.length === 0) {
      requestUrl = '/v1.0/api/audios';
    } else {
      requestUrl = '/v1.0/api/audios/tagName/' + this.props.cascadeValue.join('@');
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
        this.setState({dataSource: res.audios})
        message.success('更新音频表格成功');
      } else {
        this.setState({dataSource: []})
        message.error('更新音频表格失败,' + res.message);
      }
    });
  }

  deleteRecord = (text, record) => {
    if (this.props.cascadeValue.length === 0) {
      message.warning('标签名称为空');
      return;
    }

    request({
      url: '/v1.0/api/audio/' + record.audioId + '/tagName/' + this.props.cascadeValue.join("@"),
      method: 'DELETE',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.props.updateCascade();
        this.updateTable();
        message.success('删除音频成功');
      } else {
        message.error('删除音频失败,' + res.message);
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
