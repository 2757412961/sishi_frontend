import React, {Component} from 'react';
import {Layout, Menu, Space, Cascader, Form, Row, Col, Tag, Empty, Button} from 'antd';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import styles from './index.less';
import {judgeUrl, getLocalData} from '@/utils/common.js';
import router from 'umi/router';
import {connect} from 'dva';
import classnames from 'classnames';
import {TagsOutlined, TableOutlined, FileAddOutlined} from '@ant-design/icons';

import TagTable from './components/tag/tagTable';
import TagModal from './components/tag/tagModal';
import TagResourceTable from './components/tagResource/tagResourceTable';
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
import Editor from './components/editor';
import EditorZjh from './components/editorZjh';


const FormItem = Form.Item;

class Management extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      cascadeOptions: [],
      cascadeValue: [],
    };
  }

  initState() {
    this.setState({
      cascadeOptions: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
            {
              value: 'suzhou',
              label: 'Suzhou',
            }
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
                {
                  value: 'test',
                  label: 'test',
                },
              ],
            },
          ],
        },
      ],
    });
  }

  onCollapseSide = collapsed => {
    this.setState({collapsed});
  };

  onChangeCascade = (val) => {
    this.setState({cascadeValue: val});
  };

  handleClick = e => {
    this.initState();
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
                 style={{overflow: 'auto', height: '100vh'}}
                 theme='light'>
            <Menu
              onClick={this.handleClick}
              // style={{ width: 256 }}
              defaultSelectedKeys={['2']}
              defaultOpenKeys={['sub2']}
              theme='light'
              mode="inline">
              <SubMenu key="sub1" icon={<TagsOutlined/>} title="标签管理">
                <Menu.Item key="1">
                  <span>标签表</span>
                  <Link to='/management/tag'/>
                </Menu.Item>
                <Menu.Item key="2">
                  <span>标签资源关联表</span>
                  <Link to='/management/EditorZjh'/>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TableOutlined/>} title="资源管理">
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
                  <span>题目资源表</span>
                  <Link to='/management/question'/>
                </Menu.Item>
                <Menu.Item key="8">
                  <span>地理信息资源表</span>
                  <Link to='/management/mapinfo'/>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<TagsOutlined/>} title="用户管理">
                <Menu.Item key="9">
                  <span>用户表</span>
                  <Link to='/management/user'/>
                </Menu.Item>
                <Menu.Item key="10">
                  <span>答题记录关联表</span>
                  <Link to='/management/user_answer'/>
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
                    onChange={this.onChangeCascade}
                    options={this.state.cascadeOptions}
                    style={{width: '300px'}}/>
                </Col>
                <Route path='/management/tag'>
                  <Col span={8} style={{textAlign: 'center'}}><h1>标签表</h1></Col>
                  <Col span={8} style={{textAlign: 'right'}}><TagModal cascadeOptions={this.state.cascadeOptions}/></Col>
                </Route>
                <Route path='/management/article'>
                  <Col span={8} style={{textAlign: 'center'}}><h1>文章资源表</h1></Col>
                  <Col span={8} style={{textAlign: 'right'}}><ArticleModal cascadeValue={this.state.cascadeValue}/></Col>
                </Route>
                {/*<Route path='/management/picture'>*/}
                {/*  <Col span={8} style={{textAlign: 'center'}}><h1>图片资源表</h1></Col>*/}
                {/*  <Col span={8} style={{textAlign: 'right'}}><PictureModal cascadeValue={this.state.cascadeValue}/></Col>*/}
                {/*</Route>*/}
                {/*<Route path='/management/audio'>*/}
                {/*  <Col span={8} style={{textAlign: 'center'}}><h1>音频资源表</h1></Col>*/}
                {/*  <Col span={8} style={{textAlign: 'right'}}><AudioModal cascadeValue={this.state.cascadeValue}/></Col>*/}
                {/*</Route>*/}
                {/*<Route path='/management/video'>*/}
                {/*  <Col span={8} style={{textAlign: 'center'}}><h1>视频资源表</h1></Col>*/}
                {/*  <Col span={8} style={{textAlign: 'right'}}><VideoModal cascadeValue={this.state.cascadeValue}/></Col>*/}
                {/*</Route>*/}
                <Route path='/management/mapinfo'>
                  <Col span={8} style={{textAlign: 'center'}}><h1>地理信息资源表</h1></Col>
                  <Col span={8} style={{textAlign: 'right'}}><MapinfoModal cascadeValue={this.state.cascadeValue}/></Col>
                </Route>
              </Row>
            </Header>

            <Content>
              <Route path='/management/tag' exact component={TagTable}/>
              <Route path='/management/EditorZjh' exact component={TagResourceTable}/>
              <Route path='/management/article' exact component={ArticleTable}/>
              <Route path='/management/picture' exact component={PictureTable}/>
              <Route path='/management/audio' exact component={AudioTable}/>
              <Route path='/management/video' exact component={VideoTable}/>
              <Route path='/management/question' exact component={EditorZjh}/>
              <Route path='/management/mapinfo' exact component={MapinfoTable}/>
              <Route path='/management/user' exact component={EditorZjh}/>
              <Route path='/management/user_answer' exact component={EditorZjh}/>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Form.create()(Management);
