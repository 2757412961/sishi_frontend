import React, { useState, useEffect, Component } from 'react';
import { Menu, Layout, Card,Table,Avatar,PageHeader } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import styles from './index.less';
import correct from '@/assets/correct.PNG';
const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
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
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={400} style={{ background: '#fff',padding: '24px'}}>
              <PageHeader
                className="site-page-header"
                onBack={() => router.replace('/')}
                title="首页"
              />
              <div className={styles.bottom} ><h3 >热榜规则说明</h3>
                <p>
                  1.平台依据答题挑战等多维度数据，按照权重计算出最后分数
                  <br/>
                  2.你的活跃行为挑战答题数会增加你的本周综合指标
                </p> <p >
                  1.榜单内容实时更新<br/>
                  2.坚决抵制刷榜行为，欢迎大家共同监督举报
                </p>
              </div>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <h1 style={{fontSize:'24px',textAlign:'center',color:'black',marginBottom:'14px'}}>排行榜</h1>
              <Table dataSource={this.state.users} columns={columns}></Table>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default connect(({ userScoreList}) => ({
  userScoreList
}))(UserScoreList);