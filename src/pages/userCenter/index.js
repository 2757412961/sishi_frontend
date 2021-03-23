import React, { useState, useEffect, Component } from 'react';
import { Menu, Layout, Card } from 'antd';
import { connect } from 'dva';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

class UserCenter extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <Layout>

        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <Menu.Item key="1" icon={<UserOutlined />}>
                  主控制面板
                </Menu.Item>
                {/*<Menu.Item key="2" icon={<VideoCameraOutlined />}>*/}
                {/*  */}
                {/*</Menu.Item>*/}
                <Menu.Item key="3" icon={<UploadOutlined />}>
                  个人素材
                </Menu.Item>
                <Menu.Item key="4" icon={<UserOutlined />}>
                  荣誉栏
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://cdn1.bbcode0.com/uploads/2021/3/23/aa271f850d3093437d5e9408241fb309-full.png" />}
              >
                <Meta title="五星徽章" />
              </Card>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default connect(({ UserCenter }) => ({
  UserCenter
}))(UserCenter);
