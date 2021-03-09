import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

export default class EditorDemo extends React.Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null),
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

  handleEditorChange = (editorState) => {
    this.setState({ editorState });
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

  render() {
    const { editorState } = this.state;
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview,
      },
    ];
    const medias = {
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
          media={{ uploadFn: this.myUploadFn }}
          // onSave={this.submitContent} // 在编辑器内按下Command/Ctrl + s时触发的函数
        />
      </div>
    );
  }

}
