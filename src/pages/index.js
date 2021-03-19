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
import { Player } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import testVideo from '@/assets/test/1761d8ea33d85580817adaf7f8f034a3.mp4';



const MAPBOX_TOKEN =
  'pk.eyJ1Ijoid2F0c29ueWh4IiwiYSI6ImNrMWticjRqYjJhOTczY212ZzVnejNzcnkifQ.-0kOdd5ZzjMZGlah6aNYNg';
const MapboxMap = ReactMapboxGl({ accessToken: MAPBOX_TOKEN, attributionControl: false, preserveDrawingBuffer: true,
});

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome}>
        <img src={dangshipingtai} style={{margin:"0 auto", width:"50%"}}/>
        <div style={{color:"white", marginTop:"5vh", fontSize:"15px", fontStyle:"bold"}}>中共浙江大学地球科学学院委员会</div>
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
    </div>
  );
}
