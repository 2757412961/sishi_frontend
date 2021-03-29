import React, { Component } from 'react';
import {Table, Tag,} from 'antd';

export default class MapinfoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Map ID',
          dataIndex: 'mapId',
          key: 'mapId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Map Name',
          dataIndex: 'mapName',
          key: 'mapName',
          align: 'center',
          sorter: (a, b) => a.mapName.length - b.mapName.length,
          sortDirections: [ 'descend', 'ascend' ],
        },
        {
          title: 'Map Json',
          dataIndex: 'mapJson',
          key: 'mapJson',
          align: 'center',
          sorter: (a, b) => a.mapJson.length - b.mapJson.length,
          sortDirections: [ 'descend', 'ascend' ],
          // render: (text, record, index) => (
          //   <>
          //     {record.tagName.split('@')
          //       .map(tag => {
          //         return (
          //           <Tag color="green"> {tag.toUpperCase()}</Tag>
          //         );
          //       })}
          //   </>
          // ),
        },
        {
          title: 'Create Time',
          dataIndex: 'createTime',
          key: 'createTime',
          align: 'center',
          sorter: (a, b) => a.createTime - b.createTime,
          sortDirections: [ 'descend', 'ascend' ],
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          render: (text, record) => (
            <a>删除</a>
          ),
        },
      ],

      dataSource: [
        {
          mapId: '1',
          mapName: 'test',
          mapJson: 'fds',
          createTime: 4894189,
        },
        {
          mapId: '2',
          mapName: 'abcx',
          mapJson: 'ggfds',
          createTime: 123,
        },
        {
          mapId: '3',
          mapName: 'oiuyt',
          mapJson: 'sdfffds',
          createTime: 4843294189,
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
