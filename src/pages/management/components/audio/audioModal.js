import React, {Component} from 'react';
import {Modal, Form, Input, Button, Upload, DatePicker, Icon, message} from 'antd';
import request from "@/utils/request";

class AudioModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmLoading: false,
      audioFile: null
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

  beforeUpload = (file, fileList) => {
    let {name} = file;
    let fileExtension = name.substring(name.lastIndexOf('.') + 1);//截取文件后缀名
    console.log(file);
    console.log(file.type);

    if (file.type !== 'audio/mp3' && file.type !== 'audio/mpeg') {
      message.warning('文件格式不符合要求！');
      return false;
    }

    this.setState({audioFile: file})

    return false;
  }

  // submit
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.audioFile === null) {
      message.warning('未上传文件');
      return;
    }

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.props.form.getFieldsValue());
        let {tagName, audioTitle, audioSource, audioFile, eventTime} = this.props.form.getFieldsValue();
        let formData = new FormData();
        formData.append("tagName", tagName);
        formData.append("audioTitle", audioTitle);
        formData.append("audioSource", audioSource);
        formData.append("audioFile", this.state.audioFile);
        formData.append("eventTime", eventTime.format('YYYY-MM-DD'));

        this.setState({confirmLoading: true});

        request({
          url: '/v1.0/api/audio/form',
          method: 'POST',
          data: formData,
          autoAdd: false, //不添加v1.0
        }).then((res) => {
          console.log(res);

          if (res.success) {
            this.props.updateAllTable();
            this.closeModal();
            message.success('添加音频成功');
          } else {
            message.error('添加音频失败,' + res.message);
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
        <Button type="primary" onClick={this.showModal}>新增音频资源</Button>

        <Modal
          title="新增音频资源"
          // width={1200}
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
            <Form.Item label="标签名称" name="tagName" extra="请在主页面选好标签！">
              {getFieldDecorator('tagName', {
                initialValue: this.props.cascadeValue.join("@"),
                rules: [{required: true, message: '请输入标签名称!'},]
              })(
                <Input disabled={true}/>
              )}
            </Form.Item>

            <Form.Item label="音频标题" name="audioTitle">
              {getFieldDecorator('audioTitle', {rules: [{required: true, message: '请输入音频标题!'},]})(
                <Input placeholder="请输入音频标题"/>
              )}
            </Form.Item>

            <Form.Item label="音频来源" name="audioSource">
              {getFieldDecorator('audioSource', {rules: [{required: true, message: '请输入音频来源!'},]})(
                <Input placeholder="请输入音频来源"/>
              )}
            </Form.Item>

            <Form.Item label="事件发生时间" name="eventTime">
              {getFieldDecorator('eventTime', {rules: [{required: true, message: '请输入事件发生时间!'},]})(
                <DatePicker placeholder="请输入事件发生时间" format={'YYYY-MM-DD'}  />
                )}
            </Form.Item>

            <Form.Item label="音频文件" name="audioFile" extra="上传的音频仅支持MP3格式">
              <Upload
                beforeUpload={this.beforeUpload}
                listType="picture">
                <Button> <Icon type="upload"/> 选择文件 </Button>
              </Upload>
            </Form.Item>

          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(AudioModal);
