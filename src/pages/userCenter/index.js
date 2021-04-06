import React, { useState, useEffect, Component } from 'react';
import { Menu, Layout, Card, Descriptions, Avatar, Image, Table, Empty, message, Col, Cascader, Row } from 'antd';
import { connect } from 'dva';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';

import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import c1 from '@/assets/test/c1.jpg';
import c2 from '@/assets/test/c2.jpg';
import c3 from '@/assets/test/c3.jpg';
import c4 from '@/assets/test/c4.jpg';
import c5 from '@/assets/test/c5.jpg';
import c6 from '@/assets/test/c6.jpg';
import request from '@/utils/request';
import { getLocalData } from '@/utils/common';
import PictureModal from '@/pages/management/components/picture/pictureModal';
import VideoModal from '@/pages/management/components/video/videoModal';

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

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  // console.log(className)
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemChosenKey: '1',
      layouts_honor: {
        lg: [
          { x: 2, y: 0, w: 2, h: 2, i: "1", static: false },
          { x: 8, y: 0, w: 2, h: 5, i: "2", static: false },
        ],
      },
      user_info: {
        userName: getLocalData({ dataName: 'userName' }),
        userId: getLocalData({ dataName: 'userId' }),
        avatar: getLocalData({ dataName: 'avatar' }),
        email: getLocalData({ dataName: 'email' }),
        score: getLocalData({ dataName: 'score' }),
        mobile: getLocalData({ dataName: 'mobile' }),
        partyBranch: getLocalData({ dataName: 'partyBranch' }),
        rank: getLocalData({ dataName: 'rank' }),
      },
      columns: [
        {
          title: '标签',
          dataIndex: 'tagName',
          key: 'tagName',
          align: 'center',
          render: text => <a>{text}</a>,
        },
        {
          title: '是否作答',
          dataIndex: 'ifAns',
          key: 'ifAns',
          align: 'center',
        },
      ],
      dataSource: [

      ],

    };


  }

  componentDidMount() {
    request({
      url: '/v1.0/api/user',
      method: 'GET',
      autoAdd: false, //不添加v1.0
      data:{
        length: 1000
      },
    }).then((res) => {
      console.log(res);

      request({
        url: '/v1.0/api/user/'+getLocalData({dataName: 'userId'})+'/score',
        method: 'GET',
        autoAdd: false, //不添加v1.0
        data:{
          length: 1000
        },
      }).then((res2) => {
        console.log(res2);


        request({
          url: '/v1.0/api/tags',
          method: 'GET',
          autoAdd: false, //不添加v1.0
        }).then((tags_list) => {
          console.log(tags_list);

          var ds_tmp = [];
          for(let i = 0; i < tags_list.list.length; i++) {
            // console.log(tags_listlist.[i]);
            ds_tmp.push({tagName: tags_list.list[i].tagName, ifAns: '否'});
          }

          console.log(ds_tmp);

          this.setState({
            dataSource: ds_tmp,

            user_info: {
              userName: res.userName,
              avatar: res.avatar,
              email: res.email,
              score: res.score,
              mobile: res.mobile,
              partyBranch: res.partyBranch,
              rank: res2.rank,
            },

          });

          // request({
          //   url: '/v1.0/api/tags',
          //   method: 'GET',
          //   autoAdd: false, //不添加v1.0
          // }).then((if_) => {
          //   console.log(tags_list);
          //
          // });

        });

      });

    });




  }

  handleClick = (e) => {
    this.setState({menuItemChosenKey: e.key});
    console.log(e.key)
    if(e.key === '1') {
      request({
        url: '/v1.0/api/user',
        method: 'GET',
        autoAdd: false, //不添加v1.0
        data:{
          length: 1000
        },
      }).then((res) => {
        console.log(res);

        request({
          url: '/v1.0/api/user/'+getLocalData({dataName: 'userId'})+'/score',
          method: 'GET',
          autoAdd: false, //不添加v1.0
          data:{
            length: 1000
          },
        }).then((res2) => {
          console.log(res2);
          this.setState({
            user_info: {
              userName: res.userName,
              avatar: res.avatar,
              email: res.email,
              score: res.score,
              mobile: res.mobile,
              partyBranch: res.partyBranch,
              rank: res2.rank,
            }
          });
        });

      });



    }

  }

  render() {
    const carousel_settings = {
      dots: true,
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 1,
      speed: 500,

      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear",
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />,
    }

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
              <Content style={{ padding: '0 24px', minHeight: 280, marginTop: 10 }}>
                {
                  (this.state.menuItemChosenKey === '1') ?
                    <div>
                      <span style={{fontSize:20}}>个人信息</span>
                      <Descriptions  bordered style={{ margin: 30 }}>
                          <Descriptions.Item label="用户名">{this.state.user_info.userName}</Descriptions.Item>
                          <Descriptions.Item label="头像">
                            <Avatar src={this.state.user_info.avatar} />
                          </Descriptions.Item>
                          <Descriptions.Item label="排名">{this.state.user_info.rank}</Descriptions.Item>
                          <Descriptions.Item label="分数">{this.state.user_info.score}</Descriptions.Item>
                          <Descriptions.Item label="EMail">{this.state.user_info.email}</Descriptions.Item>
                          <Descriptions.Item label="手机">{this.state.user_info.mobile}</Descriptions.Item>
                          <Descriptions.Item label="组织">{this.state.user_info.partyBranch}</Descriptions.Item>
                      </Descriptions>

                      <br></br>
                      <span style={{fontSize:20}}>答题统计</span>
                      <br></br>

                      <GitHubCalendar username="grubersjoe" theme={exampleTheme} fullYear={false} showTotalCount={false}
                                      style={{ margin: 30}}>
                        <ReactTooltip delayShow={50} html />
                      </GitHubCalendar>



                      <br></br>
                      <span style={{fontSize:20}}>答题情况</span>
                      <br></br>
                      <Table style={{ margin: 30}} columns={this.state.columns} dataSource={this.state.dataSource}/>
                      {/*dataSource={dataSource}*/}

                    </div>

                    : (this.state.menuItemChosenKey === '2') ?
                      // <Image
                      //   width={200}
                      //   src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      // />
                      // <Empty />
                      <div style={{margin: 50, padding: '0 24px',}}>
                        {/*<Col span={8} style={{textAlign: 'left'}}>*/}
                        {/*  <Cascader*/}
                        {/*    placeholder="请选择标签"*/}
                        {/*    changeOnSelect={true}*/}
                        {/*    value={this.state.cascadeValue}*/}
                        {/*    onChange={this.onChangeCascade}*/}
                        {/*    options={this.state.cascadeOptions}*/}
                        {/*    style={{width: '360px'}}/>*/}
                        {/*</Col>*/}

                        <Slider {...carousel_settings} style={{margin: 80, padding: '0 24px',}}>
                          <div>
                            <img src={c1} style={{height: 300, }}/>
                          </div>
                          <div>
                            <img src={c2} style={{height: 300, }}/>
                          </div>
                          <div>
                            <img src={c3} style={{height: 300, }}/>
                          </div>
                          <div>
                            <img src={c4} style={{height: 300, }}/>
                          </div>
                          <div>
                            <img src={c5} style={{height: 300, }}/>
                          </div>
                          <div>
                            <img src={c6} style={{height: 300, }}/>
                          </div>

                        </Slider>
                      </div>
                    :
                      <div>
                        <ResponsiveGridLayout className="layout" layouts={this.state.layouts_honor}
                                              breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                              cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
                          <div key="1">
                            <Card
                              hoverable
                              style={{ width: 240 }}
                              cover={<img alt="五星徽章" src="https://i.ibb.co/09PpwNZ/stars.png" />}
                            >
                              <Meta title="五星徽章" />
                            </Card>
                          </div>
                          <div key="2">
                            <Card
                              hoverable
                              style={{ width: 240 }}
                              cover={<img alt="人民英雄纪念碑" src="https://i.ibb.co/3FWvKrr/image.png" />}
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
