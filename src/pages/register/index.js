import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Popover, Progress, Cascader ,Row,Col} from 'antd';
import styles from './index.less';
import { countryData, userType, industry, affiliation } from '@/assets/images/register/selectData';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      强度：强
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      强度：中
    </div>
  ),
  poor: (
    <div className={styles.error}>
      强度：弱
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      confirmDirty: false,
      visible: false,
      help: '',
      prefix: '86',
      email: '',
      captcha: '',
    };
  }


  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue('mail');
    console.log("register.status", register);
    if (register.status.toLowerCase() === 'ok') {
      router.push({
        pathname: '/login',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.dispatch({
      type: 'register/clearStatus',
    });
  }

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    let pattern = /(?=.*[\d])?(?=.*[a-zA-Z])(?=.*[\d])/;
    if (value && value.length > 7 && pattern.test(value)) {
      return 'ok';
    }
    if (value && value.length > 7) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { captcha }= this.state;
        dispatch({
          type: 'register/submit',
          payload: {
            captcha:captcha,
            values:values,
          } ,
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };
  checkUsername = (rule, value, callback) => {

    let regexpCode = /^[a-zA-Z]([-_a-zA-Z0-9]*)$/;
    if (regexpCode.test(value)) {
      callback();
    } else {
      callback('用户名只能包含字母,数字,和特殊字符"-",且必须以字母开头');
    }
  };


  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };
  emailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  getCaptchaValue =(e) => {
    // let _this = this;
    // _this.state.captcha = e.target.value
    this.setState({
      captcha: e.target.value
    })
  }
  getCaptchaClick =(e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, email) => {
      if (!err) {
        const { email } = this.state;
        dispatch({
          type: 'register/getCaptcha',
          payload: email,
        });
      }
    });
  }
  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 },
    //   },
    // };
    return (
      <div className={styles.main}>
        <h3>
          欢迎注册党史学习教育平台账号
        </h3>
        <Form onSubmit={this.handleSubmit} >
          <FormItem label="用户名">
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名!',
                },
                {
                  max: 32,
                  message: '用户名长度不能大于32.',
                },
                {
                  min: 6,
                  message: '用户名长度不能小于6',
                },
                {
                  validator: this.checkUsername,
                },
              ],
            })(
              <Input size="large" placeholder="用户名"/>,
            )}
          </FormItem>
          <FormItem label="密码" help={help}>
            <Popover
              getPopupContainer={node => node.parentNode}
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    请至少输入 8 个字符,包含字母和数字。请不要使用容易被猜到的密码。
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder="至少6位密码，区分大小写"
                />,
              )}
            </Popover>
          </FormItem>
          {/*<FormItem label={'确认密码'}>*/}
          {/*  {getFieldDecorator('confirmPassword', {*/}
          {/*    rules: [*/}
          {/*      {*/}
          {/*        required: true,*/}
          {/*        message: '请确认密码！',*/}
          {/*      },*/}
          {/*      {*/}
          {/*        validator: this.checkConfirm,*/}
          {/*      },*/}
          {/*    ],*/}
          {/*  })(*/}
          {/*    <Input*/}
          {/*      size="large"*/}
          {/*      type="password"*/}
          {/*      placeholder="确认密码"*/}
          {/*    />,*/}
          {/*  )}*/}
          {/*</FormItem>*/}
          <FormItem label={'学号'}>
            {getFieldDecorator('studentNumber', {
              rules: [
                {
                  required: true,
                  message: '请输入学号！',
                },
                // {
                //   type: 'studentNumber',
                //   message: '学号格式错误！',
                // },
              ],
            })(
              <Input size="large" placeholder="学号"/>,
            )}
          </FormItem>
          <FormItem label={'身份证号'}>
            {getFieldDecorator('idNumber', {
              rules: [
                {
                  required: true,
                  message: '请输入身份证号！',
                },
                // {
                //   type: 'idNumber',
                //   message: '身份证号格式错误！',
                // },
              ],
            })(
              <Input size="large" placeholder="身份证号"/>,
            )}
          </FormItem>
          <FormItem label={'支部'}>
            {getFieldDecorator('partyBranch', {
              rules: [
                {
                  required: true,
                  message: '请输入所在支部！',
                },
                // {
                //   type: 'partyBranch',
                //   message: '所在支部格式错误！',
                // },
              ],
            })(
              <Input size="large" placeholder="所在支部"/>,
            )}
          </FormItem>
          <FormItem label={'班级'}>
            {getFieldDecorator('grade', {
              rules: [
                {
                  required: true,
                  message: '请输入所在班级！',
                },
                // {
                //   type: 'grade',
                //   message: '所在班级格式错误！',
                // },
              ],
            })(
              <Input size="large" placeholder="所在班级"/>,
            )}
          </FormItem>
          <FormItem label={'姓名'}>
            {getFieldDecorator('studentName', {
              rules: [
                {
                  required: true,
                  message: '请输入姓名！',
                },
                // {
                //   type: 'name',
                //   message: '姓名格式错误！',
                // },
              ],
            })(
              <Input size="large" placeholder="姓名"/>,
            )}
          </FormItem>
          <FormItem label={'电话'}>
            {getFieldDecorator('mobile', {
              rules: [
                {
                  required: true,
                  message: '请输入电话号码！',
                },
                // {
                //   pattern: /^1(3|4|5|6|7|8|9)d{9}$/,
                //   message: '电话号码格式错误！',
                // },
              ],
            })(
              <Input size="large" placeholder="电话"/>,
            )}
          </FormItem>
          <FormItem label={'邮件'}>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '请输入邮箱地址！',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误！',
                },
              ],
            })(
              <Input size="large" placeholder="邮箱" onChange={this.emailChange}/>,
            )}
          </FormItem>
          <FormItem label={'邮箱验证码'} extra="请确保邮箱的真实性，以便能够获得验证码并快速注册成功；及后续找回或修改密码时使用">
            <Row gutter={8}>
              <Col span={18}>
                {getFieldDecorator('captcha', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: '请输入邮箱验证码！',
                  //   },
                  // ],
                })(
                  <Input size="large" placeholder="请输入收到的验证码" onChange={this.getCaptchaValue}/>,
                )}
              </Col>
              <Col span={6}>
                <Button onClick={this.getCaptchaClick} className={styles.captcha_btn}>获取验证码</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <span style={{color:"white"}}>注册</span>
            </Button>
            <Link className={styles.login} style={{color:"rgba(245, 34, 45, 0.7)"}} to="/login">
              使用已有账户登录
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Register;
