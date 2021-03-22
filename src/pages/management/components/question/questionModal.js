import React, {Component} from 'react';
import {Modal, Form, Input, Button, Upload, Icon, message} from 'antd';
import {Link} from "react-router-dom";
import request from "@/utils/request";

class QuestionModal extends Component {
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
        let formData = this.props.form.getFieldsValue();

        this.setState({confirmLoading: true});

        request({
          url: '/v1.0/api/question/tagName/' + formData.tagName,
          method: 'POST',
          data: {
            questionContent: formData.questionContent,
            optionA: formData.optionA,
            optionB: formData.optionB,
            optionC: formData.optionC,
            optionD: formData.optionD,
            optionE: formData.optionE,
            answer: formData.answer,
          },
          autoAdd: false, //不添加v1.0
        }).then((res) => {
          console.log(res);

          if (res.success) {
            this.props.updateAllTable();
            this.closeModal();
            message.success('添加题目成功');
          } else {
            message.error('添加题目失败,' + res.message);
          }

          this.setState({confirmLoading: false});
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
        <Button type="primary" onClick={this.showModal}>新增题目资源</Button>

        <Modal
          title="新增题目资源"
          visible={this.state.modalVisible}
          onCancel={this.closeModal}
          footer={[
            <Button key='cancel' htmlType="button" onClick={this.closeModal}>取消</Button>,
            <Button key='reset' type="danger" htmlType="button" onClick={this.resetModal}>重置</Button>,
            <Button key='submit' type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>,
          ]}
          destroyOnClose={true}>

          <Form name="basic" {...layout} style={{}}>
            <Form.Item label="标签名称" name="tagName" extra="请在主页面选好标签！">
              {getFieldDecorator('tagName', {
                initialValue: this.props.cascadeValue.join("@"),
                rules: [{required: true, message: '请输入标签名称!'},]
              })(
                <Input disabled={true}/>
              )}
            </Form.Item>

            <Form.Item label="题目内容题" name="questionContent">
              {getFieldDecorator('questionContent', {rules: [{required: true, message: '请输入题目内容!'},]})(
                <Input placeholder="请输入题目内容"/>
              )}
            </Form.Item>

            <Form.Item label="选项A" name="optionA">
              {getFieldDecorator('optionA',)(
                <Input placeholder="请输入选项A"/>
              )}
            </Form.Item>
            <Form.Item label="选项B" name="optionB">
              {getFieldDecorator('optionB',)(
                <Input placeholder="请输入选项B"/>
              )}
            </Form.Item>
            <Form.Item label="选项C" name="optionC">
              {getFieldDecorator('optionC',)(
                <Input placeholder="请输入选项C"/>
              )}
            </Form.Item>
            <Form.Item label="选项D" name="optionD">
              {getFieldDecorator('optionD',)(
                <Input placeholder="请输入选项D"/>
              )}
            </Form.Item>
            <Form.Item label="选项E" name="optionE">
              {getFieldDecorator('optionE',)(
                <Input placeholder="请输入选项E"/>
              )}
            </Form.Item>

            <Form.Item label="答案" name="answer">
              {getFieldDecorator('answer', {rules: [{required: true, message: '请输入答案!'},]})(
                <Input placeholder="请输入答案"/>
              )}
            </Form.Item>

          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(QuestionModal);
