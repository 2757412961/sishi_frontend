import styles from './index.less';
import ReactMapboxGl from 'react-mapbox-gl';
import { getLocalData } from '@/utils/common';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Row, Col, Icon } from 'antd';
import dangshipingtai from '@/assets/images/dangshipingtai.png';
import "../../node_modules/video-react/dist/video-react.css";
import { connect } from 'dva';

function Shouye(props) {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome}>
        <img src={dangshipingtai} style={{margin:"0 auto", width:"50%"}}/>
        <div style={{color:"white", marginTop:"5vh", fontSize:"15px", fontStyle:"bold"}}>中共浙江大学地球科学学院委员会</div>
        <div className={styles.arrows_div}
             onClick={()=>
               props.dispatch(
                 {type:'mapPage/setModule', payload:'dangshixinxue'}
               )
             }
        >
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

export default connect(({ mapPage }) => ({
  mapPage,
}))(Shouye);
