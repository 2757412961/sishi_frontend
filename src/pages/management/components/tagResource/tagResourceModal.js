import React, {Component} from 'react';
import {Modal, Form, Input, Button, Upload, Icon, message} from 'antd';
import {Link} from "react-router-dom";
import request from "@/utils/request";

class TagResourceModal extends Component {
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

  // submit
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.props.form.getFieldsValue());
        let {resourceId} = this.props.form.getFieldsValue();

        request({
          url: '/v1.0/api/tagResources/' + resourceId,
          method: 'GET',
          autoAdd: false, //不添加v1.0
        }).then((res) => {
          console.log(res);

          if (res.success) {
            if (res.tagResources.length == 0){
              message.success('关联表中无此资源ID');
              return;
            }
            this.props.setCascadeValue(res.tagResources[0].tagName.split('@'));
            this.closeModal();
            message.success('查询成功');
          } else {
            message.error('查询失败,' + res.message);
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
        <Button type="primary" onClick={this.showModal}>查询资源</Button>

        <Modal
          title="查询资源"
          // width={1200}
          visible={this.state.modalVisible}
          onCancel={this.closeModal}
          footer={[
            <Button key='cancel' htmlType="button" onClick={this.closeModal}>取消</Button>,
            <Button key='reset' type="danger" htmlType="button" onClick={this.resetModal}>重置</Button>,
            <Button key='submit' type="primary" htmlType="submit" onClick={this.handleSubmit}>查询</Button>,
          ]}
          destroyOnClose={true}>

          <Form name="basic" {...layout}>
            <Form.Item label="资源 ID" name="resourceId">
              {getFieldDecorator('resourceId', {rules: [{required: true, message: '请输入资源ID!'},]})(
                <Input placeholder="请输入资源ID"/>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(TagResourceModal);
