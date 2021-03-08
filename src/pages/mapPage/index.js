import React, { useState, useEffect, Component } from 'react';
import { Layout, Typography } from 'antd';
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

const { Content, Sider } = Layout;
const noMatch=<Redirect to={`/login?redirect=${window.location.href}`} />;

function MapPage(props) {
  const [_collapsed, setCollapsed] = useState(false);


  return (
    <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
    <Layout className={styles.normal}>
      <Sider style={{backgroundColor:'white'}} width={300}>
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
