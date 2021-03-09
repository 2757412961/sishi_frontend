import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';

export default class MapinfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmLoading: false,
      modalText: '',
    };
  }

   showModal = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (val) => {
    this.setState({ modalVisible: val });
  };

  setConfirmLoading = (val) => {
    this.setState({ confirmLoading: val });
  };

  setModalText = (val) => {
    this.setState({ modalText: val });
  };

  handleOk = () => {
    this.setModalText('The modal will be closed after two seconds');
    this.setConfirmLoading(true);
    setTimeout(() => {
      this.setModalVisible(false);
      this.setConfirmLoading(false);
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setModalVisible(false);
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          <FileAddOutlined/>新增地理信息资源
        </Button>

        <Modal
          title="Title"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}>
          
          <p>{this.state.modalText}</p>
        </Modal>
      </>
    );
  }
}
