import React, {Component} from 'react';
import {Table, Tag} from 'antd';
import request from "@/utils/request";

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
          sorter: (a, b) => a.tagName.length - b.tagName.length,
          sortDirections: ['descend', 'ascend'],
          render: (text, record, index) => (
            <>
              {record.tagName.split('@')
                .map(tag => {
                  return (
                    <Tag color="green"> {tag}</Tag>
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

    this.updateTable();
  }

  updateTable = () => {
    // if (this.props.cascadeValue.length == 0) {
    //   request({
    //     url: '/v1.0/api/tags',
    //     method: 'GET',
    //     autoAdd: false, //不添加v1.0
    //   }).then((res) => {
    //     console.log(res);
    //
    //     this.setState({dataSource: res.list})
    //   });
    // } else {
    //   request({
    //     url: '/v1.0/api/tag/' + this.props.cascadeValue.join('@'),
    //     method: 'GET',
    //     autoAdd: false, //不添加v1.0
    //   }).then((res) => {
    //     console.log(res);
    //
    //     if (res.hasOwnProperty("tagName")) {
    //       this.setState({dataSource: [res]})
    //     }
    //   });
    // }
  }

  render() {
    return (
      <>
        <Table columns={this.state.columns} dataSource={this.state.dataSource}/>
      </>
    );
  }
}
