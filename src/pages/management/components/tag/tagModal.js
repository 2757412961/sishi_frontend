import React, {Component} from 'react';
import {Modal, Form, Input, Button, Checkbox, Cascader, Col, message, DatePicker} from 'antd';
import request from "@/utils/request";

class TagModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmLoading: false,
      cascadeValue: []
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
        let formData = this.props.form.getFieldsValue();
        let tagArr = [...formData.tagPath]; // 标签路径
        tagArr.push(formData.tagName); // 标签名称
        console.log(tagArr.join('@'));

        request({
          url: '/v1.0/api/tag',
          method: 'POST',
          data: {
            tagName: tagArr.join('@'),
            eventTime: formData.eventTime,
          },
          autoAdd: false, //不添加v1.0
        }).then((res) => {
          console.log(res);

          if (res.success) {
            this.props.updateCascade();
            this.props.updateAllTable();
            this.closeModal();
            message.success('添加标签成功');
          } else {
            message.error('添加标签失败,' + res.message);
          }
        })
      }
    });
  };

  onChangeCascade = (val) => {
    this.setState({cascadeValue: val});
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
        <Button type="primary" onClick={this.showModal}>新增标签</Button>

        <Modal
          title="新增标签资源"
          visible={this.state.modalVisible}
          onCancel={this.closeModal}
          footer={[
            <Button key='cancel' htmlType="button" onClick={this.closeModal}>取消</Button>,
            <Button key='reset' type="danger" htmlType="button" onClick={this.resetModal}>重置</Button>,
            <Button key='submit' type="primary" htmlType="submit" onClick={this.handleSubmit}
                    loading={this.state.confirmLoading}>提交</Button>,
          ]}
          destroyOnClose={true}>

          <Form name="basic" {...layout}>
            <Form.Item label="标签路径" name="tagPath">
              {getFieldDecorator('tagPath', {initialValue: []})(
                <Cascader
                  placeholder="请选择标签"
                  onChange={this.onChangeCascade}
                  options={this.props.cascadeOptions}
                  changeOnSelect/>
              )}
            </Form.Item>

            <Form.Item label="新建标签名称" name="tagName">
              {getFieldDecorator('tagName', {rules: [{required: true, message: '请输入新建标签名称!'},]})(
                <Input placeholder="请输入新建标签名称"/>
              )}
            </Form.Item>

            <Form.Item label="事件发生时间" name="eventTime">
              {getFieldDecorator('eventTime', {rules: [{required: true, message: '请输入事件发生时间!'},]})(
                <Input placeholder="样例: 1938年5月26日至6月3日"/>
              )}
            </Form.Item>

          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(TagModal);
