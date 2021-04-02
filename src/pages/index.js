import styles from './index.less';
import ReactMapboxGl from 'react-mapbox-gl';
import { getLocalData } from '@/utils/common';
import 'mapbox-gl/dist/mapbox-gl.css';
import dangshipingtai from '@/assets/images/dangshipingtai.png';
import "../../node_modules/video-react/dist/video-react.css";
import { connect } from 'dva';
import { Menu, Button, Dropdown, Icon, Avatar, Row, Col, Divider } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';

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
    <Menu.Item key="1" onClick={()=>resetUserData(props)}>
      <span>退出</span>
    </Menu.Item>
  </Menu>;

  return (
    <div className={styles.normal}>
      <div className={styles.welcome}>
        <div className={styles.self}>
        {getLocalData({ dataName: 'userName' }) ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <div className={styles.head_user}>
              {/*<div className={styles.head_user_avatar}>*/}
              {/*  <Avatar size="small" icon="user" src={avatar} />*/}
              {/*</div>*/}
              <div className={styles.head_user_name}>
                <img src={getLocalData({ dataName: 'avatar' })} className={styles.img_style}/>
                {/*<span>{getLocalData({ dataName: 'userName' })}</span>*/}
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
        <img src={dangshipingtai} style={{margin:"0 auto", width:"50%"}}/>
        <div style={{color:"white", marginTop:"5vh", fontSize:"20px", fontStyle:"bold"}}>中共浙江大学地球科学学院委员会</div>
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
              <Icon className={styles.arrows1} type="right" />
            </Col>
            <Col span={6}>
              <Icon className={styles.arrows2} type="right" />
            </Col>
            <Col span={6}>
              <Icon className={styles.arrows3} type="right" />
            </Col>
            <Col span={6}>
              <Icon className={styles.arrows4} type="right" />
            </Col>
          </Row>
          </a>
        </div>
      </div>
    </div>
  );
}

export default connect(({ mapPage, userInfo }) => ({
  mapPage,
  userInfo
}))(Shouye);
