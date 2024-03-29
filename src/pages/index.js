import styles from './index.less';
import ReactMapboxGl from 'react-mapbox-gl';
import { getLocalData } from '@/utils/common';
import 'mapbox-gl/dist/mapbox-gl.css';
import dangshipingtai from '@/assets/images/fengmian.png';
import arrow from '@/assets/images/arrow.png';
import "../../node_modules/video-react/dist/video-react.css";
import { connect } from 'dva';
import { Menu, Button, Dropdown, Icon, Avatar, Row, Col, Divider } from 'antd';
// import Link from 'umi/link';
import router from 'umi/router';
import paihangbang from '@/assets/images/paihangbang2.png';
import {BrowserRouter, Route, Link,HashRouter} from 'react-router-dom';
import xueyuanlogo from '@/assets/images/xueyuanlogo.png';

// 登出
function resetUserData(props){
  props.dispatch({ type: 'userInfo/userLogout' })
  router.replace('/login')
}

function Shouye(props) {

  const menu = <Menu>
    <Menu.Item key="0">
      <Link to="/userCenter">个人中心</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/management">后台管理员</Link>
    </Menu.Item>
    <Menu.Item key="2" onClick={()=>resetUserData(props)}>
      <span>退出</span>
    </Menu.Item>
  </Menu>;

  return (
    <HashRouter>
    <div className={styles.normal} scoped>
      <div className={styles.welcome}>
        <div className={styles.self}>
          <img className={styles.paihangbang} src={paihangbang} onClick={() => router.replace('/userScoreList')}></img>
        {getLocalData({ dataName: 'userName' }) ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <div className={styles.head_user}>
              <div className={styles.head_user_name}>
                <img src={getLocalData({ dataName: 'avatar' })} className={styles.img_style}/>
              </div>
            </div>
          </Dropdown>
        ) : (
          <div className={styles.head_opration}>
            <Button type="default" htmlType="submit" onClick={() => router.replace('/login')}>
              登录
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => router.replace('/register')}
            >
              注册
            </Button>
          </div>
        )}
        </div>
        <img src={dangshipingtai} style={{margin:"0 auto", width:"35vw"}}/>
        <div className={styles.arrows_div}
             onClick={()=>
               props.dispatch(
                 {type:'mapPage/setModule', payload:'dangshixinxue'}
               )
             }
        >
          <a href="/modelListPage">
            <img src={arrow} className={styles.arrows1}></img>
          </a>
        </div>
        <Row style={{width:"600px", position:"absolute", bottom:"20px"}}>
          {/*<Col span={12}>*/}
          {/*  <img src={xueyuanlogo} className={styles.xueyuan_logo} style={{float:"left"}} alt="" />*/}
          {/*</Col>*/}
          <Col >
            <div style={{marginTop:"10px", color:"white"}}>
              地址 : 浙大路38号，浙江大学地球科学学院
            </div>
            <div style={{marginTop:"5px", color:"white"}}>
              邮编 : 310027
            </div>
            <div style={{marginTop:"5px", color:"white"}}>
              电话 : +86-571-87952453
            </div>
          </Col>
          {/*  </Col>*/}
        </Row>
      </div>
    </div>
    </HashRouter>
  );
}

export default connect(({ mapPage, userInfo }) => ({
  mapPage,
  userInfo
}))(Shouye);
