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
import header from '@/assets/images/header.png';
import zhedalogo from '@/assets/zhedalogo.png';
import logobiaoti from '@/assets/images/logobiaoti.png';
import xuexi2 from '@/assets/images/xuexi2.png';
import xuexi3 from '@/assets/images/xuexi3.png';
import xueyuanlogo from '@/assets/images/xueyuan-white.png';

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
  componentWillMount() {   //初始化时在页面加载完成前执行

    this.appendMeta()

  }

  componentWillReceiveProps(){  //刷新页面时执行

    this.appendMeta()

  }

  appendMeta = () =>{
    //在head标签插入meta标签，解决在生产环境链接失效问题
    const metaTag = document.getElementsByTagName('meta');
    let isHasTag = true;
    for(let i=0;i<metaTag.length;i++){   //避免重复插入meta标签
      const httpEquiv = metaTag[i].httpEquiv;
      if(httpEquiv == 'Content-Security-Policy'){
        isHasTag = false;
      }
    }
    if(isHasTag){
      const headItem = document.head;
      let oMeta = document.createElement('meta');
      oMeta.setAttribute('name','referrer');
      oMeta.content = 'never';
      headItem.appendChild(oMeta)
    }
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
  moduleChange=(module)=>{
    this.props.dispatch(
      {type:'mapPage/setModule', payload:module}
      );
  }
  render() {
    // const { username, avatar } = this.props.userInfo.userInfo;
    const indexUrl = this.props.indexUrl;
    let userName = getLocalData({ dataName: 'userName' });

    const menu = <Menu>
        <Menu.Item key="0">
          <Link to="/userCenter">个人中心</Link>
        </Menu.Item>
        <Menu.Item key="1" onClick={this.resetUserData.bind(this)}>
          <span>退出</span>
        </Menu.Item>
      </Menu>;
    const menu_more = (
      <Menu>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'wenjunchangzheng'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: 'wenjunchangzheng'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == 'wenjunchangzheng')) ?
                <div className={styles.font_module_selected}>文军长征</div> :
                <div className={styles.font_module}>文军长征</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'jueshengxiaokang'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: 'jueshengxiaokang'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == 'jueshengxiaokang')) ?
                <div className={styles.font_module_selected}>决胜小康</div> :
                <div className={styles.font_module}>决胜小康</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'baihuaqifang'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: 'baihuaqifang'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == 'baihuaqifang')) ?
                <div className={styles.font_module_selected}>百花齐放</div> :
                <div className={styles.font_module}>百花齐放</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'lilunxuexi'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: 'lilunxuexi'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == 'lilunxuexi')) ?
                <div className={styles.font_module_selected}>理论学习</div> :
                <div className={styles.font_module}>理论学习</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'weishipinxuexi'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: 'weishipinxuexi'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == 'weishipinxuexi')) ?
                <div className={styles.font_module_selected}>微视频学习</div> :
                <div className={styles.font_module}>微视频学习</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'woxiangduidangshuo'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: 'woxiangduidangshuo'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == 'woxiangduidangshuo')) ?
                <div className={styles.font_module_selected}>我想对党说</div> :
                <div className={styles.font_module}>我想对党说</div>
            }
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <div className={classnames(styles.header_first)}
        >
          <div className={styles.font_div}>
            <Row justify="space-between" style={{marginBottom:"10px"}}>
              <Col span={4} style={{borderRight:"1px solid #e5c387"}}>
                <Link to={{pathname: '/mapPage', query: {module: 'dangshixinxue'}}}
                      onClick={()=>
                        this.props.dispatch(
                          {type:'mapPage/setModule', payload:'dangshixinxue'}
                        )
                      }
                >
                  {
                    ((window.location.pathname=='/mapPage')&&((this.props.mapPage.module=='dangshixinxue')||this.props.mapPage.module==''))?
                      <div className={styles.font_style_selected}>党史新学</div>:
                      <div className={styles.font_style}>党史新学</div>
                  }
                </Link>
              </Col>
              <Col span={4} style={{borderRight:"1px solid #e5c387"}}>
                <Link to={{pathname: '/mapPage', query: {module: 'jianshezhongguo'}}}
                      onClick={()=>
                        this.props.dispatch(
                          {type:'mapPage/setModule', payload:'jianshezhongguo'}
                        )
                      }
                >
                  {
                    ((window.location.pathname=='/mapPage')&&(this.props.mapPage.module=='jianshezhongguo'))?
                      <div className={styles.font_style_selected}>建设中国</div>:
                      <div className={styles.font_style}>建设中国</div>
                  }
                </Link>
              </Col>
              <Col span={4} style={{borderRight:"1px solid #e5c387"}}>
                <Link to={{pathname: '/mapPage', query: {module: 'zhongtezhilu'}}}
                      onClick={()=>
                        this.props.dispatch(
                          {type:'mapPage/setModule', payload:'zhongtezhilu'}
                        )
                      }
                >
                  {
                    ((window.location.pathname=='/mapPage')&&(this.props.mapPage.module=='zhongtezhilu'))?
                      <div className={styles.font_style_selected}>中特之路</div>:
                      <div className={styles.font_style}>中特之路</div>
                  }
                </Link>
              </Col>
              <Col span={4} style={{}}>
                <Link to={{pathname: '/mapPage', query: {module: 'gaigefuxing'}}}
                      onClick={()=>
                        this.props.dispatch(
                          {type:'mapPage/setModule', payload:'gaigefuxing'}
                        )
                      }
                >
                  {
                    ((window.location.pathname=='/mapPage')&&(this.props.mapPage.module=='gaigefuxing'))?
                      <div className={styles.font_style_selected}>改革复兴</div>:
                      <div className={styles.font_style}>改革复兴</div>
                  }
                </Link>
              </Col>
              <Col span={6} style={{}}>
                <Dropdown overlay={menu_more}>
                  <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Icon style={{float:"left", color:"rgba(255,255,255,0.7)", fontSize:"20px"}} type='right' />
                    <div style={{float:"left", color:"rgba(255,255,255,0.7)", fontSize:"20px"}}>更多模块</div>
                  </div>
                </Dropdown>
              </Col>
            </Row>
            <div style={{float:"right", color:"rgba(255,255,255,0.7)", fontSize:"20px",position:'relative',right:'-9em',top:'-29px'}}
            onClick={() => router.replace('/userScoreList')}
            > 排行榜</div>
          </div>
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
            <div>
                <div className={styles.divider}>
                </div>
            </div>

      </div>
    );
  }
}

export default connect(({ userInfo, mapPage }) => ({ userInfo, mapPage }))(Header);
