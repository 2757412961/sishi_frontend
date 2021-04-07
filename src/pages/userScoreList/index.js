import React, { useState, useEffect, Component } from 'react';
import { Menu, Layout, Card, Table, Avatar, PageHeader, Row, Col } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import styles from './index.less';
import correct from '@/assets/correct.PNG';
import Redirect from 'umi/redirect';
import RenderAuthorized from '@/components/Authorized';
import {getAuthority} from '@/utils/authority';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
const Authorized = RenderAuthorized(getAuthority());
const noMatch=<Redirect to={`/login?redirect=${window.location.href}`} />;
const columns = [
  {
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    render:avatar=><Avatar src={avatar}/>
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },

  {
    title:'所属党支部',
    dataIndex:'partyBranch',
    key: 'partyBranch',
  }
];
class UserScoreList extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };
  state={
    users:[],
  }
  componentDidMount() {
    this.props.dispatch({type:'userScoreList/getUserScoreList'}).then((res)=>{
      console.log('res',res);
      if(res&&res.success) {
         let users=res.list;
        this.setState({ users: res.list });
      }
    })
  }
  render() {
    const {users}=this.props.userScoreList;
    console.log('users',users);
    return (
      <Authorized authority={['general','NORMAL','admin']} noMatch={noMatch}>
      <Layout>
        <Content style={{ padding: '0 24px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff',padding: '24px'}}>
              <PageHeader
                className="site-page-header"
                onBack={() => router.replace('/')}
                title="首页"
              />
              {/*<div className={styles.bottom} ><h3 >热榜规则说明</h3>*/}
              {/*  <p>*/}
              {/*    1.平台依据答题挑战等多维度数据，按照权重计算出最后分数*/}
              {/*    <br/>*/}
              {/*    2.你的活跃行为挑战答题数会增加你的本周综合指标*/}
              {/*  </p> <p >*/}
              {/*    1.榜单内容实时更新<br/>*/}
              {/*    2.坚决抵制刷榜行为，欢迎大家共同监督举报*/}
              {/*  </p>*/}
              {/*</div>*/}
            </Sider>
            <Content style={{ padding: '0 18px', minHeight: 280 }}>
              {/*<h1 style={{fontSize:'24px',textAlign:'center',color:'black',marginBottom:'14px'}}>排行榜</h1>*/}
              <div className={styles.background} style={{width:'80em',height:'60em',margin:'center',position:'relative'}}>
                <div  style={{backgroundColor:'rgb(255,255,255,0.8)',width:'40em',height:'50em',margin:'center',position:'relative',top:'5em',left:'35em'}}>
              <Table dataSource={this.state.users} columns={columns} pagination={false} bordered={false}></Table>
              </div>
                <div className={styles.background1} style={{width:'30em',height:'40em',margin:'center',position:'relative',top:'-35em',left:'5em'}}>
                  {/*<Table dataSource={this.state.users} columns={columns} pagination={false} bordered={false}></Table>*/}
                </div>
              </div>
              {/*<div style={{backgroundColor:'red'}}>*/}
              {/*<Row>*/}
              {/*  <Card>*/}
              {/*    <Col span={5}>1</Col>*/}
              {/*    <Col span={5}>2</Col>*/}
              {/*    <Col span={4}>3</Col>*/}
              {/*    <Col span={5}>4</Col>*/}
              {/*    <Col span={5}>6</Col>*/}
              {/*  </Card>*/}

              {/*</Row>*/}
              {/*</div>*/}
            </Content>
          </Layout>
        </Content>
      </Layout>
      </Authorized>
    );
  }
}

export default connect(({ userScoreList}) => ({
  userScoreList
}))(UserScoreList);
