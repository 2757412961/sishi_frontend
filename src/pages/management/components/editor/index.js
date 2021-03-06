/**
* 公共头部组件
 * create by zhaichunyan 2018-10-30
 * @1183624592@qq.com
 */
import React, { Component } from 'react';
import { Menu, Button, Dropdown, Icon, Avatar, Form } from 'antd';
import styles from './index.less';
import Link from 'umi/link';
// import Logo from '@images/index/0212.png';
import { judgeUrl, getLocalData } from '@/utils/common.js';
import router from 'umi/router';
import { connect } from 'dva';
import classnames from 'classnames';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const FormItem = Form.Item;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,//富文本回显信息存储
    };
  }

  //3.接口请求，将后端会给的富文本框内容放入state的details中
 //富文本回显操作
 //  setTimeout(() => {
 //    this.props.form.setFieldsValue({
 //                                     details: BraftEditor.createEditorState(result.details)//接口返回字段
 //    })
 //  }, 1000);

  // validateFields=(err, fieldsValue) => {
  //   if (err) {
  //     return;
  //   }
  //   dispatch({
  //     type: apiUrl,
  //     payload: {
  //       ...//其他入参
  //         details: fieldsValue.details.toHTML(),//富文本格式转换
  //     }
  //   })
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form>
        <FormItem
          labelCol={{span: 3}}
          wrapperCol={{span: 19}}
          label='描述'
        >
          {getFieldDecorator('details', {
            validateTrigger: 'onBlur',
            rules: [{
              required: true,
              validator: (_, value, callback) => {
                if (value.isEmpty()) {
                  callback('请输入正文内容')
                } else {
                  callback()
                }
              }
            }]
          })(
            <BraftEditor
              className="my-editor"
              style={{border: '1px solid #e8e8e8'}}
              placeholder="请输入正文内容"
              media={{uploadFn: this.myUploadFn}}
            />
          )}
        </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Editor);
