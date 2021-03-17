import React, {Component} from 'react';
import {Modal, Form, Input, Button, Breadcrumb, message} from 'antd';
import {Link} from "react-router-dom";
import BraftEditor from "braft-editor";

class ArticleModal extends Component {
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
        <Button type="primary" onClick={this.showModal}>新增文章资源</Button>

        <Modal
          title="新增标签资源"
          visible={this.state.modalVisible}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.closeModal}
          footer={[
            <Button key='cancel' htmlType="button" onClick={this.closeModal}>取消</Button>,
            <Button key='reset' type="danger" htmlType="button" onClick={this.resetModal}>重置</Button>,
            <Button key='submit' type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>,
          ]}
          destroyOnClose={true}>

          <Form name="basic" {...layout}>
            <Form.Item label="标签名称" name="tagName">
              {getFieldDecorator('tagName', {initialValue: this.props.cascadeValue.join("@")})(
                <Input disabled={true}/>
              )}
            </Form.Item>

            <Form.Item label="文章标题" name="articleTitle">
              {getFieldDecorator('articleTitle', {rules: [{required: true, message: '请输入文章标题!'},]})(
                <Input placeholder="请输入文章标题"/>
              )}
            </Form.Item>

            <Form.Item label="文章作者" name="articleAuthor">
              {getFieldDecorator('articleAuthor', {rules: [{required: true, message: '请输入文章作者!'},]})(
                <Input placeholder="请输入文章作者"/>
              )}
            </Form.Item>

            <Form.Item label="文章正文">
              {getFieldDecorator('content', {
                validateTrigger: 'onBlur',
                rules: [{
                  required: true,
                  validator: (_, value, callback) => {
                    if (value.isEmpty()) {
                      callback('请输入正文内容')
                    } else {
                      callback()
                    }
                  }
                }],
              })(
                <BraftEditor
                  className="my-editor"
                  placeholder="请输入正文内容"
                />
              )}
            </Form.Item>

          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(ArticleModal);
