import React, {Component} from 'react';
import {Table, message, Button, Tag,} from 'antd';
import request from "@/utils/request";
import {getLocalData} from '@/utils/common.js';

export default class ArticleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '文章 ID',
          dataIndex: 'articleId',
          key: 'articleId',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: '文章标题',
          dataIndex: 'articleTitle',
          key: 'articleTitle',
          align: 'center',
          sorter: (a, b) => a.articleTitle.length - b.articleTitle.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '文章作者',
          dataIndex: 'articleAuthor',
          key: 'articleAuthor',
          align: 'center',
          sorter: (a, b) => a.articleAuthor.length - b.articleAuthor.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '文章内容',
          dataIndex: 'articleContent',
          key: 'articleContent',
          align: 'center',
          sorter: (a, b) => a.articleContent.length - b.articleContent.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true,
        },
        {
          title: '事件发生时间',
          dataIndex: 'eventTime',
          key: 'eventTime',
          align: 'center',
          sorter: (a, b) => a.eventTime.length - b.eventTime.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '文章发布时间',
          dataIndex: 'articlePublishTime',
          key: 'articlePublishTime',
          align: 'center',
          sorter: (a, b) => a.articlePublishTime - b.articlePublishTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '文章创建时间',
          dataIndex: 'articleCreateTime',
          key: 'articleCreateTime',
          align: 'center',
          sorter: (a, b) => a.articleCreateTime - b.articleCreateTime,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '文章预览',
          key: 'preview',
          align: 'center',
          render: (text, record) => (
            <Button icon="link" onClick={() => this.previewHTML(text, record)}>预览</Button>
          ),
        },
        {
          title: '公开',
          dataIndex: 'isPublic',
          key: 'isPublic',
          align: 'center',
          render: (text, record) => (
            <>
              {record.isPublic ?
                <Tag color="blue">公开</Tag> :
                <Button onClick={() => this.updatePublicState(text, record)}>点击公开</Button>}
            </>
          ),
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (text, record) => (
            <Button type="danger" onClick={() => this.deleteRecord(text, record)}>删除</Button>
          ),
        },
      ],

      dataSource: [
        {
          articleId: '1',
          articleAuthor: 'test',
          articleTitle: 'test',
          articleContent: '\n' +
            '      <!Doctype html>\n' +
            '      <html>\n' +
            '        <head>\n' +
            '          <title>Preview Content</title>\n' +
            '          <style>\n' +
            '            html,body{\n' +
            '              height: 100%;\n' +
            '              margin: 0;\n' +
            '              padding: 0;\n' +
            '              overflow: auto;\n' +
            '              background-color: #f1f2f3;\n' +
            '            }\n' +
            '            .container{\n' +
            '              box-sizing: border-box;\n' +
            '              width: 1000px;\n' +
            '              max-width: 100%;\n' +
            '              min-height: 100%;\n' +
            '              margin: 0 auto;\n' +
            '              padding: 30px 20px;\n' +
            '              overflow: hidden;\n' +
            '              background-color: #fff;\n' +
            '              border-right: solid 1px #eee;\n' +
            '              border-left: solid 1px #eee;\n' +
            '            }\n' +
            '            .container img,\n' +
            '            .container audio,\n' +
            '            .container video{\n' +
            '              max-width: 100%;\n' +
            '              height: auto;\n' +
            '            }\n' +
            '            .container p{\n' +
            '              white-space: pre-wrap;\n' +
            '              min-height: 1em;\n' +
            '            }\n' +
            '            .container pre{\n' +
            '              padding: 15px;\n' +
            '              background-color: #f1f1f1;\n' +
            '              border-radius: 5px;\n' +
            '            }\n' +
            '            .container blockquote{\n' +
            '              margin: 0;\n' +
            '              padding: 15px;\n' +
            '              background-color: #f1f1f1;\n' +
            '              border-left: 3px solid #d1d1d1;\n' +
            '            }\n' +
            '          </style>\n' +
            '        </head>\n' +
            '        <body>\n' +
            '          <div class="container"><p style="text-align:left;" class="MsoNormal" align="left"><span style="font-size:12ptpx"><span style="line-height:150%"><strong>标题：</strong>大革命的失败和经验教训——中共五大</span></span></p><p style="text-align:left;" class="MsoNormal" align="left"><span style="font-size:12ptpx"><span style="line-height:150%"><strong>时间地点：</strong>1927年4月27日至5月9日，湖北省武汉市国立武昌高等师范学校附属小学</span></span></p><p style="text-align:left;" class="MsoNormal" align="left"><span style="font-size:12ptpx"><span style="line-height:150%"><strong>会议背景：</strong>中共三大以后，中国共产党积极推进国共合作，进行国民革命。以1925年的五卅运动为标志，大革命掀起高潮。随着北伐军胜利进军，工农运动蓬勃发展，革命势力从珠江流域推进到长江流域，武汉成为大革命的中心。受到革命威胁的帝国主义列强，一方面加紧武装干涉，一方面极力分化革命阵营。1927年4月12日，蒋介石在中外反动势力支持下发动反革命政变，大革命遭到局部失败。</span></span></p><p style="text-align:left;" class="MsoNormal" align="left"><span style="font-size:12ptpx"><span style="line-height:150%"><strong>会议内容</strong>： 1927年4月27日至5月19日，中国共产党第五次全国代表大会在武汉举行。出席党的五大的代表82人，代表全党57967名党员。大会及随后召开的中央全会和政治局会议通过了《政治形势与党的任务议决案》等8个决议案，选举产生了新的中央委员会；提出了争取无产阶级对革命的领导权、建立革命民主政权和实行土地革命等正确原则；决定中央委员会设立政治局，选举产生中央监察委员会；决定党的各级组织实行集体领导，确立民主集中制为党的指导原则。</span></span> <span style="font-size:12ptpx"><span style="line-height:150%">然而，“五大”时期的中共党人和共产国际及其驻华代表都没有把形势看得如此严重，而是充满了盲目乐观与自信。第一、为蒋介石的叛变减少了统一战线中的矛盾，统一战线中的成分更为单纯巩固，国共两党更加团结。第二、认为革命力量更加强大，革命运动将日益发展，危机不久即将消除。第三、认为革命形势将继续高涨，国际国内情形都对革命有利。中在“四·一二”政变后这样一个非常时刻召开的党代会，党的第五次代表大会对当时迫切需要解决的无产阶级如何争取革命领导权，如何领导农民进行土地革命，如何对待武汉国民政府和国民党，特别是如何建立党领导的革命武装等问题，都没有提出有效的具体措施。<strong>义：</strong>“五大”未能提出挽救革命的具体办法有诸多因素，“五大”后大革命的失败更有多方面的复杂原因。这在很大程度上是党在成长过程中不可避免的。中国革命必定要经过艰难的探索，也要付出沉重代价。有些艰难和失败是敌人加到我们身上的，有些是历史的负重加到我们身上的，当然也有些是我们自己的不成熟和失误带来的。反帝反封建的民主革命的目标不可能通过一次大革命的浪潮来实现，因此我们不能因为“五大”后大革命失败而否认这次会议的积极意义。五大所确立的民主集中制的组织原则以及选举产生的党的历史上第一个中央纪律检查监督机构，在党的建设史上具有重要意义它。着时间的推移和认识的深入，面对中国革命本身呈现出的复杂性和曲折性，我们应抹去在中共 “五大”评价方面一种长久挥之不去的历史阴影，给这次会议以客观公正的评价，“把历史的内容还给历史”。</span></span></p><p style="text-align:left;" class="MsoNormal" align="left"> </p><p style="text-align:left;" class="MsoNormal" align="left"><strong><span style="font-size:12ptpx"><span style="line-height:150%">多媒体材料：</span></span></strong></p><p style="text-align:center;" class="MsoNormal" align="center"></p><p width="554" height="343" src="file:///C:/Users/90399/AppData/Local/Temp/msohtmlclip1/01/clip_image002.jpg" v:shapes="图片_x0020_3"></p><div class="media-wrap image-wrap align-center" style="text-align:center"><img src="http://192.168.2.2:89/media/picture/中共五大.jpg" width="701.328125" height="434" style="width:701.328125px;height:434px"/></div><p></p><p></p><p style="text-align:center;" size="1" _root="[object Object]" __ownerID="undefined" __hash="undefined" __altered="false"><span style="font-size:12ptpx"><span style="line-height:150%">中共五大召开</span></span></p></div>\n' +
            '        </body>\n' +
            '      </html>\n' +
            '    ',
          articlePublishTime: 4894189,
          articleCreateTime: 32,
        },
      ],
    };

    this.updateTable();
  }

  previewHTML = (text, record) => {
    window.previewWindow = window.open();
    window.previewWindow.document.write(record.articleContent);
    window.previewWindow.document.close();
  }

  updateTable = () => {
    let requestUrl = '';
    if (this.props.cascadeValue.length === 0) {
      requestUrl = '/v1.0/api/articles';
    } else {
      requestUrl = '/v1.0/api/articles/tagName/' + this.props.cascadeValue.join('@');
    }

    request({
      url: requestUrl,
      method: 'GET',
      autoAdd: false, //不添加v1.0
      data: {
        length: 1000
      }
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.setState({dataSource: res.articles})
        message.success('更新文章表格成功');
      } else {
        this.setState({dataSource: []})
        message.error('更新文章表格失败,' + res.message);
      }
    });
  }

  deleteRecord = (text, record) => {
    if (this.props.cascadeValue.length === 0) {
      message.warning('标签名称为空');
      return;
    }

    request({
      url: '/v1.0/api/article/' + record.articleId + '/tagName/' + this.props.cascadeValue.join("@"),
      method: 'DELETE',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        // this.props.updateCascade();
        this.updateTable();
        message.success('删除文章成功');
      } else {
        message.error('删除文章失败,' + res.message);
      }
    });
  }

  updatePublicState = (text, record) => {
    request({
      url: '/v1.0/api/article/public/' + record.articleId,
      method: 'PUT',
      headers: {
        userId: getLocalData({dataName: 'userId'}),
        token: getLocalData({dataName: 'token'})
      },
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);

      if (res.success) {
        this.updateTable();
        message.success('更新状态成功');
      } else {
        message.error('更新状态失败,' + res.message);
      }
    });
  }

  render() {
    return (
      <>
        <Table columns={this.state.columns} dataSource={this.state.dataSource}/>
      </>
    );
  }
}
