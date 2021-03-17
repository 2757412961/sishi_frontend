import React, {Component} from 'react';
import {Layout, Menu, Card, Cascader, Form, Row, Col, Tag, message, Button} from 'antd';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import styles from './index.less';
import {judgeUrl, getLocalData} from '@/utils/common.js';
import router from 'umi/router';
import {connect} from 'dva';
import classnames from 'classnames';

import TagTable from './components/tag/tagTable';
import TagModal from './components/tag/tagModal';
import TagResourceTable from './components/tagResource/tagResourceTable';
import ArticleTable from './components/article/articleTable';
import ArticleModal from './components/article/articleModal';
// import PictureTable from './components/picture/pictureTable';
// import PictureModal from './components/picture/pictureModal';
import AudioTable from './components/audio/audioTable';
import AudioModal from './components/audio/audioModal';
import VideoTable from './components/video/videoTable';
import VideoModal from './components/video/videoModal';
import MapinfoTable from './components/mapinfo/mapinfoTable';
import MapinfoModal from './components/mapinfo/mapinfoModal';
import Editor from './components/editor';
import EditorZjh from './components/editorZjh';
import Index from './components/zTestCommunite'
import request from "@/utils/request";
import Children2 from "@/pages/management/components/zTestCommunite/Children2";


const FormItem = Form.Item;

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
    if (typeof (this.tagTable) !== "undefined" && this.tagTable.updateTable !== null) {
      this.tagTable.updateTable();
    }
  }

  onCollapseSide = collapsed => {
    this.setState({collapsed});
  };

  onChangeCascade = (val) => {
    this.setState({cascadeValue: val});
  };

  handleClick = e => {
    // this.updateTable();
    // console.log('click ', e);
  };

  render() {
    const {collapsed} = this.state;
    const {SubMenu} = Menu;
    const {Header, Footer, Sider, Content} = Layout;

    return (
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
                  <span>标签表</span>
                  <Link to='/management/tag'/>
                </Menu.Item>
                {/*<Menu.Item key="2">*/}
                {/*  <span>标签资源关联表</span>*/}
                {/*  <Link to='/management/tagResource'/>*/}
                {/*</Menu.Item>*/}
              </SubMenu>
              <SubMenu key="sub2" title="资源管理">
                <Menu.Item key="3">
                  <span>文章资源表</span>
                  <Link to='/management/article'/>
                </Menu.Item>
                <Menu.Item key="4">
                  <span>图片资源表</span>
                  <Link to='/management/picture'/>
                </Menu.Item>
                <Menu.Item key="5">
                  <span>音频资源表</span>
                  <Link to='/management/audio'/>
                </Menu.Item>
                <Menu.Item key="6">
                  <span>视频资源表</span>
                  <Link to='/management/video'/>
                </Menu.Item>
                <Menu.Item key="7">
                  <span>答题资源表</span>
                  <Link to='/management/question'/>
                </Menu.Item>
                <Menu.Item key="8">
                  <span>地理信息资源表</span>
                  <Link to='/management/mapinfo'/>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title="用户管理">
                <Menu.Item key="9">
                  <span>用户表</span>
                  <Link to='/management/user'/>
                </Menu.Item>
                <Menu.Item key="10">
                  <span>答题记录关联表</span>
                  <Link to='/management/userAnswer'/>
                </Menu.Item>
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
                    value={this.state.cascadeValue}
                    onChange={this.onChangeCascade}
                    options={this.state.cascadeOptions}
                    style={{width: '300px'}}/>
                </Col>
                <Route path='/management/tag'>
                  <Col span={8} style={{textAlign: 'center'}}><h1>标签表</h1></Col>
                  <Col span={8} style={{textAlign: 'right'}}><TagModal cascadeOptions={this.state.cascadeOptions}
                                                                       updateCascade={this.updateCascade}
                                                                       updateAllTable={this.updateAllTable}/></Col>
                </Route>
                {/*<Route path='/management/tagResource'>*/}
                {/*  <Col span={8} style={{textAlign: 'center'}}><h1>标签资源关联表</h1></Col>*/}
                {/*  <Col span={8} style={{textAlign: 'right'}}><TagResourceModal cascadeValue={this.state.cascadeValue}/></Col>*/}
                {/*</Route>*/}
                <Route path='/management/article'>
                  <Col span={8} style={{textAlign: 'center'}}><h1>文章资源表</h1></Col>
                  <Col span={8} style={{textAlign: 'right'}}><ArticleModal cascadeValue={this.state.cascadeValue}
                  /></Col>
                </Route>
                <Route path='/management/picture'>
                  <Col span={8} style={{textAlign: 'center'}}><h1>图片资源表</h1></Col>
                  {/*  <Col span={8} style={{textAlign: 'right'}}><PictureModal cascadeValue={this.state.cascadeValue}/></Col>*/}
                </Route>
                <Route path='/management/audio'>
                  <Col span={8} style={{textAlign: 'center'}}><h1>音频资源表</h1></Col>
                  {/*  <Col span={8} style={{textAlign: 'right'}}><AudioModal cascadeValue={this.state.cascadeValue}/></Col>*/}
                </Route>
                <Route path='/management/video'>
                  <Col span={8} style={{textAlign: 'center'}}><h1>视频资源表</h1></Col>
                  {/*  <Col span={8} style={{textAlign: 'right'}}><VideoModal cascadeValue={this.state.cascadeValue}/></Col>*/}
                </Route>
                <Route path='/management/question'>
                  <Col span={8} style={{textAlign: 'center'}}><h1>答题资源表</h1></Col>
                  {/*  <Col span={8} style={{textAlign: 'right'}}><QuestionModal cascadeValue={this.state.cascadeValue}/></Col>*/}
                </Route>
                <Route path='/management/mapinfo'>
                  <Col span={8} style={{textAlign: 'center'}}><h1>地理信息资源表</h1></Col>
                  <Col span={8} style={{textAlign: 'right'}}><MapinfoModal cascadeValue={this.state.cascadeValue}
                  /></Col>
                </Route>
              </Row>
            </Header>

            <Content>
              <Card>
                <Route path='/management/tag' exact>
                  <TagTable {...this.state} ref={ch => this.tagTable = ch} updateCascade={this.updateCascade}/></Route>
                {/*<Route path='/management/tagResource' exact>*/}
                {/*  <TagResourceTable {...this.state} ref={ch => this.tagResourceTable = ch}/></Route>*/}

                <Route path='/management/article' exact>
                  <ArticleTable {...this.state} ref={ch => this.articleTable = ch}/></Route>
                <Route path='/management/picture' exact>
                  <Index {...this.state} ref={ch => this.pictureTable = ch}/></Route>
                <Route path='/management/audio' exact>
                  <AudioTable {...this.state} ref={ch => this.audioTable = ch}/></Route>
                <Route path='/management/video' exact>
                  <VideoTable {...this.state} ref={ch => this.videoTable = ch}/></Route>
                <Route path='/management/question' exact>
                  <Index {...this.state} ref={ch => this.questionTable = ch}/></Route>
                <Route path='/management/mapinfo' exact>
                  <MapinfoTable {...this.state} ref={ch => this.mapinfoTable = ch}/></Route>

                <Route path='/management/user' exact>
                  <EditorZjh {...this.state} ref={ch => this.userTable = ch}/></Route>
                <Route path='/management/userAnswer' exact>
                  <EditorZjh {...this.state} ref={ch => this.userAnswerTable = ch}/></Route>
              </Card>
            </Content>

            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Form.create()(Management);
