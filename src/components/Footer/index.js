/**
* 公共底部组件
 * create by zhaichunyan 2018-10-31
 * @1183624592@qq.com
 */

import React, { Component } from 'react';
import styles from './index.less';
import { Icon, Button, Menu,Avatar, Divider } from 'antd';
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
    return <footer className={styles.home_footer}>
      <div>
        单位：浙江大学
      </div>
      <div> Copyright <Icon type="copyright"/>...........................................
      </div>
    </footer>;
  }
}

export default Footer;
