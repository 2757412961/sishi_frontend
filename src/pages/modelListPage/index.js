// import styles from './index.less';
// import ReactMapboxGl from 'react-mapbox-gl';
// import { getLocalData } from '@/utils/common';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import dangshipingtai from '@/assets/images/dangshipingtai.png';
// import { connect } from 'dva';
// import { Menu, Button, Dropdown, Icon, Avatar, Row, Col, Divider} from 'antd';
// import Link from 'umi/link';
// import router from 'umi/router';
// import paihangbang from '@/assets/images/paihangbang2.png';
//
//
// function Mokuaiye(props) {
//   const menu1 = (
//     <Menu>
//       <Menu.Item>
//         <a  rel="noopener noreferrer" href="/mapPage">
//           中共党史
//         </a>
//       </Menu.Item>
//       <Menu.Item>
//         <a >
//           新中国史
//         </a>
//       </Menu.Item>
//       <Menu.Item>
//         <a >
//           改革开放史
//         </a>
//       </Menu.Item>
//       <Menu.Item>
//         <a >
//           社会主义发展史
//         </a>
//       </Menu.Item>
//     </Menu>
//   );
//   const menu2 = (
//     <Menu>
//       <Menu.Item>
//         <a >
//           伟大精神
//         </a>
//       </Menu.Item>
//       <Menu.Item>
//         <a >
//           脱贫攻坚
//         </a>
//       </Menu.Item>
//       <Menu.Item>
//         <a >
//           一带一路
//         </a>
//       </Menu.Item>
//     </Menu>
//   );
//   return (
//     <div className={styles.root}>
//       <div>
//         <Dropdown overlay={menu1} placement="bottomCenter">
//           <Button>党史学习</Button>
//         </Dropdown>
//         <Dropdown overlay={menu2} placement="bottomCenter">
//           <Button>专题学习</Button>
//         </Dropdown>
//         <Button>西迁精神</Button>
//         <Button>青春力量</Button>
//         <Button>党言党语</Button>
//       </div>
//     </div>
//   );
// }
// export default connect(({ mapPage, userInfo }) => ({
//   mapPage,
//   userInfo
// }))(Mokuaiye);

import styles from './index.less';
import ReactMapboxGl from 'react-mapbox-gl';
import { getLocalData } from '@/utils/common';
import 'mapbox-gl/dist/mapbox-gl.css';
import dangshipingtai from '@/assets/images/dangshipingtai.png';
// import "../../node_modules/video-react/dist/video-react.css";
import { connect } from 'dva';
import { Menu, Button, Dropdown, Icon, Avatar, Row, Col, Divider } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import paihangbang from '@/assets/images/paihangbang2.png';

// 登出
function resetUserData(props){
  props.dispatch({ type: 'userInfo/userLogout' })
  router.replace('/login')
}

function Mokuaiye(props) {

  const menu = <Menu>
    <Menu.Item key="0">
      <Link to="/userCenter">个人中心</Link>
    </Menu.Item>
    <Menu.Item key="1" onClick={()=>resetUserData(props)}>
      <span>退出</span>
    </Menu.Item>
  </Menu>;
  const menu1 = (
    <Menu style={{textAlign:'center'}}>
      <Menu.Item>
        <a  rel="noopener noreferrer" href="/mapPage" className={styles.menu_a}>
          中共党史
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className={styles.menu_a}>
          新中国史
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className={styles.menu_a}>
          改革开放史
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className={styles.menu_a}>
          社会主义发展史
        </a>
      </Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu style={{textAlign:'center'}}>
      <Menu.Item>
        <a className={styles.menu_a}>
          伟大精神
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className={styles.menu_a}>
          脱贫攻坚
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className={styles.menu_a}>
          一带一路
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className={styles.menu_a}>
          西迁精神
        </a>
      </Menu.Item>
    </Menu>
  );
  const menu3 = (
    <Menu style={{textAlign:'center'}}>
      <Menu.Item>
        <a className={styles.menu_a}>
          青春力量
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className={styles.menu_a}>
          党言党语
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className={styles.menu_a}>
          互动答题
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className={styles.menu_a}>
          学习资料
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.normal}>
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
        <div>
          <Dropdown overlay={menu1} placement="bottomCenter">
            <Button className={styles.captcha_btn} style={{marginLeft:'100px', width:"150px", height:"50px"}}>党&nbsp;史&nbsp;学&nbsp;习</Button>
          </Dropdown>
          <Dropdown overlay={menu2} placement="bottomCenter">
            <Button className={styles.captcha_btn} style={{width:"150px", height:"50px"}}>专&nbsp;题&nbsp;学&nbsp;习</Button>
          </Dropdown>
          <Dropdown overlay={menu3} placement="bottomCenter">
            <Button className={styles.captcha_btn} style={{width:"150px", height:"50px"}}>互&nbsp;动&nbsp;学&nbsp;习</Button>
          </Dropdown>
          {/*<Button className={styles.captcha_btn}>西迁精神</Button>*/}
          {/*<Button className={styles.captcha_btn}>青春力量</Button>*/}
          {/*<Button className={styles.captcha_btn}>党言党语</Button>*/}
          </div>
      </div>
    </div>
  );
}

export default connect(({ mapPage, userInfo }) => ({
  mapPage,
  userInfo
}))(Mokuaiye);
