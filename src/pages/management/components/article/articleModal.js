import React, {Component} from 'react';
import {Modal, Form, Input, Button, Breadcrumb, message} from 'antd';
import {Link} from "react-router-dom";
import BraftEditor from "braft-editor";
import request from "@/utils/request";

class ArticleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmLoading: false,

      // 创建一个空的editorState作为初始值
      editorState: BraftEditor.createEditorState(null),
      mediaItems: [
        {
          id: 1,
          type: 'IMAGE',
          url: 'https://margox.cn/wp-content/uploads/2018/09/IMG_9508.jpg'
        }, {
          id: 2,
          type: 'VIDEO',
          url: 'http://192.168.137.1:8088/media/video/Bishop%20Briggs%20-%20River.mp4'
        }, {
          id: 3,
          type: 'IMAGE',
          url: 'http://cpc.people.com.cn/NMediaFile/2021/0312/MAIN202103120915000347748011503.jpg'
        }, {
          id: 4,
          type: 'AUDIO',
          url: 'https://margox.cn/wp-content/uploads/2016/10/Jesper-Kyd-Venice-Rooftops.mp3'
        }, {
          id: 5,
          type: 'IMAGE',
          url: 'http://www.hebgcdy.com/ztbd/zggcdwsmn/images/toutu.png'
        }
      ],
    };

    this.initMediaItems();
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


  // Braft editor
  initMediaItems = () => {

  }

  handleEditorChange = (editorState) => {
    this.setState({editorState});
  };

  preview = () => {
    // 测试 HTML 输出结果
    console.log(this.state.editorState.isEmpty());
    console.log(this.state.editorState.toHTML());
    console.log(this.buildPreviewHtml());

    if (window.previewWindow) {
      window.previewWindow.close();
    }

    window.previewWindow = window.open();
    window.previewWindow.document.write(this.buildPreviewHtml());
    window.previewWindow.document.close();
  };

  buildPreviewHtml() {
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `;
  }


  // submit
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.editorState.isEmpty()) {
      message.warning('正文内容为空');
      return;
    }

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formData = this.props.form.getFieldsValue();

        request({
          url: '/v1.0/api/article/tagName/' + formData.tagName,
          method: 'POST',
          data: {
            articleTitle: formData.articleTitle,
            articleAuthor: formData.articleAuthor,
            articleContent: this.buildPreviewHtml()
          },
          autoAdd: false, //不添加v1.0
        }).then((res) => {
          console.log(res);

          if (res.success) {
            this.props.updateAllTable();
            this.closeModal();
            message.success('添加文章成功');
          } else {
            message.error('添加文章失败,' + res.message);
          }
        })
      }
    });
  };

  render() {
    const layout = {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 22,
      },
    };
    const {getFieldDecorator} = this.props.form;

    const {editorState} = this.state;
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview,
      },
    ];
    const mediaAccepts = {
      image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
      video: 'video/mp4',
      audio: 'audio/mp3',
    };

    return (
      <>
        <Button type="primary" onClick={this.showModal}>新增文章资源</Button>

        <Modal
          title="新增文章资源"
          width={1200}
          visible={this.state.modalVisible}
          onCancel={this.closeModal}
          footer={[
            <Button key='cancel' htmlType="button" onClick={this.closeModal}>取消</Button>,
            <Button key='reset' type="danger" htmlType="button" onClick={this.resetModal}>重置</Button>,
            <Button key='submit' type="primary" htmlType="submit" onClick={this.handleSubmit}
                    loading={this.state.confirmLoading}>提交</Button>,
          ]}>
          {/*destroyOnClose={true}*/}

          <Form name="basic" {...layout}>
            <Form.Item label="标签名称" name="tagName" extra="请在主页面选好标签！">
              {getFieldDecorator('tagName', {
                initialValue: this.props.cascadeValue.join("@"),
                rules: [{required: true, message: '请输入标签名称!'},]
              })(
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

            <Form.Item label="文章正文" name={"articleContent"}>
              <BraftEditor
                value={editorState}
                placeholder="请输入正文内容"
                onChange={this.handleEditorChange}
                extendControls={extendControls}
                media={{accepts: mediaAccepts, items: this.state.mediaItems}}/>
            </Form.Item>

          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(ArticleModal);
