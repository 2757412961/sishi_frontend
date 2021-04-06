import styles from './index.less';
import Header from '@/components/Header/index.js';
import Footer from '@/components/Footer/index.js';


function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      {
        window.location.pathname!='/'?
          <Header indexUrl={window.location.pathname}/>:
          null
      }
      {/*<h1 className={styles.title}>Yay! Welcome to umi!</h1>*/}
      {props.children}
      {
        window.location.pathname!='/mapPage'?
          <Footer indexUrl={window.location.pathname}/>:
          null
      }
    </div>
  );
}

export default BasicLayout;
