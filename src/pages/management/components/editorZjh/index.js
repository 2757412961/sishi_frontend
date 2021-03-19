import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

export default class EditorDemo extends React.Component {
  state = {
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

  // async componentDidMount () {
  //   // 假设此处从服务端获取html格式的编辑器内容
  //   const htmlContent = await fetchEditorContent()
  //   // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
  //   this.setState({
  //     editorState: BraftEditor.createEditorState(htmlContent)
  //   })
  // }

  // submitContent = async () => {
  //   // 在编辑器获得焦点时按下ctrl+s会执行此方法
  //   // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
  //   const htmlContent = this.state.editorState.toHTML()
  //   const result = await saveEditorContent(htmlContent)
  // }

  initMediaItems = () => {

  }

  handleEditorChange = (editorState) => {
    this.setState({editorState});
  };

  preview = () => {
    // 测试 HTML 输出结果
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

  myUploadFn = (param) => {
    const serverURL = 'http://upload-server'
    const xhr = new XMLHttpRequest()
    const fd = new FormData()

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: xhr.responseText,
        meta: {
          id: 'xxx',
          title: 'xxx',
          alt: 'xxx',
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        }
      })
    }

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }

    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)

    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  }

  render() {
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
      <div className="my-component">
        <BraftEditor
          value={editorState}
          placeholder="请输入正文内容"
          onChange={this.handleEditorChange}
          extendControls={extendControls}
          media={{accepts: mediaAccepts, items: this.state.mediaItems, uploadFn: this.myUploadFn}}
          // onSave={this.submitContent} // 在编辑器内按下Command/Ctrl + s时触发的函数
        />
      </div>
    );
  }

}
