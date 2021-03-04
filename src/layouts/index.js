import styles from './index.less';
import Header from '@/components/Header/index.js';
import Footer from '@/components/Footer/index.js';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <Header indexUrl={window.location.pathname}/>
      {/*<h1 className={styles.title}>Yay! Welcome to umi!</h1>*/}
      {props.children}
      <Footer indexUrl={window.location.pathname}/>
    </div>
  );
}

export default BasicLayout;
