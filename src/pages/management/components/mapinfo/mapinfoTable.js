import React, {Component} from 'react';
import {Button, message, Table, Tag,} from 'antd';
import request from "@/utils/request";

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
          title: 'Map Title',
          dataIndex: 'mapTitle',
          key: 'mapTitle',
          align: 'center',
          sorter: (a, b) => a.mapTitle.length - b.mapTitle.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Map Lon',
          dataIndex: 'mapLon',
          key: 'mapLon',
          align: 'center',
          sorter: (a, b) => a.mapLon - b.mapLon,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Map Lat',
          dataIndex: 'mapLat',
          key: 'mapLat',
          align: 'center',
          sorter: (a, b) => a.mapLat - b.mapLat,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Map Time',
          dataIndex: 'mapTime',
          key: 'mapTime',
          align: 'center',
          sorter: (a, b) => a.mapTime.length - b.mapTime.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true,
        },
        {
          title: 'Map Publish Time',
          dataIndex: 'mapPublishTime',
          key: 'mapPublishTime',
          align: 'center',
          sorter: (a, b) => a.mapPublishTime - b.mapPublishTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Create Time',
          dataIndex: 'mapCreateTime',
          key: 'mapCreateTime',
          align: 'center',
          sorter: (a, b) => a.mapCreateTime - b.mapCreateTime,
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
          mapId: '1',
          mapTitle: 'test',
          mapLon: 125,
          mapLat: 14,
          mapTime: "4894189",
          mapPublishTime: 4894189,
          mapCreateTime: 32,
        },
        {
          mapId: '2',
          mapTitle: 'qwe',
          mapLon: 120,
          mapLat: 30,
          mapTime: "4894189",
          mapPublishTime: 4894189,
          mapCreateTime: 123,
        },
      ],
    };

    this.updateTable();
  }

  updateTable = () => {
    let requestUrl = '';
    if (this.props.cascadeValue.length === 0) {
      requestUrl = '/v1.0/api/mapinfos';
    } else {
      requestUrl = '/v1.0/api/mapinfos/tagName/' + this.props.cascadeValue.join('@');
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
        this.setState({dataSource: res.mapInfos})
        message.success('更新地理信息表格成功');
      } else {
        this.setState({dataSource: []})
        message.error('更新地理信息表格失败,' + res.message);
      }
    });
  }

  deleteRecord = (text, record) => {
    if (this.props.cascadeValue.length === 0) {
      message.warning('标签名称为空');
      return;
    }

    request({
      url: '/v1.0/api/mapinfo/' + record.mapId + '/tagName/' + this.props.cascadeValue.join("@"),
      method: 'DELETE',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.props.updateCascade();
        this.updateTable();
        message.success('删除地理信息成功');
      } else {
        message.error('删除地理信息失败,' + res.message);
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
