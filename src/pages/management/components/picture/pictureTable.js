import React, {Component} from 'react';
import {Button, message, Table, Tag,} from 'antd';
import request from "@/utils/request";
import {getLocalData} from '@/utils/common.js';

export default class PictureTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '图片 ID',
          dataIndex: 'pictureId',
          key: 'pictureId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: '图片标题',
          dataIndex: 'pictureTitle',
          key: 'pictureTitle',
          align: 'center',
          sorter: (a, b) => a.pictureTitle.length - b.pictureTitle.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '图片来源',
          dataIndex: 'pictureSource',
          key: 'pictureSource',
          align: 'center',
          sorter: (a, b) => a.pictureSource.length - b.pictureSource.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '图片内容',
          dataIndex: 'pictureContent',
          key: 'pictureContent',
          align: 'center',
          sorter: (a, b) => a.pictureContent.length - b.pictureContent.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true,
        },
        {
          title: '图片发布时间',
          dataIndex: 'picturePublishTime',
          key: 'picturePublishTime',
          align: 'center',
          sorter: (a, b) => a.picturePublishTime - b.picturePublishTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '图片创建时间',
          dataIndex: 'pictureCreateTime',
          key: 'pictureCreateTime',
          align: 'center',
          sorter: (a, b) => a.pictureCreateTime - b.pictureCreateTime,
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
          pictureId: '1',
          pictureTitle: 'test',
          pictureSource: 'test',
          pictureContent: 'ggg',
          picturePublishTime: 4894189,
          pictureCreateTime: 32,
          isPublic: false,
        },
        {
          pictureId: '2',
          pictureTitle: 'qwe',
          pictureSource: 'test',
          pictureContent: 'h d',
          picturePublishTime: 4894189,
          pictureCreateTime: 123,
          isPublic: false,
        },
      ],
    };

    this.updateTable();
  }

  updateTable = () => {
    let requestUrl = '';
    if (this.props.cascadeValue.length === 0) {
      requestUrl = '/v1.0/api/pictures';
    } else {
      requestUrl = '/v1.0/api/pictures/tagName/' + this.props.cascadeValue.join('@');
    }

    request({
      url: requestUrl,
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
        this.setState({dataSource: res.pictures})
        message.success('更新图片表格成功');
      } else {
        this.setState({dataSource: []})
        message.error('更新图片表格失败,' + res.message);
      }
    });
  }

  deleteRecord = (text, record) => {
    if (this.props.cascadeValue.length === 0) {
      message.warning('标签名称为空');
      return;
    }

    request({
      url: '/v1.0/api/picture/' + record.pictureId + '/tagName/' + this.props.cascadeValue.join("@"),
      method: 'DELETE',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.props.updateCascade();
        this.updateTable();
        message.success('删除图片成功');
      } else {
        message.error('删除图片失败,' + res.message);
      }
    });
  }

  updatePublicState = (text, record) => {
    request({
      url: '/v1.0/api/picture/public/' + record.pictureId,
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
