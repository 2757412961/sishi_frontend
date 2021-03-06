import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import styles from './index.less';
import loginCloud from '@/assets/images/login/body_cloud.png';
import loginLeft from '@/assets/images/login/login.png';
import Link from 'umi/link';
import { getLocalData } from '@/utils/common.js';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: "off",
    autoLogin:false,
    haveAutoLogin:false,
    username:null,
  };


  componentDidMount() {
    const{localUsername}=this.props
    if(localUsername){
      this.setState({
        autoLogin:true,
        haveAutoLogin:true,
        username:localUsername
      })
    }
  }

  //用户登录
  handleSubmit = e => {
    e.preventDefault();
    const {form,handleUserLogin} = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {autoLogin,haveAutoLogin}=this.state;
        handleUserLogin(values,autoLogin,haveAutoLogin);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  changeAutoLogin = e => {
    if (e) {
      const autoLogin = e.target.checked;
      this.setState({ autoLogin: autoLogin });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult, autoLogin ,username} = this.state;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
      },
    };

    function validateNameFieldsPattern(rule, value, callback) {
      rule = /^[a-zA-Z]([-_a-zA-Z0-9]*)$/;
      if (value && !rule.test(value)) {
        callback('只能包含英文字母、数字和特殊字符（-_）');
      }
      else {
        callback();
      }
    }

    return <Form onSubmit={this.handleSubmit}>
      <h2>账号登录</h2>
      <FormItem {...formItemLayout}>
        {getFieldDecorator('username', {
          initialValue:username,
          rules: [
            {
              required: true,
              message: '请输入您的账号',
            },
            {
              validator: validateNameFieldsPattern,
            },
          ],
        })(<Input placeholder="用户名/邮箱/手机" size="large" autoComplete={autoCompleteResult}/>)}
      </FormItem>
      <FormItem {...formItemLayout}>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: '请输入您的密码',
            },
          ],
        })(<Input type="password" placeholder="登录密码" size="large" autoComplete={autoCompleteResult}/>)}
      </FormItem>
      <div style={{ marginBottom: '8px' }}>
        <Checkbox checked={autoLogin } defaultChecked={false} onChange={this.changeAutoLogin}>
          记住用户名
        </Checkbox>
        <a style={{ float: 'right' }} onClick={this.showModal}>
          忘记密码？
        </a>
      </div>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" size="large"
                loading={this.props.loading.effects['userInfo/userLogin']}>
          登录
        </Button>
      </FormItem>
    </Form>;
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);


function LoginBox({ dispatch, loading }) {
  // let history = useHistory();
  // let location = useLocation();
  // let { from } = location.state || { from: { pathname: "/" } };

  const handleUserLogin = (values,autoLogin,haveAutoLogin) => {
    dispatch({
      type: 'userInfo/userLogin',
      payload: {
        ...values,
        service: window.location.href,
        autoLogin:autoLogin,
        haveAutoLogin:haveAutoLogin,
      },
    })
  };
  const localUsername=getLocalData({dataName: 'fuxi-username'});
  return (
    <div className={styles.App}>
      <div
        className={styles.container_box}
        style={{ backgroundImage: 'url(' + loginCloud + ')' }}
      >
        <div className={styles.main_login}>
          {/*<div className={styles.left_box}>*/}
          {/*  <img*/}
          {/*    src={loginLeft}*/}
          {/*    alt=""*/}
          {/*  />*/}
          {/*</div>*/}
          <div className={styles.login_box}>
            <WrappedRegistrationForm
              handleUserLogin={handleUserLogin}
              localUsername={localUsername}
              loading={loading}
            />
            <div className={styles.full_row}>
              <div className={styles.left}>
                <span>还没有账号？</span>
                <Link to="/register">免费注册</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(({ userInfo, loading }) => ({ userInfo, loading }))(
  LoginBox,
);
