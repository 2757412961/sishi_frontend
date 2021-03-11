import React, { useState, useEffect, Component } from 'react';
import { Button, Layout, Modal, Typography, Statistic, Col, Row,Card,Radio,Timeline, Tabs, Carousel  } from 'antd';
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
import {getAuthority} from '@/utils/authority'
import redflag from '@/assets/redflag.png';
import eventcard from '@/assets/eventcard.png';
import dangshi from '@/assets/dangshi.PNG'
import ttt from '@/assets/images/carousel-image/2.jpg'
import dangshi_background from '@/assets/dangshi_background.PNG'

const Authorized = RenderAuthorized(getAuthority());
const { Countdown } = Statistic;
const { Content, Sider } = Layout;
const { TabPane } = Tabs;

const noMatch=<Redirect to={`/login?redirect=${window.location.href}`} />;

class MapPage extends Component {
  constructor(props) {
    super(props);  // TODO: what method and properties does the Component have?
    this.state = {
      _collapsed: false,
      modalVisble: false,
      deadline: Date.now() +  1000 * 60,
      value:1,
      grade:0,
      answer:false,
      first: false,
      questionNumber:1,
      map: null,
    };
  }

  // TODO: when is this componentDidMount called?
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

    let layers = [
      {
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

    this.map = new mapboxgl.Map({
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
      "showCompass": false,
      //是否显示缩放按钮，默认为true
      "showZoom":true
    });

    //添加导航控件，控件的位置包括'top-left', 'top-right','bottom-left' ,'bottom-right'四种，默认为'top-right'
    this.map.addControl(nav, 'top-left');
  }

  // TODO: SHALL NOT creat a new map container each time you click!
  oneClickk = () => {
    this.setState({
      first: true,
    })
    // mapboxgl.accessToken =
    //   'pk.eyJ1Ijoid2F0c29ueWh4IiwiYSI6ImNrMWticjRqYjJhOTczY212ZzVnejNzcnkifQ.-0kOdd5ZzjMZGlah6aNYNg';
    // let localhost = window.location.origin;
    // let sources = {
    //   "osm-tiles1": {
    //     "type": "raster",
    //     'tiles': ['http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=7bf37aebb62ef1a2cd8e1bd276226a63'],
    //     'tileSize': 256
    //   },
    //   "osm-tiles2": {
    //     "type": "raster",
    //     'tiles': ['http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=7bf37aebb62ef1a2cd8e1bd276226a63'],
    //     'tileSize': 256
    //   }
    // };
    // let layers = [
    //   {
    //   "id": "simple-tiles1",
    //   "type": "raster",
    //   "source": "osm-tiles1",
    // },
    //   {
    //     "id": "simple-tiles2",
    //     "type": "raster",
    //     "source": "osm-tiles2",
    //   }
    // ];
    // const map = new mapboxgl.Map({
    //   container: 'onlineMapping',
    //   style: {
    //     "version": 8,
    //     "sprite": localhost + "/MapBoxGL/css/sprite",
    //     "glyphs": localhost + "/MapBoxGL/css/font/{fontstack}/{range}.pbf",
    //     "sources": sources,
    //     "layers": layers,
    //   },
    //   center: [121.52, 31.04],  //上海经纬度坐标
    //   zoom: 3,
    // });

    // this.map.on('load', function(e) {
      this.map.loadImage('https://upload.wikimedia.org/wikipedia/commons/4/45/Eventcard.png',function(error,image) {
        if(error) throw error;
        this.map.addImage('shanghai', image);
        this.map.addLayer({
          "id": "shanghai",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [121.48, 31.22],
                  // "coordinates": [120.79, 30.75]
                }
              }]
            }
          },
          "layout": {
            "icon-image": 'shanghai',
            "icon-size": 0.23,
          }
        });
        this.map.addImage('jiaxing', image);
        this.map.addLayer({
          "id": "jiaxing",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  // "coordinates": [121.48, 31.22],
                  "coordinates": [120.79, 30.75]
                }
              }]
            }
          },
          "layout": {
            "icon-image": 'jiaxing',
            "icon-size": 0.23,
          }
        });
      });
    // })

    this.map.on('click', 'shanghai', function(e) {
      let showInfo = null;
      var coordinates = e.features[0].geometry.coordinates;
      showInfo = '<div className={styles.markerTop}><h2>中共一大</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
        '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
        '大会的召开宣告了中国共产党的正式成立。</p> <p><a>点击进入学习卡片</a></p></div>'
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(showInfo)
        .addTo(this.map);
    })

    this.map.on('mouseenter', 'shanghai', function() {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'shanghai', function() {
      this.map.getCanvas().style.cursor = '';
    });
    this.map.fitBounds([
      [
        120.72 ,
        30.53
      ], [
        121.73 ,
        31.53
      ]]);
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };


  render() {
    let question='中日甲午战争中，日军野蛮屠杀和平居民的地点是';
    let answer=['A.大连','B.旅顺','C.平壤','D.花园口'];
    let rightAnswer=1;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    function callback(key) {
      console.log(key);
    }
    function onChange(a, b, c) {
      console.log(a, b, c);
    }
    const contentStyle = {
      height: '300px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };

    return (
      <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
      <Layout className={styles.normal}>
        <Sider style={{backgroundColor:'white'}} width={300}>
          <Button onClick={() =>this.setState({modalVisble:true})}>开始答题</Button>

          <Modal visible={this.state.modalVisble}
                 // title="开始答题"
                 centered
                 style={{top:'3em',color:'black',fontStyle:{}}}
                 bodyStyle={{height:'70vh'}}
                 maskStyle={{backgroundColor: 'rgba(198,170,145,1)' ,top:'5em',}}
                 className={styles.modal}
                 footer={[
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
                           this.setState({modalVisble:false})
                           this.setState({deadline:Date.now() +  1000 * 60})
                           this.setState({questionNumber: this.state.questionNumber+1})
                           this.setState({answer:false})
                         }}>
                         下一题
                       </Button>
                     </Col>
                     <Col span={8}>
                       <Countdown title="Countdown" value={this.state.deadline} onFinish={()=>{}} />
                     </Col>
                   </Row>
                   ]}>

            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="答题" key="1">
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
                         type="primary" style={{marginTop:'2em',left:'29em',backgroundColor:'rgb(255,0,0)'}} onClick={()=>{
                  if(this.state.value==rightAnswer){
                    this.setState({grade:this.state.grade++});
                  }
                  this.setState({answer:true})}}>
                  提交
                </Button>

                {this.state.answer==true?
                  (<h1>正确答案是</h1>):''}
                {this.state.answer==true?
                  (<Card type="inner" title={answer[rightAnswer]} />):''}
              </TabPane>
              <TabPane tab="图片" key="2" >
                <Carousel  >
                  {/*afterChange={onChange}*/}
                  <div >
                    <div style={contentStyle}>
                      <img  src={ttt} />
                    </div>
                  </div>
                  <div >
                    <div style={contentStyle}>
                      <img  src={ttt} />
                    </div>
                  </div>
                </Carousel>
              </TabPane>
              <TabPane tab="音频" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="视频" key="4">
                Content of Tab Pane 4
              </TabPane>
            </Tabs>

            {/*  <Card type="inner" title={answer[0]} extra={<a href="#">More</a>} onClick={()=>{console.log(answer[0])}}/>*/}
            {/*  <Card type="inner" title={answer[1]} extra={<a href="#">More</a>}/>*/}
            {/*  <Card type="inner" title={answer[2]} extra={<a href="#">More</a>}/>*/}
            {/*  <Card type="inner" title={answer[3]} extra={<a href="#">More</a>}/>*/}
            {/*</Card>,*/}
            {/*<h1>{question}</h1>*/}
          </Modal>

          <Timeline style={{color:'red',marginLeft:'23%',marginTop:'10%'}}>
            <div onClick={this.oneClickk} style={{cursor: 'pointer'}} id='fit'>
              <Timeline.Item color='red'>1921年7月-中共一大</Timeline.Item>
            </div>
            <Timeline.Item color='red'>1922年7月-中共二大</Timeline.Item>
            <Timeline.Item color='red'>1923年6月-中共三大</Timeline.Item>
          </Timeline>

        </Sider>
        <Content>
          <div className={styles.normal}>
            <div className={styles.mapContainer}  id="onlineMapping">
            </div>
            <div className={styles.dangshi_div} style={{display: this.state.first ? 'block': 'none'}}>
              <img  src={dangshi} className={styles.dangshi} />
              <div className={styles.dangshi_font}>
                党史学习
              </div>
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
