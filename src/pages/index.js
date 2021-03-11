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
import dangshipingtai from '@/assets/images/dangshipingtai.png';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoid2F0c29ueWh4IiwiYSI6ImNrMWticjRqYjJhOTczY212ZzVnejNzcnkifQ.-0kOdd5ZzjMZGlah6aNYNg';
const MapboxMap = ReactMapboxGl({ accessToken: MAPBOX_TOKEN, attributionControl: false, preserveDrawingBuffer: true,
});

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome}>
        <img src={dangshipingtai} style={{margin:"0 auto", width:"50%"}}/>
        <div style={{color:"white", marginTop:"10vh", fontSize:"15px", fontStyle:"bold"}}>中共浙江大学地球科学学院委员会</div>
        <div className={styles.arrows_div}>
          <a href="/mapPage">
          <Row>
            <Col span={6}>
              <Icon className={styles.arrows} style={{opacity:"1.0"}} type="right" />
            </Col>
            <Col span={6}>
              <Icon className={styles.arrows} style={{opacity:"0.8"}} type="right" />
            </Col>
            <Col span={6}>
              <Icon className={styles.arrows} style={{opacity:"0.6"}} type="right" />
            </Col>
            <Col span={6}>
              <Icon className={styles.arrows} style={{opacity:"0.4"}} type="right" />
            </Col>
          </Row>
          </a>
        </div>
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
      {/*<div className={styles.map_div} >*/}
      {/*  <div>*/}
      {/*    <img  className={styles.ditu} src={ditu2}/>*/}
      {/*  </div>*/}
      {/*  <a href='/mapPage'>*/}
      {/*    <div className={styles.mask_div}>*/}
      {/*      <Icon style={{fontStyle: 'oblique', marginLeft:"20vw", color:'rgba(100, 0, 0, 0.5)', fontSize:"40px"}} type="step-forward" />*/}
      {/*      <div className={styles.ditu_font}>*/}
      {/*        四史地图*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </a>*/}
      {/*</div>*/}
    </div>
  );
}
