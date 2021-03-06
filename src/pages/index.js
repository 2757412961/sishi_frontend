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

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoid2F0c29ueWh4IiwiYSI6ImNrMWticjRqYjJhOTczY212ZzVnejNzcnkifQ.-0kOdd5ZzjMZGlah6aNYNg';
const MapboxMap = ReactMapboxGl({ accessToken: MAPBOX_TOKEN, attributionControl: false, preserveDrawingBuffer: true,
});

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
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
        <MapboxMap
          style='light'
          containerStyle={{ height: '50vh', width: '100vw' }}
        />
      </div>
    </div>
  );
}
