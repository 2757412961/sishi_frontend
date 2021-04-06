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
        message.success('更新媒体资源成功');
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
    \tFuture Imperfect by HTML5 UP
    \thtml5up.net | @ajlkn
    \tFree for personal and commercial use under the CCA 3.0 license (html5up.net/license)
    -->
    <html>
    <head>
      <title>${this.props.form.getFieldsValue().articleTitle}</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
      <style type="text/css">
        @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Raleway:400,800,900");

        /*
          Future Imperfect by HTML5 UP
          html5up.net | @ajlkn
          Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
        */

        html, body, div, span, applet, object,
        iframe, h1, h2, h3, h4, h5, h6, p, blockquote,
        pre, a, abbr, acronym, address, big, cite,
        code, del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var, b,
        u, i, center, dl, dt, dd, ol, ul, li, fieldset,
        form, label, legend, table, caption, tbody,
        tfoot, thead, tr, th, td, article, aside,
        canvas, details, embed, figure, figcaption,
        footer, header, hgroup, menu, nav, output, ruby,
        section, summary, time, mark, audio, video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }

        article, aside, details, figcaption, figure,
        footer, header, hgroup, menu, nav, section {
          display: block;
        }

        body {
          line-height: 1;
        }

        ol, ul {
          list-style: none;
        }

        blockquote, q {
          quotes: none;
        }

        blockquote:before, blockquote:after, q:before, q:after {
          content: '';
          content: none;
        }

        table {
          border-collapse: collapse;
          border-spacing: 0;
        }

        body {
          -webkit-text-size-adjust: none;
        }

        mark {
          background-color: transparent;
          color: inherit;
        }

        input::-moz-focus-inner {
          border: 0;
          padding: 0;
        }

        input, select, textarea {
          -moz-appearance: none;
          -webkit-appearance: none;
          -ms-appearance: none;
          appearance: none;
        }

        /* Basic */

        @-ms-viewport {
          width: device-width;
        }

        body {
          -ms-overflow-style: scrollbar;
        }

        @media screen and (max-width: 480px) {

          html, body {
            min-width: 320px;
          }

        }

        html {
          box-sizing: border-box;
        }

        *, *:before, *:after {
          box-sizing: inherit;
        }

        body {
          background: #f4f4f4;
        }

        body.is-preload *, body.is-preload *:before, body.is-preload *:after {
          -moz-animation: none !important;
          -webkit-animation: none !important;
          -ms-animation: none !important;
          animation: none !important;
          -moz-transition: none !important;
          -webkit-transition: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }

        /* Type */

        body, input, select, textarea {
          color: #646464;
          font-family: "Source Sans Pro", Helvetica, sans-serif;
          font-size: 14pt;
          font-weight: 400;
          line-height: 1.75;
        }

        @media screen and (max-width: 1680px) {

          body, input, select, textarea {
            font-size: 12pt;
          }

        }

        @media screen and (max-width: 1280px) {

          body, input, select, textarea {
            font-size: 12pt;
          }

        }

        @media screen and (max-width: 980px) {

          body, input, select, textarea {
            font-size: 12pt;
          }

        }

        @media screen and (max-width: 736px) {

          body, input, select, textarea {
            font-size: 12pt;
          }

        }

        @media screen and (max-width: 480px) {

          body, input, select, textarea {
            font-size: 12pt;
          }

        }

        a {
          -moz-transition: color 0.2s ease, border-bottom-color 0.2s ease;
          -webkit-transition: color 0.2s ease, border-bottom-color 0.2s ease;
          -ms-transition: color 0.2s ease, border-bottom-color 0.2s ease;
          transition: color 0.2s ease, border-bottom-color 0.2s ease;
          border-bottom: dotted 1px rgba(160, 160, 160, 0.65);
          color: inherit;
          text-decoration: none;
        }

        a:before {
          -moz-transition: color 0.2s ease;
          -webkit-transition: color 0.2s ease;
          -ms-transition: color 0.2s ease;
          transition: color 0.2s ease;
        }

        a:hover {
          border-bottom-color: transparent;
          color: #2ebaae !important;
        }

        a:hover:before {
          color: #2ebaae !important;
        }

        strong, b {
          color: #3c3b3b;
          font-weight: 700;
        }

        em, i {
          font-style: italic;
        }

        p {
          margin: 0 0 2em 0;
        }

        h1, h2, h3, h4, h5, h6 {
          color: #3c3b3b;
          font-family: "Raleway", Helvetica, sans-serif;
          font-weight: 800;
          letter-spacing: 0.25em;
          line-height: 1.65;
          margin: 0 0 1em 0;
          text-transform: uppercase;
        }

        h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {
          color: inherit;
          border-bottom: 0;
        }

        h2 {
          font-size: 1.1em;
        }

        h3 {
          font-size: 0.9em;
        }

        h4 {
          font-size: 0.7em;
        }

        h5 {
          font-size: 0.7em;
        }

        h6 {
          font-size: 0.7em;
        }

        sub {
          font-size: 0.8em;
          position: relative;
          top: 0.5em;
        }

        sup {
          font-size: 0.8em;
          position: relative;
          top: -0.5em;
        }

        blockquote {
          border-left: solid 4px rgba(160, 160, 160, 0.3);
          font-style: italic;
          margin: 0 0 2em 0;
          padding: 0.5em 0 0.5em 2em;
        }

        code {
          background: rgba(160, 160, 160, 0.075);
          border: solid 1px rgba(160, 160, 160, 0.3);
          font-family: "Courier New", monospace;
          font-size: 0.9em;
          margin: 0 0.25em;
          padding: 0.25em 0.65em;
        }

        pre {
          -webkit-overflow-scrolling: touch;
          font-family: "Courier New", monospace;
          font-size: 0.9em;
          margin: 0 0 2em 0;
        }

        pre code {
          display: block;
          line-height: 1.75em;
          padding: 1em 1.5em;
          overflow-x: auto;
        }

        hr {
          border: 0;
          border-bottom: solid 1px rgba(160, 160, 160, 0.3);
          margin: 2em 0;
        }

        hr.major {
          margin: 3em 0;
        }

        .align-left {
          text-align: left;
        }

        .align-center {
          text-align: center;
        }

        .align-right {
          text-align: right;
        }

        /* Row */

        .row {
          display: flex;
          flex-wrap: wrap;
          box-sizing: border-box;
          align-items: stretch;
        }

        .row > * {
          box-sizing: border-box;
        }

        .row.gtr-uniform > * > :last-child {
          margin-bottom: 0;
        }

        .row.aln-left {
          justify-content: flex-start;
        }

        .row.aln-center {
          justify-content: center;
        }

        .row.aln-right {
          justify-content: flex-end;
        }

        .row.aln-top {
          align-items: flex-start;
        }

        .row.aln-middle {
          align-items: center;
        }

        .row.aln-bottom {
          align-items: flex-end;
        }

        .row > .imp {
          order: -1;
        }

        .row > .col-1 {
          width: 8.33333%;
        }

        .row > .off-1 {
          margin-left: 8.33333%;
        }

        .row > .col-2 {
          width: 16.66667%;
        }

        .row > .off-2 {
          margin-left: 16.66667%;
        }

        .row > .col-3 {
          width: 25%;
        }

        .row > .off-3 {
          margin-left: 25%;
        }

        .row > .col-4 {
          width: 33.33333%;
        }

        .row > .off-4 {
          margin-left: 33.33333%;
        }

        .row > .col-5 {
          width: 41.66667%;
        }

        .row > .off-5 {
          margin-left: 41.66667%;
        }

        .row > .col-6 {
          width: 50%;
        }

        .row > .off-6 {
          margin-left: 50%;
        }

        .row > .col-7 {
          width: 58.33333%;
        }

        .row > .off-7 {
          margin-left: 58.33333%;
        }

        .row > .col-8 {
          width: 66.66667%;
        }

        .row > .off-8 {
          margin-left: 66.66667%;
        }

        .row > .col-9 {
          width: 75%;
        }

        .row > .off-9 {
          margin-left: 75%;
        }

        .row > .col-10 {
          width: 83.33333%;
        }

        .row > .off-10 {
          margin-left: 83.33333%;
        }

        .row > .col-11 {
          width: 91.66667%;
        }

        .row > .off-11 {
          margin-left: 91.66667%;
        }

        .row > .col-12 {
          width: 100%;
        }

        .row > .off-12 {
          margin-left: 100%;
        }

        .row.gtr-0 {
          margin-top: 0;
          margin-left: 0em;
        }

        .row.gtr-0 > * {
          padding: 0 0 0 0em;
        }

        .row.gtr-0.gtr-uniform {
          margin-top: 0em;
        }

        .row.gtr-0.gtr-uniform > * {
          padding-top: 0em;
        }

        .row.gtr-25 {
          margin-top: 0;
          margin-left: -0.25em;
        }

        .row.gtr-25 > * {
          padding: 0 0 0 0.25em;
        }

        .row.gtr-25.gtr-uniform {
          margin-top: -0.25em;
        }

        .row.gtr-25.gtr-uniform > * {
          padding-top: 0.25em;
        }

        .row.gtr-50 {
          margin-top: 0;
          margin-left: -0.5em;
        }

        .row.gtr-50 > * {
          padding: 0 0 0 0.5em;
        }

        .row.gtr-50.gtr-uniform {
          margin-top: -0.5em;
        }

        .row.gtr-50.gtr-uniform > * {
          padding-top: 0.5em;
        }

        .row {
          margin-top: 0;
          margin-left: -1em;
        }

        .row > * {
          padding: 0 0 0 1em;
        }

        .row.gtr-uniform {
          margin-top: -1em;
        }

        .row.gtr-uniform > * {
          padding-top: 1em;
        }

        .row.gtr-150 {
          margin-top: 0;
          margin-left: -1.5em;
        }

        .row.gtr-150 > * {
          padding: 0 0 0 1.5em;
        }

        .row.gtr-150.gtr-uniform {
          margin-top: -1.5em;
        }

        .row.gtr-150.gtr-uniform > * {
          padding-top: 1.5em;
        }

        .row.gtr-200 {
          margin-top: 0;
          margin-left: -2em;
        }

        .row.gtr-200 > * {
          padding: 0 0 0 2em;
        }

        .row.gtr-200.gtr-uniform {
          margin-top: -2em;
        }

        .row.gtr-200.gtr-uniform > * {
          padding-top: 2em;
        }

        @media screen and (max-width: 1680px) {

          .row {
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            align-items: stretch;
          }

          .row > * {
            box-sizing: border-box;
          }

          .row.gtr-uniform > * > :last-child {
            margin-bottom: 0;
          }

          .row.aln-left {
            justify-content: flex-start;
          }

          .row.aln-center {
            justify-content: center;
          }

          .row.aln-right {
            justify-content: flex-end;
          }

          .row.aln-top {
            align-items: flex-start;
          }

          .row.aln-middle {
            align-items: center;
          }

          .row.aln-bottom {
            align-items: flex-end;
          }

          .row > .imp-xlarge {
            order: -1;
          }

          .row > .col-1-xlarge {
            width: 8.33333%;
          }

          .row > .off-1-xlarge {
            margin-left: 8.33333%;
          }

          .row > .col-2-xlarge {
            width: 16.66667%;
          }

          .row > .off-2-xlarge {
            margin-left: 16.66667%;
          }

          .row > .col-3-xlarge {
            width: 25%;
          }

          .row > .off-3-xlarge {
            margin-left: 25%;
          }

          .row > .col-4-xlarge {
            width: 33.33333%;
          }

          .row > .off-4-xlarge {
            margin-left: 33.33333%;
          }

          .row > .col-5-xlarge {
            width: 41.66667%;
          }

          .row > .off-5-xlarge {
            margin-left: 41.66667%;
          }

          .row > .col-6-xlarge {
            width: 50%;
          }

          .row > .off-6-xlarge {
            margin-left: 50%;
          }

          .row > .col-7-xlarge {
            width: 58.33333%;
          }

          .row > .off-7-xlarge {
            margin-left: 58.33333%;
          }

          .row > .col-8-xlarge {
            width: 66.66667%;
          }

          .row > .off-8-xlarge {
            margin-left: 66.66667%;
          }

          .row > .col-9-xlarge {
            width: 75%;
          }

          .row > .off-9-xlarge {
            margin-left: 75%;
          }

          .row > .col-10-xlarge {
            width: 83.33333%;
          }

          .row > .off-10-xlarge {
            margin-left: 83.33333%;
          }

          .row > .col-11-xlarge {
            width: 91.66667%;
          }

          .row > .off-11-xlarge {
            margin-left: 91.66667%;
          }

          .row > .col-12-xlarge {
            width: 100%;
          }

          .row > .off-12-xlarge {
            margin-left: 100%;
          }

          .row.gtr-0 {
            margin-top: 0;
            margin-left: 0em;
          }

          .row.gtr-0 > * {
            padding: 0 0 0 0em;
          }

          .row.gtr-0.gtr-uniform {
            margin-top: 0em;
          }

          .row.gtr-0.gtr-uniform > * {
            padding-top: 0em;
          }

          .row.gtr-25 {
            margin-top: 0;
            margin-left: -0.25em;
          }

          .row.gtr-25 > * {
            padding: 0 0 0 0.25em;
          }

          .row.gtr-25.gtr-uniform {
            margin-top: -0.25em;
          }

          .row.gtr-25.gtr-uniform > * {
            padding-top: 0.25em;
          }

          .row.gtr-50 {
            margin-top: 0;
            margin-left: -0.5em;
          }

          .row.gtr-50 > * {
            padding: 0 0 0 0.5em;
          }

          .row.gtr-50.gtr-uniform {
            margin-top: -0.5em;
          }

          .row.gtr-50.gtr-uniform > * {
            padding-top: 0.5em;
          }

          .row {
            margin-top: 0;
            margin-left: -1em;
          }

          .row > * {
            padding: 0 0 0 1em;
          }

          .row.gtr-uniform {
            margin-top: -1em;
          }

          .row.gtr-uniform > * {
            padding-top: 1em;
          }

          .row.gtr-150 {
            margin-top: 0;
            margin-left: -1.5em;
          }

          .row.gtr-150 > * {
            padding: 0 0 0 1.5em;
          }

          .row.gtr-150.gtr-uniform {
            margin-top: -1.5em;
          }

          .row.gtr-150.gtr-uniform > * {
            padding-top: 1.5em;
          }

          .row.gtr-200 {
            margin-top: 0;
            margin-left: -2em;
          }

          .row.gtr-200 > * {
            padding: 0 0 0 2em;
          }

          .row.gtr-200.gtr-uniform {
            margin-top: -2em;
          }

          .row.gtr-200.gtr-uniform > * {
            padding-top: 2em;
          }

        }

        @media screen and (max-width: 1280px) {

          .row {
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            align-items: stretch;
          }

          .row > * {
            box-sizing: border-box;
          }

          .row.gtr-uniform > * > :last-child {
            margin-bottom: 0;
          }

          .row.aln-left {
            justify-content: flex-start;
          }

          .row.aln-center {
            justify-content: center;
          }

          .row.aln-right {
            justify-content: flex-end;
          }

          .row.aln-top {
            align-items: flex-start;
          }

          .row.aln-middle {
            align-items: center;
          }

          .row.aln-bottom {
            align-items: flex-end;
          }

          .row > .imp-large {
            order: -1;
          }

          .row > .col-1-large {
            width: 8.33333%;
          }

          .row > .off-1-large {
            margin-left: 8.33333%;
          }

          .row > .col-2-large {
            width: 16.66667%;
          }

          .row > .off-2-large {
            margin-left: 16.66667%;
          }

          .row > .col-3-large {
            width: 25%;
          }

          .row > .off-3-large {
            margin-left: 25%;
          }

          .row > .col-4-large {
            width: 33.33333%;
          }

          .row > .off-4-large {
            margin-left: 33.33333%;
          }

          .row > .col-5-large {
            width: 41.66667%;
          }

          .row > .off-5-large {
            margin-left: 41.66667%;
          }

          .row > .col-6-large {
            width: 50%;
          }

          .row > .off-6-large {
            margin-left: 50%;
          }

          .row > .col-7-large {
            width: 58.33333%;
          }

          .row > .off-7-large {
            margin-left: 58.33333%;
          }

          .row > .col-8-large {
            width: 66.66667%;
          }

          .row > .off-8-large {
            margin-left: 66.66667%;
          }

          .row > .col-9-large {
            width: 75%;
          }

          .row > .off-9-large {
            margin-left: 75%;
          }

          .row > .col-10-large {
            width: 83.33333%;
          }

          .row > .off-10-large {
            margin-left: 83.33333%;
          }

          .row > .col-11-large {
            width: 91.66667%;
          }

          .row > .off-11-large {
            margin-left: 91.66667%;
          }

          .row > .col-12-large {
            width: 100%;
          }

          .row > .off-12-large {
            margin-left: 100%;
          }

          .row.gtr-0 {
            margin-top: 0;
            margin-left: 0em;
          }

          .row.gtr-0 > * {
            padding: 0 0 0 0em;
          }

          .row.gtr-0.gtr-uniform {
            margin-top: 0em;
          }

          .row.gtr-0.gtr-uniform > * {
            padding-top: 0em;
          }

          .row.gtr-25 {
            margin-top: 0;
            margin-left: -0.25em;
          }

          .row.gtr-25 > * {
            padding: 0 0 0 0.25em;
          }

          .row.gtr-25.gtr-uniform {
            margin-top: -0.25em;
          }

          .row.gtr-25.gtr-uniform > * {
            padding-top: 0.25em;
          }

          .row.gtr-50 {
            margin-top: 0;
            margin-left: -0.5em;
          }

          .row.gtr-50 > * {
            padding: 0 0 0 0.5em;
          }

          .row.gtr-50.gtr-uniform {
            margin-top: -0.5em;
          }

          .row.gtr-50.gtr-uniform > * {
            padding-top: 0.5em;
          }

          .row {
            margin-top: 0;
            margin-left: -1em;
          }

          .row > * {
            padding: 0 0 0 1em;
          }

          .row.gtr-uniform {
            margin-top: -1em;
          }

          .row.gtr-uniform > * {
            padding-top: 1em;
          }

          .row.gtr-150 {
            margin-top: 0;
            margin-left: -1.5em;
          }

          .row.gtr-150 > * {
            padding: 0 0 0 1.5em;
          }

          .row.gtr-150.gtr-uniform {
            margin-top: -1.5em;
          }

          .row.gtr-150.gtr-uniform > * {
            padding-top: 1.5em;
          }

          .row.gtr-200 {
            margin-top: 0;
            margin-left: -2em;
          }

          .row.gtr-200 > * {
            padding: 0 0 0 2em;
          }

          .row.gtr-200.gtr-uniform {
            margin-top: -2em;
          }

          .row.gtr-200.gtr-uniform > * {
            padding-top: 2em;
          }

        }

        @media screen and (max-width: 980px) {

          .row {
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            align-items: stretch;
          }

          .row > * {
            box-sizing: border-box;
          }

          .row.gtr-uniform > * > :last-child {
            margin-bottom: 0;
          }

          .row.aln-left {
            justify-content: flex-start;
          }

          .row.aln-center {
            justify-content: center;
          }

          .row.aln-right {
            justify-content: flex-end;
          }

          .row.aln-top {
            align-items: flex-start;
          }

          .row.aln-middle {
            align-items: center;
          }

          .row.aln-bottom {
            align-items: flex-end;
          }

          .row > .imp-medium {
            order: -1;
          }

          .row > .col-1-medium {
            width: 8.33333%;
          }

          .row > .off-1-medium {
            margin-left: 8.33333%;
          }

          .row > .col-2-medium {
            width: 16.66667%;
          }

          .row > .off-2-medium {
            margin-left: 16.66667%;
          }

          .row > .col-3-medium {
            width: 25%;
          }

          .row > .off-3-medium {
            margin-left: 25%;
          }

          .row > .col-4-medium {
            width: 33.33333%;
          }

          .row > .off-4-medium {
            margin-left: 33.33333%;
          }

          .row > .col-5-medium {
            width: 41.66667%;
          }

          .row > .off-5-medium {
            margin-left: 41.66667%;
          }

          .row > .col-6-medium {
            width: 50%;
          }

          .row > .off-6-medium {
            margin-left: 50%;
          }

          .row > .col-7-medium {
            width: 58.33333%;
          }

          .row > .off-7-medium {
            margin-left: 58.33333%;
          }

          .row > .col-8-medium {
            width: 66.66667%;
          }

          .row > .off-8-medium {
            margin-left: 66.66667%;
          }

          .row > .col-9-medium {
            width: 75%;
          }

          .row > .off-9-medium {
            margin-left: 75%;
          }

          .row > .col-10-medium {
            width: 83.33333%;
          }

          .row > .off-10-medium {
            margin-left: 83.33333%;
          }

          .row > .col-11-medium {
            width: 91.66667%;
          }

          .row > .off-11-medium {
            margin-left: 91.66667%;
          }

          .row > .col-12-medium {
            width: 100%;
          }

          .row > .off-12-medium {
            margin-left: 100%;
          }

          .row.gtr-0 {
            margin-top: 0;
            margin-left: 0em;
          }

          .row.gtr-0 > * {
            padding: 0 0 0 0em;
          }

          .row.gtr-0.gtr-uniform {
            margin-top: 0em;
          }

          .row.gtr-0.gtr-uniform > * {
            padding-top: 0em;
          }

          .row.gtr-25 {
            margin-top: 0;
            margin-left: -0.25em;
          }

          .row.gtr-25 > * {
            padding: 0 0 0 0.25em;
          }

          .row.gtr-25.gtr-uniform {
            margin-top: -0.25em;
          }

          .row.gtr-25.gtr-uniform > * {
            padding-top: 0.25em;
          }

          .row.gtr-50 {
            margin-top: 0;
            margin-left: -0.5em;
          }

          .row.gtr-50 > * {
            padding: 0 0 0 0.5em;
          }

          .row.gtr-50.gtr-uniform {
            margin-top: -0.5em;
          }

          .row.gtr-50.gtr-uniform > * {
            padding-top: 0.5em;
          }

          .row {
            margin-top: 0;
            margin-left: -1em;
          }

          .row > * {
            padding: 0 0 0 1em;
          }

          .row.gtr-uniform {
            margin-top: -1em;
          }

          .row.gtr-uniform > * {
            padding-top: 1em;
          }

          .row.gtr-150 {
            margin-top: 0;
            margin-left: -1.5em;
          }

          .row.gtr-150 > * {
            padding: 0 0 0 1.5em;
          }

          .row.gtr-150.gtr-uniform {
            margin-top: -1.5em;
          }

          .row.gtr-150.gtr-uniform > * {
            padding-top: 1.5em;
          }

          .row.gtr-200 {
            margin-top: 0;
            margin-left: -2em;
          }

          .row.gtr-200 > * {
            padding: 0 0 0 2em;
          }

          .row.gtr-200.gtr-uniform {
            margin-top: -2em;
          }

          .row.gtr-200.gtr-uniform > * {
            padding-top: 2em;
          }

        }

        @media screen and (max-width: 736px) {

          .row {
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            align-items: stretch;
          }

          .row > * {
            box-sizing: border-box;
          }

          .row.gtr-uniform > * > :last-child {
            margin-bottom: 0;
          }

          .row.aln-left {
            justify-content: flex-start;
          }

          .row.aln-center {
            justify-content: center;
          }

          .row.aln-right {
            justify-content: flex-end;
          }

          .row.aln-top {
            align-items: flex-start;
          }

          .row.aln-middle {
            align-items: center;
          }

          .row.aln-bottom {
            align-items: flex-end;
          }

          .row > .imp-small {
            order: -1;
          }

          .row > .col-1-small {
            width: 8.33333%;
          }

          .row > .off-1-small {
            margin-left: 8.33333%;
          }

          .row > .col-2-small {
            width: 16.66667%;
          }

          .row > .off-2-small {
            margin-left: 16.66667%;
          }

          .row > .col-3-small {
            width: 25%;
          }

          .row > .off-3-small {
            margin-left: 25%;
          }

          .row > .col-4-small {
            width: 33.33333%;
          }

          .row > .off-4-small {
            margin-left: 33.33333%;
          }

          .row > .col-5-small {
            width: 41.66667%;
          }

          .row > .off-5-small {
            margin-left: 41.66667%;
          }

          .row > .col-6-small {
            width: 50%;
          }

          .row > .off-6-small {
            margin-left: 50%;
          }

          .row > .col-7-small {
            width: 58.33333%;
          }

          .row > .off-7-small {
            margin-left: 58.33333%;
          }

          .row > .col-8-small {
            width: 66.66667%;
          }

          .row > .off-8-small {
            margin-left: 66.66667%;
          }

          .row > .col-9-small {
            width: 75%;
          }

          .row > .off-9-small {
            margin-left: 75%;
          }

          .row > .col-10-small {
            width: 83.33333%;
          }

          .row > .off-10-small {
            margin-left: 83.33333%;
          }

          .row > .col-11-small {
            width: 91.66667%;
          }

          .row > .off-11-small {
            margin-left: 91.66667%;
          }

          .row > .col-12-small {
            width: 100%;
          }

          .row > .off-12-small {
            margin-left: 100%;
          }

          .row.gtr-0 {
            margin-top: 0;
            margin-left: 0em;
          }

          .row.gtr-0 > * {
            padding: 0 0 0 0em;
          }

          .row.gtr-0.gtr-uniform {
            margin-top: 0em;
          }

          .row.gtr-0.gtr-uniform > * {
            padding-top: 0em;
          }

          .row.gtr-25 {
            margin-top: 0;
            margin-left: -0.25em;
          }

          .row.gtr-25 > * {
            padding: 0 0 0 0.25em;
          }

          .row.gtr-25.gtr-uniform {
            margin-top: -0.25em;
          }

          .row.gtr-25.gtr-uniform > * {
            padding-top: 0.25em;
          }

          .row.gtr-50 {
            margin-top: 0;
            margin-left: -0.5em;
          }

          .row.gtr-50 > * {
            padding: 0 0 0 0.5em;
          }

          .row.gtr-50.gtr-uniform {
            margin-top: -0.5em;
          }

          .row.gtr-50.gtr-uniform > * {
            padding-top: 0.5em;
          }

          .row {
            margin-top: 0;
            margin-left: -1em;
          }

          .row > * {
            padding: 0 0 0 1em;
          }

          .row.gtr-uniform {
            margin-top: -1em;
          }

          .row.gtr-uniform > * {
            padding-top: 1em;
          }

          .row.gtr-150 {
            margin-top: 0;
            margin-left: -1.5em;
          }

          .row.gtr-150 > * {
            padding: 0 0 0 1.5em;
          }

          .row.gtr-150.gtr-uniform {
            margin-top: -1.5em;
          }

          .row.gtr-150.gtr-uniform > * {
            padding-top: 1.5em;
          }

          .row.gtr-200 {
            margin-top: 0;
            margin-left: -2em;
          }

          .row.gtr-200 > * {
            padding: 0 0 0 2em;
          }

          .row.gtr-200.gtr-uniform {
            margin-top: -2em;
          }

          .row.gtr-200.gtr-uniform > * {
            padding-top: 2em;
          }

        }

        @media screen and (max-width: 480px) {

          .row {
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            align-items: stretch;
          }

          .row > * {
            box-sizing: border-box;
          }

          .row.gtr-uniform > * > :last-child {
            margin-bottom: 0;
          }

          .row.aln-left {
            justify-content: flex-start;
          }

          .row.aln-center {
            justify-content: center;
          }

          .row.aln-right {
            justify-content: flex-end;
          }

          .row.aln-top {
            align-items: flex-start;
          }

          .row.aln-middle {
            align-items: center;
          }

          .row.aln-bottom {
            align-items: flex-end;
          }

          .row > .imp-xsmall {
            order: -1;
          }

          .row > .col-1-xsmall {
            width: 8.33333%;
          }

          .row > .off-1-xsmall {
            margin-left: 8.33333%;
          }

          .row > .col-2-xsmall {
            width: 16.66667%;
          }

          .row > .off-2-xsmall {
            margin-left: 16.66667%;
          }

          .row > .col-3-xsmall {
            width: 25%;
          }

          .row > .off-3-xsmall {
            margin-left: 25%;
          }

          .row > .col-4-xsmall {
            width: 33.33333%;
          }

          .row > .off-4-xsmall {
            margin-left: 33.33333%;
          }

          .row > .col-5-xsmall {
            width: 41.66667%;
          }

          .row > .off-5-xsmall {
            margin-left: 41.66667%;
          }

          .row > .col-6-xsmall {
            width: 50%;
          }

          .row > .off-6-xsmall {
            margin-left: 50%;
          }

          .row > .col-7-xsmall {
            width: 58.33333%;
          }

          .row > .off-7-xsmall {
            margin-left: 58.33333%;
          }

          .row > .col-8-xsmall {
            width: 66.66667%;
          }

          .row > .off-8-xsmall {
            margin-left: 66.66667%;
          }

          .row > .col-9-xsmall {
            width: 75%;
          }

          .row > .off-9-xsmall {
            margin-left: 75%;
          }

          .row > .col-10-xsmall {
            width: 83.33333%;
          }

          .row > .off-10-xsmall {
            margin-left: 83.33333%;
          }

          .row > .col-11-xsmall {
            width: 91.66667%;
          }

          .row > .off-11-xsmall {
            margin-left: 91.66667%;
          }

          .row > .col-12-xsmall {
            width: 100%;
          }

          .row > .off-12-xsmall {
            margin-left: 100%;
          }

          .row.gtr-0 {
            margin-top: 0;
            margin-left: 0em;
          }

          .row.gtr-0 > * {
            padding: 0 0 0 0em;
          }

          .row.gtr-0.gtr-uniform {
            margin-top: 0em;
          }

          .row.gtr-0.gtr-uniform > * {
            padding-top: 0em;
          }

          .row.gtr-25 {
            margin-top: 0;
            margin-left: -0.25em;
          }

          .row.gtr-25 > * {
            padding: 0 0 0 0.25em;
          }

          .row.gtr-25.gtr-uniform {
            margin-top: -0.25em;
          }

          .row.gtr-25.gtr-uniform > * {
            padding-top: 0.25em;
          }

          .row.gtr-50 {
            margin-top: 0;
            margin-left: -0.5em;
          }

          .row.gtr-50 > * {
            padding: 0 0 0 0.5em;
          }

          .row.gtr-50.gtr-uniform {
            margin-top: -0.5em;
          }

          .row.gtr-50.gtr-uniform > * {
            padding-top: 0.5em;
          }

          .row {
            margin-top: 0;
            margin-left: -1em;
          }

          .row > * {
            padding: 0 0 0 1em;
          }

          .row.gtr-uniform {
            margin-top: -1em;
          }

          .row.gtr-uniform > * {
            padding-top: 1em;
          }

          .row.gtr-150 {
            margin-top: 0;
            margin-left: -1.5em;
          }

          .row.gtr-150 > * {
            padding: 0 0 0 1.5em;
          }

          .row.gtr-150.gtr-uniform {
            margin-top: -1.5em;
          }

          .row.gtr-150.gtr-uniform > * {
            padding-top: 1.5em;
          }

          .row.gtr-200 {
            margin-top: 0;
            margin-left: -2em;
          }

          .row.gtr-200 > * {
            padding: 0 0 0 2em;
          }

          .row.gtr-200.gtr-uniform {
            margin-top: -2em;
          }

          .row.gtr-200.gtr-uniform > * {
            padding-top: 2em;
          }

        }

        /* Author */

        .author {
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          -moz-flex-direction: row;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          -moz-align-items: center;
          -webkit-align-items: center;
          -ms-align-items: center;
          align-items: center;
          -moz-justify-content: -moz-flex-end;
          -webkit-justify-content: -webkit-flex-end;
          -ms-justify-content: -ms-flex-end;
          justify-content: flex-end;
          border-bottom: 0;
          font-family: "Raleway", Helvetica, sans-serif;
          font-size: 0.6em;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .author .name {
          -moz-transition: border-bottom-color 0.2s ease;
          -webkit-transition: border-bottom-color 0.2s ease;
          -ms-transition: border-bottom-color 0.2s ease;
          transition: border-bottom-color 0.2s ease;
          border-bottom: dotted 1px rgba(160, 160, 160, 0.65);
          display: block;
          margin: 0 1.5em 0 0;
        }

        .author img {
          border-radius: 100%;
          display: block;
          width: 4em;
        }

        .author:hover .name {
          border-bottom-color: transparent;
        }

        /* Blurb */

        .blurb h2 {
          font-size: 0.8em;
          margin: 0 0 1.5em 0;
        }

        .blurb h3 {
          font-size: 0.7em;
        }

        .blurb p {
          font-size: 0.9em;
        }

        /* Box */

        .box {
          border: solid 1px rgba(160, 160, 160, 0.3);
          margin-bottom: 2em;
          padding: 1.5em;
        }

        .box > :last-child,
        .box > :last-child > :last-child,
        .box > :last-child > :last-child > :last-child {
          margin-bottom: 0;
        }

        .box.alt {
          border: 0;
          border-radius: 0;
          padding: 0;
        }

        /* Button */

        input[type="submit"],
        input[type="reset"],
        input[type="button"],
        button,
        .button {
          -moz-appearance: none;
          -webkit-appearance: none;
          -ms-appearance: none;
          appearance: none;
          -moz-transition: background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
          -webkit-transition: background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
          -ms-transition: background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
          transition: background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
          background-color: transparent;
          border: 0;
          box-shadow: inset 0 0 0 1px rgba(160, 160, 160, 0.3);
          color: #3c3b3b !important;
          cursor: pointer;
          display: inline-block;
          font-family: "Raleway", Helvetica, sans-serif;
          font-size: 0.6em;
          font-weight: 800;
          height: 4.8125em;
          letter-spacing: 0.25em;
          line-height: 4.8125em;
          padding: 0 2.5em;
          text-align: center;
          text-decoration: none;
          text-transform: uppercase;
          white-space: nowrap;
        }

        input[type="submit"]:hover,
        input[type="reset"]:hover,
        input[type="button"]:hover,
        button:hover,
        .button:hover {
          box-shadow: inset 0 0 0 1px #2ebaae;
          color: #2ebaae !important;
        }

        input[type="submit"]:hover:active,
        input[type="reset"]:hover:active,
        input[type="button"]:hover:active,
        button:hover:active,
        .button:hover:active {
          background-color: rgba(46, 186, 174, 0.05);
        }

        input[type="submit"]:before, input[type="submit"]:after,
        input[type="reset"]:before,
        input[type="reset"]:after,
        input[type="button"]:before,
        input[type="button"]:after,
        button:before,
        button:after,
        .button:before,
        .button:after {
          color: #aaaaaa;
          position: relative;
        }

        input[type="submit"]:before,
        input[type="reset"]:before,
        input[type="button"]:before,
        button:before,
        .button:before {
          left: -1em;
          padding: 0 0 0 0.75em;
        }

        input[type="submit"]:after,
        input[type="reset"]:after,
        input[type="button"]:after,
        button:after,
        .button:after {
          left: 1em;
          padding: 0 0.75em 0 0;
        }

        input[type="submit"].fit,
        input[type="reset"].fit,
        input[type="button"].fit,
        button.fit,
        .button.fit {
          width: 100%;
        }

        input[type="submit"].large,
        input[type="reset"].large,
        input[type="button"].large,
        button.large,
        .button.large {
          font-size: 0.7em;
          padding: 0 3em;
        }

        input[type="submit"].small,
        input[type="reset"].small,
        input[type="button"].small,
        button.small,
        .button.small {
          font-size: 0.5em;
        }

        input[type="submit"].disabled, input[type="submit"]:disabled,
        input[type="reset"].disabled,
        input[type="reset"]:disabled,
        input[type="button"].disabled,
        input[type="button"]:disabled,
        button.disabled,
        button:disabled,
        .button.disabled,
        .button:disabled {
          pointer-events: none;
          color: rgba(160, 160, 160, 0.3) !important;
        }

        input[type="submit"].disabled:before, input[type="submit"]:disabled:before,
        input[type="reset"].disabled:before,
        input[type="reset"]:disabled:before,
        input[type="button"].disabled:before,
        input[type="button"]:disabled:before,
        button.disabled:before,
        button:disabled:before,
        .button.disabled:before,
        .button:disabled:before {
          color: rgba(160, 160, 160, 0.3) !important;
        }

        /* Form */

        form {
          margin: 0 0 2em 0;
        }

        form.search {
          text-decoration: none;
          position: relative;
        }

        form.search:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          display: inline-block;
          font-style: normal;
          font-variant: normal;
          text-rendering: auto;
          line-height: 1;
          text-transform: none !important;
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
        }

        form.search:before {
          color: #aaaaaa;
          content: '\\f002';
          display: block;
          height: 2.75em;
          left: 0;
          line-height: 2.75em;
          position: absolute;
          text-align: center;
          top: 0;
          width: 2.5em;
        }

        form.search > input:first-child {
          padding-left: 2.5em;
        }

        label {
          color: #3c3b3b;
          display: block;
          font-size: 0.9em;
          font-weight: 700;
          margin: 0 0 1em 0;
        }

        input[type="text"],
        input[type="password"],
        input[type="email"],
        input[type="tel"],
        select,
        textarea {
          -moz-appearance: none;
          -webkit-appearance: none;
          -ms-appearance: none;
          appearance: none;
          background: rgba(160, 160, 160, 0.075);
          border: none;
          border: solid 1px rgba(160, 160, 160, 0.3);
          border-radius: 0;
          color: inherit;
          display: block;
          outline: 0;
          padding: 0 1em;
          text-decoration: none;
          width: 100%;
        }

        input[type="text"]:invalid,
        input[type="password"]:invalid,
        input[type="email"]:invalid,
        input[type="tel"]:invalid,
        select:invalid,
        textarea:invalid {
          box-shadow: none;
        }

        input[type="text"]:focus,
        input[type="password"]:focus,
        input[type="email"]:focus,
        input[type="tel"]:focus,
        select:focus,
        textarea:focus {
          border-color: #2ebaae;
          box-shadow: inset 0 0 0 1px #2ebaae;
        }

        .select-wrapper {
          text-decoration: none;
          display: block;
          position: relative;
        }

        .select-wrapper:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          display: inline-block;
          font-style: normal;
          font-variant: normal;
          text-rendering: auto;
          line-height: 1;
          text-transform: none !important;
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
        }

        .select-wrapper:before {
          color: rgba(160, 160, 160, 0.3);
          content: '\\f078';
          display: block;
          height: 2.75em;
          line-height: 2.75em;
          pointer-events: none;
          position: absolute;
          right: 0;
          text-align: center;
          top: 0;
          width: 2.75em;
        }

        .select-wrapper select::-ms-expand {
          display: none;
        }

        select {
          background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' preserveAspectRatio='none' viewBox='0 0 40 40'%3E%3Cpath d='M9.4,12.3l10.4,10.4l10.4-10.4c0.2-0.2,0.5-0.4,0.9-0.4c0.3,0,0.6,0.1,0.9,0.4l3.3,3.3c0.2,0.2,0.4,0.5,0.4,0.9 c0,0.4-0.1,0.6-0.4,0.9L20.7,31.9c-0.2,0.2-0.5,0.4-0.9,0.4c-0.3,0-0.6-0.1-0.9-0.4L4.3,17.3c-0.2-0.2-0.4-0.5-0.4-0.9 c0-0.4,0.1-0.6,0.4-0.9l3.3-3.3c0.2-0.2,0.5-0.4,0.9-0.4S9.1,12.1,9.4,12.3z' fill='rgba(160, 160, 160, 0.3)' /%3E%3C/svg%3E");
          background-size: 1.25rem;
          background-repeat: no-repeat;
          background-position: calc(100% - 1rem) center;
          height: 2.75em;
          padding-right: 2.75em;
          text-overflow: ellipsis;
        }

        select option {
          color: #3c3b3b;
          background: #ffffff;
        }

        select:focus::-ms-value {
          background-color: transparent;
        }

        select::-ms-expand {
          display: none;
        }

        input[type="text"],
        input[type="password"],
        input[type="email"],
        select {
          height: 2.75em;
        }

        textarea {
          padding: 0.75em 1em;
        }

        input[type="checkbox"],
        input[type="radio"] {
          -moz-appearance: none;
          -webkit-appearance: none;
          -ms-appearance: none;
          appearance: none;
          display: block;
          float: left;
          margin-right: -2em;
          opacity: 0;
          width: 1em;
          z-index: -1;
        }

        input[type="checkbox"] + label,
        input[type="radio"] + label {
          text-decoration: none;
          color: #646464;
          cursor: pointer;
          display: inline-block;
          font-size: 1em;
          font-weight: 400;
          padding-left: 2.4em;
          padding-right: 0.75em;
          position: relative;
        }

        input[type="checkbox"] + label:before,
        input[type="radio"] + label:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          display: inline-block;
          font-style: normal;
          font-variant: normal;
          text-rendering: auto;
          line-height: 1;
          text-transform: none !important;
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
        }

        input[type="checkbox"] + label:before,
        input[type="radio"] + label:before {
          background: rgba(160, 160, 160, 0.075);
          border: solid 1px rgba(160, 160, 160, 0.3);
          content: '';
          display: inline-block;
          font-size: 0.8em;
          height: 2.0625em;
          left: 0;
          line-height: 2.0625em;
          position: absolute;
          text-align: center;
          top: 0;
          width: 2.0625em;
        }

        input[type="checkbox"]:checked + label:before,
        input[type="radio"]:checked + label:before {
          background: #3c3b3b;
          border-color: #3c3b3b;
          color: #ffffff;
          content: '\\f00c';
        }

        input[type="checkbox"]:focus + label:before,
        input[type="radio"]:focus + label:before {
          border-color: #2ebaae;
          box-shadow: 0 0 0 1px #2ebaae;
        }

        input[type="radio"] + label:before {
          border-radius: 100%;
        }

        ::-webkit-input-placeholder {
          color: #aaaaaa !important;
          opacity: 1.0;
        }

        :-moz-placeholder {
          color: #aaaaaa !important;
          opacity: 1.0;
        }

        ::-moz-placeholder {
          color: #aaaaaa !important;
          opacity: 1.0;
        }

        :-ms-input-placeholder {
          color: #aaaaaa !important;
          opacity: 1.0;
        }

        /* Icon */

        .icon {
          text-decoration: none;
          border-bottom: none;
          position: relative;
        }

        .icon:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          display: inline-block;
          font-style: normal;
          font-variant: normal;
          text-rendering: auto;
          line-height: 1;
          text-transform: none !important;
          font-family: 'Font Awesome 5 Free';
          font-weight: 400;
        }

        .icon > .label {
          display: none;
        }

        .icon:before {
          line-height: inherit;
        }

        .icon.solid:before {
          font-weight: 900;
        }

        .icon.brands:before {
          font-family: 'Font Awesome 5 Brands';
        }

        .icon.suffix:before {
          float: right;
        }

        /* Image */

        .image {
          border: 0;
          display: inline-block;
          position: relative;
        }

        .image img {
          display: block;
        }

        .image.left, .image.right {
          max-width: 40%;
        }

        .image.left img, .image.right img {
          width: 100%;
        }

        .image.left {
          float: left;
          padding: 0 1.5em 1em 0;
          top: 0.25em;
        }

        .image.right {
          float: right;
          padding: 0 0 1em 1.5em;
          top: 0.25em;
        }

        .image.fit {
          display: block;
          margin: 0 0 2em 0;
          width: 100%;
        }

        .image.fit img {
          width: 100%;
        }

        .image.featured {
          display: block;
          margin: 0 0 3em 0;
          width: 100%;
        }

        .image.featured img {
          width: 100%;
        }

        @media screen and (max-width: 736px) {

          .image.featured {
            margin: 0 0 1.5em 0;
          }

        }

        .image.main {
          display: block;
          margin: 0 0 3em 0;
          width: 100%;
        }

        .image.main img {
          width: 100%;
        }

        /* List */

        ol {
          list-style: decimal;
          margin: 0 0 2em 0;
          padding-left: 1.25em;
        }

        ol li {
          padding-left: 0.25em;
        }

        ul {
          list-style: disc;
          margin: 0 0 2em 0;
          padding-left: 1em;
        }

        ul li {
          padding-left: 0.5em;
        }

        ul.alt {
          list-style: none;
          padding-left: 0;
        }

        ul.alt li {
          border-top: solid 1px rgba(160, 160, 160, 0.3);
          padding: 0.5em 0;
        }

        ul.alt li:first-child {
          border-top: 0;
          padding-top: 0;
        }

        dl {
          margin: 0 0 2em 0;
        }

        dl dt {
          display: block;
          font-weight: 700;
          margin: 0 0 1em 0;
        }

        dl dd {
          margin-left: 2em;
        }

        /* Actions */

        ul.actions {
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          cursor: default;
          list-style: none;
          margin-left: -1em;
          padding-left: 0;
        }

        ul.actions li {
          padding: 0 0 0 1em;
          vertical-align: middle;
        }

        ul.actions.special {
          -moz-justify-content: center;
          -webkit-justify-content: center;
          -ms-justify-content: center;
          justify-content: center;
          width: 100%;
          margin-left: 0;
        }

        ul.actions.special li:first-child {
          padding-left: 0;
        }

        ul.actions.stacked {
          -moz-flex-direction: column;
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
          margin-left: 0;
        }

        ul.actions.stacked li {
          padding: 1.3em 0 0 0;
        }

        ul.actions.stacked li:first-child {
          padding-top: 0;
        }

        ul.actions.fit {
          width: calc(100% + 1em);
        }

        ul.actions.fit li {
          -moz-flex-grow: 1;
          -webkit-flex-grow: 1;
          -ms-flex-grow: 1;
          flex-grow: 1;
          -moz-flex-shrink: 1;
          -webkit-flex-shrink: 1;
          -ms-flex-shrink: 1;
          flex-shrink: 1;
          width: 100%;
        }

        ul.actions.fit li > * {
          width: 100%;
        }

        ul.actions.fit.stacked {
          width: 100%;
        }

        @media screen and (max-width: 480px) {

          ul.actions:not(.fixed) {
            -moz-flex-direction: column;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            margin-left: 0;
            width: 100% !important;
          }

          ul.actions:not(.fixed) li {
            -moz-flex-grow: 1;
            -webkit-flex-grow: 1;
            -ms-flex-grow: 1;
            flex-grow: 1;
            -moz-flex-shrink: 1;
            -webkit-flex-shrink: 1;
            -ms-flex-shrink: 1;
            flex-shrink: 1;
            padding: 1em 0 0 0;
            text-align: center;
            width: 100%;
          }

          ul.actions:not(.fixed) li > * {
            width: 100%;
          }

          ul.actions:not(.fixed) li:first-child {
            padding-top: 0;
          }

          ul.actions:not(.fixed) li input[type="submit"],
          ul.actions:not(.fixed) li input[type="reset"],
          ul.actions:not(.fixed) li input[type="button"],
          ul.actions:not(.fixed) li button,
          ul.actions:not(.fixed) li .button {
            width: 100%;
          }

          ul.actions:not(.fixed) li input[type="submit"].icon:before,
          ul.actions:not(.fixed) li input[type="reset"].icon:before,
          ul.actions:not(.fixed) li input[type="button"].icon:before,
          ul.actions:not(.fixed) li button.icon:before,
          ul.actions:not(.fixed) li .button.icon:before {
            margin-left: -0.5em;
          }

        }

        /* Icons */

        ul.icons {
          cursor: default;
          list-style: none;
          padding-left: 0;
        }

        ul.icons li {
          display: inline-block;
          padding: 0 1em 0 0;
        }

        ul.icons li:last-child {
          padding-right: 0;
        }

        ul.icons li > * {
          border: 0;
        }

        ul.icons li > * .label {
          display: none;
        }

        /* Posts */

        ul.posts {
          list-style: none;
          padding: 0;
        }

        ul.posts li {
          border-top: dotted 1px rgba(160, 160, 160, 0.3);
          margin: 1.5em 0 0 0;
          padding: 1.5em 0 0 0;
        }

        ul.posts li:first-child {
          border-top: 0;
          margin-top: 0;
          padding-top: 0;
        }

        ul.posts article {
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          -moz-align-items: -moz-flex-start;
          -webkit-align-items: -webkit-flex-start;
          -ms-align-items: -ms-flex-start;
          align-items: flex-start;
          -moz-flex-direction: row-reverse;
          -webkit-flex-direction: row-reverse;
          -ms-flex-direction: row-reverse;
          flex-direction: row-reverse;
        }

        ul.posts article .image {
          display: block;
          margin-right: 1.5em;
          min-width: 4em;
          width: 4em;
        }

        ul.posts article .image img {
          width: 100%;
        }

        ul.posts article header {
          -moz-flex-grow: 1;
          -webkit-flex-grow: 1;
          -ms-flex-grow: 1;
          flex-grow: 1;
          -ms-flex: 1;
        }

        ul.posts article header h3 {
          font-size: 0.7em;
          margin-top: 0.125em;
        }

        ul.posts article header .published {
          display: block;
          font-family: "Raleway", Helvetica, sans-serif;
          font-size: 0.6em;
          font-weight: 400;
          letter-spacing: 0.25em;
          margin: -0.625em 0 1.7em 0;
          text-transform: uppercase;
        }

        ul.posts article header > :last-child {
          margin-bottom: 0;
        }

        /* Mini Post */

        .mini-post {
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          -moz-flex-direction: column-reverse;
          -webkit-flex-direction: column-reverse;
          -ms-flex-direction: column-reverse;
          flex-direction: column-reverse;
          background: #ffffff;
          border: solid 1px rgba(160, 160, 160, 0.3);
          margin: 0 0 2em 0;
        }

        .mini-post .image {
          overflow: hidden;
          width: 100%;
        }

        .mini-post .image img {
          -moz-transition: -moz-transform 0.2s ease-out;
          -webkit-transition: -webkit-transform 0.2s ease-out;
          -ms-transition: -ms-transform 0.2s ease-out;
          transition: transform 0.2s ease-out;
          width: 100%;
        }

        .mini-post .image:hover img {
          -moz-transform: scale(1.05);
          -webkit-transform: scale(1.05);
          -ms-transform: scale(1.05);
          transform: scale(1.05);
        }

        .mini-post header {
          padding: 1.25em 4.25em 0.1em 1.25em;
          min-height: 4em;
          position: relative;
          -moz-flex-grow: 1;
          -webkit-flex-grow: 1;
          -ms-flex-grow: 1;
          flex-grow: 1;
        }

        .mini-post header h3 {
          font-size: 0.7em;
        }

        .mini-post header .published {
          display: block;
          font-family: "Raleway", Helvetica, sans-serif;
          font-size: 0.6em;
          font-weight: 400;
          letter-spacing: 0.25em;
          margin: -0.625em 0 1.7em 0;
          text-transform: uppercase;
        }

        .mini-post header .author {
          position: absolute;
          right: 2em;
          top: 2em;
        }

        .mini-posts {
          margin: 0 0 2em 0;
        }

        @media screen and (max-width: 1280px) {

          .mini-posts {
            display: -moz-flex;
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
            -moz-flex-wrap: wrap;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            width: calc(100% + 2em);
          }

          .mini-posts > * {
            margin: 2em 2em 0 0;
            width: calc(50% - 2em);
          }

          .mini-posts > :nth-child(-n + 2) {
            margin-top: 0;
          }

        }

        @media screen and (max-width: 480px) {

          .mini-posts {
            display: block;
            width: 100%;
          }

          .mini-posts > * {
            margin: 0 0 2em 0;
            width: 100%;
          }

        }

        /* Post */

        .post {
          padding: 3em 3em 1em 3em;
          background: #ffffff;
          border: solid 1px rgba(160, 160, 160, 0.3);
          margin: 0 0 1em 0;
          position: relative;
        }

        .post > header {
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          border-bottom: solid 1px rgba(160, 160, 160, 0.3);
          left: -3em;
          margin: -3em 0 3em 0;
          position: relative;
          width: calc(100% + 6em);
        }

        .post > header .title {
          -moz-flex-grow: 1;
          -webkit-flex-grow: 1;
          -ms-flex-grow: 1;
          flex-grow: 1;
          -ms-flex: 1;
          padding: 3.75em 3em 3.3em 3em;
        }

        .post > header .title h2 {
          font-weight: 900;
          font-size: 1.5em;
        }

        .post > header .title > :last-child {
          margin-bottom: 0;
        }

        .post > header .meta {
          padding: 3.75em 3em 1.75em 3em;
          border-left: solid 1px rgba(160, 160, 160, 0.3);
          min-width: 17em;
          text-align: right;
          width: 17em;
        }

        .post > header .meta > * {
          margin: 0 0 1em 0;
        }

        .post > header .meta > :last-child {
          margin-bottom: 0;
        }

        .post > header .meta .published {
          color: #3c3b3b;
          display: block;
          font-family: "Raleway", Helvetica, sans-serif;
          font-size: 0.9em;
          font-weight: 800;
          letter-spacing: 0.25em;
          margin-top: 0.5em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .post > a.image.featured {
          overflow: hidden;
        }

        .post > a.image.featured img {
          -moz-transition: -moz-transform 0.2s ease-out;
          -webkit-transition: -webkit-transform 0.2s ease-out;
          -ms-transition: -ms-transform 0.2s ease-out;
          transition: transform 0.2s ease-out;
        }

        .post > a.image.featured:hover img {
          -moz-transform: scale(1.05);
          -webkit-transform: scale(1.05);
          -ms-transform: scale(1.05);
          transform: scale(1.05);
        }

        .post > footer {
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          -moz-align-items: center;
          -webkit-align-items: center;
          -ms-align-items: center;
          align-items: center;
        }

        .post > footer .actions {
          -moz-flex-grow: 1;
          -webkit-flex-grow: 1;
          -ms-flex-grow: 1;
          flex-grow: 1;
        }

        .post > footer .stats {
          cursor: default;
          list-style: none;
          padding: 0;
        }

        .post > footer .stats li {
          border-left: solid 1px rgba(160, 160, 160, 0.3);
          display: inline-block;
          font-family: "Raleway", Helvetica, sans-serif;
          font-size: 0.6em;
          font-weight: 400;
          letter-spacing: 0.25em;
          line-height: 1;
          margin: 0 0 0 2em;
          padding: 0 0 0 2em;
          text-transform: uppercase;
        }

        .post > footer .stats li:first-child {
          border-left: 0;
          margin-left: 0;
          padding-left: 0;
        }

        .post > footer .stats li .icon {
          border-bottom: 0;
        }

        .post > footer .stats li .icon:before {
          color: rgba(160, 160, 160, 0.3);
          margin-right: 0.75em;
        }

        @media screen and (max-width: 980px) {

          .post {
            border-left: 0;
            border-right: 0;
            left: -3em;
            width: calc(100% + (3em * 2));
          }

          .post > header {
            -moz-flex-direction: column;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            padding: 3.75em 3em 1.25em 3em;
            border-left: 0;
          }

          .post > header .title {
            -ms-flex: 0 1 auto;
            margin: 0 0 2em 0;
            padding: 0;
            text-align: center;
          }

          .post > header .meta {
            -moz-align-items: center;
            -webkit-align-items: center;
            -ms-align-items: center;
            align-items: center;
            display: -moz-flex;
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
            -moz-justify-content: center;
            -webkit-justify-content: center;
            -ms-justify-content: center;
            justify-content: center;
            border-left: 0;
            margin: 0 0 2em 0;
            padding-top: 0;
            padding: 0;
            text-align: left;
            width: 100%;
          }

          .post > header .meta > * {
            border-left: solid 1px rgba(160, 160, 160, 0.3);
            margin-left: 2em;
            padding-left: 2em;
          }

          .post > header .meta > :first-child {
            border-left: 0;
            margin-left: 0;
            padding-left: 0;
          }

          .post > header .meta .published {
            margin-bottom: 0;
            margin-top: 0;
          }

          .post > header .meta .author {
            -moz-flex-direction: row-reverse;
            -webkit-flex-direction: row-reverse;
            -ms-flex-direction: row-reverse;
            flex-direction: row-reverse;
            margin-bottom: 0;
          }

          .post > header .meta .author .name {
            margin: 0 0 0 1.5em;
          }

          .post > header .meta .author img {
            width: 3.5em;
          }

        }

        @media screen and (max-width: 736px) {

          .post {
            padding: 1.5em 1.5em 0.1em 1.5em;
            left: -1.5em;
            margin: 0 0 2em 0;
            width: calc(100% + (1.5em * 2));
          }

          .post > header {
            padding: 3em 1.5em 0.5em 1.5em;
            left: -1.5em;
            margin: -1.5em 0 1.5em 0;
            width: calc(100% + 3em);
          }

          .post > header .title h2 {
            font-size: 1.1em;
          }

        }

        @media screen and (max-width: 480px) {

          .post > header .meta {
            -moz-align-items: center;
            -webkit-align-items: center;
            -ms-align-items: center;
            align-items: center;
            -moz-flex-direction: column;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
          }

          .post > header .meta > * {
            border-left: 0;
            margin: 1em 0 0 0;
            padding-left: 0;
          }

          .post > header .meta .author .name {
            display: none;
          }

          .post > .image.featured {
            margin-left: -1.5em;
            margin-top: calc(-1.5em - 1px);
            width: calc(100% + 3em);
          }

          .post > footer {
            -moz-align-items: -moz-stretch;
            -webkit-align-items: -webkit-stretch;
            -ms-align-items: -ms-stretch;
            align-items: stretch;
            -moz-flex-direction: column-reverse;
            -webkit-flex-direction: column-reverse;
            -ms-flex-direction: column-reverse;
            flex-direction: column-reverse;
          }

          .post > footer .stats {
            text-align: center;
          }

          .post > footer .stats li {
            margin: 0 0 0 1.25em;
            padding: 0 0 0 1.25em;
          }

        }

        /* Section/Article */

        section.special, article.special {
          text-align: center;
        }

        header p {
          font-family: "Raleway", Helvetica, sans-serif;
          font-size: 0.7em;
          font-weight: 400;
          letter-spacing: 0.25em;
          line-height: 2.5;
          margin-top: -1em;
          text-transform: uppercase;
        }

        /* Table */

        .table-wrapper {
          -webkit-overflow-scrolling: touch;
          overflow-x: auto;
        }

        table {
          margin: 0 0 2em 0;
          width: 100%;
        }

        table tbody tr {
          border: solid 1px rgba(160, 160, 160, 0.3);
          border-left: 0;
          border-right: 0;
        }

        table tbody tr:nth-child(2n + 1) {
          background-color: rgba(160, 160, 160, 0.075);
        }

        table td {
          padding: 0.75em 0.75em;
        }

        table th {
          color: #3c3b3b;
          font-size: 0.9em;
          font-weight: 700;
          padding: 0 0.75em 0.75em 0.75em;
          text-align: left;
        }

        table thead {
          border-bottom: solid 2px rgba(160, 160, 160, 0.3);
        }

        table tfoot {
          border-top: solid 2px rgba(160, 160, 160, 0.3);
        }

        table.alt {
          border-collapse: separate;
        }

        table.alt tbody tr td {
          border: solid 1px rgba(160, 160, 160, 0.3);
          border-left-width: 0;
          border-top-width: 0;
        }

        table.alt tbody tr td:first-child {
          border-left-width: 1px;
        }

        table.alt tbody tr:first-child td {
          border-top-width: 1px;
        }

        table.alt thead {
          border-bottom: 0;
        }

        table.alt tfoot {
          border-top: 0;
        }

        /* Header */

        #header {
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          -moz-justify-content: space-between;
          -webkit-justify-content: space-between;
          -ms-justify-content: space-between;
          justify-content: space-between;
          background-color: #ffffff;
          border-bottom: solid 1px rgba(160, 160, 160, 0.3);
          height: 3.5em;
          left: 0;
          line-height: 3.5em;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 10000;
        }

        #header a {
          color: inherit;
          text-decoration: none;
        }

        #header ul {
          list-style: none;
          margin: 0;
          padding-left: 0;
        }

        #header ul li {
          display: inline-block;
          padding-left: 0;
        }

        #header h1 {
          height: inherit;
          line-height: inherit;
          padding: 0 0 0 1.5em;
          white-space: nowrap;
        }

        #header h1 a {
          font-size: 0.7em;
        }

        #header .links {
          -moz-flex: 1;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          border-left: solid 1px rgba(160, 160, 160, 0.3);
          height: inherit;
          line-height: inherit;
          margin-left: 1.5em;
          overflow: hidden;
          padding-left: 1.5em;
        }

        #header .links ul li {
          border-left: solid 1px rgba(160, 160, 160, 0.3);
          line-height: 1;
          margin-left: 1em;
          padding-left: 1em;
        }

        #header .links ul li:first-child {
          border-left: 0;
          margin-left: 0;
          padding-left: 0;
        }

        #header .links ul li a {
          border-bottom: 0;
          font-family: "Raleway", Helvetica, sans-serif;
          font-size: 0.7em;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        #header .main {
          height: inherit;
          line-height: inherit;
          text-align: right;
        }

        #header .main ul {
          height: inherit;
          line-height: inherit;
        }

        #header .main ul li {
          border-left: solid 1px rgba(160, 160, 160, 0.3);
          height: inherit;
          line-height: inherit;
          white-space: nowrap;
        }

        #header .main ul li > * {
          display: block;
          float: left;
        }

        #header .main ul li > a {
          text-decoration: none;
          border-bottom: 0;
          color: #aaaaaa;
          overflow: hidden;
          position: relative;
          text-indent: 4em;
          width: 4em;
        }

        #header .main ul li > a:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          display: inline-block;
          font-style: normal;
          font-variant: normal;
          text-rendering: auto;
          line-height: 1;
          text-transform: none !important;
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
        }

        #header .main ul li > a:before {
          display: block;
          height: inherit;
          left: 0;
          line-height: inherit;
          position: absolute;
          text-align: center;
          text-indent: 0;
          top: 0;
          width: inherit;
        }

        #header form {
          margin: 0;
        }

        #header form input {
          display: inline-block;
          height: 2.5em;
          position: relative;
          top: -2px;
          vertical-align: middle;
        }

        #header #search {
          -moz-transition: all 0.5s ease;
          -webkit-transition: all 0.5s ease;
          -ms-transition: all 0.5s ease;
          transition: all 0.5s ease;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          padding: 0;
          white-space: nowrap;
        }

        #header #search input {
          width: 12em;
        }

        #header #search.visible {
          max-width: 12.5em;
          opacity: 1;
          padding: 0 0.5em 0 0;
        }

        @media screen and (max-width: 980px) {

          #header .links {
            display: none;
          }

        }

        @media screen and (max-width: 736px) {

          #header {
            height: 2.75em;
            line-height: 2.75em;
          }

          #header h1 {
            padding: 0 0 0 1em;
          }

          #header .main .search {
            display: none;
          }

        }

        /* Wrapper */

        #wrapper {
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          -moz-flex-direction: row-reverse;
          -webkit-flex-direction: row-reverse;
          -ms-flex-direction: row-reverse;
          flex-direction: row-reverse;
          -moz-transition: opacity 0.5s ease;
          -webkit-transition: opacity 0.5s ease;
          -ms-transition: opacity 0.5s ease;
          transition: opacity 0.5s ease;
          margin: 0 auto;
          max-width: 100%;
          opacity: 1;
          padding: 4.5em;
          width: 90em;
        }

        body.is-menu-visible #wrapper {
          opacity: 0.15;
        }

        @media screen and (max-width: 1680px) {

          #wrapper {
            padding: 0em 3em 0em 3em;
          }

        }

        @media screen and (max-width: 1280px) {

          #wrapper {
            display: block;
          }

        }

        @media screen and (max-width: 736px) {

          #wrapper {
            padding: 1.5em;
          }

        }

        body.single #wrapper {
          display: block;
        }

        /* Main */

        #main {
          -moz-flex-grow: 1;
          -webkit-flex-grow: 1;
          -ms-flex-grow: 1;
          flex-grow: 1;
          -ms-flex: 1;
          width: 100%;
        }

        /* Sidebar */

        #sidebar {
          margin-right: 3em;
          min-width: 22em;
          width: 22em;
        }

        #sidebar > * {
          border-top: solid 1px rgba(160, 160, 160, 0.3);
          margin: 3em 0 0 0;
          padding: 3em 0 0 0;
        }

        #sidebar > :first-child {
          border-top: 0;
          margin-top: 0;
          padding-top: 0;
        }

        @media screen and (max-width: 1280px) {

          #sidebar {
            border-top: solid 1px rgba(160, 160, 160, 0.3);
            margin: 3em 0 0 0;
            min-width: 0;
            padding: 3em 0 0 0;
            width: 100%;
            overflow-x: hidden;
          }

        }

        /* Intro */

        #intro .logo {
          border-bottom: 0;
          display: inline-block;
          margin: 0 0 1em 0;
          overflow: hidden;
          position: relative;
          width: 4em;
        }

        #intro .logo:before {
          background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100px' height='100px' viewBox='0 0 100 100' preserveAspectRatio='none' zoomAndPan='disable'%3E%3Cpolygon points='0,0 100,0 100,25 50,0 0,25' style='fill:%23f4f4f4' /%3E%3Cpolygon points='0,100 100,100 100,75 50,100 0,75' style='fill:%23f4f4f4' /%3E%3C/svg%3E");
          background-position: top left;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          content: '';
          display: block;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }

        #intro .logo img {
          display: block;
          margin-left: -0.25em;
          width: 4.5em;
        }

        #intro header h2 {
          font-size: 2em;
          font-weight: 900;
        }

        #intro header p {
          font-size: 0.8em;
        }

        @media screen and (max-width: 1280px) {

          #intro {
            margin: 0 0 3em 0;
            text-align: center;
          }

          #intro header h2 {
            font-size: 2em;
          }

          #intro header p {
            font-size: 0.7em;
          }

        }

        @media screen and (max-width: 736px) {

          #intro {
            margin: 0 0 1.5em 0;
            padding: 1.25em 0;
          }

          #intro > :last-child {
            margin-bottom: 0;
          }

          #intro .logo {
            margin: 0 0 0.5em 0;
          }

          #intro header h2 {
            font-size: 1.25em;
          }

          #intro header > :last-child {
            margin-bottom: 0;
          }

        }

        /* Footer */

        #footer .icons {
          color: #aaaaaa;
        }

        #footer .copyright {
          color: #aaaaaa;
          font-family: "Raleway", Helvetica, sans-serif;
          font-size: 0.5em;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        body.single #footer {
          text-align: center;
        }

        /* Menu */

        #menu {
          -moz-transform: translateX(25em);
          -webkit-transform: translateX(25em);
          -ms-transform: translateX(25em);
          transform: translateX(25em);
          -moz-transition: -moz-transform 0.5s ease, visibility 0.5s;
          -webkit-transition: -webkit-transform 0.5s ease, visibility 0.5s;
          -ms-transition: -ms-transform 0.5s ease, visibility 0.5s;
          transition: transform 0.5s ease, visibility 0.5s;
          -webkit-overflow-scrolling: touch;
          background: #ffffff;
          border-left: solid 1px rgba(160, 160, 160, 0.3);
          box-shadow: none;
          height: 100%;
          max-width: 80%;
          overflow-y: auto;
          position: fixed;
          right: 0;
          top: 0;
          visibility: hidden;
          width: 25em;
          z-index: 10002;
        }

        #menu > * {
          border-top: solid 1px rgba(160, 160, 160, 0.3);
          padding: 3em;
        }

        #menu > * > :last-child {
          margin-bottom: 0;
        }

        #menu > :first-child {
          border-top: 0;
        }

        #menu .links {
          list-style: none;
          padding: 0;
        }

        #menu .links > li {
          border: 0;
          border-top: dotted 1px rgba(160, 160, 160, 0.3);
          margin: 1.5em 0 0 0;
          padding: 1.5em 0 0 0;
        }

        #menu .links > li a {
          display: block;
          border-bottom: 0;
        }

        #menu .links > li a h3 {
          -moz-transition: color 0.2s ease;
          -webkit-transition: color 0.2s ease;
          -ms-transition: color 0.2s ease;
          transition: color 0.2s ease;
          font-size: 0.7em;
        }

        #menu .links > li a p {
          font-family: "Raleway", Helvetica, sans-serif;
          font-size: 0.6em;
          font-weight: 400;
          letter-spacing: 0.25em;
          margin-bottom: 0;
          text-decoration: none;
          text-transform: uppercase;
        }

        #menu .links > li a:hover h3 {
          color: #2ebaae;
        }

        #menu .links > li:first-child {
          border-top: 0;
          margin-top: 0;
          padding-top: 0;
        }

        body.is-menu-visible #menu {
          -moz-transform: translateX(0);
          -webkit-transform: translateX(0);
          -ms-transform: translateX(0);
          transform: translateX(0);
          visibility: visible;
        }

        @media screen and (max-width: 736px) {

          #menu > * {
            padding: 1.5em;
          }

        }
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
              <h2>${this.props.form.getFieldsValue().articleTitle}</h2>
            </div>
            <div class="meta">
              <time class="published" >事件发生时间：${this.props.form.getFieldsValue().eventTime.format('YYYY-MM-DD')}</time>
              <time class="published" >事件发生地点：${this.props.form.getFieldsValue().address}</time>
            </div>
          </header>
          <div>
                ${this.state.editorState.toHTML()}
          </div>
          <footer>
            <ul class="stats">
<!--              <li><a href="#">返回标题</a></li>-->
              <li>${this.props.form.getFieldsValue().tagName}</li>
            </ul>
          </footer>
        </article>
      </div>

      <!-- Footer -->
      <section id="footer">
        <p class="copyright">&copy; 浙江大学 地球科学学院. Design: <a href="http://html5up.net">HTML5 UP</a>.</p>
      </section>

    </div>

    </body>
    </html>
    `;
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
            articleContent: this.buildPreviewHtml(),
            eventTime: formData.eventTime.format('YYYY-MM-DD'),
            address: formData.address,
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

            <Form.Item label="事件发生时间" name="eventTime">
              {getFieldDecorator('eventTime', {rules: [{required: true, message: '请输入事件发生时间!'},]})(
                <DatePicker placeholder="请输入事件发生时间" format={'YYYY-MM-DD'}/>
              )}
            </Form.Item>

            <Form.Item label="事件发生地点" name="address">
              {getFieldDecorator('address', {rules: [{required: true, message: '请输入事件发生地点!'},]})(
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
