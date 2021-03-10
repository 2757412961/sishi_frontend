import React, { useState, useEffect, Component } from 'react';
import { Button, Layout, Modal, Typography, Statistic, Col, Row,Card,Radio } from 'antd';
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
class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _collapsed: false,
      modalVisble: false,
      deadline: Date.now() +  1000 * 60,
      value:1,
      grade:0,
      answer:false,
    };
  }
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render(){
    let question='中日甲午战争中，日军野蛮屠杀和平居民的地点是';
    let answer=['A.大连','B.旅顺','C.平壤','D.花园口'];
    let rightAnswer=1;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
  return (
    <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
    <Layout className={styles.normal}>
      <Sider style={{backgroundColor:'white'}} width={300}>
        <Button onClick={() =>this.setState({modalVisble:true})}>开始答题</Button>
        <Modal visible={this.state.modalVisble}
               title="开始答题"
               centered
               style={{top:'3em'}}
               bodyStyle={{height:'70vh'}}
               maskStyle={{backgroundColor: 'rgba(198,170,145,1)' ,top:'5em',}}
               footer={[
                 <Row gutter={16}>
                   <Col span={8}>
                     <Button  key="back" onClick={()=>{}}>
                       上一题
                     </Button>
                   </Col>
                   <Col span={8}>
                     <Button
                       key="submit"
                       type="primary"
                       onClick={()=> {
                         this.setState({modalVisble:false})
                         this.setState({deadline:Date.now() +  1000 * 60})
                       }}>
                       下一题
                     </Button>
                   </Col>
                   <Col span={8}>
                     <Countdown title="Countdown" value={this.state.deadline} onFinish={()=>{}} />
                   </Col>
                 </Row>
                 ]}
        >
          <Card title={question}>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio style={radioStyle} value={0}>
              {answer[0]}
            </Radio>
            <Radio style={radioStyle} value={1}>
              {answer[1]}
            </Radio>
            <Radio style={radioStyle} value={2}>
              {answer[2]}
            </Radio>
            <Radio style={radioStyle} value={3}>
              {answer[3]}
              {/*{value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}*/}
            </Radio>
          </Radio.Group>
          </Card>
          <Button  key="submit"
                   type="primary" style={{left:'30em',backgroundColor:'rgb(255,0,0)'}} onClick={()=>{
                     if(this.state.value==rightAnswer){
                       this.setState({grade:this.state.grade++});
                     }
                     this.setState({answer:true})}}>提交</Button>
          {this.state.answer==true?
            (<h1>正确答案是</h1>):''}
          {this.state.answer==true?
            (<Card type="inner" title={answer[rightAnswer]} />):''}
          {/*  <Card type="inner" title={answer[0]} extra={<a href="#">More</a>} onClick={()=>{console.log(answer[0])}}/>*/}
          {/*  <Card type="inner" title={answer[1]} extra={<a href="#">More</a>}/>*/}
          {/*  <Card type="inner" title={answer[2]} extra={<a href="#">More</a>}/>*/}
          {/*  <Card type="inner" title={answer[3]} extra={<a href="#">More</a>}/>*/}
          {/*</Card>,*/}
          {/*<h1>{question}</h1>*/}
        </Modal>
      </Sider>
      <Content>
        <MapPageMap/>
      </Content>
    </Layout>
    </Authorized>
  );}
}

// function MapPage(props) {
//   const [_collapsed, setCollapsed] = useState(false);
//   const [modalVisble,setModalVisble]=useState(false);
//   const [deadline,setDeadline] =useState( Date.now() +  1000 * 60);
//
//
//   return (
//     <Authorized authority={['NORMAL','admin']} noMatch={noMatch}>
//       <Layout className={styles.normal}>
//         <Sider style={{backgroundColor:'white'}} width={300}>
//           <Button onClick={() =>setModalVisble(true)}>开始答题</Button>
//           <Modal visible={modalVisble}
//                  title="开始答题"
//                  centered
//                  style={{top:'3em'}}
//                  bodyStyle={{height:'70vh'}}
//                  maskStyle={{backgroundColor: 'rgba(198,170,145,1)' ,top:'5em',}}
//                  footer={[
//                    <Row gutter={16}>
//                      <Col span={8}>
//                        <Button  key="back" onClick={()=>{}}>
//                          上一题
//                        </Button>
//                      </Col>
//                      <Col span={8}>
//                        <Button
//                          key="submit"
//                          type="primary"
//                          onClick={()=> {
//                            setModalVisble(false)
//                            setDeadline(Date.now() +  1000 * 60)
//                          }}>
//                          下一题
//                        </Button>
//                      </Col>
//                      <Col span={8}>
//                        <Countdown title="Countdown" value={deadline} onFinish={()=>{}} />
//                      </Col>
//                    </Row>
//                  ]}
//           >{deadline}
//             <p>Some contents...</p>
//             <p>Some contents...</p>
//             <p>Some contents...</p>
//           </Modal>
//         </Sider>
//         <Content>
//           <MapPageMap/>
//         </Content>
//       </Layout>
//     </Authorized>
//   );
// }
export default connect(({ mapPage }) => ({
mapPage
}))(MapPage);
