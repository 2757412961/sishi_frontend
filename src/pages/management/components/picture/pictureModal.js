import React, {Component} from 'react';
import {Modal, Form, Input, Button, Upload, Icon, message, DatePicker} from 'antd';
import request from "@/utils/request";
import {getLocalData} from '@/utils/common.js';

class PictureModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmLoading: false,
      pictureFile: null
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

    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/gif'
      && file.type !== 'image/webp' && file.type !== 'image/apng' && file.type !== 'image/svg') {
      message.warning('文件格式不符合要求！');
      return false;
    }

    this.setState({pictureFile: file})

    return false;
  }

  // submit
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.pictureFile === null) {
      message.warning('未上传文件');
      return;
    }

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.props.form.getFieldsValue());
        let {tagName, pictureTitle, pictureAuthor, pictureSource, pictureFile} = this.props.form.getFieldsValue();
        let formData = new FormData();
        formData.append("tagName", tagName);
        formData.append("pictureTitle", pictureTitle);
        formData.append("pictureAuthor", pictureAuthor);
        formData.append("pictureSource", pictureSource);
        formData.append("pictureFile", this.state.pictureFile);

        this.setState({confirmLoading: true});

        request({
          url: '/v1.0/api/picture/form',
          method: 'POST',
          headers: {
            userId: getLocalData({dataName: 'userId'}),
            token: getLocalData({dataName: 'token'})
          },
          data: formData,
          autoAdd: false, //不添加v1.0
        }).then((res) => {
          console.log(res);

          if (res.success) {
            this.props.updateAllTable();
            this.closeModal();
            message.success('添加图片成功');
          } else {
            message.error('添加图片失败,' + res.message);
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
        <Button type="primary" onClick={this.showModal}>新增图片资源</Button>

        <Modal
          title="新增图片资源"
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

            <Form.Item label="图片标题" name="pictureTitle">
              {getFieldDecorator('pictureTitle', {rules: [{required: true, message: '请输入图片标题!'},]})(
                <Input placeholder="请输入图片标题"/>
              )}
            </Form.Item>

            <Form.Item label="图片作者" name="pictureAuthor">
              {getFieldDecorator('pictureAuthor', )(
                <Input placeholder="请输入图片作者"/>
              )}
            </Form.Item>

            <Form.Item label="图片来源" name="pictureSource">
              {getFieldDecorator('pictureSource', {rules: [{required: true, message: '请输入图片来源!'},]})(
                <Input placeholder="请输入图片来源"/>
              )}
            </Form.Item>

            <Form.Item label="图片文件" name="pictureFile">
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

export default Form.create()(PictureModal);
