import React, { Component } from 'react';
import { Table, Tag } from 'antd';

export default class TagTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Tag ID',
          dataIndex: 'tagId',
          key: 'tagId',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Tag Name',
          dataIndex: 'tagName',
          key: 'tagName',
          sorter: (a, b) => a.mapName.length - b.mapName.length,
          sortDirections: [ 'descend', 'ascend' ],
          render: (text, record, index) => (
            <>
              {record.tagName.split('@')
                .map(tag => {
                  return (
                    <Tag color="green"> {tag.toUpperCase()}</Tag>
                  );
                })}
            </>
          ),
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
          tagId: '1',
          tagName: '党史新学@中共一大',
        },
        {
          tagId: '2',
          tagName: '新中国史@十四五计划',
        },
        {
          tagId: '3',
          tagName: '改革开放史@建立经济特区@kang',
        },
        {
          tagId: '4',
          tagName: '社会主义发展史@中国特色社会主义@ad@test',
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
