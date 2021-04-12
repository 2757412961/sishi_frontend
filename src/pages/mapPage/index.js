import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Checkbox,
  Layout,
  Modal,
  Typography,
  Statistic,
  Col,
  Row,
  Card,
  Radio,
  Spin,
  Timeline,
  Tabs,
  Icon,
  Table,
  Carousel,
  Divider,
  Popconfirm,
} from 'antd';
import styles from './index.less';
import { fromJS } from 'immutable';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { connect } from 'dva';
import axios from 'axios';
import * as d3 from "d3";
import { getLocalData } from '@/utils/common.js';
import { MapContext, RotationControl, ScaleControl, ZoomControl } from 'react-mapbox-gl';
// import MapPageMap from './MapPageMap';
import Redirect from 'umi/redirect';
import RenderAuthorized from '@/components/Authorized';
import {getAuthority} from '@/utils/authority';
import flyline from '@/assets/pointData/flyline.json';
import line from '@/assets/pointData/line.geojson';
import lineShToJx from '@/assets/pointData/lineShToJx.geojson';
import {MapboxLayer} from '@deck.gl/mapbox';
import {ArcLayer} from '@deck.gl/layers';
import p1 from '@/assets/test/1.jpg';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import c1 from '@/assets/test/c1.jpg';
import c2 from '@/assets/test/c2.jpg';
import c3 from '@/assets/test/c3.jpg';
import c4 from '@/assets/test/c4.jpg';
import c5 from '@/assets/test/c5.jpg';
import c6 from '@/assets/test/c6.jpg';
import c7 from '@/assets/test/c7.jpg';
import c8 from '@/assets/test/c8.jpg';
import c9 from '@/assets/test/c9.jpg';
import correct from '@/assets/correct.PNG'
import wrong from '@/assets/false.PNG'
import dangqi from '@/assets/test/党旗.png';
import layer from '@/assets/test/layer.png';
import zanting from '@/assets/test/暂停.png';
import kaishi from '@/assets/test/开始.png';
import qingchu from '@/assets/test/清除.png';
import reback from '@/assets/test/reback.png';
import shuaxin from '@/assets/test/刷新.png';
import jiedao from '@/assets/test/街道.PNG';
import dixing from '@/assets/test/地形.PNG';
import yingxiang from '@/assets/test/影像.PNG';
import Slider from "react-slick";
import meeting from '@/assets/meeting.png';
import movement from '@/assets/movements.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'react-mapbox-gl/src/image';
const RadioGroup = Radio.Group;
var timer;
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;
const Authorized = RenderAuthorized(getAuthority());
const { Countdown } = Statistic;
const { Content, Sider } = Layout;
const noMatch=<Redirect to={`/login?redirect=${window.location.href}`} />;
const variants={open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },}


let des = [
  { "showInfo":"<div ><h3>中共一大上海会址</h3><div style={styles.popup1}></div><p>中国共产党第一次全国代表大会，简称中共一大，于1921年7月23日在上海法租界秘密召开，" +
      "7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省嘉兴南湖闭幕结束。大会的召开宣告了中国共产党的正式成立。</p></div>"},
  { "showInfo":"<div><h3>中共一大嘉兴南湖会址</h3><img width=220px' src="+c1+" /><p>中国共产党第一次全国代表大会，简称中共一大，于1921年7月23日在上海法租界秘密召开，" +
      "7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省嘉兴南湖闭幕结束。大会的召开宣告了中国共产党的正式成立。</p></div>"},
  { "showInfo":"<div><h3>中共二大会址</h3><img width=220px' src="+c2+" /><p>中国共产党第二次全国代表大会，简称中共二大，" +
      "于1922年7月16日至23日在上海召开。</p></div>"},
  { "showInfo":"<div><h3>中共三大会址</h3><img width=220px' src="+c3+" />" +
      "<p>中国共产党第三次全国代表大会，简称中共三大，于1923年6月12日至20日在广州召开。</p></div>"},
  { "showInfo":"<div><h3>中共四大会址</h3><img width=220px' src="+c4+" />" +
      "<p>中国共产党第四次全国代表大会，简称中共四大，于1925年1月11日至22日在上海召开。</p></div>"},
  { "showInfo":"<div><h3>中共五大会址</h3><img width=220px' src="+c5+" />" +
      "<p>中国共产党第五次全国代表大会，简称中共五大，于1927年4月27日至5月9日在武汉武昌都府堤召开。</p></div>"},
  { "showInfo":"<div><h3>中共六大会址</h3><img width=220px' src="+c6+" />" +
      "<p>中国共产党第六次全国代表大会，简称中共六大，于1928年6月18日至7月11日在俄罗斯莫斯科市中心西南约40公里的五一村召开。</p></div>"},
  { "showInfo":"<div><h3>中共七大会址</h3><img width=220px' src="+c7+" />" +
      "<p>中国共产党第七次全国代表大会，简称中共七大，于1945年4月23日至6月11日在延安杨家岭革命旧址中央大礼堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共八大会址</h3><img width=220px' src="+c8+" />" +
      "<p>中国共产党第八次全国代表大会，简称中共八大，于1956年9月15日至27日在北京全国政协礼堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共九大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第九次全国代表大会，简称中共九大，于1969年4月1日至24日在北京人民大会堂召开。自中共九大起，中共党代会均在人民大会堂举行。</p></div>"},
  { "showInfo":"<div><h3>中共十大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十一大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十二大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十三大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十四大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十五大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十六大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十七大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十八大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十九大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十次全国代表大会，简称中共十大，于1973年8月24日至28日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十一大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十一次全国代表大会，简称中共十一大，于1977年8月12日至18日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十二大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十二次全国代表大会，简称中共十二大，于1982年9月1日至11日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十三大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十三次全国代表大会，简称中共十三大，于1987年10月25日至11月1日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十四大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十四次全国代表大会，简称中共十四大，于1992年10月12日至18日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十五大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十五次全国代表大会，简称中共十五大，于1997年9月12日至18日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十六大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十六次全国代表大会，简称中共十六大，于2002年11月8日至14日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十七大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十七次全国代表大会，简称中共十七大，于2007年10月15日至21日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十八大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十八次全国代表大会，简称中共十八大，于2012年11月8日至14日在北京人民大会堂召开。</p></div>"},
  { "showInfo":"<div><h3>中共十九大会址</h3><img width=220px' src="+c9+" />" +
      "<p>中国共产党第十九次全国代表大会，简称中共十九大，于2017年10月18日至24日在北京人民大会堂召开。自中共九大起，中共党代会均在人民大会堂举行。</p></div>"},
]


const popupRef = React.createRef();

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "red" }}
      onClick={onClick}
    />
  );
}

//遍历树生成的数组treeList
let tree=[];
function forTree(treeList){
  for (let i in treeList){
    console.log('i',i);
    if(treeList[i].children.length>0){
      forTree(treeList[i].children)
    }else{
      tree.push(treeList[i])
    }
  }
  return tree
}
function forList(treeList,dispatch){
  let list=[];
  for (let i in treeList){
    if(treeList[i].hasOwnProperty('geoCoordinates')){
      let temp={};
      temp.id=treeList[i].label;
      temp.lonlat=treeList[i].geoCoordinates;
      temp.tagName=treeList[i].tagName;
      temp.text=treeList[i].label.split('@')[0];
      temp.value=treeList[i].label.replace('@','');
      temp.time=treeList[i].time;
      if(des[i]){
        temp.showInfo=des[i].showInfo;
      }
      temp.cardContent=treeList[i].tagName;
      temp.cardImg=p1;
      temp.picture=treeList[i].picUrl;
      temp.property=treeList[i].property;
      // debugger
      // dispatch({ type: 'mapPage/getPictureByTag', payload:treeList[i].tagName}).then(res => {
      //   console.log('res',res);
      //   if (res.success) {
      //     let pictures = res.pictures;
      //     temp.pictures=pictures;
      //   }else{
      //     temp.pictures=[];
      //   }
      //   console.log('temp',temp);
      //
      // });
      list.push(temp);
    }
  }
  return list;
}
function translate(arg) {
  let num=[];
  for(let i in arg){
    let temp=0;
    if(arg[i]=='A'){
      temp=0;
    }
    if(arg[i]=='B'){
      temp=1;
    }
    if(arg[i]=='C'){
      temp=2;
    }
    if(arg[i]=='D'){
      temp=3;
    }
    num.push(temp);
  }
  return num;
};
class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      itemNow:null,
      collapsed: false,
      modalVisble: false,
      deadline: Date.now() + 1000 * 60,
      value: [],
      grade: 0,
      answer: false,
      first: false,
      questionNumber: 1,
      carousel_settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
      },
      unCheckStyle: {
        cursor: "pointer",
        opacity: 0.5,
        fontSize: 14,
      },
      checkStyle: {
        cursor: 'pointer',
        opacity: 1,
        fontSize: 17,
      },
      knowledgeUrl: p1,
      //list[0].cardImg,
      layerValue:false,
      mapUrl: 'http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=7bf37aebb62ef1a2cd8e1bd276226a63',
      knowledgeContent: '中国共产党第一次全国代表大会于1921年7月23日至1921年8月3日在上海法租界贝勒路树德里3号（后称望志路106号，现改兴业路76号）和浙江嘉兴南湖召开。出席大会的各地代表共12人。',
      //list[0].cardContent,
      // current_url : 'http://192.168.2.2:89/media/videos/dangshi/05.mp4',
      more: true,
      startQuestion: false,
      startArticle: false,
      startPicture: false,
      startVideo: false,
      startAudio: false,
      list: [],
      listTime: [],
      tagName: '',
      pictures: [],
      videos: [],
      questionChoose:[],
      answerAll:'',
      checkValue1:false,//是否显示一大惠聚英才
      checkValue2:false,//是否显示上海到嘉兴路线
      play: true,
      delete: false,
      playCount:0,
      playNumber:0,
      pictureTag:'',
      icon1:false,
      icon2:false,
    };
  }
  choose=(num)=>{
    let id=(num+1).toString();
    let temp=document.getElementById(id)&&document.getElementById(id);
    if(temp){
      document.getElementById(id).classList.add(styles.qanswerchoosable);
    }
    console.log(temp);
  }
  answerOrNext(){
    const {tagTree,question,knowledgeContent}=this.props.mapPage;
    let allNumber=question.length;
    if(this.state.value.length==0){
      if(this.state.answer)
      {
        return false;
      }
      return true;
    }else {
      if(this.state.answer&&this.state.questionNumber==allNumber){
        return true;
      }else{
        return false;
      }}
  }
  clearSelected(temp){
    let checked1=document.getElementsByClassName(styles.qanswer);
    for (let i=0;i<checked1.length;i++){
      document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.qanswerchoosable);
      document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.correct);
      document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.false);
    }
    let state = document.getElementsByTagName("input");
    state[0].getAttribute("checked");
    for(let i=0;i<state.length;i++){
      document.getElementsByTagName("input")[i].checked=false;
    }
    let i=0;
    while(i<4){
      if(temp[i]==wrong){
        if(document.getElementsByClassName(styles.qanswer)[i])
          document.getElementsByClassName(styles.qanswer)[i].classList.add(styles.false);
      }else if(temp[i]==correct){
        if(document.getElementsByClassName(styles.qanswer)[i])
          document.getElementsByClassName(styles.qanswer)[i].classList.add(styles.correct);
      }
      i++;
    }
    if(temp&&temp[5]){
      let checked=temp[5];
      let j=0;
      while(j<checked.length){
        console.log('checked',checked);
        let id=checked[j];
        document.getElementsByClassName(styles.qanswer)[id].classList.add(styles.qanswerchoosable);
        j++;
      }
    }
  }
  nextQuestion=()=>{
    const {mapPage}=this.props;
    console.log('mapPage',mapPage);
    const {tagTree,question,knowledgeContent}=mapPage;
    let allNumber=question.length;
    let recent=this.state.questionNumber;
    let temp=this.state.questionChoose[recent];
    debugger
    if(this.state.questionNumber==allNumber&&this.state.answer==true){
      alert("答题结束，请点击右上角关闭答题页面")
    }else{
      if(temp&&temp[4]==true){
        this.clearSelected(temp);
        this.setState({answer: true});
        this.setState({questionNumber: this.state.questionNumber+1})
      } else{
        let arg=question[recent]?question[recent].answer:'';
        arg=arg.split("");
        let translate1=translate(arg);
        let checked=(document.getElementsByClassName(styles.correct).length>0)?document.getElementsByClassName(styles.correct):document.getElementsByClassName(styles.wrong);
        let checked1=document.getElementsByClassName(styles.qanswer);
        for (let i=0;i<checked1.length;i++){
          document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.correct);
          document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.false);
          document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.qanswerchoosable);
        }
        let state = document.getElementsByTagName("input");
        state[0].getAttribute("checked");
        for(let i=0;i<state.length;i++){
          document.getElementsByTagName("input")[i].checked=false;
        }
        this.setState({value:[]});
        this.setState({deadline:Date.now() +  1000 * 60})
        this.setState({questionNumber: this.state.questionNumber+1})
        this.setState({answer:false})
      }}
  }
  lastQuestion=()=>{
    let recent=this.state.questionNumber-2;
    let temp=this.state.questionChoose[recent];
    if(this.state.questionNumber>1){
      this.clearSelected(temp);
      this.setState({questionNumber: this.state.questionNumber-1});
      this.setState({answer: true});
    } else{
      this.setState({questionNumber: this.state.questionNumber});
      alert('当前为第一道题');
    }
  }
  //答题提交
  submitQuestion=()=>{
    const {mapPage}=this.props;
    console.log('mapPage',mapPage);
    const {tagTree,question,knowledgeContent}=mapPage;
    let allNumber=question.length;
    let recent=this.state.questionNumber-1;
    let string=this.state.value.toString();
    string=string.replace(/,/g,'');
    string=string.split("");
    let chooseAnswer=translate(string);
    let arg=question[recent]?question[recent].answer:'';
    arg=arg.split("");
    let translate1=translate(arg);
    let temp=[-1,-1,-1,-1,true,[]];
    let questionChoose=this.state.questionChoose;
    let choose=this.state.questionChoose[recent];
    let flag=true;
    if(choose&&choose[4]){
      return
    }else{
      if(arg.length!=string.length){
        flag=false;
      }
      let i=0;
      let answer=question[recent]?question[recent].answer:'';
      while(i<string.length){
        if(answer.indexOf(string[i])==-1){
          flag=false;
          break;
        }
        i++;
      }
      let id=0;
      i=0;
      while(i<translate1.length){
        id=translate1[i];
        if(document.getElementsByClassName(styles.qanswer)[id]) {
          if(flag==true)
          {
            temp[id]=correct;
            if(this.state.answer==false){
              this.setState({grade:this.state.grade+1});
            }
            document.getElementsByClassName(styles.qanswer)[id].classList.remove(styles.false);
            document.getElementsByClassName(styles.qanswer)[id].classList.add(styles.correct);
          }else{
            temp[id]=wrong;
            document.getElementsByClassName(styles.qanswer)[id].classList.remove(styles.false);
            document.getElementsByClassName(styles.qanswer)[id].classList.add(styles.false);
          }
          document.getElementsByClassName(styles.qanswer)[id].classList.remove(styles.qanswerchoosable);
        }
        i++;
      }
      temp[5]=chooseAnswer;
      questionChoose.push(temp);
      this.setState({questionChoose:questionChoose});
      this.setState({answer:true});
      if(this.state.questionNumber==allNumber) {
        if(this.grade==allNumber) {
          let username=getLocalData({dataName:'userName'});
          this.props.dispatch({type: 'mapPage/updateUserGrades', payload: {tag_name:this.state.tagName,user_name:username}});
          alert('回答全部正确，答题结果已经上传');
        }else{
          alert('回答未全部正确，请继续努力');
        }
      }
    }}
  componentDidMount() {
    const { dispatch } = this.props;
    //保存当前模块名
    this.setState({
      module:this.props.location.query.module
    });
    dispatch({ type: 'mapPage/getTagTree' });
    const { mapPage } = this.props;
    console.log('mapPage', mapPage);
    const { tagTree } = mapPage;

    //遍历tagTree;
    let tree;
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2F0c29ueWh4IiwiYSI6ImNrMWticjRqYjJhOTczY212ZzVnejNzcnkifQ.-0kOdd5ZzjMZGlah6aNYNg';
    let localhost = window.location.origin;
    let sources = {
      "osm-tiles1": {
        "type": "raster",
        'tiles': [this.state.mapUrl],
        'tileSize': 256
      },
      "osm-tiles2": {
        "type": "raster",
        'tiles': ['http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=7bf37aebb62ef1a2cd8e1bd276226a63'],
        'tileSize': 256
      }
    };
    let layers = [{
      "id": "simple-tiles1",
      "type": "raster",
      "source": "osm-tiles1",
    },
      {
        "id": "simple-tiles2",
        "type": "raster",
        "source": "osm-tiles2",
      }
    ];

    if(document.getElementById('onlineMapping')) {
      const map = new mapboxgl.Map({
        container: 'onlineMapping',
        style: {
          "version": 8,
          "sprite": localhost + "/MapBoxGL/css/sprite",
          "glyphs": localhost + "/MapBoxGL/css/font/{fontstack}/{range}.pbf",
          "sources": sources,
          "layers": layers,
        },
        center: [ 121.52, 31.04 ],  //上海经纬度坐标
        zoom: 3,
        // pitch: 30,
        // bearing: 10,
      });
      // let treeList=forTree(tagTree);
      // console.log('treeList',treeList);
      dispatch({ type: 'mapPage/getTagTreeSortByTime', payload: { tagName: '党史新学' } }).then((res) => {
        console.log('res', res);
        let listHere = [], listHere2 = [];
        if (res && res.success) {
          let tagTree = res.list;
          // let tree=forTree(tagTree);
          // console.log('tree',tree);
          listHere = forList(tagTree,dispatch);
          listHere2 = forList(tagTree,dispatch);
          let listTime = forList(tagTree,dispatch);
          listTime.splice(0, 1);
          debugger
          console.log("listTime", listTime);
          this.setState({
            list: listHere2,
            listTime: listTime,
          })
        }
        console.log("listHere", listHere);
        //加载中共一大（上海，嘉兴地点）的火花图标
        for (let i = 0; i < listHere.length; i++) {
          map.addImage(listHere[ i ].id, pulsingDot, { pixelRatio: 2 });
          map.addLayer({
            "id": listHere[ i ].id,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [ {
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": listHere[ i ].lonlat,
                  }
                } ]
              }
            },
            "layout": {
              "icon-image": listHere[ i ].id,
              "icon-optional": false,
              "icon-ignore-placement": true,
              "icon-allow-overlap": true,
              "text-size": [
                "interpolate", [ "linear" ], [ "zoom" ],
                3, 10,
                10, 38
              ],
            },
          });
          map.addLayer({
            "id": listHere[ i ].id + i,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [ {
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": listHere[ i ].lonlat,
                  }
                } ]
              }
            },
            "layout": {
              "text-field": listHere[ i ].value,
              "text-anchor": 'left',
              "text-offset": [ 1, 0.1 ],
              "text-size": [
                "interpolate", [ "linear" ], [ "zoom" ],
                3, 10,
                17, 38
              ],
            },
            paint: {
              "text-color": 'rgb(255,0,0)',
            }
          });
        }
        map.on('styledata', function() {
          for (let i = 0; i < listHere.length; i++) {
            map.addImage(listHere[ i ].id, pulsingDot, { pixelRatio: 2 });
            map.addLayer({
              "id": listHere[ i ].id,
              "type": "symbol",
              "source": {
                "type": "geojson",
                "data": {
                  "type": "FeatureCollection",
                  "features": [ {
                    "type": "Feature",
                    "geometry": {
                      "type": "Point",
                      "coordinates": listHere[ i ].lonlat,
                    }
                  } ]
                }
              },
              "layout": {
                "icon-image": listHere[ i ].id,
                "icon-optional": false,
                "icon-ignore-placement": true,
                "icon-allow-overlap": true,
                "text-size": [
                  "interpolate", [ "linear" ], [ "zoom" ],
                  3, 10,
                  10, 38
                ],
              },
            });
            map.addLayer({
              "id": listHere[ i ].id + i,
              "type": "symbol",
              "source": {
                "type": "geojson",
                "data": {
                  "type": "FeatureCollection",
                  "features": [ {
                    "type": "Feature",
                    "geometry": {
                      "type": "Point",
                      "coordinates": listHere[ i ].lonlat,
                    }
                  } ]
                }
              },
              "layout": {
                "text-field": listHere[ i ].value,
                "text-anchor": 'left',
                "text-offset": [ 1, 0.1 ],
                "text-size": [
                  "interpolate", [ "linear" ], [ "zoom" ],
                  3, 10,
                  17, 38
                ],
              },
              paint: {
                "text-color": 'rgb(255,0,0)',
              }
            });
          }
        });
        let _this = this;
        var popup = new mapboxgl.Popup({ closeOnClick: true, closeButton: true })
        for (let i = 0; i < listHere.length; i++) {
          map.on('mouseenter', listHere[ i ].id, function(e) {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[ 0 ].geometry.coordinates;
            _this.setState({
              itemNow: listHere[ i ],
              tagName: listHere[ i ].tagName,
              pictureTag:listHere[ i ].picture,
            })
            // let showInfo = listHere[i].showInfo;
            popup.setLngLat(coordinates);
            // popup.setHTML(showInfo)

            popup.addTo(map);
            popup.setDOMContent(popupRef.current);
          });
          map.on('mouseleave', listHere[ i ].id, function() {
            map.getCanvas().style.cursor = '';
            // popup.remove();
          });
        }
        // for(let i = 0;i<listHere.length;i++){
        //   map.on('click', listHere[i].id, function(e) {
        //     popup.remove();
        //     var coordinates = e.features[0].geometry.coordinates;
        //     _this.setState({
        //       itemNow: listHere[i],
        //       tagName:listHere[i].tagName,
        //     })
        //
        //     new mapboxgl.Popup()
        //       .setLngLat(coordinates)
        //       // .setHTML(showInfo)
        //       .addTo(map)
        //       .setDOMContent(popupRef.current);
        //   });
        //   map.on('mouseenter', listHere[i].id, function() {
        //     map.getCanvas().style.cursor = 'pointer';
        //   });
        //   map.on('mouseleave', listHere[i].id, function() {
        //     map.getCanvas().style.cursor = '';
        //   });
        // }
        this.map = map;
      });

      let nav = new mapboxgl.NavigationControl({
        //是否显示指南针按钮，默认为true
        "showCompass": false,
        //是否显示缩放按钮，默认为true
        "showZoom": true
      });
      //添加导航控件，控件的位置包括'top-left', 'top-right','bottom-left' ,'bottom-right'四种，默认为'top-right'
      map.addControl(nav, 'top-right');

      var size = 100;
      var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function() {
          var canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
        },

        render: function() {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;

          var radius = size / 2 * 0.3;
          var outerRadius = size / 2 * 0.7 * t + radius;
          var context = this.context;

// draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
          context.fillStyle = 'rgba(255, 100, 100,' + (1 - t) + ')';
          context.fill();

// draw inner circle
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = 'rgba(255, 0, 0, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

// update this image's data with data from the canvas
          this.data = context.getImageData(0, 0, this.width, this.height).data;

// keep the map repainting
          map.triggerRepaint();

// return `true` to let the map know that the image was updated
          return true;
        }
      };
      document.getElementById('vec').style.border = ('2px solid red');
      // var el = document.createElement('div');
      // el.className = "marker";
      // el.style.backgroundSize = 'cover'
      // el.style.width = '20px';
      // el.style.height = '20px';
      // el.style.borderRadius = '50%';
      // el.style.backgroundImage = 'url(' + dangqi + ')';
      // map.on('styledata', function() {
      //   d3.json(line,function(err,data) {
      //     if (err) throw err;
      //     var coordinates = data.features[0].geometry.coordinates;
      //     data.features[0].geometry.coordinates = [coordinates[0]];
      //     map.addSource('trace', {type:'geojson', data: data})
      //     map.addLayer({
      //       "id": "trace",
      //       "type": "line",
      //       "source": "trace",
      //       "layout": {
      //         "line-join": "round",
      //         "line-cap": "round"
      //       },
      //       "paint": {
      //         "line-color": "red",
      //         "line-opacity": 0.8,
      //         "line-width": 5
      //       }
      //     });
      //     map.jumpTo({'center': coordinates[0], 'zoom': 8});
      //     map.setPitch(10);
      //     //'url(https://upload.wikimedia.org/wikipedia/commons/4/45/Eventcard.png)'
      //     // var marker = new mapboxgl.Marker(el)
      //     var i = 0;
      //     var timer = window.setInterval(function() {
      //       if(i<coordinates.length) {
      //         data.features[0].geometry.coordinates.push(coordinates[i]);
      //         map.getSource('trace').setData(data);
      //         if(i<195){
      //           map.panTo(coordinates[i],{'zoom':8})
      //         } else if(i<495){
      //           map.panTo(coordinates[i],{'zoom':5})
      //         } else if (i<695){
      //           map.panTo(coordinates[i],{'zoom':2})
      //         } else if(i<780){
      //           map.panTo(coordinates[i],{'zoom':5})
      //         } else if(i<790){
      //           map.panTo(coordinates[i],{'zoom':7})
      //         } else if(i<800){
      //           map.panTo(coordinates[i],{'zoom':9})
      //         } else if(i<805){
      //           map.panTo(coordinates[i],{'zoom':10})
      //         } else if(i<810){
      //           map.panTo(coordinates[i],{'zoom':11})
      //         } else if(i<815){
      //           map.panTo(coordinates[i],{'zoom':12})
      //         } else {
      //           map.panTo(coordinates[i],{'zoom':13})
      //         }
      //         i++;
      //         // function animateMarker() {
      //         //   marker.setLngLat(coordinates[i])
      //         //   marker.addTo(map);
      //         //   requestAnimationFrame(animateMarker);
      //         // }
      //         // requestAnimationFrame(animateMarker);
      //       } else {
      //         window.clearInterval(timer);
      //       }
      //     }, 100);
      //   });
      // });
      this.map = map;
    }
  }
  checkOnChange=(item,e)=>{
    // let item = e.target.key;
    // e.stopPropagation();
    let map = this.map;
    if(item==1){
      let temp = this.state.checkValue1;
      if(!temp){
        this.setState({
          icon1:true,
        });
        d3.json(lineShToJx,function(err,data) {
          if (err) throw err;
          var coordinates = data.features[0].geometry.coordinates;
          data.features[0].geometry.coordinates = [coordinates[0]];
          map.addSource('lineShToJx', {type:'geojson', data: data})
          map.addLayer({
            "id": "lineShToJx",
            "type": "line",
            "source": "lineShToJx",
            "layout": {
              // 'symbol-placement': 'line',
              // 'symbol-spacing': 50, // 图标间隔，默认为250
              // 'icon-image': 'arrowIcon', //箭头图标
              // 'icon-size': 0.5,
              "line-join": "round",
              "line-cap": "round"
            },
            "paint": {
              "line-color": "red",
              "line-opacity": 0.8,
              "line-width": 7
            }
          });
          map.jumpTo({'center': coordinates[0], 'zoom': [8]});
          // map.setPitch(10);
          var i = 0;
          timer = window.setInterval(function() {
            if(i<coordinates.length) {
              data.features[0].geometry.coordinates.push(coordinates[i]);
              map.getSource('lineShToJx').setData(data);
              map.panTo(coordinates[i],{zoom: 8});
              i++;
            } else {
              map.panTo(coordinates[65],{zoom: 8});
              window.clearInterval(timer);
            }
          }, 10);
        });
      }
      else{
        this.setState({
          icon1:false,
        });
        if (map.getLayer('lineShToJx')) {
          map.removeLayer('lineShToJx');
          map.removeSource('lineShToJx');
          clearInterval(timer);
        }
      }
      this.setState({
        checkValue1: !temp,
      });
    }
    else if(item==2){
      map.jumpTo({'center': [130.75580305351667, 30.75747193181725], 'zoom': [4]});
      map.setPitch(25);
      map.setBearing(-3);
      let temp = this.state.checkValue2;
      if(!temp){
        this.setState({
          icon2:true,
        })
        const myDeckLayer = new MapboxLayer({
          id: 'arc',
          type: ArcLayer,
          data: flyline,
          getSourcePosition: d => d.coord[0],
          getTargetPosition: d => d.coord[1],
          getSourceColor: d => [255, 0, 0],
          getTargetColor: d => [255, 0, 0],
          getWidth: 2.3,
          // getText:d => d.text,
          // animate:({
          //   interval: 0.8,
          //   trailLength: 2,
          //   duration: 1
          // })
        });
        map.addLayer(myDeckLayer)
      }
      else{
        // map.jumpTo({'center': [ 121.52, 31.04], 'zoom': [3]});
        map.setPitch(0);
        map.setBearing(0);
        this.setState({
          icon2:false,
        })
        if (map.getLayer('arc')) {
          map.removeLayer('arc');
        }
      }
      this.setState({
        checkValue2: !temp,
      });
    }
    this.map = map;
    e.stopPropagation();
  }
  eventReview = (e) => {
    // this.componentWillUnmount()
    // this.componentDidMount()
    var map = this.map;
    let _this = this;
    this.setState({
      delete: true,
      play: !this.state.play,
      playCount: this.state.playCount + 1
    })
    // var el = document.createElement('div');
    // el.className = "marker";
    // el.style.backgroundSize = 'cover'
    // el.style.width='20px';
    // el.style.height='20px';
    // el.style.borderRadius = '50%';
    // el.style.backgroundImage = 'url('+dangqi+')'
    d3.json(line,function(err,data) {
      if (map.getLayer('lineShToJx')) {
        map.removeLayer('lineShToJx');
        map.removeSource('lineShToJx');
      }
      if (err) throw err;
      var i = _this.state.playNumber;
      var coordinates = data.features[0].geometry.coordinates;
      if(i===0){
        data.features[0].geometry.coordinates = [coordinates[0]];
        map.jumpTo({'center': coordinates[0], 'zoom': 8});
        map.setPitch(10);
      } else {
        data.features[0].geometry.coordinates = [coordinates[i-1]];
      }
      map.addSource('trace'+ _this.state.playCount, {type:'geojson', data: data})
      map.addLayer({
        "id": "trace"+ _this.state.playCount,
        "type": "line",
        "source": "trace"+ _this.state.playCount,
        // "lineMetrics": true,
        "layout": {
          "line-join": "round",
          "line-cap": "round",
        },
        "paint": {
          // "line-color": "royalblue",
          "line-color": "#3db3d0",
          "line-opacity": 0.7,
          "line-width": 8,
          // "line-blur": 3,
          // "line-gap-width": 10,
          // "line-offset": 5,
          // "line-dasharray": [2,4],
        }
      });
      // var marker = new mapboxgl.Marker(el)
      var timer = window.setInterval(function() {
        if(i<coordinates.length) {
          if(!_this.state.play){
            data.features[0].geometry.coordinates.push(coordinates[i]);
            map.getSource('trace'+ _this.state.playCount).setData(data);
            if(i<195){
              map.panTo(coordinates[i],{'zoom':8})
            } else if(i<495){
              map.panTo(coordinates[i],{'zoom':5})
            } else if (i<695){
              map.panTo(coordinates[i],{'zoom':2})
            } else if(i<780){
              map.panTo(coordinates[i],{'zoom':5})
            } else if(i<790){
              map.panTo(coordinates[i],{'zoom':7})
            } else if(i<800){
              map.panTo(coordinates[i],{'zoom':9})
            } else if(i<805){
              map.panTo(coordinates[i],{'zoom':10})
            } else if(i<810){
              map.panTo(coordinates[i],{'zoom':11})
            } else if(i<815){
              map.panTo(coordinates[i],{'zoom':12})
            } else {
              map.panTo(coordinates[i],{'zoom':13})
            }
            i++;
            _this.setState({ playNumber: i })
            // function animateMarker() {
            //   marker.setLngLat(coordinates[i])
            //   marker.addTo(map);
            //   requestAnimationFrame(animateMarker);
            // }
            // requestAnimationFrame(animateMarker);
          } else {
            window.clearInterval(timer);
          }
        } else {
          _this.setState({ play: true });
          window.clearInterval(timer);
        }
      }, 100);
    });
  }
  eventDelete = ()  => {
    this.setState({
      play: true,
      delete:false,
      playNumber: 0,
    })
    for(var i=0;i<this.state.playCount+1;i++){
      if(this.map.getLayer("trace"+i)){
        this.map.removeSource("trace"+i);
        this.map.removeLayer("trace"+i);
      }
    }
    this.map.jumpTo({'center': [121.52, 31.04], 'zoom': 3});
  }
  showModal=(activeKey)=>{
    this.setState({
      modalVisble:true,
      activeKey:activeKey,
    });
    console.log(this.state.modalVisble)
  }
  //时间轴点击事件
  oneClick = (item) => {
    let _this = this;
    console.log("map", _this.map,item);
    if(_this.map){
      _this.map.flyTo({
        center: item.lonlat,
        zoom: 16,
        speed: 1,
        pitch: 20,
        // curve: 3,
      })
    }
  }
  oneClickYida = (item) => {
    let _this = this;
    console.log("map", _this.map,item);
    if(_this.map){
      _this.map.flyTo({
        center: item.lonlat,
        zoom: 7,
        speed: 1,
        pitch: 20,
        // curve: 3,
      })
    }
  }
  onChange = e => {
    let state = document.getElementsByClassName("answer");
    state[0].getAttribute("checked");
    let value=[];
    for(let i=0;i<state.length;i++){
      let checked=state[i].checked;
      console.log(i,checked);
      if(checked==true){
        let temp=state[i].value;
        value.push(temp)
      }
    }
    // console.log('radio checked', e);
    this.setState({
      value: value,
    });
  };
  //子时间轴（中共一大）
  moreOnClick=()=>{
    let temp = this.state.more;
    if(temp){
      let tempList = this.state.listTime;
      let subList = [];
      subList[0] = this.state.list[0];
      subList[0]['sub'] = true;
      subList[1] = this.state.list[1];
      subList[1]['sub'] = true;
      tempList.splice(1, 0, ...subList);
      this.setState({
        listTime:tempList,
      })
    }
    else{
      let tempList = this.state.listTime;
      tempList.splice(1, 2);
      this.setState({
        listTime:tempList,
      })
    }
    this.setState({
      more:!temp
    })
    this.forceUpdate();
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    let temp = this.state.collapsed;
    this.setState({ collapsed:!temp });
  };
  componentWillUnmount() {
    if(this.map){
      this.map.remove()
    }
  }
  layerClick = () => {
    this.setState({
      layerValue: !this.state.layerValue
    })
  }
  diTuClick = (id,e) => {
    let map = this.map;
    if (map.getLayer('lineShToJx')) {
      map.removeLayer('lineShToJx');
      map.removeSource('lineShToJx');
      clearInterval(timer);
    }
    this.setState({
      icon1:false,
    })
    if(id==='vec'){
      this.state.mapUrl = 'http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=7bf37aebb62ef1a2cd8e1bd276226a63'
      this.setState({
        mapUrl: this.state.mapUrl,
      })
    } else if(id==='img'){
      this.state.mapUrl = 'http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=7bf37aebb62ef1a2cd8e1bd276226a63'
      this.setState({
        mapUrl: this.state.mapUrl
      })
    } else{
      this.state.mapUrl = 'http://t0.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=7bf37aebb62ef1a2cd8e1bd276226a63'
      this.setState({
        mapUrl: this.state.mapUrl,
      })
    }
    let diTuList = ['vec','img','ter']
    for(let i=0;i<diTuList.length;i++){
      if(id===diTuList[i]){
        document.getElementById(id).style.border = ('2px solid red');
        //#4185d0
      }
      else {
        document.getElementById(diTuList[i]).style.border = ('');
      }
    }
    let localhost = window.location.origin;
    let sources = {
      "osm-tiles1": {
        "type": "raster",
        'tiles': [this.state.mapUrl],
        'tileSize': 256
      },
      "osm-tiles2": {
        "type": "raster",
        'tiles': ['http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=7bf37aebb62ef1a2cd8e1bd276226a63'],
        'tileSize': 256
      }
    };
    let layers = [{
      "id": "simple-tiles1",
      "type": "raster",
      "source": "osm-tiles1",
    },
      {
        "id": "simple-tiles2",
        "type": "raster",
        "source": "osm-tiles2",
      }
    ];
    var style = {
      "version": 8,
      "sprite": localhost + "/MapBoxGL/css/sprite",
      "glyphs": localhost + "/MapBoxGL/css/font/{fontstack}/{range}.pbf",
      "sources": sources,
      "layers": layers,
    }
    map.setStyle(style);
    this.map = map;
  }
  stopOnClick=(e)=>{
    e.stopPropagation();
  }
  render(){
    const {mapPage}=this.props;
    console.log('mapPage',mapPage);
    const {tagTree,question,knowledgeContent}=mapPage;
    let allNumber=question.length;
    let recent=this.state.questionNumber-1
    console.log('tagTree',tagTree);
    console.log('tagName',this.state.tagName);
    //遍历tagTree;
    return (
      <Authorized authority={['general','NORMAL','admin']} noMatch={noMatch}>
        <Layout className={styles.normal}>
          <Sider className={styles.siderStyle}collapsible collapsed={this.state.collapsed} trigger={null}  collapsedWidth={0} width={400}>
            {/*答题*/}
            {/**/}
            <Modal
              visible={this.state.startQuestion}
              // visible={true}
              centered
              width={1000}
              mask={true}
              maskClosable={true}
              // maskStyle={{'opacity':'0.2','background':'#bd37ad','animation':'flow'}}
              title={null}
              onCancel={()=>{
                this.setState({startQuestion:false})
                let checked1=document.getElementsByClassName(styles.qanswer);
                for (let i=0;i<checked1.length;i++){
                  document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.qanswerchoosable);
                  document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.correct);
                  document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.false);
                }
                let state = document.getElementsByTagName("input");
                state[0].getAttribute("checked");
                for(let i=0;i<state.length;i++){
                  document.getElementsByTagName("input")[i].checked=false;
                }
                this.setState({deadline:Date.now() +  1000 * 60})
                this.setState({questionNumber: 1})
                this.setState({answer:false});
                this.setState({value:[]});
                return
              }}
              footer={null}
              closable={true}
              wrapClassName={styles.web}//对话框外部的类名，主要是用来修改这个modal的样式的
            >
              <div className="d-iframe">
                {/*<iframe id="previewIframe" src="" frameBorder="0"*/}
                {/*        className="iframe-style"></iframe>*/}
                <div className={styles.web} >
                  {/*<div className={styles.question}>*/}
                  <div className={styles.top}></div>
                  <div className={styles.headerRow}>
                    <span class={styles.big}>{this.state.questionNumber}</span>
                    /{allNumber}
                  </div>
                  <div className={styles.question} style={{height:'490px',overflow:'scroll'}}>
                    <div className={styles.qbody}><div><h3>{question[recent]?question[recent].questionContent:''}</h3></div></div>
                    {/*<div className={styles.qanswer}>*/}
                    <form id={'choose'}
                      //     onChange={(e)=>{
                      // e.stopPropagation();
                      // this.onChange()}}
                          style={{top:'3em',left:'3em'}} >
                      <Row>
                        <div>
                          <div id="1" className={styles.qanswer}
                               onClick={(event)=>{
                                 event.stopPropagation();
                                 document.getElementsByTagName("input")[0].checked=!document.getElementsByTagName("input")[0].checked;
                                 this.onChange()}}>
                            <div style={{pointerEvents:'none'}}>
                              <p><input type="checkbox"   value={'A'} className="answer"/>
                                {'A  '+(question[recent]?question[recent].optionA:'')}
                              </p></div>

                            {this.state.answer&&this.state.questionChoose[recent][0]!=-1?<img width='24px' height='24px' src={this.state.questionChoose[recent][0]} />:''}
                          </div></div>
                      </Row>
                      <div id="2" className={styles.qanswer}onClick={()=>{document.getElementsByTagName("input")[1].checked=!document.getElementsByTagName("input")[1].checked;this.onChange()}}>
                        <div style={{pointerEvents:'none'}}>
                          <p><input type="checkbox"   value={'B'}
                                    className="answer"
                          />
                            {'B  '+(question[recent]?question[recent].optionB:'')}
                          </p></div>
                        {this.state.answer&&this.state.questionChoose[recent][1]!=-1?<img width='24px' height='24px' src={this.state.questionChoose[recent][1]} />:''}
                      </div>
                      {question[recent]&&question[recent].hasOwnProperty('optionC')?<div className={styles.qanswer} onClick={()=>{document.getElementsByTagName("input")[2].checked=!document.getElementsByTagName("input")[2].checked;this.onChange()}} >
                        <div style={{pointerEvents:'none'}}>
                          <p><input type="checkbox"   value={'C'} className="answer"/>
                            {'C  '+(question[recent]?question[recent].optionC:'')}
                          </p></div>
                        {this.state.answer&&this.state.questionChoose[recent][2]!=-1?<img width='24px' height='24px' src={this.state.questionChoose[recent][2]} />:''}
                      </div>:""}
                      {question[recent]&&question[recent].hasOwnProperty('optionD')?
                        <div className={styles.qanswer} onClick={()=>{document.getElementsByTagName("input")[3].checked=!document.getElementsByTagName("input")[3].checked;this.onChange()}}>
                          <div style={{pointerEvents:'none'}}>
                            <p><input type="checkbox"   value={'D'} className="answer"/>
                              {'D  '+(question[recent]?question[recent].optionD:'')}
                            </p></div>
                          {this.state.answer&&this.state.questionChoose[recent][3]!=-1?<img width='24px' height='24px' src={this.state.questionChoose[recent][3]} />:''}
                        </div>:''}
                    </form>
                    {this.state.answer==true?
                      (<h3>正确答案是</h3>):''}
                    {this.state.answer==true?
                      (<h2> {(question[recent]?question[recent].answer:'')} </h2>):''}
                    {this.state.questionNumber==allNumber&&this.state.answer?
                      (<div>
                        {/*<div className={styles.try}></div>*/}
                        <h3><span>您的得分为</span><h2>{this.state.grade}</h2></h3></div>):''}
                  </div>
                  <div className={styles.actionRow}>
                    <Button className={styles.preBtn} disabled={this.state.questionNumber<=1?true:false} onClick={()=>{
                      this.lastQuestion()
                    }}>上一题</Button>
                    <Button className={styles.nextBtn} disabled={this.answerOrNext()} onClick={()=>{
                      this.state.answer?this.nextQuestion():this.submitQuestion()
                    }}>{this.state.answer?"下一题":"提 交"}</Button>
                  </div>
                </div></div>
            </Modal>
            {/*文章*/}
            <Modal visible={this.state.startArticle}
                   centered
                   width={1000}
                   mask={true}
                   maskClosable={true}
              // maskStyle={{'opacity':'0.2','background':'#bd37ad','animation':'flow'}}
                   title={null}
                   onCancel={()=>this.setState({startArticle:false})}
                   footer={null}
                   closable={true}
                   wrapClassName={styles.web}//对话框外部的类名，主要是用来修改这个modal的样式的
            >
              <div className={styles.modal}>
                {/*<h2 style={{alignContent:'center',textAlign:'center'}}>文章</h2>*/}
                <div className={styles.topArticle}></div>
                <iframe width={"960px"}  style={{height:'560px',overflow:'scroll'}} srcDoc={knowledgeContent}  />
                {/*<div className="d-iframe" style={{height:'570px',overflow:'scroll'}} dangerouslySetInnerHTML={{__html:'<strong>'+knowledgeContent+'</strong>'}} >*/}
                {/*</div>*/}
              </div>
            </Modal>
            {/*图片*/}
            <Modal
              visible={this.state.startPicture}
              centered
              width={1000}
              mask={true}
              maskClosable={true}
              title={null}
              onCancel={()=>this.setState({startPicture:false})}
              footer={null}
              closable={true}
              wrapClassName={styles.web}//对话框外部的类名，主要是用来修改这个modal的样式的
            >
              <div className={styles.modal}>
                <div className={styles.topPicture}></div>
                <div className="d-iframe" style={{height:'560px',margin:'0 auto'}}>
                  <div style={{ height:'560px', padding: '0px 20px 0px 20px',margin:'0 auto'}} >
                    <Slider {...this.carousel_settings} >
                      {this.state.pictures}
                    </Slider>
                  </div>
                </div>
              </div>
            </Modal>
            {/*视频*/}
            <Modal visible={this.state.startVideo}
                   centered
                   width={1000}
                   mask={true}
                   maskClosable={true}
                   title={null}
                   onCancel={() => {
                     this.setState({ startVideo: false });
                     debugger
                     let video=document.getElementsByTagName('video');
                     let i=0;
                     while(i<video.length){
                       // document.getElementsByTagName('video')[i].style.display = "none";
                       document.getElementsByTagName('video')[i].pause();
                       i++;
                     }
                   }}
                   footer={null}
                   closable={true}
                   wrapClassName={styles.web}//对话框外部的类名，主要是用来修改这个modal的样式的
            >
              <div className={styles.modalVideo}>
                <div className={styles.topVideo}></div>
                <div style={{padding: 30,margin:'auto'}} >
                  <div className="d-iframe" style={{margin:'auto'}}>
                    <Slider {...this.carousel_settings} >
                      {this.state.videos}
                    </Slider>
                  </div>
                  <p style={{fontSize:'16px',textAlign:'right',color:'black'}}>共<span style={{color:'red'}}>{this.state.videos.length}</span>个</p>
                </div>
              </div>
            </Modal>
            <div style={{textAlign:"center", fontSize:"20px", color:"rgba(155,20,20,1)",padding:"10px", fontWeight:"bold"}}>{mapPage.module?mapPage.module:this.state.module}</div>
            <div id='verticalTimeLine' className={styles.verticalTimeLine}>
              <VerticalTimeline>
                {this.state.listTime.map((item)=> (
                    item['sub']?
                      <VerticalTimelineElement
                        id={item['id']}
                        style={{fontSize:"12px", size:"10px", textAlign: "center"}}
                        className="vertical-timeline-element--education"
                        date={<div onClick={(e)=>this.stopOnClick(e)} style={{textAlign:"center", width:"80%", margin:"0 auto", fontSize:"8px"}}>{item.time}</div>}
                        contentStyle={{ borderTop: '2px solid  rgba(177,46,46)',textAlign:"center",color:'rgba(177,46,46,0.8)' }}
                        contentArrowStyle={{ borderTop: '7px solid  rgb(155, 20, 20)' }}
                        iconStyle={{ background: 'rgba(177,46,46)', color: '#fff',width:'20px', height:"20px",top:"20px",marginLeft:"-10px" }}
                        dateClassName={ styles.date }
                        onTimelineElementClick={()=> this.oneClick(item) }
                        // icon={<Icon type="schedule" />}
                        // icon={<Icon type="book" />}
                      >
                        <div style={{fontWeight:"bold",cursor: 'pointer'}}>
                          <img width='20px' height='20px' src={item['property']=='movement'?movement:meeting}/>
                          {item['value']}
                        </div>
                      </VerticalTimelineElement>:
                      <VerticalTimelineElement
                        id={item['id']}
                        style={{fontSize:"15px", size:"10px", textAlign:"center"}}
                        className="vertical-timeline-element--education"
                        date={<div onClick={(e)=>this.stopOnClick(e)} style={{textAlign:"center", width:"80%", margin:"0 auto"}}>{item.time}</div>}
                        contentStyle={{ borderTop: '7px solid  rgba(177,46,46)',textAlign:"center",color:'rgb(155, 20, 20)' }}
                        contentArrowStyle={{ borderTop: '7px solid  rgba(177,46,46)' }}
                        iconStyle={{background: 'rgba(177,46,46)', color: '#fff',width:'40px', height:"40px",top:"20px",marginLeft:"-20px",paddingTop:"15px"  }}
                        dateClassName={ styles.date }
                        onTimelineElementClick={()=>(
                          item['text']=='中共一大'?
                            this.oneClickYida(item):
                            this.oneClick(item))
                        }
                        icon={<Icon type="schedule" />}
                      >{
                        item['text']=='中共一大'?
                          <div style={{fontWeight:"bold",cursor: 'pointer'}}>
                            <img width='24px' height='24px' src={item['property']=='movement'?movement:meeting}/>
                            {item['text']}
                            {
                              this.state.more?
                                <Icon className={styles.icons} type="vertical-align-bottom" onClick={()=>this.moreOnClick()}/>:
                                <Icon className={styles.icons} type="vertical-align-top" onClick={()=>this.moreOnClick()}/>
                            }
                            <div className={styles.zhonggongyida}>
                              <Row>
                                <Col span={4}>
                                  {
                                    this.state.icon2?
                                      <Icon type="play-square" style={{color:"white", background:"rgba(177,46,46)"}} onClick={(e)=>this.checkOnChange(2,e)}/>:
                                      <Icon type="play-square" onClick={(e)=>this.checkOnChange(2,e)}/>
                                  }
                                </Col>
                                <Col span={20}>
                                  荟聚天下英才
                                </Col>
                              </Row>
                              <Row style={{marginTop:"5px"}}>
                                <Col span={4}>
                                  {
                                    this.state.icon1?
                                      <Icon type="play-square" style={{color:"white", background:"rgba(177,46,46)"}} onClick={(e)=>this.checkOnChange(1,e)}/>:
                                      <Icon type="play-square" onClick={(e)=>this.checkOnChange(1,e)}/>
                                  }
                                </Col>
                                <Col span={20}>
                                  会议地点转移
                                </Col>
                              </Row>
                              {/*<Checkbox  key="a" onChange={()=>this.checkOnChange(1)} onClick={e => e.stopPropagation()} >会议地点转移</Checkbox>*/}
                              {/*<Checkbox  key="b" onChange={()=>this.checkOnChange(2)} onClick={e => e.stopPropagation()} >荟聚天下英才</Checkbox>*/}
                            </div>
                          </div>:
                          <div style={{fontWeight:"bold",cursor: 'pointer'}}>
                            <img width='24px' height='24px' src={item['property']=='movement'?movement:meeting}/>
                            {item['text']}
                          </div>
                      }
                      </VerticalTimelineElement>
                  )
                )
                }
              </VerticalTimeline>
            </div>
          </Sider>
          <Content>
            <div className={styles.normal}>
              <div className={styles.mapContainer} id="onlineMapping">
                <div ref={popupRef} className={styles.popupDiv}>
                  {this.state.itemNow?
                    <div style={{margin:"0 auto", color:"red", fontSize:"20px", textAlign:"center"}}>{this.state.itemNow['id']}</div>
                    :null}
                  {this.state.itemNow?
                    (this.state.pictureTag?<img style={{ height: '100%', width: '220px' ,marginTop:11}} src={this.state.pictureTag}/>:<Spin/>)
                    :null}
                  {this.state.itemNow?
                    <div className={styles.hand} style={{cursor:'pointer'}}>
                      <Row style={{ width: "240px", top: "10px",cursor:'pointer'}} justify="space-between">
                        <Col span={2} onClick={() => {
                          this.setState({ startArticle: true });
                          this.props.dispatch({type: 'mapPage/getKnowLedge', payload: this.state.tagName});
                        }}>
                          <Icon className={styles.popup} type="book" />
                        </Col>
                        <Col span={4} onClick={() => {
                          this.setState({ startArticle: true })
                          this.props.dispatch({type: 'mapPage/getKnowLedge', payload: this.state.tagName});
                        }}>
                          文章
                        </Col>
                        <Col span={2} onClick={() => {
                          this.setState({ startPicture: true });
                          this.props.dispatch({type: 'mapPage/getPictureByTag', payload: this.state.tagName}).then(res=>{
                            debugger
                            if(res.success) {
                              let pictures=res.pictures;
                              let picturesAll=pictures.map((item)=>{
                                return(<div style={styles.out}>
                                  <h1 style={{fontSize:'24px',textAlign:'center',color:'black',marginBottom:'15px',marginTop:'15px'}}>{item.pictureTitle}</h1>
                                  <img src={item.pictureContent} style={{ height: '490px',display:'block',
                                    marginLeft: 'auto',marginRight: 'auto'}} />
                                </div>)
                              });
                              this.setState({pictures:picturesAll})
                            }
                            console.log('res');
                          });
                        }}>
                          <Icon className={styles.popup} type="picture" />
                        </Col>
                        <Col span={4} onClick={() => {
                          this.setState({ startPicture: true });
                          this.props.dispatch({type: 'mapPage/getPictureByTag', payload: this.state.tagName}).then(res=>{
                            debugger
                            if(res.success) {
                              let pictures=res.pictures;
                              let picturesAll=pictures.map((item)=>{
                                return(<div style={styles.out}>
                                  <h1 style={{fontSize:'24px',textAlign:'center',color:'black',marginBottom:'15px',marginTop:'15px'}}>{item.pictureTitle}</h1>
                                  <img src={item.pictureContent} style={{ height: '490px',display:'block',
                                    marginLeft: 'auto',marginRight: 'auto'}} />
                                </div>)
                              });
                              this.setState({pictures:picturesAll})
                            }
                            console.log('res');
                          });
                        }}>
                          图片
                        </Col>
                        <Col span={2} onClick={() => {
                          this.setState({ startVideo: true })
                          this.props.dispatch({type: 'mapPage/getVideoByTag', payload: this.state.tagName}).then(res=>{
                            console.log('res',res.videos);
                            if(res.success) {
                              let videos=res.videos;
                              let videoAll=videos.map((item,index, arr)=>{
                                return(<div style={styles.out1}>
                                  <h1  style={{fontSize:'24px',textAlign:'center',color:'black',marginBottom:'14px'}}>{item.videoTitle}</h1>
                                  {/*<video src={item.videoContent} style={{ height: '100%', width: '100%' }} />*/}
                                  <video height="400" width="100%" top="3em" poster="http://www.youname.com/images/first.png"
                                         preload="none"
                                         margin='auto'
                                         controls="controls">
                                    {/*autoPlay="autoplay"*/}
                                    <source src={item.videoContent}
                                    />
                                    <source src={item.videoContent}
                                    />
                                  </video>
                                  <p style={{fontSize:'16px',textAlign:'right',color:'black'}}>第{index+1}个视频</p>
                                </div>)
                              });
                              this.setState({videos:videoAll})
                            }
                          });
                        }}>
                          <Icon className={styles.popup} type="video-camera" />
                        </Col>
                        <Col span={4} onClick={() => {
                          // this.setState({ startVideo: true })
                          // this.props.dispatch({type: 'mapPage/getVideoByTag', payload: this.state.tagName});
                          this.setState({ startVideo: true })
                          this.props.dispatch({type: 'mapPage/getVideoByTag', payload: this.state.tagName}).then(res=>{
                            console.log('res',res.videos);
                            if(res.success) {
                              let videos=res.videos;
                              let videoAll=videos.map((item,index, arr)=>{
                                return(<div style={styles.out1}>
                                  <h1  style={{fontSize:'24px',textAlign:'center',color:'black',marginBottom:'14px'}}>{item.videoTitle}</h1>
                                  {/*<video src={item.videoContent} style={{ height: '100%', width: '100%' }} />*/}
                                  <video height="400" width="100%" top="3em" poster="http://www.youname.com/images/first.png"
                                    // autoPlay="autoplay"
                                         width='888px'
                                         preload="none"
                                         controls="controls">
                                    <source src={item.videoContent}
                                    />
                                    <source src={item.videoContent}
                                    />
                                  </video>
                                  <p style={{fontSize:'16px',textAlign:'right',color:'black'}}>第{index+1}个视频</p>
                                </div>)
                              });
                              this.setState({videos:videoAll})
                            }
                          });
                        }}>
                          视频
                        </Col>
                        <Col span={2} onClick={() => {
                          let username=getLocalData({dataName:'userName'});
                          debugger
                          this.props.dispatch({type: 'mapPage/getUsrStatus', payload: {tag_name:this.state.tagName,user_name:username}}).then(res=>
                          {
                            this.setState({ startQuestion: true });
                            this.props.dispatch({ type: 'mapPage/getQuestion', payload: this.state.tagName })
                            // debugger
                            // console.log('res',res);
                            // if(res.user_answer_status==1) {
                            //   alert("该套题您已回答过");
                            // }else{
                            //
                            // }
                          })
                        }}>
                          <Icon className={styles.popup} type="question" />
                        </Col>
                        <Col span={4} onClick={() => {
                          let username=getLocalData({dataName:'userName'});
                          debugger
                          this.props.dispatch({type: 'mapPage/getUsrStatus', payload: {tag_name:this.state.tagName,user_name:username}}).then(res=>
                          {
                            this.setState({ startQuestion: true });
                            this.props.dispatch({ type: 'mapPage/getQuestion', payload: this.state.tagName })
                          })
                        }}>
                          答题
                        </Col>
                      </Row></div>:null}
                </div>
              </div>
              <Icon
                style={{position:"absolute", fontSize:"30px"}}
                className='trigger'
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.onCollapse}
              />
              <div className={styles.layer_icon} onClick={this.layerClick} title="更换地图底图">
                <img src={layer} className={styles.layer_img}/>
              </div>
              <div className={styles.layer_div} style={{display: this.state.layerValue ? 'block': 'none'}}>
                <Row>
                  <Col span={21}>
                    <h3>选择底图</h3>
                  </Col>
                  <Col span={3}>
                    <Button icon="close" onClick={this.layerClick} className={styles.layer_close}> </Button>
                  </Col>
                </Row>
                <Divider style={{marginTop:7,marginBottom:10}} />
                <Row style={{marginLeft:3}}>
                  <Col span={8} style={{fontSize:7, color:'#0078A8'}}>
                    <div className={styles.img_div} onClick={(e) =>this.diTuClick('vec',e)} id="vec">
                      <img src={jiedao} className={styles.layer_ditu} />
                    </div>
                    <div style={{marginLeft:25,marginTop:13}}>街道图</div>
                  </Col>
                  <Col span={8} style={{fontSize:7, color:'#0078A8'}}>
                    <div  onClick={(e) =>this.diTuClick('img',e)} id="img">
                      <img src={yingxiang} className={styles.layer_ditu} />
                    </div>
                    <div style={{marginLeft:25,marginTop:13}}>影像图</div>
                  </Col>
                  <Col span={8} style={{fontSize:7, color:'#0078A8'}}>
                    <div  onClick={(e) =>this.diTuClick('ter',e)} id="ter">
                      <img src={dixing} className={styles.layer_ditu} />
                    </div>
                    <div style={{marginLeft:25,marginTop:13}}>地形图</div>
                  </Col>
                </Row>
              </div>
              <div className={styles.review_icon} onClick={this.eventReview}>
                <img src={reback} className={styles.layer_img}/>
              </div>
              <div id="pause" className={styles.review_icon} onClick={() => this.eventReview(1)} title="一大至十九大地图位置串联">
                {this.state.play ? <img src={kaishi} className={styles.layer_img}/> :
                  <img src={zanting} className={styles.layer_img}/>}
              </div>
              <div id="pause" style={{display: this.state.delete ? 'block':'none'}} className={styles.review_deleteIcon} onClick={this.eventDelete} title="删除一大至十九大串联的图层">
                <img src={qingchu} className={styles.layer_img}/>
              </div>
              <div className={styles.copyright}>
                版权所有Copyright © 浙江大学地球科学学院
              </div>
            </div>
          </Content>
        </Layout>
      </Authorized>
    );
  }
}

export default connect(({ mapPage }) => ({
  mapPage
}))(MapPage);
