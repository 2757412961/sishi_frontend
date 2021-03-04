/**
* 公共头部组件
 * create by zhaichunyan 2018-10-30
 * @1183624592@qq.com
 */
import React, { Component } from 'react';
import { Menu, Button, Dropdown, Icon, Avatar } from 'antd';
import styles from './index.less';
import Link from 'umi/link';
// import Logo from '@images/index/0212.png';
import { judgeUrl, getLocalData } from '@/utils/common.js';
import router from 'umi/router';
import { connect } from 'dva';
import classnames from 'classnames';
import header from '@/assets/header.jpg';
import zhedalogo from '@/assets/zhedalogo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      currentKey: '1',
    };
  }

  componentDidMount() {
    // if (this.props.userInfo.userInfo.username && getLocalData({ dataName: 'tgt' })) {
    // } else {
    //   this.props.dispatch({ type: 'userInfo/getUserData' });
    // }
  }
  // 登出
  resetUserData(){
    this.props.dispatch({ type: 'userInfo/userLogout' })
    router.replace('/login')
  }
  render() {
    // const { username, avatar } = this.props.userInfo.userInfo;
    const indexUrl = this.props.indexUrl;

    const menu = <Menu>
        <Menu.Item key="0">
          <Link to="/userManagement/myProfile">个人中心</Link>
        </Menu.Item>
        <Menu.Item key="1" onClick={this.resetUserData.bind(this)}>
          <span>退出</span>
        </Menu.Item>
      </Menu>;

    return (
      <div
        // className={classnames(styles.head_nav, window.location.pathname === '/fuxi/mapView'?
        className={classnames(styles.head_nav, window.location.pathname === '/mapView'?//配置二级目录时需要加上/fuxi
          styles.active : '')}
      >
        <div className={classnames(styles.header_first)} style={{ backgroundImage: `url(${header})`}}>
          <div className={styles.head_logo}>
            <img src={zhedalogo} className={styles.zheda_logo} alt="" />
          </div>

          {/*{username ? (*/}
          {/*  <Dropdown overlay={menu} trigger={['click']}>*/}
          {/*    <div className={styles.head_user}>*/}
          {/*      <div className={styles.head_user_avatar}>*/}
          {/*        <Avatar size="small" icon="user" src={avatar} />*/}
          {/*      </div>*/}
          {/*      <div className={styles.head_user_name}>*/}
          {/*        <span>{username}</span>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Dropdown>*/}
          {/*) : (*/}
          {/*  <div className={styles.head_opration}>*/}
          {/*    <Button type="default" htmlType="submit" onClick={() => router.replace('/login')}>*/}
          {/*      登录*/}
          {/*    </Button>*/}
          {/*    <Button*/}
          {/*      type="primary"*/}
          {/*      htmlType="submit"*/}
          {/*      onClick={() => router.replace('/register')}*/}
          {/*    >*/}
          {/*      注册*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
        <div className={classnames(styles.header_second)}>
        </div>
      </div>
    );
  }
}

export default connect(({ userInfo }) => ({ userInfo }))(Header);
