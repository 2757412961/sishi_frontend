import React, { useState, useEffect, Component } from 'react';
import { Menu, Layout, Card, Descriptions, Avatar, Image, Table, Empty  } from 'antd';
import { connect } from 'dva';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';

import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;


const exampleTheme = {
  background: 'transparent',
  text: '#000',
  grade4: 'hsl(338, 78%, 30%)',
  grade3: 'hsl(338, 78%, 44%)',
  grade2: 'hsl(338, 78%, 58%)',
  grade1: 'hsl(338, 78%, 72%)',
  grade0: '#eee',
};

const column_rank = [
  {
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: '头像',
    // dataIndex: 'avatar',
    key: 'avatar',
    render: () => (<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />),
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '组织',
    dataIndex: 'organization',
    key: 'organization',
  },


];

const data_rank = [
  {
    key: '1',
    rank: 1,
    userName: '用户1',
    score: 500,
    organization: '第一党支部',
  },
  {
    key: '2',
    rank: 2,
    userName: '用户2',
    score: 480,
    organization: '第四党支部',
  },
  {
    key: '1',
    rank: 3,
    userName: '用户3',
    score: 350,
    organization: '第六党支部',
  },


];


class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemChosenKey: '1',
      layouts_honor: {
        lg: [
          {x:2, y:0, w:2, h:2, i:"1", static: false},
          {x:8, y:0, w:2, h:5, i:"2", static: false},
        ],
      },


    };
  }

  handleClick = (e) => {
    this.setState({menuItemChosenKey: e.key});
    console.log(e.key)
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="vertical"
                  onClick={this.handleClick}
                  defaultSelectedKeys={['1']}
                  // defaultOpenKeys={['sub1']}
                  style={{ height: '95%' }}
                >
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    主页面
                  </Menu.Item>
                  <Menu.Item key="2" icon={<UploadOutlined />}>
                    个人素材
                  </Menu.Item>
                  <Menu.Item key="3" icon={<UserOutlined />}>
                    荣誉栏
                  </Menu.Item>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280, marginTop: 44 }}>
                {
                  (this.state.menuItemChosenKey === '1') ?
                    <div>
                      <Descriptions title="个人信息" bordered>
                          <Descriptions.Item label="用户名">周强</Descriptions.Item>
                          <Descriptions.Item label="头像">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          </Descriptions.Item>
                          <Descriptions.Item label="排名">12</Descriptions.Item>
                          <Descriptions.Item label="分数">180</Descriptions.Item>
                          <Descriptions.Item label="EMail">pathtoemail@gmail.com</Descriptions.Item>
                          <Descriptions.Item label="手机">1888888888</Descriptions.Item>
                          <Descriptions.Item label="组织">第二党支部</Descriptions.Item>
                      </Descriptions>
                      <br></br>
                      <span style={{fontSize:20}}>答题统计</span>
                      <br></br>
                      <GitHubCalendar username="grubersjoe" theme={exampleTheme} fullYear={false} showTotalCount={false}>
                        <ReactTooltip delayShow={50} html />
                      </GitHubCalendar>

                      <br></br>
                      <span style={{fontSize:20}}>排行榜</span>
                      <br></br>
                      <Table columns={column_rank} dataSource={data_rank} />


                    </div>

                    : (this.state.menuItemChosenKey === '2') ?
                      // <Image
                      //   width={200}
                      //   src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      // />
                      <Empty />
                    :
                      <div>
                        <ResponsiveGridLayout className="layout" layouts={this.state.layouts_honor}
                                              breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                              cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
                          <div key="1">
                            <Card
                              hoverable
                              style={{ width: 240 }}
                              cover={<img alt="五星徽章" src="https://cdn1.bbcode0.com/uploads/2021/3/23/aa271f850d3093437d5e9408241fb309-full.png" />}
                            >
                              <Meta title="五星徽章" />
                            </Card>
                          </div>
                          <div key="2">
                            <Card
                              hoverable
                              style={{ width: 240 }}
                              cover={<img alt="人民英雄纪念碑" src="https://cdn1.bbcode0.com/uploads/2021/3/30/f5c0217a7bf9fa381e074b04e63029ed-full.png" />}
                            >
                              <Meta title="人民英雄纪念碑" />
                            </Card>
                          </div>
                          {/*<div key="3">3</div>*/}
                        </ResponsiveGridLayout>
                      </div>
                }

              </Content>
            </Layout>
          </Content>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default connect(({  }) => ({

}))(UserCenter);
