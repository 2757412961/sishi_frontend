import React, {Component} from 'react';
import {Table, Tag} from 'antd';

export default class TagResourceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Tag ID',
          dataIndex: 'tagId',
          key: 'tagId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Tag Name',
          dataIndex: 'tagName',
          key: 'tagName',
          align: 'center',
          sorter: (a, b) => a.mapName.length - b.mapName.length,
          sortDirections: ['descend', 'ascend'],
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
          title: 'Resource ID',
          dataIndex: 'resourceId',
          key: 'resourceId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Resource Type',
          dataIndex: 'resourceType',
          key: 'resourceType',
          align: 'center',
          sorter: (a, b) => a.resourceType.length - b.resourceType.length,
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
          tagId: '1',
          tagName: '党史新学@中共一大',
          resourceId: '123',
          resourceType: "tb_question"
        },
        {
          tagId: '2',
          tagName: '新中国史@十四五计划',
          resourceId: '54',
          resourceType: "tb_article"
        },
        {
          tagId: '3',
          tagName: '改革开放史@建立经济特区@kang',
          resourceId: '164523',
          resourceType: "tb_audio"
        },
        {
          tagId: '4',
          tagName: '社会主义发展史@中国特色社会主义@ad@test',
          resourceId: '16453',
          resourceType: "tb_picture"
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
