import React, {Component} from 'react';
import {Table, Tag,} from 'antd';

export default class PictureTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Picture ID',
          dataIndex: 'pictureId',
          key: 'pictureId',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Picture Name',
          dataIndex: 'pictureName',
          key: 'pictureName',
          sorter: (a, b) => a.pictureName.length - b.pictureName.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Picture Url',
          dataIndex: 'pictureUrl',
          key: 'pictureUrl',
          sorter: (a, b) => a.pictureUrl.length - b.pictureUrl.length,
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
          pictureId: '1',
          pictureName: 'test',
          pictureUrl: 'ggg',
          createTime: 32,
        },
        {
          pictureId: '2',
          pictureName: 'test',
          pictureUrl: 'ggg',
          createTime: 32,
        },
        {
          pictureId: '3',
          pictureName: 'test',
          pictureUrl: 'ggg',
          createTime: 32,
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
