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
import paihangbang from '@/assets/images/paihangbang2.png';


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
        <Menu.Item key="1">
          <Link to="/management">后台管理员</Link>
        </Menu.Item>
        <Menu.Item key="2" onClick={this.resetUserData.bind(this)}>
          <span>退出</span>
        </Menu.Item>
      </Menu>;
    const menu1 = (
      <Menu>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'中共党史'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '中共党史'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '中共党史')) ?
                <div className={styles.font_module_selected}>中共党史</div> :
                <div className={styles.font_module}>中共党史</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'新中国史'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '新中国史'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '新中国史')) ?
                <div className={styles.font_module_selected}>新中国史</div> :
                <div className={styles.font_module}>新中国史</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'改革开放史'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '改革开放史'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '改革开放史')) ?
                <div className={styles.font_module_selected}>改革开放史</div> :
                <div className={styles.font_module}>改革开放史</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'社会主义发展史'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '社会主义发展史'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '社会主义发展史')) ?
                <div className={styles.font_module_selected}>社会主义发展史</div> :
                <div className={styles.font_module}>社会主义发展史</div>
            }
          </Link>
        </Menu.Item>
      </Menu>
    );
    const menu2 = (
      <Menu>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'伟大精神'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '伟大精神'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '伟大精神')) ?
                <div className={styles.font_module_selected}>伟大精神</div> :
                <div className={styles.font_module}>伟大精神</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'脱贫攻坚'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '脱贫攻坚'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '脱贫攻坚')) ?
                <div className={styles.font_module_selected}>脱贫攻坚</div> :
                <div className={styles.font_module}>脱贫攻坚</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'一带一路'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '一带一路'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '一带一路')) ?
                <div className={styles.font_module_selected}>一带一路</div> :
                <div className={styles.font_module}>一带一路</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'西迁精神'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '西迁精神'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '西迁精神')) ?
                <div className={styles.font_module_selected}>西迁精神</div> :
                <div className={styles.font_module}>西迁精神</div>
            }
          </Link>
        </Menu.Item>
      </Menu>
    );

    const menu3 = (
      <Menu>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'青春力量'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '青春力量'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '青春力量')) ?
                <div className={styles.font_module_selected}>青春力量</div> :
                <div className={styles.font_module}>青春力量</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'党言党语'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '党言党语'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '党言党语')) ?
                <div className={styles.font_module_selected}>党言党语</div> :
                <div className={styles.font_module}>党言党语</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
        {this.props.dispatch(
            {type:'mapPage/setModule', payload:'互动答题'}
          );
        router.replace('/question')
        }
        }>
          <Link to={{pathname: '/mapPage', query: {module: '互动答题'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '互动答题')) ?
                <div className={styles.font_module_selected}>互动答题</div> :
                <div className={styles.font_module}>互动答题</div>
            }
          </Link>
        </Menu.Item>
        <Menu.Item onClick={()=>
          this.props.dispatch(
            {type:'mapPage/setModule', payload:'学习资料'}
          )
        }>
          <Link to={{pathname: '/mapPage', query: {module: '学习资料'}}}>
            {
              ((window.location.pathname == '/mapPage') && (this.props.mapPage.module == '学习资料')) ?
                <div className={styles.font_module_selected}>学习资料</div> :
                <div className={styles.font_module}>学习资料</div>
            }
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <div className={classnames(styles.header_first)}
        >
          <Link to={{pathname: '/'}}>
            <div className={styles.shouye_div}/>
          </Link>
          <div className={styles.font_div}>
            <Row justify="space-between" style={{marginBottom:"10px"}}>
              {/*<Col span={5}>*/}
              {/*  <Link to={{pathname: '/mapPage', query: {module: 'dangshixinxue'}}}*/}
              {/*        onClick={()=>*/}
              {/*          this.props.dispatch(*/}
              {/*            {type:'mapPage/setModule', payload:'dangshixinxue'}*/}
              {/*          )*/}
              {/*        }*/}
              {/*  >*/}
              {/*    {*/}
              {/*      ((window.location.pathname=='/mapPage')&&((this.props.mapPage.module=='dangshixinxue')||this.props.mapPage.module==''))?*/}
              {/*        <div className={styles.font_style_selected}>党史新学</div>:*/}
              {/*        <div className={styles.font_style}>党史新学</div>*/}
              {/*    }*/}
              {/*  </Link>*/}
              {/*</Col>*/}
              {/*<Col span={5}>*/}
              {/*  <Link to={{pathname: '/mapPage', query: {module: 'jianshezhongguo'}}}*/}
              {/*        onClick={()=>*/}
              {/*          this.props.dispatch(*/}
              {/*            {type:'mapPage/setModule', payload:'jianshezhongguo'}*/}
              {/*          )*/}
              {/*        }*/}
              {/*  >*/}
              {/*    {*/}
              {/*      ((window.location.pathname=='/mapPage')&&(this.props.mapPage.module=='jianshezhongguo'))?*/}
              {/*        <div className={styles.font_style_selected}>建设中国</div>:*/}
              {/*        <div className={styles.font_style}>建设中国</div>*/}
              {/*    }*/}
              {/*  </Link>*/}
              {/*</Col>*/}
              {/*<Col span={5}>*/}
              {/*  <Link to={{pathname: '/mapPage', query: {module: 'zhongtezhilu'}}}*/}
              {/*        onClick={()=>*/}
              {/*          this.props.dispatch(*/}
              {/*            {type:'mapPage/setModule', payload:'zhongtezhilu'}*/}
              {/*          )*/}
              {/*        }*/}
              {/*  >*/}
              {/*    {*/}
              {/*      ((window.location.pathname=='/mapPage')&&(this.props.mapPage.module=='zhongtezhilu'))?*/}
              {/*        <div className={styles.font_style_selected}>中特之路</div>:*/}
              {/*        <div className={styles.font_style}>中特之路</div>*/}
              {/*    }*/}
              {/*  </Link>*/}
              {/*</Col>*/}
              {/*<Col span={5} style={{}}>*/}
              {/*  <Link to={{pathname: '/mapPage', query: {module: 'gaigefuxing'}}}*/}
              {/*        onClick={()=>*/}
              {/*          this.props.dispatch(*/}
              {/*            {type:'mapPage/setModule', payload:'gaigefuxing'}*/}
              {/*          )*/}
              {/*        }*/}
              {/*  >*/}
              {/*    {*/}
              {/*      ((window.location.pathname=='/mapPage')&&(this.props.mapPage.module=='gaigefuxing'))?*/}
              {/*        <div className={styles.font_style_selected}>改革复兴</div>:*/}
              {/*        <div className={styles.font_style}>改革复兴</div>*/}
              {/*    }*/}
              {/*  </Link>*/}
              {/*</Col>*/}
              <Col span={8} style={{borderRight: '2px solid #fff'}}>
                <Dropdown overlay={menu1} placement="bottomCenter">
                  <div className={styles.font_style} onClick={e => e.preventDefault()}>
                    <div style={{float:"left", color:"rgba(255,255,255,0.9)", fontSize:"20px"}}>党史学习</div>
                  </div>
                </Dropdown>
              </Col>
              <Col span={8} style={{borderRight: '2px solid #fff'}}>
                <Dropdown overlay={menu2} placement="bottomCenter">
                  <div className={styles.font_style} onClick={e => e.preventDefault()}>
                    <div style={{float:"left", color:"rgba(255,255,255,0.9)", fontSize:"20px"}}>专题学习</div>
                  </div>
                </Dropdown>
              </Col>
              <Col span={8} style={{}}>
                <Dropdown overlay={menu3} placement="bottomCenter">
                  <div className={styles.font_style} onClick={e => e.preventDefault()}>
                    <div style={{float:"left", color:"rgba(255,255,255,0.9)", fontSize:"20px"}}>互动学习</div>
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </div>
          <img className={styles.paihangbang} src={paihangbang} onClick={() => router.replace('/userScoreList')}></img>
          <div className={styles.head_nav}>
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
