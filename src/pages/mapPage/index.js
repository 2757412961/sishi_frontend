import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Layout, Modal, Typography, Statistic, Col, Row,Card,Radio,Timeline,Tabs,Icon,Table, Carousel,Divider } from 'antd';
import styles from './index.less';
import { fromJS } from 'immutable';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { connect } from 'dva';
import axios from 'axios';
import * as d3 from "d3";
import { getLocalData } from '@/utils/common.js';
import { MapContext, RotationControl, ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MapPageMap from './MapPageMap';
import Redirect from 'umi/redirect';
import RenderAuthorized from '@/components/Authorized';
import {getAuthority} from '@/utils/authority';
import flyline from '@/assets/pointData/flyline.json';
import line from '@/assets/pointData/line.geojson';
import lineShToJx from '@/assets/pointData/lineShToJx.geojson';
import point from '@/assets/pointData/point.json';
import { Scene, LineLayer,Control,PolygonLayer,PointLayer } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import {MapboxLayer} from '@deck.gl/mapbox';
import {ArcLayer} from '@deck.gl/layers';
// import {motion} from 'framer-motion';
// // @import '~video-react/styles/scss/video-react';
// import {Player} from 'video-react'
import redflag from '@/assets/redflag.png';
import eventcard from '@/assets/eventcard.png';
import p1 from '@/assets/test/1.jpg';
import yay from '@/assets/unnamed.jpg'
import yaa from '@/assets/KkpJ-hukwxnu5742888.jpg'
import dangshi_background from '@/assets/dangshi_background.PNG'
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
import dangqi from '@/assets/test/党旗.png';
import layer from '@/assets/test/layer.png';
import reback from '@/assets/test/reback.png';
import jiedao from '@/assets/test/街道.PNG';
import dixing from '@/assets/test/地形.PNG';
import yingxiang from '@/assets/test/影像.PNG';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

var chapters = {
  '一大-上海': {
    bearing: 0,
    center: [121.47069346816863, 31.22206084685108],
    zoom: 15.5,
    pitch: 20
  },
  '一大-嘉兴': {
    duration: 6000,
    center: [120.75580305351667, 30.75747193181725],
    bearing: 0,
    zoom: 15,
    pitch: 30
  },
  '二大-上海': {
    bearing: 0,
    center: [121.46214132313253, 31.2260623329518],
    zoom: 16,
    speed: 0.6,
    pitch: 30
  },
  '三大-广州': {
    bearing: 0,
    center: [113.29062697510238, 23.121680862715294],
    zoom: 17.3,
    pitch: 20,
  },
  '四大-上海': {
    bearing: 0,
    center: [121.48020351895462,31.25728522799882],
    zoom: 16.3,
    pitch: 20,
    speed: 1,
  },
  '五大-武汉': {
    bearing: 0,
    center: [114.29318634011975,30.553569642526185],
    zoom: 16.3,
    pitch: 40,
  },
  '六大-俄罗斯': {
    bearing: 0,
    center: [37.153974181328664,55.535728582753336],
    zoom: 16.3,
    pitch: 20
  },
  '七大-延安': {
    bearing: 0,
    center: [109.46267096678156,36.618757084621336],
    zoom: 16.3,
    pitch: 20
  },
  '八大-政协礼堂': {
    bearing: 0,
    center: [116.35780179933835,39.91833919135752],
    zoom: 17,
    pitch: 20
  },
  '九大-人民大会堂': {
    bearing: 0,
    center: [116.38748691963224,39.90337460887406],
    zoom: 16,
    pitch: 10
  }
};
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
      temp.text=treeList[i].label.split('@')[0];
      temp.value=treeList[i].label.replace('@','');
      temp.time=treeList[i].time;
      if(des[i]){
        temp.showInfo=des[i].showInfo;
      }
      temp.cardContent=treeList[i].tagName;
      temp.cardImg=p1;
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
      value: 1,
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
      checkValue1:false,//是否显示一大惠聚英才
      checkValue2:false,//是否显示上海到嘉兴路线
    };

  }

  componentDidMount() {
    const { dispatch } = this.props;
    //保存当前模块名
    this.setState({
      module:this.props.location.query.module
    });
    dispatch({ type: 'mapPage/getTagTree' });
    dispatch({ type: 'mapPage/getQuestion' });
    // dispatch({ type: 'mapPage/updateUserGrades',payload:this.state.grade});
    dispatch({ type: 'mapPage/getVideoByTag' });
    dispatch({ type: 'mapPage/getAudioByTag' });
    console.log('dispatch', dispatch);
    const { mapPage } = this.props;
    console.log('mapPage', mapPage);
    const { tagTree } = mapPage;
    console.log('tagTree', tagTree);

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
      pitch: 30,
      // bearing: 10,
    });
    // let treeList=forTree(tagTree);
    // console.log('treeList',treeList);
    dispatch({ type: 'mapPage/getTagTreeSortByTime', payload: {tagName:'党史新学'}}).then((res)=>{
      console.log('res',res);
      let listHere = [], listHere2 = [];
      if(res&&res.success){
        let tagTree=res.list;
        // let tree=forTree(tagTree);
        // console.log('tree',tree);
        listHere=forList(tagTree);
        listHere2=forList(tagTree);
        let listTime = listHere;
        listTime.splice(0,1);
        console.log("listTime", listTime);
        this.setState({
          list:listHere2,
          listTime:listTime,
        })
      }
      console.log("listHere", listHere);
      //加载中共一大（上海，嘉兴地点）的火花图标
      map.on('load', function() {
        for (let i=0;i<listHere.length;i++) {
          map.addImage(listHere[i].id, pulsingDot, { pixelRatio: 2 });
          map.addLayer({
            "id": listHere[i].id,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [{
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": listHere[i].lonlat,
                  }
                }]
              }
            },
            "layout": {
              "icon-image": listHere[i].id,
              "icon-optional": false,
              "icon-ignore-placement": true,
              // "text-ignore-placement": true,
              "icon-allow-overlap": true,
              "text-allow-overlap": true,
              "text-field": listHere[i].value,
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
      });
      let _this = this;
      var popup = new mapboxgl.Popup({ closeOnClick: false, closeButton: false })
      for (let i = 0; i < listHere.length; i++) {
        map.on('mouseenter', listHere[i].id, function(e) {
          map.getCanvas().style.cursor = 'pointer';
          var coordinates = e.features[0].geometry.coordinates;
          let showInfo = listHere[i].showInfo;
          popup.setLngLat(coordinates)
          popup.setHTML(showInfo)
          popup.addTo(map)
        });
        map.on('mouseleave', listHere[i].id, function() {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
      }

      for(let i = 0;i<listHere.length;i++){
        map.on('click', listHere[i].id, function(e) {
          popup.remove();
          var coordinates = e.features[0].geometry.coordinates;
          _this.setState({
            itemNow: listHere[i],
            tagName:listHere[i].tagName,
          })

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            // .setHTML(showInfo)
            .addTo(map)
            .setDOMContent(popupRef.current);
        });
        map.on('mouseenter', listHere[i].id, function() {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', listHere[i].id, function() {
          map.getCanvas().style.cursor = '';
        });
      }
      this.map = map;
    });

    // let nav = new mapboxgl.NavigationControl({
    //   //是否显示指南针按钮，默认为true
    //   "showCompass": true,
    //   //是否显示缩放按钮，默认为true
    //   "showZoom":true
    // });
    // //添加导航控件，控件的位置包括'top-left', 'top-right','bottom-left' ,'bottom-right'四种，默认为'top-right'
    // map.addControl(nav, 'top-left');

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
//     map.on('load', function() {
//       /*map.loadImage('https://upload.wikimedia.org/wikipedia/commons/4/45/Eventcard.png',function(error,image) {
//         if(error) throw  error;
//         for(let i = 0;i<list.length;i++){
//           map.addImage(list[i].id, image);
//           map.addLayer({
//             "id": list[i].id,
//             "type": "symbol",
//             "source": {
//               "type": "geojson",
//               "data": {
//                 "type": "FeatureCollection",
//                 "features": [{
//                   "type": "Feature",
//                   "geometry": {
//                     "type": "Point",
//                     "coordinates": list[i].lonlat,
//                   }
//                 }]
//               }
//             },
//             "layout": {
//               "icon-image": list[i].id,
//               "icon-size": [
//                 "interpolate", ["linear"], ["zoom"],
//                 3,0.1,
//                 17,0.8
//               ],
//               "icon-ignore-placement": true,
//             }
//           });
//         }
//       });*/
//       for (let i = 0; i < list.length; i++) {
//         map.addImage(list[i].id, pulsingDot, { pixelRatio: 2 });
//         map.addLayer({
//           "id": list[i].id,
//           "type": "symbol",
//           "source": {
//             "type": "geojson",
//             "data": {
//               "type": "FeatureCollection",
//               "features": [{
//                 "type": "Feature",
//                 "geometry": {
//                   "type": "Point",
//                   "coordinates": list[i].lonlat,
//                 }
//               }]
//             }
//           },
//           "layout": {
//             "icon-image": list[i].id,
//             "icon-optional": false,
//             "icon-ignore-placement": true,
//             // "text-ignore-placement": true,
//             "text-allow-overlap": true,
//             "text-field": list[i].value,
//             "text-anchor": 'left',
//             "text-offset": [1, 0.1],
//             // "text-font": ["DIN Offc Pro Medium\", \"Arial Unicode MS Bold"],
//             "text-size": [
//               "interpolate", ["linear"], ["zoom"],
//               3, 20,
//               17, 38
//             ],
//           },
//           paint: {
//             "text-color": 'rgb(255,0,0)',
//           }
//
//         });
//       }
//       // playback(0);
//     });
//     let _this = this;
//     var popup = new mapboxgl.Popup({ closeOnClick: false, closeButton: false })
//     for (let i = 0; i < list.length; i++) {
//       map.on('mouseenter', list[i].id, function(e) {
//         map.getCanvas().style.cursor = 'pointer';
//         var coordinates = e.features[0].geometry.coordinates;
//         let showInfo = list[i].showInfo;
// //closeOnClick:false,closeButton:true
//         popup.setLngLat(coordinates)
//         popup.setHTML(showInfo)
//         popup.addTo(map)
//         // .setDOMContent(popupRef.current);
//         // document.getElementById('btn')
//         //   .addEventListener('click', function(){
//         //     let cardImg = list[i].cardImg;
//         //     let cardContent = list[i].cardContent;
//         //     _this.setState({
//         //       knowledgeUrl: cardImg,
//         //       knowledgeContent: cardContent,
//         //     });
//         //     _this.showModal()
//         //   });
//       });
//       map.on('mouseleave', list[i].id, function() {
//         map.getCanvas().style.cursor = '';
//         popup.remove();
//       });
//     }
//     for (let i = 0; i < list.length; i++) {
//       map.on('click', list[i].id, function(e) {
//         popup.remove();
//         var coordinates = e.features[0].geometry.coordinates;
//         let showInfo = list[i].showInfo;
//         _this.setState({
//           itemNow: list[i],
//         })
//
//         new mapboxgl.Popup()
//           .setLngLat(coordinates)
//           // .setHTML(showInfo)
//           .addTo(map)
//           .setDOMContent(popupRef.current);
//         // document.getElementById('btn')
//         //   .addEventListener('click', function(){
//         //     let cardImg = list[i].cardImg;
//         //     let cardContent = list[i].cardContent;
//         //     _this.setState({
//         //       knowledgeUrl: cardImg,
//         //       knowledgeContent: cardContent,
//         //     });
//         //     _this.showModal()
//         //   });
//       });
//       map.on('mouseenter', list[i].id, function() {
//         map.getCanvas().style.cursor = 'pointer';
//       });
//       map.on('mouseleave', list[i].id, function() {
//         map.getCanvas().style.cursor = '';
//       });
//     }
    var el = document.createElement('div');
    el.className = "marker";
    el.style.backgroundSize = 'cover'
    el.style.width='20px';
    el.style.height='20px';
    el.style.borderRadius = '50%';
    el.style.backgroundImage = 'url('+dangqi+')'
    // map.on('load', function() {
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
    //     map.jumpTo({'center': coordinates[0], 'zoom': [7]});
    //     map.setPitch(10);
    //     //'url(https://upload.wikimedia.org/wikipedia/commons/4/45/Eventcard.png)'
    //     var marker = new mapboxgl.Marker(el)
    //     var i = 0;
    //     var timer = window.setInterval(function() {
    //       if(i<coordinates.length) {
    //         data.features[0].geometry.coordinates.push(coordinates[i]);
    //         map.getSource('trace').setData(data);
    //         map.panTo(coordinates[i],{zoom: 7});
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
  checkOnChange=(item)=>{
    // let item = e.target.key;
    // e.stopPropagation();
    let map = this.map;
    if(item==1){
      let temp = this.state.checkValue1;
      if(!temp){
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
                "line-color": "blue",
                "line-opacity": 0.8,
                "line-width": 10
              }
            });
            map.jumpTo({'center': coordinates[0], 'zoom': [7]});
            map.setPitch(10);
            var i = 0;
            timer = window.setInterval(function() {
              if(i<coordinates.length) {
                data.features[0].geometry.coordinates.push(coordinates[i]);
                map.getSource('lineShToJx').setData(data);
                map.panTo(coordinates[i],{zoom: 7});
                i++;
              } else {
                window.clearInterval(timer);
              }
            }, 10);
          });
      }
      else{
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
      let temp = this.state.checkValue2;
      if(!temp){
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
        if (map.getLayer('arc')) {
          map.removeLayer('arc');
        }
      }
      this.setState({
        checkValue2: !temp,
      });
    }
    this.map = map;
  }
  showModal=(activeKey)=>{
    this.setState({
      modalVisble:true,
      activeKey:activeKey,
    });
    console.log(this.state.modalVisble)
  }
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
  onChange = e => {
    console.log('radio checked', e);
    this.setState({
      value: e,
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
    this.map.remove()
  }
  layerClick = () => {
    this.setState({
      layerValue: !this.state.layerValue
    })
  }
  diTuClick = (id,e) => {
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
    this.componentWillUnmount()
    this.componentDidMount()
    // this.map.setStyle('')
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
    <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
    <Layout className={styles.normal}>
      <Sider className={styles.siderStyle}collapsible collapsed={this.state.collapsed} trigger={null}  collapsedWidth={0} width={400}>
        {/*答题*/}
        {/**/}
        <Modal visible={this.state.startQuestion}
               centered
              width={1000}
               mask={true}
               maskClosable={true}
              // maskStyle={{'opacity':'0.2','background':'#bd37ad','animation':'flow'}}
               title={null}
               onCancel={()=>{
                 this.setState({startQuestion:false})
                 if(this.state.questionNumber==allNumber&&this.state.answer==true){
                   let arg=question[recent]?question[recent].answer:'';
                   arg=arg.split("");
                   debugger
                   let translate1=translate(arg);
                   let checked=(document.getElementsByClassName(styles.correct).length>0)?document.getElementsByClassName(styles.correct):document.getElementsByClassName(styles.wrong);
                   let checked1=document.getElementsByClassName('ant-checkbox');
                   for (let i=0;i<checked1.length;i++){
                     document.getElementsByClassName('ant-checkbox')[i].classList.remove('ant-checkbox-checked');
                     document.getElementsByClassName('ant-checkbox-wrapper')[i].classList.remove('ant-checkbox-wrapper-checked');
                   }
                   for(let i=0;i<checked.length;i++){
                     if(document.getElementsByClassName(styles.correct).length>0)
                     {document.getElementsByClassName(styles.correct)[i].setAttribute('class','ant-checkbox-inner');
                     }
                     else{
                       if(document.getElementsByClassName(styles.wrong)[i]){
                         document.getElementsByClassName(styles.wrong)[i].setAttribute('class','ant-checkbox-inner');
                       }
                     }
                     // document.getElementsByClassName("ant-checkbox-inner")[id].classList.add(styles.correct);
                   }
                   //let checked=document.getElementById("choose");
                   let state = document.getElementsByTagName("input");
                   state[0].getAttribute("checked");
                   for(let i=0;i<state.length;i++){
                     document.getElementsByTagName("input")[i].checked=false;
                     //document.getElementsByTagName("input")[i].setAttribute('checked','false');
                   }
                   // $("input[type=checkbox]").removeAttr("checked");
                   this.setState({deadline:Date.now() +  1000 * 60})
                   this.setState({questionNumber: 1})
                   this.setState({answer:false})
                   return
                 }
               }}
               footer={null}
               closable={true}
               wrapClassName={styles.web}//对话框外部的类名，主要是用来修改这个modal的样式的
        >
          <div className={styles.question}>
            <div className={styles.top}></div>
            <div className={styles.headerRow}>
              <span class={styles.big}>{this.state.questionNumber}</span>
              /{allNumber}
            </div>
            <div className="d-iframe">
              {/*<iframe id="previewIframe" src="" frameBorder="0"*/}
              {/*        className="iframe-style"></iframe>*/}
              <div className={styles.web} >
                <p>{this.state.questionNumber+"."+(question[recent]?question[recent].questionContent:'')}</p>
                <div className={styles.radio}>
                <Checkbox.Group id={'choose'} onChange={this.onChange} style={{top:'3em',left:'3em'}} >
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
                (<h3>正确答案是</h3>):''}
              {this.state.answer==true?
                (<h2> {(question[recent]?question[recent].answer:'')} </h2>):''}
              <Row gutter={16}>
                <Col span={12}>
                  <Button  key="submit"
                           centered
                           type="primary" style={{backgroundColor:'rgb(255,0,0)'}}
                           onClick={()=>{
                             let checked1=document.getElementById("choose");
                             // let checked=document.getElementsByClassName("ant-checkbox-checked");
                             let checked=document.getElementsByClassName("ant-checkbox-inner");
                             // checked[0].style.backgroundColor='rgb(0,255,0)';
                             debugger
                             let string=this.state.value.toString();
                             string=string.replace(/,/g,'');
                             let arg=question[recent]?question[recent].answer:'';
                             arg=arg.split("");
                             let translate1=translate(arg);
                             if(string==(question[recent]?question[recent].answer:''))
                             {
                               if(this.state.answer==false){
                               this.setState({grade:this.state.grade+1});}
                               // checked[i].classList[1]=(styles.correct);
                               let id=0;
                               let i=0;
                               while(i<translate1.length){
                                  id=translate1[i]-i;
                                 document.getElementsByClassName("ant-checkbox-inner")[id].setAttribute('class',styles.correct);
                                 i++;
                                 // document.getElementsByClassName("ant-checkbox-inner")[id].classList.add(styles.correct);
                               }
                             }else{
                               let id=0;
                               let i=0;
                               for( i=0;i<translate1.length;i++){
                                 id=translate1[i]-i;
                                 let temp=document.getElementsByClassName("ant-checkbox-inner")[id];
                                 if(document.getElementsByClassName("ant-checkbox-inner")[id]) {
                                   document.getElementsByClassName("ant-checkbox-inner")[id].setAttribute('class', styles.wrong);
                                 }}
                             }
                             this.setState({answer:true});
                             if(this.state.questionNumber==allNumber) {
                               let username=getLocalData({dataName:'userName'});
                               this.props.dispatch({type: 'mapPage/updateUserGrades', payload: {tag_name:this.state.tagName,user_name:username}});
                               alert("答题结束")
                             }}
                           }>提交</Button>
                </Col>
                <Col span={12} style={{alignContent:'center',alignItems:'center'}}>
                  <Button
                    centered
                    key="submit" style={{backgroundColor:'rgb(255,0,0)'}}
                    type="primary"
                    onClick={()=> {

                      if(this.state.questionNumber==allNumber&&this.state.answer==true){
                        this.setState({startQuestion:false})
                        this.setState({questionNumber: 1})
                        return
                      }
                      if(this.state.answer==false){
                        alert('你还未提交本题答案')
                      } else{
                        let arg=question[recent]?question[recent].answer:'';
                        arg=arg.split("");
                        let translate1=translate(arg);
                        let checked=(document.getElementsByClassName(styles.correct).length>0)?document.getElementsByClassName(styles.correct):document.getElementsByClassName(styles.wrong);
                        let checked1=document.getElementsByClassName('ant-checkbox');
                        for (let i=0;i<checked1.length;i++){
                          document.getElementsByClassName('ant-checkbox')[i].classList.remove('ant-checkbox-checked');
                          document.getElementsByClassName('ant-checkbox-wrapper')[i].classList.remove('ant-checkbox-wrapper-checked');
                        }
                        for(let i=0;i<checked.length;i++){
                          if(document.getElementsByClassName(styles.correct).length>0)
                          {document.getElementsByClassName(styles.correct)[i].setAttribute('class','ant-checkbox-inner');
                          }
                          else{
                            if(document.getElementsByClassName(styles.wrong)[i]){
                            document.getElementsByClassName(styles.wrong)[i].setAttribute('class','ant-checkbox-inner');
                            }
                          }
                          // document.getElementsByClassName("ant-checkbox-inner")[id].classList.add(styles.correct);
                        }
                        //let checked=document.getElementById("choose");
                        let state = document.getElementsByTagName("input");
                        state[0].getAttribute("checked");
                        for(let i=0;i<state.length;i++){
                          document.getElementsByTagName("input")[i].checked=false;
                          //document.getElementsByTagName("input")[i].setAttribute('checked','false');
                        }
                        debugger
                        let i1=document.getElementById("choose").value;
                        document.getElementById("choose").value="";
                        console.log(i1);
                        // $("input[type=checkbox]").removeAttr("checked");
                        this.setState({deadline:Date.now() +  1000 * 60})
                        this.setState({questionNumber: this.state.questionNumber+1})
                        this.setState({answer:false})
                      }
                    }}>
                    下一题
                  </Button>
                </Col>
                {/*<Col span={8}>*/}
                {/*  <Button onClick={()=>this.setState({startQuestion:false})}> 关闭</Button>*/}
                {/*  <h1><span>{this.state.questionNumber}</span>/*/}
                {/*    <span>{allNumber}</span></h1>*/}
                {/*  /!*<Countdown title="计时器" value={this.state.deadline} onFinish={()=>{}} />*!/*/}
                {/*</Col>*/}
              </Row>
              {this.state.questionNumber==allNumber&&this.state.answer?
                (<div>
                  <div className={styles.try}></div>
                  <h1><span>您的得分为</span><h2>{this.state.grade}</h2></h1></div>):''}

            </div>
            <div className={styles.bottom}></div>
          </div>
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
            <div className="d-iframe" dangerouslySetInnerHTML={{__html:'<strong>'+knowledgeContent+'</strong>'}} >
              {/*<Card style={{ width: '100' }}*/}
              {/*      title={"中共一大"}*/}
              {/*      cover={*/}
              {/*        <img*/}
              {/*          alt="example"*/}
              {/*          src={this.state.knowledgeUrl}*/}
              {/*        />*/}
              {/*      }*/}
              {/*>*/}
              {/*  {this.state.knowledgeContent}*/}
              {/*</Card>*/}
            </div>
          </div>
        </Modal>
        {/*图片*/}
        <Modal visible={this.state.startPicture}
               centered
               width={1000}
               mask={true}
               maskClosable={true}
          // maskStyle={{'opacity':'0.2','background':'#bd37ad','animation':'flow'}}
               title={null}
               onCancel={()=>this.setState({startPicture:false})}
               footer={null}
               closable={true}
               wrapClassName={styles.web}//对话框外部的类名，主要是用来修改这个modal的样式的
        >
          <div className={styles.modal}>
            <div className={styles.topPicture}></div>
            <div className="d-iframe">
              <div style={{padding: 40, background: "#ececec"}} >
                {/*<div style={styles.out}>*/}

                    {/*</div>*/}
                    <Slider {...this.carousel_settings} >
                      {this.state.pictures}
                      {/*<div style={styles.out}>*/}
                      {/*  <img src={yay} style={{ height: '100%', width: '100%' }} />*/}
                      {/*</div>*/}
                      {/*<div>*/}
                      {/*  <img src={yaa} style={{ height: '100%', width: '100%' }} />*/}
                      {/*</div>*/}
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
              // maskStyle={{'opacity':'0.2','background':'#bd37ad','animation':'flow'}}
                   title={null}
                   onCancel={() => this.setState({ startVideo: false })}
                   footer={null}
                   closable={true}
                   wrapClassName={styles.web}//对话框外部的类名，主要是用来修改这个modal的样式的
            >
              <div className={styles.modal}>
                <div className={styles.topVideo}></div>
                <div style={{padding: 40, background: "#ececec"}} >
                <div className="d-iframe">
                  <Slider {...this.carousel_settings} >
                    {this.state.videos}
                  </Slider>
                </div>
                  <p style={{fontSize:'16px',textAlign:'right',color:'black'}}>共<span style={{color:'red'}}>{this.state.videos.length}</span>个</p>
                </div>
              </div>
            </Modal>
            <div id='verticalTimeLine' className={styles.verticalTimeLine}>
              <VerticalTimeline
                // layout='1-column-left'
              >
                {this.state.listTime.map((item)=> (
                    item['sub']?
                      <VerticalTimelineElement
                        id={item['id']}
                        style={{fontSize:"15px", size:"10px", textAlign: "center"}}
                        className="vertical-timeline-element--education"
                        date={<div style={{textAlign:"center", width:"80%", margin:"0 auto"}}>{item.time}</div>}
                        contentStyle={{ borderTop: '7px solid  rgba(177,46,46)',textAlign:"center",color:'rgba(177,46,46)' }}
                        contentArrowStyle={{ borderTop: '7px solid  rgb(155, 20, 20)' }}
                        iconStyle={{ background: 'rgba(177,46,46)', color: '#fff',width:'20px', height:"20px",top:"20px",marginLeft:"-10px" }}
                        dateClassName={ styles.date }
                        onTimelineElementClick={()=> this.oneClick(item) }
                        // icon={<Icon type="schedule" />}
                        // icon={<Icon type="book" />}
                      >
                        <div style={{fontWeight:"bold"}}>
                          {item['value']}
                        </div>
                      </VerticalTimelineElement>:
                      <VerticalTimelineElement
                        id={item['id']}
                        style={{fontSize:"15px", size:"10px", textAlign:"center"}}
                        className="vertical-timeline-element--education"
                        date={<div style={{textAlign:"center", width:"80%", margin:"0 auto"}}>{item.time}</div>}
                        contentStyle={{ borderTop: '7px solid  rgba(177,46,46)',textAlign:"center",color:'rgb(155, 20, 20)' }}
                        contentArrowStyle={{ borderTop: '7px solid  rgba(177,46,46)' }}
                        iconStyle={{ background: 'rgba(177,46,46)', color: '#fff',width:'40px', height:"40px",top:"20px",marginLeft:"-20px",paddingTop:"15px"  }}
                        dateClassName={ styles.date }
                        onTimelineElementClick={()=>(
                          item['text']=='中共一大'?
                            this.moreOnClick():
                            this.oneClick(item)) }
                        icon={<Icon type="schedule" />}
                      >{
                        item['text']=='中共一大'?
                          <div style={{fontWeight:"bold"}}>
                            {item['text']}
                            <div className={styles.zhonggongyida}>
                              <Checkbox  key="a" onChange={()=>this.checkOnChange(1)} onClick={e => e.stopPropagation()} >会议地点转移</Checkbox>
                              <Checkbox  key="b" onChange={()=>this.checkOnChange(2)} onClick={e => e.stopPropagation()} >荟聚天下英才</Checkbox>
                            </div>
                          </div>:
                          <div style={{fontWeight:"bold"}}>
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
                  <Row style={{ width: "240px", top: "10px" }} justify="space-between">
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
                      this.setState({ startPicture: true })
                      this.setState({ startPicture: true })
                      this.props.dispatch({type: 'mapPage/getPictureByTag', payload: this.state.tagName}).then(res=>{
                        console.log('res');
                        if(res.success) {
                          let pictures=res.pictures;
                          let picturesAll=pictures.map((item)=>{
                            return(<div style={styles.out}>
                              <h2>{item.pictureTitle}</h2>
                              <img src={item.pictureContent} style={{ height: '100%', width: '100%' }} />
                            </div>)
                          });
                          this.setState({pictures:picturesAll})
                        }
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
                              <h2>{item.pictureTitle}</h2>
                              <img src={item.pictureContent} style={{ height: '100%', width: '100%' }} />
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
                      this.props.dispatch({type: 'mapPage/getVideoByTag', payload: '党史新学@中共一大'}).then(res=>{
                        console.log('res',res.videos);
                        if(res.success) {
                          let videos=res.videos;
                          let videoAll=videos.map((item)=>{
                            return(<div style={styles.out}>
                              <h2>{item.videoTitle}</h2>
                              {/*<video src={item.videoContent} style={{ height: '100%', width: '100%' }} />*/}
                              <video height="400" width="100%" top="3em" poster="http://www.youname.com/images/first.png"
                                     autoPlay="autoplay" preload="none"
                                     controls="controls">
                                <source src={item.videoContent}
                                />
                                <source src={item.videoContent}
                                />
                              </video>
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
                      this.props.dispatch({type: 'mapPage/getVideoByTag', payload: '党史新学@中共一大'}).then(res=>{
                        console.log('res',res.videos);
                        if(res.success) {
                          let videos=res.videos;
                          let videoAll=videos.map((item,index, arr)=>{
                            return(<div style={styles.out}>
                              <h1 style={{fontSize:'24px',textAlign:'center',color:'black'}}>{item.videoTitle}</h1>
                              {/*<video src={item.videoContent} style={{ height: '100%', width: '100%' }} />*/}
                              <video height="400" width="100%" top="3em" poster="http://www.youname.com/images/first.png"
                                     autoPlay="autoplay" preload="none"
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
                    <Col span={2} onClick={() => {this.setState({ startQuestion: true });
                      this.props.dispatch({type: 'mapPage/getQuestion', payload: this.state.tagName});}
                    }>
                      <Icon className={styles.popup} type="question" />
                    </Col>
                    <Col span={4} onClick={() => {
                      this.setState({ startQuestion: true });
                      this.props.dispatch({ type: 'mapPage/getQuestion', payload: this.state.tagName })
                    }}>
                      答题
                    </Col>
                  </Row>
                </div>
                {/*{*/}
                {/*  list.map((item, index)=>(*/}
                {/*    <div  ref={popupRef[index]}>*/}
                {/*      /!*<span>{item.id}</span>*!/*/}
                {/*      <Icon type="book" />*/}
                {/*    </div>*/}
                {/*  ))*/}
                {/*}*/}
              </div>
              <Icon
                style={{position:"absolute", fontSize:"30px"}}
                className='trigger'
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.onCollapse}
              />
              {/*<Button className={styles.layer} icon={layer}> </Button>*/}
              {/*<div id='features' className={styles.features}>
                <section id='一大上海' className={styles.selection}>
                  <h3>中共一大上海</h3>
                  <p>November 1895. London is shrouded in fog and Sherlock Holmes and Watson pass time restlessly
                    awaiting a
                    new case. "The London criminal is certainly a dull fellow," Sherlock bemoans. "There have been
                    numerous
                    petty thefts," Watson offers in response. Just then a telegram arrives from Sherlock's brother
                    Mycroft
                    with a mysterious case.</p>
                </section>
                <section id='一大嘉兴' className={styles.selection}>
                  <h3>中共一大嘉兴</h3>
                  <p>Arthur Cadogan West was found dead, head crushed in on train tracks at Aldgate Station at 6AM
                    Tuesday
                    morning. West worked at Woolwich Arsenal on the Bruce-Partington submarine, a secret military
                    project.
                    Plans for the submarine had been stolen and seven of the ten missing papers were found in West's
                    possession. Mycroft implores Sherlock to take the case and recover the three missing papers.</p>
                </section>
                <section id='二大上海' className={styles.selection}>
                  <h3>中共二大上海</h3>
                  <p>Holmes and Watson's investigations take them across London. Sherlock deduces that West was murdered
                    elsewhere, then moved to Aldgate Station to create the illusion that he was crushed on the tracks by
                    a
                    train. On their way to Woolwich Sherlock dispatches a telegram to Mycroft at London Bridge: "Send
                    list
                    of all foreign spies known to be in England, with full address."</p>
                </section>
                <section id='三大广州' className={styles.selection}>
                  <h3>中共三大广州</h3>
                  <p>While investigating at Woolwich Arsenal Sherlock learns that West did not have the three
                    keys&mdash;door, office, and safe&mdash;necessary to steal the papers. The train station clerk
                    mentions
                    seeing an agitated West boarding the 8:15 train to London Bridge. Sherlock suspects West of
                    following
                    someone who had access to the Woolwich chief's keyring with all three keys.</p>
                </section>
                <section id='四大上海' className={styles.selection}>
                  <h3>中共四大上海</h3>
                  <p>Mycroft responds to Sherlock's telegram and mentions several spies. Hugo Oberstein of 13 Caulfield
                    Gardens catches Sherlock's eye. He heads to the nearby Gloucester Road station to investigate and
                    learns
                    that the windows of Caulfield Gardens open over rail tracks where trains stop frequently.</p>
                </section>
                <section id='五大武汉' className={styles.selection}>
                  <h3>中共五大武汉</h3>
                  <p>Holmes deduces that the murderer placed West atop a stopped train at Caulfield Gardens. The train
                    traveled to Aldgate Station before West's body finally toppled off. Backtracking to the criminal's
                    apartment, Holmes finds a series of classified ads from <em>The Daily Telegraph</em> stashed away.
                    All
                    are under the name Pierrot: "Monday night after nine. Two taps. Only ourselves. Do not be so
                    suspicious.
                    Payment in hard cash when goods delivered."</p>
                </section>
                <section id='七大延安' className={styles.selection}>
                  <h3>中共七大延安</h3>
                  <p>Holmes and Watson head to The Daily Telegraph and place an ad to draw out the criminal. It reads:
                    "To-night. Same hour. Same place. Two taps. Most vitally important. Your own safety at stake.
                    Pierrot."
                    The trap works and Holmes catches the criminal: Colonel Valentine Walter, the brother of Woolwich
                    Arsenal's chief. He confesses to working for Hugo Oberstein to obtain the submarine plans in order
                    to
                    pay off his debts.</p>
                </section>
                <section id='八大北京' className={styles.selection}>
                  <h3>中共八大北京</h3>
                  <p>Walter writes to Oberstein and convinces him to meet in the smoking room of the Charing Cross Hotel
                    where he promises additional plans for the submarine in exchange for money. The plan works and
                    Holmes
                    and Watson catch both criminals.</p>
                  <small id="citation">
                    Adapted from <a href='http://www.gutenberg.org/files/2346/2346-h/2346-h.htm'>Project Gutenberg</a>
                  </small>
                </section>
                <section id='九大北京' className={styles.selection}>
                  <h3>中共九大北京</h3>
                  <p>Walter writes to Oberstein and convinces him to meet in the smoking room of the Charing Cross Hotel
                    where he promises additional plans for the submarine in exchange for money. The plan works and
                    Holmes
                    and Watson catch both criminals.</p>
                </section>
              </div>*/}
              <div className={styles.layer_icon} onClick={this.layerClick}>
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
