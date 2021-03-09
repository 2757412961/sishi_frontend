import React, {Component} from 'react';
import {Modal, Form, Input, Button, Checkbox, Cascader, Col} from 'antd';
import {FileAddOutlined} from '@ant-design/icons';

class TagModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmLoading: false,
      cascadeValue: "",
    };
  }

  showModal = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (val) => {
    this.setState({modalVisible: val});
  };

  setConfirmLoading = (val) => {
    this.setState({confirmLoading: val});
  };

  handleOk = () => {
    this.setConfirmLoading(true);
    setTimeout(() => {
      this.setModalVisible(false);
      this.setConfirmLoading(false);
    }, 2000);
  };

  handleCancel = () => {
    this.setModalVisible(false);
  };

  onChangeCascade = (val) => {
    this.setState({cascadeValue: val});
    console.log(val);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
        <Button type="primary" onClick={this.showModal}> <FileAddOutlined/>新增标签资源 </Button>

        <Modal
          title="新增标签资源"
          visible={this.state.modalVisible}
          okText={"提交"}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          cancelText={"取消"}
          onCancel={this.handleCancel}
          footer={[<Button key='submit' type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>]}
          destroyOnClose={true}>

          <Form
            {...layout}
            form={this.form}
            // preserve={false}
            name="basic">
            <Form.Item
              label="标签路径"
              name="tagPath"
              rules={[{required: true, message: '请输入标签路径!'}]}>
              <Cascader
                placeholder="请选择标签"
                onChange={this.onChangeCascade}
                options={this.props.cascadeOptions}
                changeOnSelect/>
            </Form.Item>

            <Form.Item
              label="新建标签名称"
              name="tagName">
              {getFieldDecorator('tagName', {
                rules: [{required: true, message: '请输入新建标签名称!'}],
              })(<Input/>)}
            </Form.Item>
          </Form>
          <p>{this.state.modalText}</p>
        </Modal>
      </>
    );
  }
}

export default Form.create()(TagModal);
