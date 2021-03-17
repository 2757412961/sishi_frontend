import React, { useState, useEffect, Component } from 'react';
import { Button, Layout, Modal, Typography, Statistic, Col, Row,Card,Radio,Timeline,Tabs,Icon,Table, Carousel,Checkbox } from 'antd';
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
import redflag from '@/assets/redflag.png';
import eventcard from '@/assets/eventcard.png';
import p1 from '@/assets/test/1.jpg';
import p2 from '@/assets/test/2.jpg';
import p3 from '@/assets/test/3.jpg';
import dangshi from '@/assets/dangshi.PNG'
import yay from '@/assets/unnamed.jpg'
import yaa from '@/assets/KkpJ-hukwxnu5742888.jpg'
import dangshi_background from '@/assets/dangshi_background.PNG'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      '<p><a id="btn">点击进入学习卡片</a></p>' +
      '</div>',
    cardImg:p1,
    cardContent:'中国共产党第一次全国代表大会，简称中共一大',
    label:"党史新学@中共一大@嘉兴",
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
    label:"党史新学@中共二大@上海",
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
    label:"党史新学@中共三大@广州",
  }
];

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
      knowledgeUrl:list[0].cardImg,
      knowledgeContent:list[0].cardContent,
      startQuestion:false,
    };

  }



  componentDidMount() {
    const {dispatch}=this.props;
    dispatch({ type: 'mapPage/getTagTree'});
    dispatch({ type: 'mapPage/getQuestion'});
    // dispatch({ type: 'mapPage/updateUserGrades',payload:this.state.grade});
    dispatch({ type: 'mapPage/getVideoByTag',payload:''});
    dispatch({ type: 'mapPage/getAudioByTag',payload:''});
    console.log('dispatch',dispatch);
    const {mapPage}=this.props;
    console.log('mapPage',mapPage);
    const {tagTree}=mapPage;
    console.log('tagTree',tagTree);
    //遍历tagTree;
    let tree;
    function forTree(treeList){
      for (let i in treeList){
        console.log('i',i);
        if(treeList[i].children){
          forTree(treeList[i].children)
        }else{
          console.log('else');
          tree.push(treeList[i])
        }
      }
      return tree;
    }
    let treeList=forTree(tagTree);
    console.log('treeList',treeList);
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
    console.log('radio checked', e);
    this.setState({
      value: e,
    });
  };

  render(){
    let question1='中日甲午战争中，日军野蛮屠杀和平居民的地点是';
    let answer=['A.大连','B.旅顺','C.平壤','D.花园口'];
    let rightAnswer=1;
    const radioStyle = {
      display: 'block',
      height: '25px',
      width:'200px',
      // position:'relative',
      // top:'3em',
      //position:'relative',
      //lineHeight: '30px',
      // backgroundColor:'red',
    };
    // const {dispatch}=this.props;
    // dispatch({ type: 'mapPage/getTagTree'});
    // dispatch({ type: 'mapPage/getQuestion'});
    // console.log('dispatch',dispatch);
    const {mapPage}=this.props;
    console.log('mapPage',mapPage);
    //debugger
    const {tagTree,question}=mapPage;
    let allNumber=question.length;
    let recent=this.state.questionNumber-1
    console.log('tagTree',tagTree);
    //遍历tagTree;
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
    //遍历树生成的数组treeList
    let treeList=forTree(tagTree);
    const {unCheckStyle,checkStyle} = this.state;
  return (
    <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
    <Layout className={styles.normal}>
      <Sider style={{backgroundColor:'white'}} width={300}>
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
                  <Checkbox   style={radioStyle} value={'A'}>
                    {'A  '+(question[recent]?question[recent].optionA:'')}
                  </Checkbox>
                    </Col>
                    <Col span={12}>
                  <Checkbox   style={radioStyle} value={'B'}>
                    {'B  '+(question[recent]?question[recent].optionB:'')}
                  </Checkbox>
                    </Col>
                    {question[recent]&&question[recent].hasOwnProperty('optionC')?<Col span={12}>
                  <Checkbox   style={radioStyle} value={'C'}>
                    {'C  '+(question[recent]?question[recent].optionC:'')}
                  </Checkbox>
                    </Col>:""}
                    {question[recent]&&question[recent].hasOwnProperty('optionD')?
                    <Col span={12}>
                  <Checkbox   style={radioStyle} value={'D'}>
                    {'D  '+(question[recent]?question[recent].optionD:'')}
                    {/*{value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}*/}
                  </Checkbox>
                    </Col>:''}
                  </Row>
                </Checkbox.Group>
                </div>
              </div>
              <Button  key="submit"
                       type="primary" style={{top:'-10em',left:'60em',backgroundColor:'rgb(255,0,0)'}}
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
              {this.state.answer==true?
                (<h1>正确答案是</h1>):''}
              {this.state.answer==true?
                (<Card type="inner" title={(question[recent]?question[recent].answer:'')} />):''}
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
                (<h1><span>您的得分为</span><h2>{this.state.grade}</h2></h1>):''}

            </div>
            <div className={styles.bottom}></div>
          </div>
        </Modal>
        <Modal visible={this.state.modalVisble}
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
                      <Checkbox   style={radioStyle} value={'A'}>
                        {'A  '+(question[recent]?question[recent].optionA:'')}
                      </Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox   style={radioStyle} value={'B'}>
                        {'B  '+(question[recent]?question[recent].optionB:'')}
                      </Checkbox>
                    </Col>
                    {question[recent]&&question[recent].hasOwnProperty('optionC')?<Col span={12}>
                      <Checkbox   style={radioStyle} value={'C'}>
                        {'C  '+(question[recent]?question[recent].optionC:'')}
                      </Checkbox>
                    </Col>:""}
                    {question[recent]&&question[recent].hasOwnProperty('optionD')?
                      <Col span={12}>
                        <Checkbox   style={radioStyle} value={'D'}>
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
                (<h1><span>您的得分为</span><h2>{this.state.grade}</h2></h1>):''}
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
                {/*<source src="https://media.w3.org/2010/05/sintel/sdsfler.mp4"*/}
                {/*/>*/}
                {/*<source src="https://media.w3.org/2010/05/sintel/sdsfler.mp4"*/}
                {/*/>*/}
                {/*<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"*/}
                {/*/>*/}
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
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
        <Timeline className={styles.timeline}>{
          list.map((item)=> (
            <div onClick={ (e) => this.oneClick(e, item)}>
              {/*<Timeline.Item color='red' dot={<Icon type="login" style={{fontSize: '20px'}} />}>1921年7月-中共一大</Timeline.Item>*/}
              <Timeline.Item color='red' style={unCheckStyle} id={item['id']}>{item['text']}</Timeline.Item>
            </div>
            )
          )
        }
          {/*<div id="1" onClick={ (id) => this.oneClick("1",id)}>*/}
          {/*  /!*<Timeline.Item color='red' dot={<Icon type="login" style={{fontSize: '20px'}} />}>1921年7月-中共一大</Timeline.Item>*!/*/}
          {/*  <Timeline.Item color='red' style={unCheckStyle} id="timeLine1">1921年7月-中共一大</Timeline.Item>*/}
          {/*</div>*/}
          {/*<div id="2" onClick={(id) => this.oneClick("2",id)}>*/}
          {/*  <Timeline.Item color='red' style={unCheckStyle} id="timeLine2">1922年7月-中共二大</Timeline.Item>*/}
          {/*</div>*/}
          {/*<div id="3" onClick={(id) => this.oneClick("3",id)}>*/}
          {/*  <Timeline.Item  color='red' style={unCheckStyle} id="timeLine3">1923年6月-中共三大</Timeline.Item>*/}
          {/*</div>*/}
        </Timeline>
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
          <div className={styles.dangshi_div}>
            <img  src={dangshi} className={styles.dangshi} />
            <div className={styles.dangshi_font}>
              返回地图首页
            </div>
          </div>
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
