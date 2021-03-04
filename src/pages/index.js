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

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <div className={styles.button_div}>
        <img className={styles.button} style={{marginRight:'50px'}} src={sishihuimou}/>
        <a href="/mapPage">
          <img className={styles.button} style={{marginLeft:'50px'}} src={dituxuexi}/>
        </a>
      </div>
      <div className={styles.button_div}>
        <img className={styles.button} style={{marginRight:'50px'}} src={zaixianhudong}/>
        <img className={styles.button} style={{marginLeft:'50px'}} src={paimingjifen}/>
      </div>
    </div>
  );
}
