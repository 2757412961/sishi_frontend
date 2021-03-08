import React, { Component } from 'react';
import { Layout, Menu, Space, Cascader, Form, Row, Col, Tag, Empty, Button } from 'antd';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import styles from './index.less';
// import Link from 'umi/link';
import { judgeUrl, getLocalData } from '@/utils/common.js';
import router from 'umi/router';
import { connect } from 'dva';
import classnames from 'classnames';
import { TagsOutlined, TableOutlined, SettingOutlined } from '@ant-design/icons';

// import table from './components/table';
import Editor from './components/editor';
// import EditorZjh from './components/editorZjh/index';

const FormItem = Form.Item;

class Management extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      cascadeOptions: [],
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

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleClick = e => {
    this.initState();
    console.log('click ', e);
  };

  render() {
    const { collapsed } = this.state;
    const { SubMenu } = Menu;
    const { Header, Footer, Sider, Content } = Layout;

    return (
      <BrowserRouter>
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}
                 style={{ overflow: 'auto', height: '100vh' }}
                 theme='light'>
            <Menu
              onClick={this.handleClick}
              // style={{ width: 256 }}
              defaultSelectedKeys={[ '3' ]}
              defaultOpenKeys={[ 'sub2' ]}
              theme='light'
              mode="inline">
              <SubMenu key="sub1" icon={<TagsOutlined/>} title="标签管理">
                <Menu.Item key="1">
                  <span>标签表</span>
                  <Link to='/management/EditorZjh'/>
                </Menu.Item>

                <Menu.Item key="2">
                  <span>标签资源关联表</span>
                  <Link to='/management/EditorZjh'/>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TableOutlined/>} title="资源管理">
                <Menu.Item key="3">
                  <span>文章资源表</span>
                  <Link to='/management/EditorZjh'/>
                </Menu.Item>

                <Menu.Item key="4">
                  <span>图片资源表</span>
                  <Link to='/management/EditorZjh'/>
                </Menu.Item>

                <Menu.Item key="5">
                  <span>视频资源表</span>
                  <Link to='/management/EditorZjh'/>
                </Menu.Item>

                <Menu.Item key="6">
                  <span>题录资源表</span>
                  <Link to='/management/EditorZjh'/>
                </Menu.Item>

                <Menu.Item key="7">
                  <span>地理信息资源表</span>
                  <Link to='/management/table'/>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Layout>
            <Header style={{ background: '#FFFFFF' }}>
              <Row>
                <Col span={8} style={{ textAlign: 'left' }}>
                  <Cascader
                    placeholder="请选择标签"
                    options={this.state.cascadeOptions}/>
                </Col>
                <Route path='/management/table'>
                  <Col span={8} style={{ textAlign: 'center' }}>
                    <h1>地理信息资源表</h1>
                  </Col>
                  <Col span={8} style={{ textAlign: 'right' }}>
                    <Button type="primary">+新增地理信息资源</Button>
                  </Col>
                </Route>
              </Row>
            </Header>

            <Content>
              {/*<Route path=''  component={Empty}/>*/}
              {/*<Route path='/management/table' exact component={table}/>*/}
              {/*<Route path='/management/EditorZjh' exact component={EditorZjh}/>*/}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Form.create()(Management);
