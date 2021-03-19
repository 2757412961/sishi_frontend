import React, { useState, useEffect, Component } from 'react';
import { Button, Layout, Modal, Typography, Statistic, Col, Row,Card,Radio,Timeline,Tabs,Icon,Table, Carousel } from 'antd';
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
// // @import '~video-react/styles/scss/video-react';
// import {Player} from 'video-react'
import videojs from 'video.js'
import "video.js/dist/video-js.css";
import "../../../node_modules/video-react/dist/video-react.css";
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
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;
const Authorized = RenderAuthorized(getAuthority());
const { Countdown } = Statistic;
const { Content, Sider } = Layout;
const noMatch=<Redirect to={`/login?redirect=${window.location.href}`} />;

const list = [
  {
    id:'jiaxing',
    lonlat:[120.79, 30.75],
    text:'1921年7月-中共一大',
    showInfo: '<div className={styles.markerTop}>' +
      '<h2>中共一大</h2>' +
      '</div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
    '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
    '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p>' +
      '</div>',
    cardImg:p1,
    cardContent:'中国共产党第一次全国代表大会，简称中共一大',
  },
  {
    id:'shanghai',
    lonlat:[121.48, 31.22],
    text:'1922年7月-中共二大',
    showInfo: '<div className={styles.markerTop}><h2>中共二大</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p></div>',
    cardImg:p2,
    cardContent:'中国共产党第二次全国代表大会，简称中共二大',
  },
  {
    id:'guangzhou',
    lonlat:[113.30, 23.12],
    text:'1923年6月-中共三大',
    showInfo: '<div className={styles.markerTop}><h2>中共三大</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p></div>',
    cardImg:p3,
    cardContent:'中国共产党第三次全国代表大会，简称中共三大',
  },
  {
    id:'shanghai',
    lonlat:[121.48, 31.22],
    text:'1922年7月-中共二大',
    showInfo: '<div className={styles.markerTop}><h2>中共二大</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p></div>',
    cardImg:p2,
    cardContent:'中国共产党第二次全国代表大会，简称中共二大',
  },
  {
    id:'guangzhou',
    lonlat:[113.30, 23.12],
    text:'1923年6月-中共三大',
    showInfo: '<div className={styles.markerTop}><h2>中共三大</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p></div>',
    cardImg:p3,
    cardContent:'中国共产党第三次全国代表大会，简称中共三大',
  },
  {
    id:'shanghai',
    lonlat:[121.48, 31.22],
    text:'1922年7月-中共二大',
    showInfo: '<div className={styles.markerTop}><h2>中共二大</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p></div>',
    cardImg:p2,
    cardContent:'中国共产党第二次全国代表大会，简称中共二大',
  },
  {
    id:'guangzhou',
    lonlat:[113.30, 23.12],
    text:'1923年6月-中共三大',
    showInfo: '<div className={styles.markerTop}><h2>中共三大</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p></div>',
    cardImg:p3,
    cardContent:'中国共产党第三次全国代表大会，简称中共三大',
  },
  {
    id:'shanghai',
    lonlat:[121.48, 31.22],
    text:'1922年7月-中共二大',
    showInfo: '<div className={styles.markerTop}><h2>中共二大</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p></div>',
    cardImg:p2,
    cardContent:'中国共产党第二次全国代表大会，简称中共二大',
  },
  {
    id:'guangzhou',
    lonlat:[113.30, 23.12],
    text:'1923年6月-中共三大',
    showInfo: '<div className={styles.markerTop}><h2>中共三大</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      '大会的召开宣告了中国共产党的正式成立。</p> <p><a id="btn">点击进入学习卡片</a></p></div>',
    cardImg:p3,
    cardContent:'中国共产党第三次全国代表大会，简称中共三大',
  }
];

const subList = [
  {
    id:'jiaxing',
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
    id:'jiaxing',
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
    id:'jiaxing',
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
      knowledgeUrl:list[0].cardImg,
      knowledgeContent:list[0].cardContent,
      // current_url : 'http://192.168.2.2:89/media/videos/dangshi/05.mp4',
      more:true,
    };

  }

  componentDidUpdate() {
    // if (document.getElementById('video')) {
    //   this.player = videojs("video");
    //   this.player.controls(true)
    //   this.player.src(this.state.current_url)
    // }
  }

  componentDidMount() {
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
    let nav = new mapboxgl.NavigationControl({
      //是否显示指南针按钮，默认为true
      "showCompass": true,
      //是否显示缩放按钮，默认为true
      "showZoom":true
    });
    //添加导航控件，控件的位置包括'top-left', 'top-right','bottom-left' ,'bottom-right'四种，默认为'top-right'
    map.addControl(nav, 'top-left');
    //加载中共一大（上海，嘉兴地点）的火花图标
    map.on('load', function() {
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/4/45/Eventcard.png',function(error,image) {
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
      });
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

  tabOnClick=()=> {
    // this.player = videojs("video");
    // this.player.controls(true)
    // this.player.src(this.state.current_url)
  }

  showModal=()=>{
    this.setState({modalVisble:true})
    console.log(this.state.modalVisble)
  }
  oneClick = (e, item) => {
    console.log("e",e);
    let _this = this;
    let id = item.id;
    for(let i = 0;i<list.length;i++){
      if(id==list[i].id){
        document.getElementById(list[i].id).style.opacity = 1;
        _this.map.flyTo({
          center:list[i].lonlat,
          zoom: 6,
          speed: 1,
          // curve: 3,
        })
      }
      else{
        document.getElementById(list[i].id).style.opacity = 0.5;
      }
    }
  }
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  moreOnClick=()=>{
    let temp = this.state.more;
    if(temp){
      list.splice(2, 0, ...subList);
    }
    else{
      list.splice(2, 3);
    }
    this.setState({
      more:!temp
    })
    this.forceUpdate();
  };

  render(){
    // if (document.getElementById('video')) {
    //   this.player = videojs("video");
    //   this.player.controls(true)
    //   this.player.src(this.state.current_url)
    // }
    let question='中日甲午战争中，日军野蛮屠杀和平居民的地点是';
    let answer=['A.大连','B.旅顺','C.平壤','D.花园口'];
    let rightAnswer=1;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const {unCheckStyle,checkStyle} = this.state;
  return (
    <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
    <Layout className={styles.normal}>
      <Sider style={{
        backgroundColor:'rgba(131, 115, 39, 0.48)',
        overflow: 'auto',
      }} width={600}>
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
              <Card title={this.state.questionNumber+"."+question}>
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                  <Radio style={radioStyle} value={0}>
                    {answer[0]}
                  </Radio>
                  <Radio style={radioStyle} value={1}>
                    {answer[1]}
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    {answer[2]}
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                    {answer[3]}
                    {/*{value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}*/}
                  </Radio>
                </Radio.Group>
              </Card>
              <Button  key="submit"
                       type="primary" style={{bottom:'0em',left:'29em',backgroundColor:'rgb(255,0,0)'}} onClick={()=>{
                if(this.state.value==rightAnswer){
                  this.setState({grade:this.state.grade++});
                }
                this.setState({answer:true})}}>提交</Button>
              {this.state.answer==true?
                (<h1>正确答案是</h1>):''}
              {this.state.answer==true?
                (<Card type="inner" title={answer[rightAnswer]} />):''}
              <Row gutter={16}>
                <Col span={8}>
                  <Button  key="back" onClick={()=>{}}>
                    上一题
                  </Button>
                </Col>
                <Col span={8}>
                  <Button
                    key="submit"
                    type="primary"
                    onClick={()=> {
                      // this.setState({modalVisble:false})
                      this.setState({deadline:Date.now() +  1000 * 60})
                      this.setState({questionNumber: this.state.questionNumber+1})
                      this.setState({answer:false})
                    }}>
                    下一题
                  </Button>
                </Col>
                <Col span={8}>
                  <Countdown title="计时器" value={this.state.deadline} onFinish={()=>{}} />
                </Col>
              </Row>
            </TabPane>
            <TabPane
              // onClick={()=>this.tabOnClick()}
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
                        <Icon type="sound" />
                         音乐
                      </span>
              }
              key="4"
            >
                <Card type="inner" size="small" title= '音乐列表' bordered={false}>
                  <audio width="400" controls="controls">  <source src="music.mp3" type="audio/mp3" />  </audio>
                  {/*<Table dataSource={{}} pagination={false}>*/}
                  {/*  <Column title="结果名称" dataIndex="name" key="name" />*/}
                  {/*  <Column title="结果值" dataIndex="resultDesc" key="resultDesc" />*/}
                  {/*</Table>*/}
                </Card>
            </TabPane>
            <TabPane
              tab={
                <span>
                        <Icon type="sound" />
                         图片
                      </span>
              }
              key="5"
            >
              <Carousel >
                <div >
                  <img  src={yay} />
                </div>
                <div >
                  <img  src={yaa} style={{height: 250, width:400 }}/>
                </div>
              </Carousel>
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
                  // icon={<Icon type="book" />}
                >
                  {item['text']}
                  {
                    item['text']=='1921年7月-中共一大'&&
                    <div><Button onClick={this.moreOnClick}>{this.state.more?<span>更多</span>:<span>收回</span>}</Button></div>
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
          <div className={styles.dangshi_div1} style={{display: this.state.first ? 'block': 'none'}}>
            <img  src={dangshi} className={styles.dangshi} />
            <div className={styles.dangshi_font}>
              党史学习
            </div>
          </div>
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
