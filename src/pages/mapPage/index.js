import React, { useState, useEffect, Component } from 'react';
import { Button, Layout, Modal, Typography, Statistic, Col, Row } from 'antd';
import styles from './index.less';
import { fromJS } from 'immutable';
import 'mapbox-gl/dist/mapbox-gl.css';
import { connect } from 'dva';
import axios from 'axios';
import { getLocalData } from '@/utils/common.js';
import { MapContext, RotationControl, ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MapPageMap from './MapPageMap';
import Redirect from 'umi/redirect';
import RenderAuthorized from '@/components/Authorized';
import {getAuthority} from '@/utils/authority'
const Authorized = RenderAuthorized(getAuthority());
const { Countdown } = Statistic;
const { Content, Sider } = Layout;
const noMatch=<Redirect to={`/login?redirect=${window.location.href}`} />;
 // Moment is also OK
function MapPage(props) {
  const [_collapsed, setCollapsed] = useState(false);
  const [modalVisble,setModalVisble]=useState(false);
  const [deadline,setDeadline] =useState( Date.now() +  1000 * 60);


  return (
    <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
    <Layout className={styles.normal}>
      <Sider style={{backgroundColor:'white'}} width={300}>
        <Button onClick={() =>setModalVisble(true)}>开始答题</Button>
        <Modal visible={modalVisble}
               title="开始答题"
               centered
               //width={'60vw'}
               // okText="确认" cancelText="取消"
               // onOk={() => {setModalVisble(false)}}
               onCancel={() => {}}
               style={{top:'3em'}}
               bodyStyle={{height:'70vh'}}
               maskStyle={{backgroundColor: 'rgba(198,170,145,1)' ,top:'5em',}}
               footer={[
                 <Row gutter={16}>
                   <Col span={8}>
                 <Button  key="back" onClick={()=>{}}>
                 上一题</Button>
                   </Col>
                   <Col span={8}>
                 <Button
                   key="submit"
                   type="primary"
                   onClick={()=> {
                     setModalVisble(false)
                     setDeadline(Date.now() +  1000 * 60)
                   }}
                 >
                   下一题
                 </Button></Col>
                   <Col span={8}>
                 <Countdown center style={{right:'26em'}} title="Countdown" value={deadline} onFinish={()=>{}} />
                   </Col>
                   </Row>
                 ]}
        >{deadline}
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Sider>
      <Content>
        <MapPageMap/>
      </Content>
    </Layout>
    </Authorized>
  );
}

export default connect(({  }) => ({

}))(MapPage);
