import React, {Component} from 'react';
import {Modal, Form, Input, Button, Breadcrumb, message, DatePicker} from 'antd';
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
          id: "rtsrtd89-59s",
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

  // Braft editor
  initMediaItems = () => {
    request({
      url: '/v1.0/api/tagResource/mediaItems',
      method: 'GET',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.setState({mediaItems: res.list})
        // message.success('更新媒体资源成功');
      } else {
        this.setState({mediaItems: []})
        message.error('更新媒体资源失败,' + res.message);
      }
    });
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
    <!DOCTYPE HTML>
    <!--
    \\tFuture Imperfect by HTML5 UP
    \\thtml5up.net | @ajlkn
    \\tFree for personal and commercial use under the CCA 3.0 license (html5up.net/license)
    -->
    <html>
    <head>
      <title>${this.props.form.getFieldsValue().articleTitle}</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
      <style type="text/css">
         @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Raleway:400,800,900");html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;}@-ms-viewport{width:device-width;}body{-ms-overflow-style:scrollbar;}@media screen and (max-width:480px){html,body{min-width:320px;}}html{box-sizing:border-box;}*,*:before,*:after{box-sizing:inherit;}body{background:#f4f4f4;}body.is-preload *,body.is-preload *:before,body.is-preload *:after{-moz-animation:none !important;-webkit-animation:none !important;-ms-animation:none !important;animation:none !important;-moz-transition:none !important;-webkit-transition:none !important;-ms-transition:none !important;transition:none !important;}body,input,select,textarea{color:#646464;font-family:"Source Sans Pro",Helvetica,sans-serif;font-size:14pt;font-weight:400;line-height:1.75;}@media screen and (max-width:1680px){body,input,select,textarea{font-size:12pt;}}@media screen and (max-width:1280px){body,input,select,textarea{font-size:12pt;}}@media screen and (max-width:980px){body,input,select,textarea{font-size:12pt;}}@media screen and (max-width:736px){body,input,select,textarea{font-size:12pt;}}@media screen and (max-width:480px){body,input,select,textarea{font-size:12pt;}}a{-moz-transition:color 0.2s ease,border-bottom-color 0.2s ease;-webkit-transition:color 0.2s ease,border-bottom-color 0.2s ease;-ms-transition:color 0.2s ease,border-bottom-color 0.2s ease;transition:color 0.2s ease,border-bottom-color 0.2s ease;border-bottom:dotted 1px rgba(160,160,160,0.65);color:inherit;text-decoration:none;}a:before{-moz-transition:color 0.2s ease;-webkit-transition:color 0.2s ease;-ms-transition:color 0.2s ease;transition:color 0.2s ease;}a:hover{border-bottom-color:transparent;color:#2ebaae !important;}a:hover:before{color:#2ebaae !important;}strong,b{color:#3c3b3b;font-weight:700;}em,i{font-style:italic;}p{margin:0 0 2em 0;}h1,h2,h3,h4,h5,h6{color:#3c3b3b;font-family:"Raleway",Helvetica,sans-serif;font-weight:800;letter-spacing:0.25em;line-height:1.65;margin:0 0 1em 0;text-transform:uppercase;}h1 a,h2 a,h3 a,h4 a,h5 a,h6 a{color:inherit;border-bottom:0;}h2{font-size:1.1em;}h3{font-size:0.9em;}h4{font-size:0.7em;}h5{font-size:0.7em;}h6{font-size:0.7em;}sub{font-size:0.8em;position:relative;top:0.5em;}sup{font-size:0.8em;position:relative;top:-0.5em;}blockquote{border-left:solid 4px rgba(160,160,160,0.3);font-style:italic;margin:0 0 2em 0;padding:0.5em 0 0.5em 2em;}code{background:rgba(160,160,160,0.075);border:solid 1px rgba(160,160,160,0.3);font-family:"Courier New",monospace;font-size:0.9em;margin:0 0.25em;padding:0.25em 0.65em;}pre{-webkit-overflow-scrolling:touch;font-family:"Courier New",monospace;font-size:0.9em;margin:0 0 2em 0;}pre code{display:block;line-height:1.75em;padding:1em 1.5em;overflow-x:auto;}hr{border:0;border-bottom:solid 1px rgba(160,160,160,0.3);margin:2em 0;}hr.major{margin:3em 0;}.align-left{text-align:left;}.align-center{text-align:center;}.align-right{text-align:right;}ol{list-style:decimal;margin:0 0 2em 0;padding-left:1.25em;}ol li{padding-left:0.25em;}ul{list-style:disc;margin:0 0 2em 0;padding-left:1em;}ul li{padding-left:0.5em;}ul.alt{list-style:none;padding-left:0;}ul.alt li{border-top:solid 1px rgba(160,160,160,0.3);padding:0.5em 0;}ul.alt li:first-child{border-top:0;padding-top:0;}dl{margin:0 0 2em 0;}dl dt{display:block;font-weight:700;margin:0 0 1em 0;}dl dd{margin-left:2em;}ul.posts{list-style:none;padding:0;}ul.posts li{border-top:dotted 1px rgba(160,160,160,0.3);margin:1.5em 0 0 0;padding:1.5em 0 0 0;}ul.posts li:first-child{border-top:0;margin-top:0;padding-top:0;}ul.posts article{display:-moz-flex;display:-webkit-flex;display:-ms-flex;display:flex;-moz-align-items:-moz-flex-start;-ms-align-items:-ms-flex-start;align-items:flex-start;-moz-flex-direction:row-reverse;-webkit-flex-direction:row-reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;}ul.posts article .image{display:block;margin-right:1.5em;min-width:4em;width:4em;}ul.posts article .image img{width:100%;}ul.posts article header{-moz-flex-grow:1;-webkit-flex-grow:1;-ms-flex-grow:1;flex-grow:1;-ms-flex:1;}ul.posts article header h3{font-size:0.7em;margin-top:0.125em;}ul.posts article header .published{display:block;font-family:"Raleway",Helvetica,sans-serif;font-size:0.6em;font-weight:400;letter-spacing:0.25em;margin:-0.625em 0 1.7em 0;text-transform:uppercase;}ul.posts article header >:last-child{margin-bottom:0;}.mini-post{display:-moz-flex;display:-webkit-flex;display:-ms-flex;display:flex;-moz-flex-direction:column-reverse;-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;background:#ffffff;border:solid 1px rgba(160,160,160,0.3);margin:0 0 2em 0;}.mini-post .image{overflow:hidden;width:100%;}.mini-post .image img{-moz-transition:-moz-transform 0.2s ease-out;-webkit-transition:-webkit-transform 0.2s ease-out;-ms-transition:-ms-transform 0.2s ease-out;transition:transform 0.2s ease-out;width:100%;}.mini-post .image:hover img{-moz-transform:scale(1.05);-webkit-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05);}.mini-post header{padding:1.25em 4.25em 0.1em 1.25em;min-height:4em;position:relative;-moz-flex-grow:1;-webkit-flex-grow:1;-ms-flex-grow:1;flex-grow:1;}.mini-post header h3{font-size:0.7em;}.mini-post header .published{display:block;font-family:"Raleway",Helvetica,sans-serif;font-size:0.6em;font-weight:400;letter-spacing:0.25em;margin:-0.625em 0 1.7em 0;text-transform:uppercase;}.mini-post header .author{position:absolute;right:2em;top:2em;}.mini-posts{margin:0 0 2em 0;}@media screen and (max-width:1280px){.mini-posts{display:-moz-flex;display:-webkit-flex;display:-ms-flex;display:flex;-moz-flex-wrap:wrap;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;width:calc(100% + 2em);}.mini-posts > *{margin:2em 2em 0 0;width:calc(50% - 2em);}.mini-posts >:nth-child(-n + 2){margin-top:0;}}@media screen and (max-width:480px){.mini-posts{display:block;width:100%;}.mini-posts > *{margin:0 0 2em 0;width:100%;}}.post{padding:3em 3em 1em 3em;background:#ffffff;border:solid 1px rgba(160,160,160,0.3);margin:0 0 1em 0;position:relative;}.post > header{display:-moz-flex;display:-webkit-flex;display:-ms-flex;display:flex;border-bottom:solid 1px rgba(160,160,160,0.3);left:-3em;margin:-3em 0 3em 0;position:relative;width:calc(100% + 6em);}.post > header .title{-moz-flex-grow:1;-webkit-flex-grow:1;-ms-flex-grow:1;flex-grow:1;-ms-flex:1;padding:3.75em 3em 3.3em 3em;}.post > header .title h2{font-weight:900;font-size:1.5em;}.post > header .title >:last-child{margin-bottom:0;}.post > header .meta{padding:3.75em 3em 1.75em 3em;border-left:solid 1px rgba(160,160,160,0.3);min-width:17em;text-align:right;width:17em;}.post > header .meta > *{margin:0 0 1em 0;}.post > header .meta >:last-child{margin-bottom:0;}.post > header .meta .published{color:#3c3b3b;display:block;font-family:"Raleway",Helvetica,sans-serif;font-size:0.7em;font-weight:800;letter-spacing:0.25em;margin-top:0.5em;text-transform:uppercase;white-space:nowrap;}.post > a.image.featured{overflow:hidden;}.post > a.image.featured img{-moz-transition:-moz-transform 0.2s ease-out;-webkit-transition:-webkit-transform 0.2s ease-out;-ms-transition:-ms-transform 0.2s ease-out;transition:transform 0.2s ease-out;}.post > a.image.featured:hover img{-moz-transform:scale(1.05);-webkit-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05);}.post > footer{display:-moz-flex;display:-webkit-flex;display:-ms-flex;display:flex;-moz-align-items:center;-webkit-align-items:center;-ms-align-items:center;align-items:center;}.post > footer .actions{-moz-flex-grow:1;-webkit-flex-grow:1;-ms-flex-grow:1;flex-grow:1;}.post > footer .stats{cursor:default;list-style:none;padding:0;}.post > footer .stats li{border-left:solid 1px rgba(160,160,160,0.3);display:inline-block;font-family:"Raleway",Helvetica,sans-serif;font-size:0.6em;font-weight:400;letter-spacing:0.25em;line-height:1;margin:0 0 0 2em;padding:0 0 0 2em;text-transform:uppercase;}.post > footer .stats li:first-child{border-left:0;margin-left:0;padding-left:0;}.post > footer .stats li .icon{border-bottom:0;}.post > footer .stats li .icon:before{color:rgba(160,160,160,0.3);margin-right:0.75em;}@media screen and (max-width:980px){.post{border-left:0;border-right:0;left:-3em;width:calc(100% + (3em * 2));}.post > header{-moz-flex-direction:column;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:3.75em 3em 1.25em 3em;border-left:0;}.post > header .title{-ms-flex:0 1 auto;margin:0 0 2em 0;padding:0;text-align:center;}.post > header .meta{-moz-align-items:center;-webkit-align-items:center;-ms-align-items:center;align-items:center;display:-moz-flex;display:-webkit-flex;display:-ms-flex;display:flex;-moz-justify-content:center;-webkit-justify-content:center;-ms-justify-content:center;justify-content:center;border-left:0;margin:0 0 2em 0;padding-top:0;padding:0;text-align:left;width:100%;}.post > header .meta > *{border-left:solid 1px rgba(160,160,160,0.3);margin-left:2em;padding-left:2em;}.post > header .meta >:first-child{border-left:0;margin-left:0;padding-left:0;}.post > header .meta .published{margin-bottom:0;margin-top:0;}.post > header .meta .author{-moz-flex-direction:row-reverse;-webkit-flex-direction:row-reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;margin-bottom:0;}.post > header .meta .author .name{margin:0 0 0 1.5em;}.post > header .meta .author img{width:3.5em;}}@media screen and (max-width:736px){.post{padding:1.5em 1.5em 0.1em 1.5em;left:-1.5em;margin:0 0 2em 0;width:calc(100% + (1.5em * 2));}.post > header{padding:3em 1.5em 0.5em 1.5em;left:-1.5em;margin:-1.5em 0 1.5em 0;width:calc(100% + 3em);}.post > header .title h2{font-size:1.1em;}}@media screen and (max-width:480px){.post > header .meta{-moz-align-items:center;-webkit-align-items:center;-ms-align-items:center;align-items:center;-moz-flex-direction:column;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.post > header .meta > *{border-left:0;margin:1em 0 0 0;padding-left:0;}.post > header .meta .author .name{display:none;}.post > .image.featured{margin-left:-1.5em;margin-top:calc(-1.5em - 1px);width:calc(100% + 3em);}.post > footer{-moz-align-items:-moz-stretch;-ms-align-items:-ms-stretch;align-items:stretch;-moz-flex-direction:column-reverse;-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;}.post > footer .stats{text-align:center;}.post > footer .stats li{margin:0 0 0 1.25em;padding:0 0 0 1.25em;}}#header{display:-moz-flex;display:-webkit-flex;display:-ms-flex;display:flex;-moz-justify-content:space-between;-webkit-justify-content:space-between;-ms-justify-content:space-between;justify-content:space-between;background-color:#ffffff;border-bottom:solid 1px rgba(160,160,160,0.3);height:3.5em;left:0;line-height:3.5em;position:fixed;top:0;width:100%;z-index:10000;}#header a{color:inherit;text-decoration:none;}#header ul{list-style:none;margin:0;padding-left:0;}#header ul li{display:inline-block;padding-left:0;}#header h1{height:inherit;line-height:inherit;padding:0 0 0 1.5em;white-space:nowrap;}#header h1 a{font-size:0.7em;}#header .links{-moz-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;border-left:solid 1px rgba(160,160,160,0.3);height:inherit;line-height:inherit;margin-left:1.5em;overflow:hidden;padding-left:1.5em;}#header .links ul li{border-left:solid 1px rgba(160,160,160,0.3);line-height:1;margin-left:1em;padding-left:1em;}#header .links ul li:first-child{border-left:0;margin-left:0;padding-left:0;}#header .links ul li a{border-bottom:0;font-family:"Raleway",Helvetica,sans-serif;font-size:0.7em;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;}#header .main{height:inherit;line-height:inherit;text-align:right;}#header .main ul{height:inherit;line-height:inherit;}#header .main ul li{border-left:solid 1px rgba(160,160,160,0.3);height:inherit;line-height:inherit;white-space:nowrap;}#header .main ul li > *{display:block;float:left;}#header .main ul li > a{text-decoration:none;border-bottom:0;color:#aaaaaa;overflow:hidden;position:relative;text-indent:4em;width:4em;}#header .main ul li > a:before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-variant:normal;text-rendering:auto;line-height:1;text-transform:none !important;font-family:'Font Awesome 5 Free';font-weight:900;}#header .main ul li > a:before{display:block;height:inherit;left:0;line-height:inherit;position:absolute;text-align:center;text-indent:0;top:0;width:inherit;}#header form{margin:0;}#header form input{display:inline-block;height:2.5em;position:relative;top:-2px;vertical-align:middle;}#header #search{-moz-transition:all 0.5s ease;-webkit-transition:all 0.5s ease;-ms-transition:all 0.5s ease;transition:all 0.5s ease;max-width:0;opacity:0;overflow:hidden;padding:0;white-space:nowrap;}#header #search input{width:12em;}#header #search.visible{max-width:12.5em;opacity:1;padding:0 0.5em 0 0;}@media screen and (max-width:980px){#header .links{display:none;}}@media screen and (max-width:736px){#header{height:2.75em;line-height:2.75em;}#header h1{padding:0 0 0 1em;}#header .main .search{display:none;}}#wrapper{display:-moz-flex;display:-webkit-flex;display:-ms-flex;display:flex;-moz-flex-direction:row-reverse;-webkit-flex-direction:row-reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;-moz-transition:opacity 0.5s ease;-webkit-transition:opacity 0.5s ease;-ms-transition:opacity 0.5s ease;transition:opacity 0.5s ease;margin:0 auto;max-width:100%;opacity:1;padding:4.5em;width:90em;}body.is-menu-visible #wrapper{opacity:0.15;}@media screen and (max-width:1680px){#wrapper{padding:0em 3em 0em 3em;}}@media screen and (max-width:1280px){#wrapper{display:block;}}@media screen and (max-width:736px){#wrapper{padding:1.5em;}}body.single #wrapper{display:block;}#main{-moz-flex-grow:1;-webkit-flex-grow:1;-ms-flex-grow:1;flex-grow:1;-ms-flex:1;width:100%;}#sidebar{margin-right:3em;min-width:22em;width:22em;}#sidebar > *{border-top:solid 1px rgba(160,160,160,0.3);margin:3em 0 0 0;padding:3em 0 0 0;}#sidebar >:first-child{border-top:0;margin-top:0;padding-top:0;}@media screen and (max-width:1280px){#sidebar{border-top:solid 1px rgba(160,160,160,0.3);margin:3em 0 0 0;min-width:0;padding:3em 0 0 0;width:100%;overflow-x:hidden;}}#footer .icons{color:#aaaaaa;}#footer .copyright{color:#aaaaaa;font-family:"Raleway",Helvetica,sans-serif;font-size:0.5em;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;}body.single #footer{text-align:center;}
      </style>
    </head>
    <body class="single is-preload">

    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <!-- Post -->
        <article class="post">
          <header>
            <div class="title">
              <h2>${this.handleEmpty(this.props.form.getFieldsValue().articleTitle)}</h2>
            </div>
            <div class="meta">
              <time class="published" >事件发生时间：${this.handleEmpty(this.props.form.getFieldsValue().articleEventTime)}</time>
              <time class="published" >事件发生地点：${this.handleEmpty(this.props.form.getFieldsValue().articleAddress)}</time>
            </div>
          </header>
          <div>
                ${this.state.editorState.toHTML()}
          </div>
          <footer>
            <ul class="stats">
              <li  style="font-size: 10px; color: #828080; ">来源：${this.handleEmpty(this.props.form.getFieldsValue().articleSource)}</li>
              <li  style="font-size: 10px; color: #828080; ">作者：${this.handleEmpty(this.props.form.getFieldsValue().articleAuthor)}</li>
            </ul>
          </footer>
        </article>
      </div>

      <!-- Footer -->
      <section id="footer">
        <p class="copyright">&copy; 浙江大学 地球科学学院.</p>
      </section>
    </div>

    </body>
    </html>
    `;
  }

  handleEmpty(value) {
    if (value === undefined) {
      return "无";
    }
    return value;
  }

  //5.由于图片上传、视频上传项目中都是单独走的接口，需要一个上传的方法
  myUploadFn = (param) => {

    alert("该接口暂时不能使用！！！");
    return;

    console.log('param', param);
    const serverURL = "/v1.0/api/video/form";//upload 是接口地址
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      const upLoadObject = JSON.parse(response && response.currentTarget && response.currentTarget.response);
      console.log('response', response);
      console.log('upLoadObject', upLoadObject);
      console.log('xhr.responseText', xhr.responseText);
      console.log('responseText', JSON.parse(xhr.responseText));
      param.success({
        url: upLoadObject && upLoadObject.audioContent && upLoadObject.pictureContent && upLoadObject.videoContent,
        meta: {
          id: upLoadObject && upLoadObject.videoId,
          title: upLoadObject && upLoadObject.videoTitle,
          alt: upLoadObject && upLoadObject.videoTitle,
          loop: false, // 指定音视频是否循环播放
          autoPlay: false, // 指定音视频是否自动播放
          controls: false, // 指定音视频是否显示控制栏
          poster: '', // 指定视频播放器的封面
        }
      })
    };

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)

    };

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    };

    xhr.upload.addEventListener("progress", progressFn, false);
    xhr.addEventListener("load", successFn, false);
    xhr.addEventListener("error", errorFn, false);
    xhr.addEventListener("abort", errorFn, false);

    // 发送上传请求 ---------------------------------------
    let formData = this.props.form.getFieldsValue();
    fd.append("tagName", formData.tagName);
    fd.append("videoTitle", formData.articleTitle);
    fd.append("videoSource", formData.articleAuthor);
    fd.append("videoFile", param.file);

    // fd.append('file', param.file);
    xhr.open('POST', serverURL, true);
    // xhr.setRequestHeader("X-Auth-Token", User.getToken());//header中token的设置
    xhr.send(fd)
  };

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
        console.log(formData);

        request({
          url: '/v1.0/api/article/tagName/' + formData.tagName,
          method: 'POST',
          data: {
            articleTitle: formData.articleTitle,
            articleAuthor: formData.articleAuthor,
            articleSource: formData.articleSource,
            articleContent: this.buildPreviewHtml(),
            articleEventTime: formData.articleEventTime,
            articleAddress: formData.articleAddress,
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
        span: 3,
      },
      wrapperCol: {
        span: 21,
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
          ]}
          destroyOnClose={true}
        >


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

            <Form.Item label="文章来源" name="articleSource">
              {getFieldDecorator('articleSource', )(
                <Input placeholder="请输入文章来源"/>
              )}
            </Form.Item>

            <Form.Item label="事件发生时间" name="articleEventTime">
              {getFieldDecorator('articleEventTime', {rules: [{required: true, message: '请输入事件发生时间!'},]})(
                <Input placeholder="时间格式：2016-09-01~2020-06-01"/>
              )}
            </Form.Item>

            <Form.Item label="事件发生地点" name="articleAddress">
              {getFieldDecorator('articleAddress', {rules: [{required: true, message: '请输入事件发生地点!'},]})(
                <Input placeholder="请输入事件发生地点"/>
              )}
            </Form.Item>

            <Form.Item label="文章正文" name={"articleContent"}>
              <BraftEditor
                value={editorState}
                placeholder="请输入正文内容"
                onChange={this.handleEditorChange}
                extendControls={extendControls}
                media={{accepts: mediaAccepts, items: this.state.mediaItems, uploadFn: this.myUploadFn}}/>
            </Form.Item>

          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(ArticleModal);
