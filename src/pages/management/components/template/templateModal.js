import React, {Component} from 'react';
import {Modal, Form, Input, Button} from 'antd';

class MapinfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmLoading: false,
    };
  }

  showModal = () => {
    this.setModalVisible(true);
  };

  closeModal = () => {
    this.setModalVisible(false);
  };

  resetModal = () => {
    this.props.form.resetFields();
  }

  setModalVisible = (val) => {
    this.setState({modalVisible: val});
  };

  setConfirmLoading = (val) => {
    this.setState({confirmLoading: val});
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(this.props.form.getFieldsValue())
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
        <Button type="primary" onClick={this.showModal}>>新增标签资源</Button>

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

          <Form
            // preserve={false}
            name="basic"
            {...layout}>

            <Form.Item
              label="新建标签名称"
              name="tagName">
              {getFieldDecorator('tagName', {rules: [{required: true, message: '请输入新建标签名称!'},]})(
                <Input placeholder="请输入新建标签名称"/>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(MapinfoModal);
