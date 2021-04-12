import React, {Component} from 'react';
import {Modal, Form, Input, Button, Breadcrumb, message} from 'antd';
import request from "@/utils/request";

class MapinfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmLoading: false,
    };
  }

  setModalVisible = (val) => {
    this.setState({modalVisible: val});
  };

  showModal = () => {
    this.setModalVisible(true);
  };

  closeModal = () => {
    this.setModalVisible(false);
  };

  resetModal = () => {
    this.props.form.resetFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.props.form.getFieldsValue());
        let formData = this.props.form.getFieldsValue();

        request({
          url: '/v1.0/api/mapinfo/tagName/' + formData.tagName,
          method: 'POST',
          data: {
            mapTitle: formData.mapTitle,
            mapLon: formData.mapLon,
            mapLat: formData.mapLat,
            mapTime: formData.mapTime,
          },
          autoAdd: false, //不添加v1.0
        }).then((res) => {
          console.log(res);

          if (res.success) {
            this.props.updateAllTable();
            this.closeModal();
            message.success('添加地理信息成功');
          } else {
            message.error('添加地理信息失败,' + res.message);
          }
        })
      }
    });
  };

  render() {
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
      },
    };
    const {getFieldDecorator} = this.props.form;

    return (
      <>
        <Button type="primary" onClick={this.showModal}>新增地理资源</Button>

        <Modal
          title="新增标签资源"
          visible={this.state.modalVisible}
          onCancel={this.closeModal}
          footer={[
            <Button key='cancel' htmlType="button" onClick={this.closeModal}>取消</Button>,
            <Button key='reset' type="danger" htmlType="button" onClick={this.resetModal}>重置</Button>,
            <Button key='submit' type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>,
          ]}
          destroyOnClose={true}>

          <Form name="basic" {...layout}>
            <Form.Item label="标签名称" name="tagName" extra="请在主页面选好标签！">
              {getFieldDecorator('tagName', {
                initialValue: this.props.cascadeValue.join("@"),
                rules: [{required: true, message: '请输入标签名称!'},]
              })(
                <Input disabled={true}/>
              )}
            </Form.Item>

            <Form.Item label="地图名称" name="mapTitle">
              {getFieldDecorator('mapTitle', {rules: [{required: true, message: '请输入地图名称!'},]})(
                <Input placeholder="请输入地图名称"/>
              )}
            </Form.Item>

            <Form.Item label="地理信息(经度)" name="mapLon">
              {getFieldDecorator('mapLon', {rules: [{required: true, message: '请输入地理信息(经度)!'},]})(
                <Input placeholder="请输入经度"/>
              )}
            </Form.Item>

            <Form.Item label="地理信息(纬度)" name="mapLat">
              {getFieldDecorator('mapLat', {rules: [{required: true, message: '请输入地理信息(纬度)!'},]})(
                <Input placeholder="请输入纬度"/>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(MapinfoModal);
