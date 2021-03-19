/**
* 公共头部组件
 * create by zhaichunyan 2018-10-30
 * @1183624592@qq.com
 */
import React, { Component } from 'react';
import { Menu, Button, Dropdown, Icon, Avatar, Row, Col, Divider } from 'antd';
import styles from './index.less';
import Link from 'umi/link';
// import Logo from '@images/index/0212.png';
import { judgeUrl, getLocalData } from '@/utils/common.js';
import router from 'umi/router';
import { connect } from 'dva';
import classnames from 'classnames';
import header from '@/assets/header.jpg';
import zhedalogo from '@/assets/zhedalogo.png';
import xueyuanlogo from '@/assets/images/xueyuan-white.png';
import logobiaoti from '@/assets/images/logobiaoti.png';
import xuexi2 from '@/assets/images/xuexi2.png';
import xuexi3 from '@/assets/images/xuexi3.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      currentKey: '1',
      moduleVisible:true,
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
  iconOnClick=()=>{
    let temp = this.state.moduleVisible;
    this.setState({
      moduleVisible: !temp,
    })
  }
  render() {
    // const { username, avatar } = this.props.userInfo.userInfo;
    const indexUrl = this.props.indexUrl;
    let userName = getLocalData({ dataName: 'userName' });

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
        <div className={classnames(styles.header_first)}
             // style={{ backgroundImage: `url(${header})`}}
        >
          <div className={styles.head_logo}>
            <img src={xueyuanlogo} className={styles.xueyuan_logo} alt="" />
            <img src={logobiaoti} className={styles.logo_biaoti} alt="" />
            {/*<div>*/}
            {/*  <a href='/management'>*/}
            {/*    <span style={{}}>管理页面</span>*/}
            {/*  </a>*/}
            {/*</div>*/}
          </div>
          {
            window.location.pathname=='/'?
              <div>
                <div>
                  <img className={styles.xuexi2} src={xuexi2}>
                  </img>
                </div>
              </div>:
              <div>
                <div>
                  <img className={styles.xuexi3} src={xuexi3}>
                  </img>
                </div>
                <Icon type="caret-down" style={{color:"white"}}/>
              </div>
          }
          {window.location.pathname!='/'&&(
            this.state.moduleVisible?
              <Icon type="caret-up" style={{color:"white"}}
                    onClick={()=>this.iconOnClick()}
              />:
              <Icon type="caret-down" style={{color:"white"}}
                    onClick={()=>this.iconOnClick()}
              />
          )}
          {getLocalData({ dataName: 'userName' }) ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <div className={styles.head_user}>
                {/*<div className={styles.head_user_avatar}>*/}
                {/*  <Avatar size="small" icon="user" src={avatar} />*/}
                {/*</div>*/}
                <div className={styles.head_user_name}>
                  <span>{getLocalData({ dataName: 'userName' })}</span>
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
        {
          this.state.moduleVisible?
            <div>
              <div className={styles.header_divider}>
                <div className={styles.divider}>
                </div>
              </div>
              <div className={classnames(styles.header_second)}>
                <div className={styles.font_div}>
                  <Row justify="space-between" style={{marginBottom:"10px"}}>
                    <Col span={4} style={{marginRight:"20px", borderRight:"1px solid #e5c387"}}>
                      <div className={styles.font_style}>党史新学</div>
                    </Col>
                    <Col span={4} style={{marginRight:"20px", borderRight:"1px solid #e5c387"}}>
                      <div className={styles.font_style}>建设中国</div>
                    </Col>
                    <Col span={4} style={{marginRight:"20px", borderRight:"1px solid #e5c387"}}>
                      <div className={styles.font_style}>中特之路</div>
                    </Col>
                    <Col span={4} style={{marginRight:"20px", borderRight:"1px solid #e5c387"}}>
                      <div className={styles.font_style}>改革复兴</div>
                    </Col>
                    <Col span={4}>
                      <div className={styles.font_style}>文军长征</div>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col span={4} style={{marginRight:"20px", borderRight:"1px solid #e5c387"}}>
                      <div className={styles.font_style}>决胜小康</div>
                    </Col>
                    <Col span={4} style={{marginRight:"20px", borderRight:"1px solid #e5c387"}}>
                      <div className={styles.font_style}>百花齐放</div>
                    </Col>
                    <Col span={4} style={{marginRight:"20px", borderRight:"1px solid #e5c387"}}>
                      <div className={styles.font_style}>理论学习</div>
                    </Col>
                    <Col span={4} style={{marginRight:"20px", borderRight:"1px solid #e5c387"}}>
                      <div className={styles.font_style}>微视频学习</div>
                    </Col>
                    <Col span={4}>
                      <div className={styles.font_style}>我想对党说</div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>:null
        }

      </div>
    );
  }
}

export default connect(({ userInfo }) => ({ userInfo }))(Header);
