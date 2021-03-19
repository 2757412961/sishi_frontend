import React, { useState, useEffect, Component } from 'react';
import { Button, Checkbox, Layout, Modal, Typography, Statistic, Col, Row,Card,Radio,Timeline,Tabs,Icon,Table, Carousel } from 'antd';
import styles from './index.less';
import { fromJS } from 'immutable';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { connect } from 'dva';
import axios from 'axios';
import { getLocalData } from '@/utils/common.js';
import { MapContext, RotationControl, ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MapPageMap from './MapPageMap';
import Redirect from 'umi/redirect';
import RenderAuthorized from '@/components/Authorized';
import {getAuthority} from '@/utils/authority';
// import {motion} from 'framer-motion';
// // @import '~video-react/styles/scss/video-react';
// import {Player} from 'video-react'
import redflag from '@/assets/redflag.png';
import eventcard from '@/assets/eventcard.png';
import p1 from '@/assets/test/1.jpg';
import p2 from '@/assets/test/2.jpg';
import p3 from '@/assets/test/3.jpg';
import dangshi from '@/assets/dangshi.PNG'
import yay from '@/assets/unnamed.jpg'
import yaa from '@/assets/KkpJ-hukwxnu5742888.jpg'
import dangshi_background from '@/assets/dangshi_background.PNG'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;
const Authorized = RenderAuthorized(getAuthority());
const { Countdown } = Statistic;
const { Content, Sider } = Layout;
const noMatch=<Redirect to={`/login?redirect=${window.location.href}`} />;
const variants={open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },}
//
//
// const list = [
//   {
//     id:'一大-上海',
//     lonlat:[121.47069346816863, 31.22206084685108],
//     text:'1921年7月-中共一大上海',
//     value: '中共一大上海',
//     showInfo: '<div className={styles.markerTop}>' +
//       '<h2>中共一大</h2>' +
//       '</div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
//       '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
//       '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p>' +
//       '</div>',
//     cardImg:p1,
//     cardContent:'中国共产党第一次全国代表大会，简称中共一大',
//     label:"党史新学@中共一大@上海",
//   },
//   {
//     id:'一大-嘉兴',
//     lonlat:[120.75580305351667, 30.75747193181725],
//     text:'1921年7月-中共一大',
//     value: '中共一大嘉兴',
//     showInfo: '<div className={styles.markerTop}>' +
//       '<h2>中共一大</h2>' +
//       '<p><a id="btn">点击进入学习卡片</a></p>' +
//       '</div>',
//     cardImg:p1,
//     cardContent:'中国共产党第一次全国代表大会，简称中共一大',
//     label:"党史新学@中共一大@嘉兴",
//   },
//   {
//     id:'二大-上海',
//     lonlat:[121.46214132313253, 31.2260623329518],
//     text: '1922年7月-中共二大',
//     value: '中共二大',
//     showInfo: '<div className={styles.markerTop}>' +
//       '<h2>中共二大</h2>' +
//       '<p><a id="btn">点击进入学习卡片</a></p>' +
//       '</div>',
//     cardImg:p2,
//     cardContent:'中国共产党第二次全国代表大会，简称中共二大',
//     label:"党史新学@中共二大@上海",
//   },
//   {
//     id:'三大-广州',
//     lonlat:[113.29062697510238, 23.121680862715294],
//     text: '1923年6月-中共三大',
//     value: '中共三大',
//     showInfo: '<div className={styles.markerTop}>' +
//       '<h2>中共三大</h2>' +
//       '<p><a id="btn">点击进入学习卡片</a></p>' +
//       '</div>',
//     cardImg:p3,
//     cardContent:'中国共产党第三次全国代表大会，简称中共三大',
//     label:"党史新学@中共三大@广州",
//   },
//   {
//     id:'四大-上海',
//     lonlat:[121.48020351895462,31.25728522799882],
//     text: '1925年1月-中共四大',
//     value: '中共四大',
//     showInfo: '<div className={styles.markerTop}>' +
//       '<h2>中共四大</h2>' +
//       '<p><a id="btn">点击进入学习卡片</a></p>' +
//       '</div>',
//     cardImg:p2,
//     cardContent:'中国共产党第四次全国代表大会，简称中共四大',
//     label:"党史新学@中共四大@上海",
//   },
//   {
//     id:'五大-武汉',
//     lonlat:[114.29318634011975,30.553569642526185],
//     text: '1927年4月-中共五大',
//     value: '中共五大',
//     showInfo: '<div className={styles.markerTop}>' +
//       '<h2>中共五大</h2>' +
//       '<p><a id="btn">点击进入学习卡片</a></p>' +
//       '</div>',
//     cardImg:p2,
//     cardContent:'中国共产党第五次全国代表大会，简称中共五大',
//     label:"党史新学@中共五大@武汉",
//   },
//   {
//     id:'六大-俄罗斯',
//     lonlat:[37.153974181328664,55.535728582753336],
//     text: '1928年6月-中共六大',
//     value: '中共六大',
//     showInfo: '<div className={styles.markerTop}>' +
//       '<h2>中共六大</h2>' +
//       '<p><a id="btn">点击进入学习卡片</a></p>' +
//       '</div>',
//     cardImg:p2,
//     cardContent:'中国共产党第六次全国代表大会，简称中共六大',
//     label:"党史新学@中共六大@俄罗斯",
//   },
//   {
//     id:'七大-延安',
//     lonlat:[109.46267096678156,36.618757084621336],
//     text: '1945年4月-中共七大',
//     value: '中共七大',
//     showInfo: '<div className={styles.markerTop}>' +
//       '<h2>中共七大</h2>' +
//       '<p><a id="btn">点击进入学习卡片</a></p>' +
//       '</div>',
//     cardImg:p2,
//     cardContent:'中国共产党第七次全国代表大会，简称中共七大',
//     label:"党史新学@中共七大@延安",
//   },
//   {
//     id:'八大-政协礼堂',
//     lonlat:[116.35780179933835,39.91833919135752],
//     text: '1956年9月-中共八大',
//     value: '中共八大',
//     showInfo: '<div className={styles.markerTop}>' +
//       '<h2>中共八大</h2>' +
//       '<p><a id="btn">点击进入学习卡片</a></p>' +
//       '</div>',
//     cardImg:p2,
//     cardContent:'中国共产党第八次全国代表大会，简称中共八大',
//     label:"党史新学@中共八大@北京",
//   },{
//     id:'九大-人民大会堂',
//     lonlat:[116.38748691963224,39.90337460887406],
//     text: '1969年4月-中共九大',
//     value: '中共九大',
//     showInfo: '<div className={styles.markerTop}>' +
//       '<h2>中共九大</h2>' +
//       '<p><a id="btn">点击进入学习卡片</a></p>' +
//       '</div>',
//     cardImg:p2,
//     cardContent:'中国共产党第九次全国代表大会，简称中共九大',
//     label:"党史新学@中共九大@北京",
//   },
// ];
let list=[];
var chapters = {
  '一大上海': {
    bearing: 0,
    center: [121.47069346816863, 31.22206084685108],
    zoom: 15.5,
    pitch: 20
  },
  '一大嘉兴': {
    duration: 6000,
    center: [120.75580305351667, 30.75747193181725],
    bearing: 0,
    zoom: 15,
    pitch: 30
  },
  '二大上海': {
    bearing: 0,
    center: [121.46214132313253, 31.2260623329518],
    zoom: 16,
    speed: 0.6,
    pitch: 40
  },
  '三大广州': {
    bearing: 0,
    center: [113.29062697510238, 23.121680862715294],
    zoom: 15.3,
    pitch: 40,
  },
  '四大上海': {
    bearing: 0,
    center: [121.48020351895462,31.25728522799882],
    zoom: 14.3,
    pitch: 20,
    speed: 0.5
  },
  '五大武汉': {
    bearing: 0,
    center: [114.29318634011975,30.553569642526185],
    zoom: 16.3,
    pitch: 50,
  },
  '七大延安': {
    bearing: 0,
    center: [109.46267096678156,36.618757084621336],
    zoom: 17.3,
    pitch: 40
  },
  '八大北京': {
    bearing: 0,
    center: [116.35780179933835,39.91833919135752],
    zoom: 17,
    pitch: 20
  }
};

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

const subList = [
  {
    id:'一大-嘉兴',
    lonlat:[120.75580305351667, 30.75747193181725],
    text:'1921年7月-中共一大',
    showInfo: '<div className={styles.markerTop}>' +
      '<h2>中共一大</h2>' +
      '<p><a id="btn">点击进入学习卡片</a></p>' +
      '</div>',
    cardImg:p1,
    cardContent:'中国共产党第一次全国代表大会，简称中共一大',
    label:"党史新学@中共一大@嘉兴",
    sub:true,
  },
  {
    id:'jiaxing7',
    lonlat:[120.79, 30.75],
    text:'1921年7月-中共大',
    showInfo: '<div className={styles.markerTop}>' +
      '<h2>中共一大</h2>' +
      '</div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p>' +
      '</div>',
    cardImg:p1,
    cardContent:'中国共产党第一次全国代表大会，简称中共一大',
    sub:true,
  },
  {
    id:'jiaxing8',
    lonlat:[120.79, 30.75],
    text:'1921年7月-中共大',
    showInfo: '<div className={styles.markerTop}>' +
      '<h2>中共一大</h2>' +
      '</div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p>' +
      '</div>',
    cardImg:p1,
    cardContent:'中国共产党第一次全国代表大会，简称中共一大',
    sub:true,
  },
];
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
function forList(treeList){
  let list=[];
  for (let i in treeList){
    if(treeList[i].hasOwnProperty('geoCoordinates')){
      let temp={};
      temp.id=treeList[i].label;
      temp.lonlat=treeList[i].geoCoordinates;
      temp.tagName=treeList[i].tagName;
      temp.text=treeList[i].label;
      temp.value=treeList[i].label;
      temp.time=treeList[i].time;
      temp.showInfo='<div className={styles.markerTop}><h2>'+treeList[i].label+'</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
        '于'+treeList[i].time+'在<span>'+treeList[i].label+'</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
        '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p></div>';
      temp.cardContent=treeList[i].tagName;
      temp.cardImg=p1;
      list.push(temp);
    }
  }
  return list;
}

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _collapsed: false,
      modalVisble: false,
      deadline: Date.now() +  1000 * 60,
      value:1,
      grade:0,
      answer:false,
      first: false,
      questionNumber:1,
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
      knowledgeUrl:'',
      //list[0].cardImg,
      knowledgeContent:'',
      //list[0].cardContent,
      // current_url : 'http://192.168.2.2:89/media/videos/dangshi/05.mp4',
      more:true,
      startQuestion:false,
    };

  }

  componentDidMount() {
    const {dispatch}=this.props;
    dispatch({ type: 'mapPage/getTagTree'});
    dispatch({ type: 'mapPage/getQuestion'});
    // dispatch({ type: 'mapPage/updateUserGrades',payload:this.state.grade});
    dispatch({ type: 'mapPage/getVideoByTag'});
    dispatch({ type: 'mapPage/getAudioByTag'});
    console.log('dispatch',dispatch);
    const {mapPage}=this.props;
    console.log('mapPage',mapPage);
    const {tagTree}=mapPage;
    console.log('tagTree',tagTree);
    //遍历tagTree;
    let tree;
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2F0c29ueWh4IiwiYSI6ImNrMWticjRqYjJhOTczY212ZzVnejNzcnkifQ.-0kOdd5ZzjMZGlah6aNYNg';
    let localhost = window.location.origin;
    let sources = {
      "osm-tiles1": {
        "type": "raster",
        'tiles': ['http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=7bf37aebb62ef1a2cd8e1bd276226a63'],
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
    // let treeList=forTree(tagTree);
    // console.log('treeList',treeList);
    dispatch({ type: 'mapPage/getTagTree'}).then((res)=>{
      console.log('res',res);
      if(res&&res.success){
        let tagTree=res.list;
        let tree=forTree(tagTree);
        console.log('tree',tree);
        list=forList(tree);
      }
    });
    const map = new mapboxgl.Map({
      container: 'onlineMapping',
      style: {
        "version": 8,
        "sprite": localhost + "/MapBoxGL/css/sprite",
        "glyphs": localhost + "/MapBoxGL/css/font/{fontstack}/{range}.pbf",
        "sources": sources,
        "layers": layers,
      },
      center: [121.52, 31.04],  //上海经纬度坐标
      zoom: 3,
    });
    // let nav = new mapboxgl.NavigationControl({
    //   //是否显示指南针按钮，默认为true
    //   "showCompass": true,
    //   //是否显示缩放按钮，默认为true
    //   "showZoom":true
    // });
    // //添加导航控件，控件的位置包括'top-left', 'top-right','bottom-left' ,'bottom-right'四种，默认为'top-right'
    // map.addControl(nav, 'top-left');
    // On every scroll event, check which element is on screen
    document.getElementById('features').onscroll = function() {
      var chapterNames = Object.keys(chapters);
      for (var i = 0; i < chapterNames.length; i++) {
        var chapterName = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
          setActiveChapter(chapterName);
          break;
        }
      }
    };
    var activeChapterName = '一大上海';
    function setActiveChapter(chapterName) {
      if (chapterName === activeChapterName){
        return
      }
      map.flyTo(chapters[chapterName]);
      document.getElementById(chapterName).style.opacity = 1;
      document.getElementById(activeChapterName).style.opacity = 0.25;
      activeChapterName = chapterName;
    }
    function isElementOnScreen(id) {
      var element = document.getElementById(id);
      var bounds = element.getBoundingClientRect();
      console.log('bounds',bounds.top,bounds.bottom)
      return bounds.top < window.innerHeight && bounds.bottom > 0;
    }

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

    //加载中共一大（上海，嘉兴地点）的火花图标
    map.on('load', function() {
      /*map.loadImage('https://upload.wikimedia.org/wikipedia/commons/4/45/Eventcard.png',function(error,image) {
        if(error) throw  error;
        for(let i = 0;i<list.length;i++){
          map.addImage(list[i].id, image);
          map.addLayer({
            "id": list[i].id,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [{
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": list[i].lonlat,
                  }
                }]
              }
            },
            "layout": {
              "icon-image": list[i].id,
              "icon-size": [
                "interpolate", ["linear"], ["zoom"],
                3,0.1,
                17,0.8
              ],
              "icon-ignore-placement": true,
            }
          });
        }
      });*/
      //debugger
      for (let i=0;i<list.length;i++) {
        console.log('imap',i,list[i]);
        map.addImage(list[i].id, pulsingDot, { pixelRatio: 2 });
        map.addLayer({
          "id": list[i].id,
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": list[i].lonlat,
                }
              }]
            }
          },
          "layout": {
            "icon-image": list[i].id,
            "icon-optional": false,
            "icon-ignore-placement": true,
            // "text-ignore-placement": true,
            "text-allow-overlap": true,
            "text-field": list[i].value,
            "text-anchor": 'left',
            "text-offset": [1,0.1],
            // "text-font": ["DIN Offc Pro Medium\", \"Arial Unicode MS Bold"],
            "text-size": [
              "interpolate", ["linear"], ["zoom"],
              3,20,
              17,38
            ],
          },
          paint: {
            "text-color": 'rgb(255,0,0)',
          }

        });
      }
      // playback(0);
    });
    let _this = this;
    for(let i = 0;i<list.length;i++){
      map.on('click', list[i].id, function(e) {
        var coordinates = e.features[0].geometry.coordinates;
        let showInfo = list[i].showInfo;
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(showInfo)
          .addTo(map);
        document.getElementById('btn')
          .addEventListener('click', function(){
            let cardImg = list[i].cardImg;
            let cardContent = list[i].cardContent;
            _this.setState({
              knowledgeUrl: cardImg,
              knowledgeContent: cardContent,
            });
            //_this.setState({startQuestion:true})
            _this.showModal()
          });
      });
      map.on('mouseenter', list[i].id, function() {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', list[i].id, function() {
        map.getCanvas().style.cursor = '';
      });
    }
    this.map = map;
  }
  showModal=()=>{
    this.setState({modalVisble:true})
    console.log(this.state.modalVisble)
  }
  oneClick = (item) => {
    let _this = this;
    console.log("map", _this.map,item);
    if(_this.map){
      _this.map.flyTo({
        center:item.lonlat,
        zoom: 6,
        speed: 1,
        // curve: 3,
      })
    }
  }
  onChange = e => {
    console.log('radio checked', e);
    this.setState({
      value: e,
    });
  };
  moreOnClick=()=>{
    let temp = this.state.more;
    if(temp){
      list.splice(1, 0, ...subList);
    }
    else{
      list.splice(1, 3);
    }
    this.setState({
      more:!temp
    })
    this.forceUpdate();
  };

  render(){
    let question1='中日甲午战争中，日军野蛮屠杀和平居民的地点是';
    let answer=['A.大连','B.旅顺','C.平壤','D.花园口'];
    let rightAnswer=1;
    // const {dispatch}=this.props;
    // dispatch({ type: 'mapPage/getTagTree'});
    // dispatch({ type: 'mapPage/getQuestion'});
    // console.log('dispatch',dispatch);
    const {mapPage}=this.props;
    console.log('mapPage',mapPage);
    //debugger
    const {tagTree,question}=mapPage;
    let list1=forTree(tagTree);
    list=forList(list1);
    let allNumber=question.length;
    let recent=this.state.questionNumber-1
    const {unCheckStyle,checkStyle} = this.state;
  return (
    <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
    <Layout className={styles.normal}>
      <Sider style={{backgroundColor:'rgba(155,100,20,0.5)', overflow:'auto'}} width={400}>
        <Button  key="back" onClick={()=>{this.setState({startQuestion:true})}}>
          答题
        </Button>
        <Modal visible={this.state.startQuestion}
               centered
              //  style={{top:'3em',height:'500px'}}
              width={1000}
              // // bodyStyle={{backgroundImage:}}
              //  className={styles.modal}
              //  closable={false}
              //  keyboard={true}
               mask={true}
               maskClosable={true}
              // maskStyle={{'opacity':'0.2','background':'#bd37ad','animation':'flow'}}
               title={null}
               onCancel={this.handleCancel}
               footer={null}
               closable={false}
               wrapClassName={styles.web}//对话框外部的类名，主要是用来修改这个modal的样式的
        >
          <div className={styles.modal}>
            <div className={styles.top}></div>
            <div className="d-iframe">
              {/*<iframe id="previewIframe" src="" frameBorder="0"*/}
              {/*        className="iframe-style"></iframe>*/}
              <div className={styles.web} >
                <h1>{this.state.questionNumber+"."+(question[recent]?question[recent].questionContent:'')}</h1>
                <div className={styles.radio}>
                <Checkbox.Group onChange={this.onChange} style={{top:'3em',left:'3em'}} >
                  <Row>
                    <Col span={12}>
                  <Checkbox    value={'A'}>
                    {'A  '+(question[recent]?question[recent].optionA:'')}
                  </Checkbox>
                    </Col>
                    <Col span={12}>
                  <Checkbox    value={'B'}>
                    {'B  '+(question[recent]?question[recent].optionB:'')}
                  </Checkbox>
                    </Col>
                    {question[recent]&&question[recent].hasOwnProperty('optionC')?<Col span={12}>
                  <Checkbox    value={'C'}>
                    {'C  '+(question[recent]?question[recent].optionC:'')}
                  </Checkbox>
                    </Col>:""}
                    {question[recent]&&question[recent].hasOwnProperty('optionD')?
                    <Col span={12}>
                  <Checkbox    value={'D'}>
                    {'D  '+(question[recent]?question[recent].optionD:'')}
                    {/*{value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}*/}
                  </Checkbox>
                    </Col>:''}
                  </Row>
                </Checkbox.Group>
                  <img src=""/>
                </div>
              </div>
              {this.state.answer==true?
                (<h1>正确答案是</h1>):''}
              {this.state.answer==true?
                (<Card type="inner" title={(question[recent]?question[recent].answer:'')} />):''}
              <Row gutter={16}>
                <Col span={8}>
                  <Button  key="submit"
                           type="primary" style={{backgroundColor:'rgb(255,0,0)'}}
                           onClick={()=>{
                             let string=this.state.value.toString();
                             if(string==(question[recent]?question[recent].answer:''))
                             {
                               this.setState({grade:this.state.grade+1});
                             }
                             this.setState({answer:true})
                             if(this.state.questionNumber==allNumber) {
                               alert("答题结束")
                             }}}>提交</Button>
                </Col>
                <Col span={8}>
                  <Button
                    key="submit"
                    type="primary"
                    onClick={()=> {
                      if(this.state.questionNumber==allNumber&&this.state.answer==true){
                        this.setState({startQuestion:false})
                        this.setState({questionNumber: 1})
                        const {dispatch}=this.props;
                        dispatch({ type: 'mapPage/updateUserGrades',payload:this.state.grade});
                        return
                      }
                      if(this.state.answer==false){
                        alert('你还未提交本题答案')
                      } else{
                        this.setState({deadline:Date.now() +  1000 * 60})
                        this.setState({questionNumber: this.state.questionNumber+1})
                        this.setState({answer:false})
                      }
                    }}>
                    下一题
                  </Button>
                </Col>
                <Col span={8}>
                  <Button onClick={()=>this.setState({startQuestion:false})}> 关闭</Button>
                  <h1><span>{this.state.questionNumber}</span>/
                    <span>{allNumber}</span></h1>
                  {/*<Countdown title="计时器" value={this.state.deadline} onFinish={()=>{}} />*/}
                </Col>
              </Row>
              {this.state.questionNumber==allNumber&&this.state.answer?
                (<div>
                  <div className={styles.try}></div>
                  <h1><span>您的得分为</span><h2>{this.state.grade}</h2></h1></div>):''}

            </div>
            <div className={styles.bottom}></div>
          </div>
        </Modal>
        <Modal visible={this.state.modalVisble}
               destroyOnClose={true}
               forceRender={true}
               title="互动页面"
               centered
               style={{top:'3em',color:'black',fontStyle:{},height:'70vh', width:'70vw'}}
               // bodyStyle={{height:'70vh', width:'70vw'}}
               maskStyle={{backgroundColor: 'rgba(198,170,145,0.1)' ,top:'5em',}}
               className={styles.modal}
               onOk={()=>this.setState({modalVisble:false})}
               onCancel={()=>this.setState({modalVisble:false})}
               footer={false}
        >
          <Tabs defaultActiveKey="1">

            <TabPane
              tab={
                <span>
                        <Icon type="book" />
                          知识卡片
                      </span>
              }
              key="1"
            >
              <Card style={{ width: '100' }}
                    cover={
                      <img
                        alt="example"
                        src={this.state.knowledgeUrl}
                      />
                    }
                    >
                {this.state.knowledgeContent}
              </Card>
            </TabPane>
            <TabPane
              tab={
                <span>
                        <Icon type="question" />
                          答题
                      </span>
              }
              key="2"
            >

              <Card   title={this.state.questionNumber+"."+(question[recent]?question[recent].questionContent:'')}>
                <Checkbox.Group onChange={this.onChange} style={{top:'3em',left:'3em'}} >
                  <Row>
                    <Col span={12}>
                      <Checkbox    value={'A'}>
                        {'A  '+(question[recent]?question[recent].optionA:'')}
                      </Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox    value={'B'}>
                        {'B  '+(question[recent]?question[recent].optionB:'')}
                      </Checkbox>
                    </Col>
                    {question[recent]&&question[recent].hasOwnProperty('optionC')?<Col span={12}>
                      <Checkbox    value={'C'}>
                        {'C  '+(question[recent]?question[recent].optionC:'')}
                      </Checkbox>
                    </Col>:""}
                    {question[recent]&&question[recent].hasOwnProperty('optionD')?
                      <Col span={12}>
                        <Checkbox    value={'D'}>
                          {'D  '+(question[recent]?question[recent].optionD:'')}
                          {/*{value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}*/}
                        </Checkbox>
                      </Col>:''}
                  </Row>
                </Checkbox.Group>
                {/*<Radio.Group onChange={this.onChange} value={this.state.value}>*/}
                {/*  <Radio   style={radioStyle} value={0}>*/}
                {/*    {answer[0]}*/}
                {/*  </Radio>*/}
                {/*  <Radio   style={radioStyle} value={1}>*/}
                {/*    {answer[1]}*/}
                {/*  </Radio>*/}
                {/*  <Radio   style={radioStyle} value={2}>*/}
                {/*    {answer[2]}*/}
                {/*  </Radio>*/}
                {/*  <Radio   style={radioStyle} value={3}>*/}
                {/*    {answer[3]}*/}
                {/*    /!*{value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}*!/*/}
                {/*  </Radio>*/}
                {/*</Radio.Group>*/}
              </Card>
              <Button  key="submit"
                       type="primary" style={{bottom:'0em',left:'29em',backgroundColor:'rgb(255,0,0)'}} onClick={()=>{
                if(this.state.value==rightAnswer){
                  this.setState({grade:this.state.grade+1});
                }
                this.setState({answer:true})
                if(this.state.questionNumber==allNumber)
                {
                  alert("答题结束")
                }
                       }}>提交</Button>
              {this.state.answer==true?
                (<h1>正确答案是</h1>):''}
              {this.state.answer==true?
                (<Card type="inner" title={answer[rightAnswer]} />):''}
              <Row gutter={16}>
                <Col span={8}>
                  <Button  key="back" onClick={()=>{this.setState({questionNumber: this.state.questionNumber-1})}}>
                    上一题
                  </Button>
                </Col>
                <Col span={8}>
                  <Button
                    key="submit"
                    type="primary"
                    onClick={()=> {
                      // this.setState({modalVisble:false})
                      if(this.state.questionNumber==allNumber){
                        return
                      }
                      if(this.state.answer==false){
                        alert('你还未提交本题答案')
                      }
                      else{
                      this.setState({deadline:Date.now() +  1000 * 60})
                      this.setState({questionNumber: this.state.questionNumber+1})
                      this.setState({answer:false})
                      }
                    }}>
                    下一题
                  </Button>
                </Col>
                <Col span={8}>
                  <h2><span>{this.state.questionNumber}</span>/
                  <span>{allNumber}</span></h2>
                  {/*<Countdown title="计时器" value={this.state.deadline} onFinish={()=>{}} />*/}
                </Col>
              </Row>
              {this.state.questionNumber==allNumber&&this.state.answer?
                (<div>
                  <div className={styles.try}></div>
                  <h1><span>您的得分为</span><h2>{this.state.grade}</h2></h1></div>):''}
            </TabPane>
            <TabPane
              tab={
                <span>
                        <Icon type="video-camera" />
                          视频
                      </span>
              }
              key="3"
            >
              <video height="400" width="100%" top="3em" poster="http://www.youname.com/images/first.png" autoPlay="autoplay" preload="none"
                     controls="controls">
                {/*<source src="./1.mp4"*/}
                {/*/>*/}
                {/*<source src="./1.mp4"*/}
                {/*/>*/}
                <source src="http://192.168.2.2:89/media/videos/dangshi/05.mp4"
              />
                <source src="http://192.168.2.2:89/media/videos/dangshi/05.mp4"
                />
              </video>
              {/*<video height="400" poster="http://www.youname.com/images/first.png" autoplay="autoplay">*/}
              {/*  <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"/>*/}
              {/*</video>*/}
            </TabPane>

            <TabPane
              tab={
                <span>
                        <Icon type="picture" />
                         图片
                      </span>
              }
              key="5"
            >
              {/*<Carousel >*/}
              {/*  <div >*/}
              {/*    <img  src={yay} />*/}
              {/*  </div>*/}
              {/*  <div >*/}
              {/*    <img  src={yaa} style={{height: 250, width:400 }}/>*/}
              {/*  </div>*/}
              {/*</Carousel>*/}

              <div style={{padding: 40, background: "#ececec"}} >
                <Slider {...this.carousel_settings} >
                  <div>
                    <img  src={yay} />
                  </div>
                  <div>
                    <img  src={yaa} style={{height: 250, width:400 }}/>
                  </div>
                </Slider>
              </div>

            </TabPane>

            <TabPane
              tab={
                <span>
                        <Icon type="sound" />
                         音乐
                      </span>
              }
              key="4"
            >
                <Card type="inner" size="small" title= '音乐列表' bordered={false}>
                  <audio width="800" controls="controls"  loop="loop" preload="auto" title="123">
                    <source src="http://music.163.com/song/media/outer/url?id=476592630.mp3" type="audio/mp3" />
                  </audio>
                  {/*<Table dataSource={{}} pagination={false}>*/}
                  {/*  <Column title="结果名称" dataIndex="name" key="name" />*/}
                  {/*  <Column title="结果值" dataIndex="resultDesc" key="resultDesc" />*/}
                  {/*</Table>*/}
                </Card>
            </TabPane>

          </Tabs>
        </Modal>
        <VerticalTimeline
          // layout='1-column-left'
        >
          {list.map((item)=> (
              item['sub']?
                <VerticalTimelineElement
                  id={item['id']}
                  style={{fontSize:"15px", size:"10px"}}
                  className="vertical-timeline-element--education"
                  date="2006 - 2008"
                  contentStyle={{ borderTop: '7px solid  rgb(155, 20, 20)' }}
                  contentArrowStyle={{ borderTop: '7px solid  rgb(155, 20, 20)' }}
                  iconStyle={{ background: 'rgb(155, 20, 20)', color: '#fff',width:'20px', height:"20px",top:"20px",marginLeft:"-10px" }}
                  dateClassName={ styles.date }
                  // icon={<Icon type="book" />}
                >
                  {item['text']}
                  {
                    item['text']=='1921年7月-中共一大'&&
                    <div><Button onClick={this.moreOnClick}>{this.state.more?<span>更多</span>:<span>收回</span>}</Button></div>
                  }
                </VerticalTimelineElement>:
                <VerticalTimelineElement
                  id={item['id']}
                  style={{fontSize:"15px", size:"10px"}}
                  className="vertical-timeline-element--education"
                  date="2006 - 2008"
                  contentStyle={{ borderTop: '7px solid  rgb(155, 20, 20)' }}
                  contentArrowStyle={{ borderTop: '7px solid  rgb(155, 20, 20)' }}
                  iconStyle={{ background: 'rgb(155, 20, 20)', color: '#fff',width:'40px', height:"40px",top:"20px",marginLeft:"-20px"  }}
                  dateClassName={ styles.date }
                  onTimelineElementClick={()=>this.oneClick(item) }
                >
                  {item['text']}
                  {
                    item['text']=='1921年7月-中共一大'&&
                    <div><div onClick={this.moreOnClick}>{this.state.more?<Icon type="arrow-down" style={{color:"rgba(155,20,20,1)"}} />:<Icon type="arrow-up" style={{color:"rgba(155,20,20,1)"}} />}</div></div>
                  }
                </VerticalTimelineElement>
              )
            )
          }
        </VerticalTimeline>
        {/*<Timeline className={styles.timeline}>{*/}
        {/*  list.map((item)=> (*/}
        {/*    <div onClick={ (e) => this.oneClick(e, item)}>*/}
        {/*      /!*<Timeline.Item color='red' dot={<Icon type="login" style={{fontSize: '20px'}} />}>1921年7月-中共一大</Timeline.Item>*!/*/}
        {/*      <Timeline.Item color='red' style={unCheckStyle} id={item['id']}>{item['text']}</Timeline.Item>*/}
        {/*    </div>*/}
        {/*    )*/}
        {/*  )*/}
        {/*}*/}
        {/*</Timeline>*/}
      </Sider>
      <Content>
        <div className={styles.normal}>
          <div className={styles.mapContainer}  id="onlineMapping">
          </div>
          <div id='features' className={styles.features}>
            <section id='一大上海' className={styles.selection}>
              <h3>中共一大上海</h3>
              <p>November 1895. London is shrouded in fog and Sherlock Holmes and Watson pass time restlessly awaiting a
                new case. "The London criminal is certainly a dull fellow," Sherlock bemoans. "There have been numerous
                petty thefts," Watson offers in response. Just then a telegram arrives from Sherlock's brother Mycroft
                with a mysterious case.</p>
            </section>
            <section id='一大嘉兴' className={styles.selection}>
              <h3>中共一大嘉兴</h3>
              <p>Arthur Cadogan West was found dead, head crushed in on train tracks at Aldgate Station at 6AM Tuesday
                morning. West worked at Woolwich Arsenal on the Bruce-Partington submarine, a secret military project.
                Plans for the submarine had been stolen and seven of the ten missing papers were found in West's
                possession. Mycroft implores Sherlock to take the case and recover the three missing papers.</p>
            </section>
            <section id='二大上海' className={styles.selection}>
              <h3>中共二大上海</h3>
              <p>Holmes and Watson's investigations take them across London. Sherlock deduces that West was murdered
                elsewhere, then moved to Aldgate Station to create the illusion that he was crushed on the tracks by a
                train. On their way to Woolwich Sherlock dispatches a telegram to Mycroft at London Bridge: "Send list
                of all foreign spies known to be in England, with full address."</p>
            </section>
            <section id='三大广州' className={styles.selection}>
              <h3>中共三大广州</h3>
              <p>While investigating at Woolwich Arsenal Sherlock learns that West did not have the three
                keys&mdash;door, office, and safe&mdash;necessary to steal the papers. The train station clerk mentions
                seeing an agitated West boarding the 8:15 train to London Bridge. Sherlock suspects West of following
                someone who had access to the Woolwich chief's keyring with all three keys.</p>
            </section>
            <section id='四大上海' className={styles.selection}>
              <h3>中共四大上海</h3>
              <p>Mycroft responds to Sherlock's telegram and mentions several spies. Hugo Oberstein of 13 Caulfield
                Gardens catches Sherlock's eye. He heads to the nearby Gloucester Road station to investigate and learns
                that the windows of Caulfield Gardens open over rail tracks where trains stop frequently.</p>
            </section>
            <section id='五大武汉' className={styles.selection}>
              <h3>中共五大武汉</h3>
              <p>Holmes deduces that the murderer placed West atop a stopped train at Caulfield Gardens. The train
                traveled to Aldgate Station before West's body finally toppled off. Backtracking to the criminal's
                apartment, Holmes finds a series of classified ads from <em>The Daily Telegraph</em> stashed away. All
                are under the name Pierrot: "Monday night after nine. Two taps. Only ourselves. Do not be so suspicious.
                Payment in hard cash when goods delivered."</p>
            </section>
            <section id='七大延安' className={styles.selection}>
              <h3>中共七大延安</h3>
              <p>Holmes and Watson head to The Daily Telegraph and place an ad to draw out the criminal. It reads:
                "To-night. Same hour. Same place. Two taps. Most vitally important. Your own safety at stake. Pierrot."
                The trap works and Holmes catches the criminal: Colonel Valentine Walter, the brother of Woolwich
                Arsenal's chief. He confesses to working for Hugo Oberstein to obtain the submarine plans in order to
                pay off his debts.</p>
            </section>
            <section id='八大北京' className={styles.selection}>
              <h3>中共八大北京</h3>
              <p>Walter writes to Oberstein and convinces him to meet in the smoking room of the Charing Cross Hotel
                where he promises additional plans for the submarine in exchange for money. The plan works and Holmes
                and Watson catch both criminals.</p>
              <small id="citation">
                Adapted from <a href='http://www.gutenberg.org/files/2346/2346-h/2346-h.htm'>Project Gutenberg</a>
              </small>
            </section>
          </div>
          {/*<div className={styles.dangshi_div1} style={{display: this.state.first ? 'block': 'none'}}>*/}
          {/*  <img  src={dangshi} className={styles.dangshi} />*/}
          {/*  <div className={styles.dangshi_font}>*/}
          {/*    党史学习*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className={styles.dangshi_div}>*/}
          {/*  <img  src={dangshi} className={styles.dangshi} />*/}
          {/*  <div className={styles.dangshi_font}>*/}
          {/*    返回地图首页*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </Content>
    </Layout>
    </Authorized>
  );}
}

// function MapPage(props) {
//   const [_collapsed, setCollapsed] = useState(false);
//   const [modalVisble,setModalVisble]=useState(false);
//   const [deadline,setDeadline] =useState( Date.now() +  1000 * 60);
//
//
//   return (
//     <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
//       <Layout className={styles.normal}>
//         <Sider style={{backgroundColor:'white'}} width={300}>
//           <Button onClick={() =>setModalVisble(true)}>开始答题</Button>
//           <Modal visible={modalVisble}
//                  title="开始答题"
//                  centered
//                  style={{top:'3em'}}
//                  bodyStyle={{height:'70vh'}}
//                  maskStyle={{backgroundColor: 'rgba(198,170,145,1)' ,top:'5em',}}
//                  footer={[
//                    <Row gutter={16}>
//                      <Col span={8}>
//                        <Button  key="back" onClick={()=>{}}>
//                          上一题
//                        </Button>
//                      </Col>
//                      <Col span={8}>
//                        <Button
//                          key="submit"
//                          type="primary"
//                          onClick={()=> {
//                            setModalVisble(false)
//                            setDeadline(Date.now() +  1000 * 60)
//                          }}>
//                          下一题
//                        </Button>
//                      </Col>
//                      <Col span={8}>
//                        <Countdown title="Countdown" value={deadline} onFinish={()=>{}} />
//                      </Col>
//                    </Row>
//                  ]}
//           >{deadline}
//             <p>Some contents...</p>
//             <p>Some contents...</p>
//             <p>Some contents...</p>
//           </Modal>
//         </Sider>
//         <Content>
//           <MapPageMap/>
//         </Content>
//       </Layout>
//     </Authorized>
//   );
// }
export default connect(({ mapPage }) => ({
mapPage
}))(MapPage);
