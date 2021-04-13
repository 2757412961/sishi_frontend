import React, {Component} from 'react';
import {Layout, Menu, Card, Cascader, Form, Row, Col, Tag, message, Button, Alert} from 'antd';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import styles from './index.less';
import {judgeUrl, getLocalData} from '@/utils/common.js';
import router from 'umi/router';
import {connect} from 'dva';
import classnames from 'classnames';

import TagTable from './components/tag/tagTable';
import TagModal from './components/tag/tagModal';
import TagResourceTable from './components/tagResource/tagResourceTable';
import TagResourceModal from './components/tagResource/tagResourceModal';
import ArticleTable from './components/article/articleTable';
import ArticleModal from './components/article/articleModal';
import PictureTable from './components/picture/pictureTable';
import PictureModal from './components/picture/pictureModal';
import AudioTable from './components/audio/audioTable';
import AudioModal from './components/audio/audioModal';
import VideoTable from './components/video/videoTable';
import VideoModal from './components/video/videoModal';
import MapinfoTable from './components/mapinfo/mapinfoTable';
import MapinfoModal from './components/mapinfo/mapinfoModal';
import QuestionTable from './components/question/questionTable';
import QuestionModal from './components/question/questionModal';
import UserTable from './components/user/userTable'
import EditorZjh from './components/editorZjh';
import Index from './components/zTestCommunite'
import Children1 from "@/pages/management/components/zTestCommunite/Children1";
import Children2 from "@/pages/management/components/zTestCommunite/Children2";

import request from "@/utils/request";

// auth
import RenderAuthorized from '@/components/Authorized';
import {getAuthority} from '@/utils/authority';

const Authorized = RenderAuthorized(getAuthority());
console.log(getAuthority())

class Management extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      cascadeOptions: [],
      cascadeValue: [],
    };

    this.updateCascade();
  }

  setCascadeValue = (val) => {
    this.setState({cascadeValue: val})
  }

  updateCascade = () => {
    request({
      url: '/v1.0/api/tag/tree',
      method: 'GET',
      autoAdd: false, //不添加v1.0
    }).then((res) => {
      console.log(res);
      this.setState({cascadeOptions: res.list})
      this.setState({cascadeValue: []})
    })
  }

  // 典型用法（不要忘记比较 props）：
  componentDidUpdate(prevProps) {
    if (this.state.cascadeValue !== prevProps.cascadeValue) {
      // 监听 cascadeValue 值改变后更新数据表
      this.updateAllTable();
    }
  }

  updateAllTable = () => {
    if (typeof (this.tagTable) !== "undefined" && this.tagTable !== null) {
      this.tagTable.updateTable();
    }
    if (typeof (this.tagResourceTable) !== "undefined" && this.tagResourceTable !== null) {
      this.tagResourceTable.updateTable();
    }

    if (typeof (this.articleTable) !== "undefined" && this.articleTable !== null) {
      this.articleTable.updateTable();
    }
    if (typeof (this.pictureTable) !== "undefined" && this.pictureTable !== null) {
      this.pictureTable.updateTable();
    }
    if (typeof (this.audioTable) !== "undefined" && this.audioTable !== null) {
      this.audioTable.updateTable();
    }
    if (typeof (this.videoTable) !== "undefined" && this.videoTable !== null) {
      this.videoTable.updateTable();
    }
    if (typeof (this.mapinfoTable) !== "undefined" && this.mapinfoTable !== null) {
      this.mapinfoTable.updateTable();
    }
    if (typeof (this.questionTable) !== "undefined" && this.questionTable !== null) {
      this.questionTable.updateTable();
    }

    if (typeof (this.userTable) !== "undefined" && this.userTable !== null) {
      this.userTable.updateTable();
    }
  }

  onCollapseSide = collapsed => {
    this.setState({collapsed});
  };

  onChangeCascade = (val) => {
    this.setState({cascadeValue: val});
  };

  handleClick = e => {
    // console.log('click ', e);
  };

  render() {
    const {collapsed} = this.state;
    const {SubMenu} = Menu;
    const {Header, Footer, Sider, Content} = Layout;

    return (
      <Authorized authority={['admin']} noMatch={<Alert message="您不是管理员，没有权限访问！" type="error" showIcon/>}>

        <BrowserRouter>
          <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapseSide}
                   style={{overflow: 'auto', height: '120vh'}}
                   theme='light'>
              <Menu
                onClick={this.handleClick}
                // style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub2']}
                theme='light'
                mode="inline">
                <SubMenu key="sub1" title="标签管理">
                  <Menu.Item key="1">
                    <span>标签</span>
                    <Link to='/management/tag'/>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <span>标签资源关联</span>
                    <Link to='/management/tagResource'/>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title="资源管理">
                  <Menu.Item key="3">
                    <span>文章资源</span>
                    <Link to='/management/article'/>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <span>图片资源</span>
                    <Link to='/management/picture'/>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <span>音频资源</span>
                    <Link to='/management/audio'/>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <span>视频资源</span>
                    <Link to='/management/video'/>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <span>答题资源</span>
                    <Link to='/management/question'/>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <span>地理信息资源</span>
                    <Link to='/management/mapinfo'/>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title="系统管理">
                  <Menu.Item key="9">
                    <span>用户</span>
                    <Link to='/management/user'/>
                  </Menu.Item>
                  {/*<Menu.Item key="10">*/}
                  {/*  <span>答题记录关联</span>*/}
                  {/*  <Link to='/management/userAnswer'/>*/}
                  {/*</Menu.Item>*/}
                </SubMenu>
              </Menu>
            </Sider>

            <Layout>
              <Header style={{background: '#FFFFFF'}}>
                <Row>
                  <Col span={8} style={{textAlign: 'left'}}>
                    <Cascader
                      placeholder="请选择标签"
                      changeOnSelect={true}
                      expandTrigger="hover"
                      value={this.state.cascadeValue}
                      onChange={this.onChangeCascade}
                      options={this.state.cascadeOptions}
                      style={{width: '360px'}}/>
                  </Col>
                  <Route path='/management/tag'>
                    <Col span={8} style={{textAlign: 'center'}}><h1>标签</h1></Col>
                    <Col span={8} style={{textAlign: 'right'}}><TagModal cascadeOptions={this.state.cascadeOptions}
                                                                         updateCascade={this.updateCascade}
                                                                         updateAllTable={this.updateAllTable}/></Col>
                  </Route>
                  <Route path='/management/tagResource'>
                    <Col span={8} style={{textAlign: 'center'}}><h1>标签资源关联</h1></Col>
                    <Col span={8} style={{textAlign: 'right'}}><TagResourceModal setCascadeValue={this.setCascadeValue}
                                                                                 updateAllTable={this.updateAllTable}/></Col>
                  </Route>
                  <Route path='/management/article'>
                    <Col span={8} style={{textAlign: 'center'}}><h1>文章资源</h1></Col>
                    <Col span={8} style={{textAlign: 'right'}}><ArticleModal cascadeValue={this.state.cascadeValue}
                                                                             updateAllTable={this.updateAllTable}/></Col>
                  </Route>
                  <Route path='/management/picture'>
                    <Col span={8} style={{textAlign: 'center'}}><h1>图片资源</h1></Col>
                    <Col span={8} style={{textAlign: 'right'}}><PictureModal cascadeValue={this.state.cascadeValue}
                                                                             updateAllTable={this.updateAllTable}/></Col>
                  </Route>
                  <Route path='/management/audio'>
                    <Col span={8} style={{textAlign: 'center'}}><h1>音频资源</h1></Col>
                    <Col span={8} style={{textAlign: 'right'}}><AudioModal cascadeValue={this.state.cascadeValue}
                                                                           updateAllTable={this.updateAllTable}/></Col>
                  </Route>
                  <Route path='/management/video'>
                    <Col span={8} style={{textAlign: 'center'}}><h1>视频资源</h1></Col>
                    <Col span={8} style={{textAlign: 'right'}}><VideoModal cascadeValue={this.state.cascadeValue}
                                                                           updateAllTable={this.updateAllTable}/></Col>
                  </Route>
                  <Route path='/management/question'>
                    <Col span={8} style={{textAlign: 'center'}}><h1>答题资源</h1></Col>
                    <Col span={8} style={{textAlign: 'right'}}><QuestionModal cascadeValue={this.state.cascadeValue}
                                                                              updateAllTable={this.updateAllTable}/></Col>
                  </Route>
                  <Route path='/management/mapinfo'>
                    <Col span={8} style={{textAlign: 'center'}}><h1>地理信息资源</h1></Col>
                    <Col span={8} style={{textAlign: 'right'}}><MapinfoModal cascadeValue={this.state.cascadeValue}
                                                                             updateAllTable={this.updateAllTable}/></Col>
                  </Route>

                  <Route path='/management/user'>
                    <Col span={8} style={{textAlign: 'center'}}><h1>用户</h1></Col>
                  </Route>
                  {/*<Route path='/management/userAnswer'>*/}
                  {/*  <Col span={8} style={{textAlign: 'center'}}><h1>答题记录</h1></Col>*/}
                  {/*</Route>*/}
                </Row>
              </Header>

              <Content>
                <Card>
                  <Route path='/management/tag' exact>
                    <TagTable {...this.state} ref={ch => this.tagTable = ch} updateCascade={this.updateCascade}/>
                  </Route>
                  <Route path='/management/tagResource' exact>
                    <TagResourceTable {...this.state} ref={ch => this.tagResourceTable = ch}
                                      updateCascade={this.updateCascade}/>
                  </Route>

                  <Route path='/management/article' exact>
                    <ArticleTable {...this.state} ref={ch => this.articleTable = ch}
                                  updateCascade={this.updateCascade}/>
                  </Route>
                  <Route path='/management/picture' exact>
                    <PictureTable {...this.state} ref={ch => this.pictureTable = ch}
                                  updateCascade={this.updateCascade}/>
                  </Route>
                  <Route path='/management/audio' exact>
                    <AudioTable {...this.state} ref={ch => this.audioTable = ch} updateCascade={this.updateCascade}/>
                  </Route>
                  <Route path='/management/video' exact>
                    <VideoTable {...this.state} ref={ch => this.videoTable = ch} updateCascade={this.updateCascade}/>
                  </Route>
                  <Route path='/management/question' exact>
                    <QuestionTable {...this.state} ref={ch => this.questionTable = ch}
                                   updateCascade={this.updateCascade}/>
                  </Route>
                  <Route path='/management/mapinfo' exact>
                    <MapinfoTable {...this.state} ref={ch => this.mapinfoTable = ch}
                                  updateCascade={this.updateCascade}/>
                  </Route>

                  <Route path='/management/user' exact>
                    <UserTable/>
                  </Route>
                  {/*<Route path='/management/userAnswer' exact>*/}
                  {/*  <EditorZjh {...this.state} ref={ch => this.userAnswerTable = ch} updateCascade={this.updateCascade}/>*/}
                  {/*</Route>*/}
                </Card>
              </Content>
              <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </BrowserRouter>
      </Authorized>
    );
  }
}

export default Form.create()(Management);
