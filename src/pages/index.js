import styles from './index.less';
import sishihuimou from '@/assets/sishihuimou.png';
import dituxuexi from '@/assets/dituxuexi.png';
import zaixianhudong from '@/assets/zaixianhudong.png';
import paimingjifen from '@/assets/paimingjifen.png';
import router from 'umi/router';
// import {Provider} from "react-redux";
// import reducer from "./reducer/index";
// import {createStore} from 'redux';
// const store = createStore(reducer);
import ReactMapboxGl from 'react-mapbox-gl';
import { getLocalData } from '@/utils/common';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Row, Col, Icon } from 'antd';
import ditu2 from '@/assets/ditu2.png';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoid2F0c29ueWh4IiwiYSI6ImNrMWticjRqYjJhOTczY212ZzVnejNzcnkifQ.-0kOdd5ZzjMZGlah6aNYNg';
const MapboxMap = ReactMapboxGl({ accessToken: MAPBOX_TOKEN, attributionControl: false, preserveDrawingBuffer: true,
});

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <div className={styles.module_div}>
        <Row justify="space-between">
          <Col span={4} style={{width:"150px"}}>
            <div className={styles.font_style}>· 党史新学</div>
          </Col>
          <Col span={4} style={{width:"150px"}} >
            <div className={styles.font_style}>· 建设中国</div>
          </Col>
          <Col span={4} style={{width:"150px"}} >
            <div className={styles.font_style}>· 中特之路</div>
          </Col>
          <Col span={4} style={{width:"150px"}} >
            <div className={styles.font_style}>· 改革复兴</div>
          </Col>
          <Col span={4} style={{width:"150px"}} >
            <div className={styles.font_style}>· 文军长征</div>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={4} style={{width:"150px"}}>
            <div className={styles.font_style}>· 决胜小康</div>
          </Col>
          <Col span={4} style={{width:"150px"}}>
            <div className={styles.font_style}>· 百花齐放</div>
          </Col>
          <Col span={4} style={{width:"150px"}}>
            <div className={styles.font_style}>· 理论学习</div>
          </Col>
          <Col span={4} style={{width:"150px"}}>
            <div className={styles.font_style}>· 微视频学习</div>
          </Col>
          <Col span={4} style={{width:"150px"}}>
            <div className={styles.font_style}>· 我想对党说</div>
          </Col>
        </Row>
      </div>
      {/*<div className={styles.button_div}>*/}
      {/*  <img className={styles.button} style={{marginRight:'50px'}} src={sishihuimou}/>*/}
      {/*  <a href="/mapPage">*/}
      {/*    <img className={styles.button} style={{marginLeft:'50px'}} src={dituxuexi}/>*/}
      {/*  </a>*/}
      {/*</div>*/}
      {/*<div className={styles.button_div}>*/}
      {/*  <img className={styles.button} style={{marginRight:'50px'}} src={zaixianhudong}/>*/}
      {/*  <img className={styles.button} style={{marginLeft:'50px'}} src={paimingjifen}/>*/}
      {/*</div>*/}
      <div className={styles.map_div} >
        {/*<MapboxMap*/}
        {/*  style='mapbox://styles/mapbox/light-v10'*/}
        {/*  containerStyle={{ position:'absolute', left:'10px', top:'10px', height: '50vh', width: '70vw', borderRadius:"10px" }}*/}
        {/*/>*/}
        <div>
          <img  className={styles.ditu} src={ditu2}/>
        </div>
        <a href='/mapPage'>
          <div className={styles.mask_div}>
            <Icon style={{fontStyle: 'oblique', marginLeft:"20vw", color:'rgba(100, 0, 0, 0.5)', fontSize:"40px"}} type="step-forward" />
            <div className={styles.ditu_font}>
              四史地图
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
