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
import redflag from '@/assets/redflag.png';
import eventcard from '@/assets/eventcard.png';
import dangshi from '@/assets/dangshi.PNG'
import yay from '@/assets/unnamed.jpg'
import yaa from '@/assets/KkpJ-hukwxnu5742888.jpg'
import dangshi_background from '@/assets/dangshi_background.PNG'
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;
const Authorized = RenderAuthorized(getAuthority());
const { Countdown } = Statistic;
const { Content, Sider } = Layout;
const noMatch=<Redirect to={`/login?redirect=${window.location.href}`} />;
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
    };

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
        map.addImage('shanghai', image);
        map.addLayer({
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
                }
              }]
            }
          },
          "layout": {
            "icon-image": 'shanghai',
            "icon-size": [
              "interpolate", ["linear"], ["zoom"],
              3,0.1,
              17,0.8
            ],
            "icon-ignore-placement": true,
          }
        });
        map.addImage('jiaxing', image);
        map.addLayer({
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
                  "coordinates": [120.79, 30.75]
                }
              }]
            }
          },
          "layout": {
            "icon-image": 'jiaxing',
            "icon-size": [
              "interpolate", ["linear"], ["zoom"],
              3,0.1,
              17,0.8
            ],
            "icon-ignore-placement": true,
          }
        });
      });
    })
    //加载中共二大（上海）的火花图标
    map.on('load', function() {
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/4/45/Eventcard.png',function(error,image) {
        if(error) throw  error;
        map.addImage('中共二大', image);
        map.addLayer({
          "id": "中共二大",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [121.47, 31.23],
                }
              }]
            }
          },
          "layout": {
            "icon-image": '中共二大',
            "icon-size": [
              "interpolate", ["linear"], ["zoom"],
              3,0.1,
              17,0.8
            ],
            "icon-ignore-placement": true,
          }
        });
      });
    })
    //加载中共三大（广州）的火花图标
    map.on('load', function() {
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/4/45/Eventcard.png',function(error,image) {
        if(error) throw  error;
        map.addImage('中共三大', image);
        map.addLayer({
          "id": "中共三大",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [113.30, 23.12],
                }
              }]
            }
          },
          "layout": {
            "icon-image": '中共三大',
            "icon-size":  [
              "interpolate", ["linear"], ["zoom"],
              3,0.1,
              17,0.8
            ],
            "icon-ignore-placement": true,
            "text-field": "中共三大",
            "text-anchor": 'left',
            "text-offset": [1,0.1],
            // "text-font": ["DIN Offc Pro Medium\", \"Arial Unicode MS Bold"],
            "text-size": [
              "interpolate", ["linear"], ["zoom"],
              3,10,
              17,38
            ],
          },
          paint: {
            "text-color": 'rgb(255,0,0)',
          }
        });
      });
    })
    this.map = map;
  }
  showModal=()=>{
    this.setState({modalVisble:true})
    console.log(this.state.modalVisble)
  }
  oneClick = (e) => {
    const {dispatch}=this.props;
    this.setState({
      first: true,
    })
    if(e==="1"){
      document.getElementById("timeLine3").style.opacity = 0.5;
      document.getElementById("timeLine1").style.opacity = 1;
      document.getElementById("timeLine2").style.opacity = 0.5;
      //窗口定位到上海，嘉兴区域
      this.map.fitBounds([[
        120.72 ,
        30.53
      ], [
        121.73 ,
        31.53
      ]]);
      let _this = this
      //加载上海，嘉兴图标的点击事件
      // this.map.on('click', 'shanghai', function(e) {
      //   let showInfo = null;
      //   var coordinates = e.features[0].geometry.coordinates;
      //   showInfo = '<div className={styles.markerTop}><h2>中共一大</h2></div> <div className={styles.markerBody}><p>中国共产党第一次全国代表大会，简称中共一大，' +
      //     '于1921年7月23日在<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省<span>嘉兴</span>闭幕结束。' +
      //     '大会的召开宣告了中国共产党的正式成立。</p> <p><a>点击进入学习卡片</a></p></div>'
      //   new mapboxgl.Popup()
      //     .setLngLat(coordinates)
      //     .setHTML(showInfo)
      //     .addTo(_this.map);
      // })
      this.map.on('click', 'shanghai', function(e) {
        let showInfo = null;
        console.log(this)
        console.log(dispatch)
        function showModal() {
          dispatch({
            type: 'mapPage/fetch',
          });
        }

        var coordinates = e.features[0].geometry.coordinates;
        showInfo ='' +
          '<div  className={styles.markerTop}>' +
          '<h2>中共一大</h2>' +
          '</div>' +
          '<div className={styles.markerBody}>' +
          '<p>中国共产党第一次全国代表大会，简称中共一大，' +
          '于1921年7月23日在' +
          '<span>上海</span>法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省' +
          '<span>嘉兴</span>闭幕结束。' +
          '大会的召开宣告了中国共产党的正式成立。' +
          '</p> ' +
          '<p>' +
          '<a id="btn">点击进入学习卡片</a>' +
          '</p>' +
          '</div>'
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(showInfo)
          .addTo(_this.map);
        document.getElementById('btn')
          .addEventListener('click', function(){
            _this.showModal()
          });
      })
      this.map.on('mouseenter', 'shanghai', function() {
        _this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'shanghai', function() {
        _this.map.getCanvas().style.cursor = '';
      });
    }
    else if (e==="2") {
      document.getElementById("timeLine3").style.opacity = 0.5;
      document.getElementById("timeLine1").style.opacity = 0.5;
      document.getElementById("timeLine2").style.opacity = 1;
      /* //添加视频
   map.on('load', function() {
     map.addSource("video", {
       "type": "video",
       "urls": ["https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4"],
       "coordinates": [
         [120.22,32.03],
         [122.22,32.03],
         [122.22,30.03],
         [120.22,30.03]
       ]
     });
     map.addLayer({
       'id': "video",
       "type": "raster",
       "source": "video",
     });
   })*/
      this.map.flyTo({
        center:[121.22 , 31.03],
        zoom: 6,
        speed: 1,
        // curve: 3,
      })
    } else {
      document.getElementById("timeLine3").style.opacity = 1;
      document.getElementById("timeLine1").style.opacity = 0.5;
      document.getElementById("timeLine2").style.opacity = 0.5;
      this.map.fitBounds([[
        115.89,
        39.42,
      ], [
        116.89,
        40.42,
      ]]);
    }
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render(){
    let question='中日甲午战争中，日军野蛮屠杀和平居民的地点是';
    let answer=['A.大连','B.旅顺','C.平壤','D.花园口'];
    let rightAnswer=1;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const {unCheckStyle,checkStyle} = this.state;
    let knowledgeUrl="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
    let knowlegeContent="中国共产党第一次全国代表大会，简称中共一大，' +\n" +
      "        '于1921年7月23日在上海法租界秘密召开，7月30日会场被租界巡捕房搜查后休会，8月3日在浙江省嘉兴闭幕结束。' +\n" +
      "        '大会的召开宣告了中国共产党的正式成立。";
  return (
    <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
    <Layout className={styles.normal}>
      <Sider style={{backgroundColor:'white'}} width={300}>
        <Modal visible={this.state.modalVisble}
               title="互动页面"
               centered
               style={{top:'3em',color:'black',fontStyle:{}}}
               bodyStyle={{height:'70vh'}}
               maskStyle={{backgroundColor: 'rgba(198,170,145,0.1)' ,top:'5em',}}
               className={styles.modal}
               onOk={()=>this.setState({modalVisble:false})}
               footer={[
                     <Button  key="back" onClick={()=>{}}>
                       取消
                     </Button>,
                     <Button
                       key="submit"
                       type="primary"
                       onClick={()=> {
                         this.setState({modalVisble:false})
                         this.setState({deadline:Date.now() +  1000 * 60})
                         this.setState({questionNumber: this.state.questionNumber+1})
                         this.setState({answer:false})
                       }}>
                       确定
                     </Button>
                 ]}
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
                        src={knowledgeUrl}
                      />
                    }
                    actions={[
                      <Icon type="setting" key="setting" />,
                      <Icon type="edit" key="edit" />,
                      <Icon type="ellipsis" key="ellipsis" />,
                    ]}>
                {knowlegeContent}
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
                      this.setState({modalVisble:false})
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
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
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
        <Timeline className={styles.timeline}>
          <div id="1" onClick={ (id) => this.oneClick("1",id)}>
            {/*<Timeline.Item color='red' dot={<Icon type="login" style={{fontSize: '20px'}} />}>1921年7月-中共一大</Timeline.Item>*/}
            <Timeline.Item color='red' style={unCheckStyle} id="timeLine1">1921年7月-中共一大</Timeline.Item>
          </div>
          <div id="2" onClick={(id) => this.oneClick("2",id)}>
            <Timeline.Item color='red' style={unCheckStyle} id="timeLine2">1922年7月-中共二大</Timeline.Item>
          </div>
          <div id="3" onClick={(id) => this.oneClick("3",id)}>
            <Timeline.Item  color='red' style={unCheckStyle} id="timeLine3">1923年6月-中共三大</Timeline.Item>
          </div>
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
