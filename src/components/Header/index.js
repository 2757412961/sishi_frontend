/**
* 公共头部组件
 * create by zhaichunyan 2018-10-30
 * @1183624592@qq.com
 */
import React, { Component } from 'react';
import { Menu, Button, Dropdown, Icon, Avatar, Row, Col } from 'antd';
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

          <div>
            <a href='/management'>
              <span style={{color:"white", marginRight:"10px"}}>管理页面</span>
            </a>
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
        {/*<div className={classnames(styles.header_second)}>*/}
        {/*  <div style={{margin:"0 auto"}}>*/}
        {/*    <Row justify="space-around">*/}
        {/*      <Col className="gutter-row" span={4} style={{width:"100px", cursor:'default'}}>*/}
        {/*        <span>党史新学</span>*/}
        {/*      </Col>*/}
        {/*      <Col className="gutter-row" span={4} style={{width:"100px", cursor:'default'}}>*/}
        {/*        <span>建设中国</span>*/}
        {/*      </Col>*/}
        {/*      <Col className="gutter-row" span={4} style={{width:"100px", cursor:'default'}}>*/}
        {/*        <span>中特之路</span>*/}
        {/*      </Col>*/}
        {/*      <Col className="gutter-row" span={4} style={{width:"100px", cursor:'default'}}>*/}
        {/*        <span>改革复兴</span>*/}
        {/*      </Col>*/}
        {/*      <Col className="gutter-row" span={4} style={{width:"100px", cursor:'default'}}>*/}
        {/*        <span>文军长征</span>*/}
        {/*      </Col>*/}
        {/*    </Row>*/}
        {/*    <Row justify="space-around">*/}
        {/*      <Col className="gutter-row" span={4} style={{width:"100px", cursor:'default'}}>*/}
        {/*        <span>决胜小康</span>*/}
        {/*      </Col>*/}
        {/*      <Col className="gutter-row" span={4} style={{width:"100px", cursor:'default'}}>*/}
        {/*        <span>百花齐放</span>*/}
        {/*      </Col>*/}
        {/*      <Col className="gutter-row" span={4} style={{width:"100px", cursor:'default'}}>*/}
        {/*        <span>理论学习</span>*/}
        {/*      </Col>*/}
        {/*      <Col className="gutter-row" span={4} style={{width:"100px", cursor:'default'}}>*/}
        {/*        <span>微视频学习</span>*/}
        {/*      </Col>*/}
        {/*      <Col className="gutter-row" span={4} style={{width:"100px", cursor:'default'}}>*/}
        {/*        <span>我想对党说</span>*/}
        {/*      </Col>*/}
        {/*    </Row>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default connect(({ userInfo }) => ({ userInfo }))(Header);
