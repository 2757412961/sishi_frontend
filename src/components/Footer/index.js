/**
* 公共底部组件
 * create by zhaichunyan 2018-10-31
 * @1183624592@qq.com
 */

import React, { Component } from 'react';
import styles from './index.less';
import { Icon, Button, Menu,Avatar, Divider, Row, Col } from 'antd';
import xueyuanlogo from '@/assets/images/xueyuanlogo.png';
import logobiaoti from '@/assets/images/logobiaoti.png';
// import foot_logo from '@images/index/logo100.gif';

class Footer extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   dataSource: [],
    // };
  }

  componentDidMount() {

  }

  render() {
    return(
    <div>
      <div className={styles.home_footer}>
        <div>
      <Row style={{width:"600px"}}>
        <Col span={12}>
          <img src={xueyuanlogo} className={styles.xueyuan_logo} style={{float:"left"}} alt="" />
        </Col>
        <Col span={12}>
          <div style={{marginTop:"10px"}}>
            地址 : 浙大路38号，浙江大学地球科学学院
          </div>
          <div style={{marginTop:"5px"}}>
            邮编 : 310027
          </div>
          <div style={{marginTop:"5px"}}>
            电话 : +86-571-87952453
          </div>
        </Col>
      {/*  </Col>*/}
        </Row>
        </div>
        <div>
      <Row>
        <div style={{background:"rgba(255,255,255,0.5)",height:"1px", width:"100vw", marginTop:"10px", marginBottom:"10px"}}>
        </div>
      </Row>
      <Row>
        <div style={{margin:"0 auto", textAlign:"center"}}>
          版权所有Copyright © 浙江大学地球科学学院
        </div>
      </Row>
        </div>
    </div>
    </div>);
  }
}

export default Footer;
