import React, { useState, useEffect, Component } from 'react';
import { Menu, Layout, Card, Table, Avatar, PageHeader, Row, Col, Button,List,Tag, Tree, Icon} from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import styles from './index.less';
import correct from '@/assets/correct.PNG';
import Redirect from 'umi/redirect';
import RenderAuthorized from '@/components/Authorized';
import {getAuthority} from '@/utils/authority';
import paihangbang from '@/assets/images/paihangbang.png';
import font from '@/assets/images/font.png';
import wrong from '@/assets/false.PNG';
import { getLocalData } from '@/utils/common';
import { Scrollbars } from 'react-custom-scrollbars';
import meeting from '@/assets/meeting.png';
import movement from '@/assets/movements.png';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
const Authorized = RenderAuthorized(getAuthority());
const noMatch=<Redirect to={`/login?redirect=${window.location.href}`} />;
const { TreeNode } = Tree;
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
function translate(arg) {
  let num=[];
  for(let i in arg){
    let temp=0;
    if(arg[i]=='A'){
      temp=0;
    }
    if(arg[i]=='B'){
      temp=1;
    }
    if(arg[i]=='C'){
      temp=2;
    }
    if(arg[i]=='D'){
      temp=3;
    }
    num.push(temp);
  }
  return num;
};
class Question extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };
  state={
    value: [],
    grade: 0,
    answer: false,
    first: false,
    questionNumber: 1,
    questionChoose:[],
    tags:[],
    recentTag:'',
  }
  changeTag(tag){
    this.props.dispatch({ type: 'mapPage/getQuestion', payload: tag})
  }
  componentDidMount() {
    this.props.dispatch({type:'mapPage/getTagTreeSortByTime',payload: { tagName: '党史新学' }}).then((res)=>{
      console.log('res',res);
      if(res&&res.success) {
        let tags=res.list.map((item,index)=>{return(
          <TreeNode key={item.tagName} title={item.value} style={{color:'red',cursor:'pointer'}}
                     icon={<img width='20px' height='20px' src={item['property']=='movement'?movement:meeting}/>}
          >
            <p style={{color:'red',cursor:'pointer'}}>{item.value}</p></TreeNode>)})
        // .map((item,index)=>{return <div style={{height:'30px',}}><Tag style={{color:'red',cursor:'pointer'}} onClick={this.changeTag(item.value)}>{item.value}</Tag></div>});
        this.setState({ tags: tags });
      }
    })
  }
  //选择函数
  onChange = e => {
    let state = document.getElementsByClassName("answer");
    let value=[];
    for(let i=0;i<state.length;i++){
      let checked=state[i].checked;
      console.log(i,checked);
      if(checked==true){
        let temp=state[i].value;
        value.push(temp)
      }
    }
    // console.log('radio checked', e);
    this.setState({
      value: value,
    });
  };
  answerOrNext(){
    const {tagTree,question,knowledgeContent}=this.props.mapPage;
    let allNumber=question.length;
    if(this.state.value.length==0){
      if(this.state.answer)
      {
        return false;
      }
      return true;
    }else {
      if(this.state.answer&&this.state.questionNumber==allNumber){
        return true;
      }else{
        return false;
      }}
  }
  //清除已经选择的题
  clearSelected(temp){
    let checked1=document.getElementsByClassName(styles.qanswer);
    for (let i=0;i<checked1.length;i++){
      document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.qanswerchoosable);
      document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.correct);
      document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.false);
    }
    let state = document.getElementsByTagName("input");
    state[0].getAttribute("checked");
    for(let i=0;i<state.length;i++){
      document.getElementsByTagName("input")[i].checked=false;
    }
    let i=0;
    while(i<4){
      if(temp[i]==wrong){
        if(document.getElementsByClassName(styles.qanswer)[i])
          document.getElementsByClassName(styles.qanswer)[i].classList.add(styles.false);
      }else if(temp[i]==correct){
        if(document.getElementsByClassName(styles.qanswer)[i])
          document.getElementsByClassName(styles.qanswer)[i].classList.add(styles.correct);
      }
      i++;
    }
    if(temp&&temp[5]){
      let checked=temp[5];
      let j=0;
      while(j<checked.length){
        console.log('checked',checked);
        let id=checked[j];
        document.getElementsByClassName(styles.qanswer)[id].classList.add(styles.qanswerchoosable);
        j++;
      }
    }
  }
  //下一题
  nextQuestion=()=>{
    const {mapPage}=this.props;
    console.log('mapPage',mapPage);
    const {tagTree,question,knowledgeContent}=mapPage;
    let allNumber=question.length;
    let recent=this.state.questionNumber;
    let temp=this.state.questionChoose[recent];
    debugger
    if(this.state.questionNumber==allNumber&&this.state.answer==true){
      alert("答题结束，请点击右上角关闭答题页面")
    }else{
      if(temp&&temp[4]==true){
        this.clearSelected(temp);
        this.setState({answer: true});
        this.setState({questionNumber: this.state.questionNumber+1})
      } else{
        let arg=question[recent]?question[recent].answer:'';
        arg=arg.split("");
        let translate1=translate(arg);
        let checked=(document.getElementsByClassName(styles.correct).length>0)?document.getElementsByClassName(styles.correct):document.getElementsByClassName(styles.wrong);
        let checked1=document.getElementsByClassName(styles.qanswer);
        for (let i=0;i<checked1.length;i++){
          document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.correct);
          document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.false);
          document.getElementsByClassName(styles.qanswer)[i].classList.remove(styles.qanswerchoosable);
        }
        let state = document.getElementsByTagName("input");
        state[0].getAttribute("checked");
        for(let i=0;i<state.length;i++){
          document.getElementsByTagName("input")[i].checked=false;
        }
        this.setState({value:[]});
        this.setState({deadline:Date.now() +  1000 * 60})
        this.setState({questionNumber: this.state.questionNumber+1})
        this.setState({answer:false})
      }}
  }
  //上一题
  lastQuestion=()=>{
    let recent=this.state.questionNumber-2;
    let temp=this.state.questionChoose[recent];
    if(this.state.questionNumber>1){
      this.clearSelected(temp);
      this.setState({questionNumber: this.state.questionNumber-1});
      this.setState({answer: true});
    } else{
      this.setState({questionNumber: this.state.questionNumber});
      alert('当前为第一道题');
    }
  }
  //答题提交
  submitQuestion=()=>{
    const {mapPage}=this.props;
    console.log('mapPage',mapPage);
    const {tagTree,question,knowledgeContent}=mapPage;
    let allNumber=question.length;
    let recent=this.state.questionNumber-1;
    let string=this.state.value.toString();
    string=string.replace(/,/g,'');
    string=string.split("");
    let chooseAnswer=translate(string);
    let arg=question[recent]?question[recent].answer:'';
    arg=arg.split("");
    let translate1=translate(arg);
    let temp=[-1,-1,-1,-1,true,[]];
    let questionChoose=this.state.questionChoose;
    let choose=this.state.questionChoose[recent];
    let flag=true;
    if(choose&&choose[4]){
      return
    }else{
      if(arg.length!=string.length){
        flag=false;
      }
      let i=0;
      let answer=question[recent]?question[recent].answer:'';
      while(i<string.length){
        if(answer.indexOf(string[i])==-1){
          flag=false;
          break;
        }
        i++;
      }
      let id=0;
      i=0;
      while(i<translate1.length){
        id=translate1[i];
        if(document.getElementsByClassName(styles.qanswer)[id]) {
          if(flag==true)
          {
            temp[id]=correct;
            if(this.state.answer==false){
              this.setState({grade:this.state.grade+1});
            }
            document.getElementsByClassName(styles.qanswer)[id].classList.remove(styles.false);
            document.getElementsByClassName(styles.qanswer)[id].classList.add(styles.correct);
          }else{
            temp[id]=wrong;
            document.getElementsByClassName(styles.qanswer)[id].classList.remove(styles.false);
            document.getElementsByClassName(styles.qanswer)[id].classList.add(styles.false);
          }
          document.getElementsByClassName(styles.qanswer)[id].classList.remove(styles.qanswerchoosable);
        }
        i++;
      }
      temp[5]=chooseAnswer;
      questionChoose.push(temp);
      this.setState({questionChoose:questionChoose});
      this.setState({answer:true});
      if(this.state.questionNumber==allNumber) {
        if(this.grade==allNumber) {
          let username=getLocalData({dataName:'userName'});
          this.props.dispatch({type: 'mapPage/updateUserGrades', payload: {tag_name:this.state.tagName,user_name:username}});
          alert('回答全部正确，答题结果已经上传');
        }else{
          alert('回答未全部正确，请继续努力');
        }
      }
    }}
  render() {
    const {mapPage}=this.props;
    console.log('mapPage',mapPage);
    const {tagTree,question,knowledgeContent}=mapPage;
    let allNumber=question.length;
    let recent=this.state.questionNumber-1;
    function rank(users,i)
    {
      return(<div className={styles.flex__item}>
        <div className={styles.avatar}>
          <Avatar src={users[0]&&users[i].avatar}/>
          <h4>{users[0]&&users[i].userName}</h4>
        </div>
        <p>
          {users[0]&&users[i].score}分
        </p>
        <p>
          {users[0]&&users[i].partyBranch}
        </p>
      </div>)
    }
    return (
      <Authorized authority={['general','NORMAL','admin']} noMatch={noMatch}>
        <Layout>
          <Content style={{ padding: '0 24px' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={300} style={{ background: '#fff',padding: '18px',alignContent:'center',margin:'center'}}>
                <h3 style={{textAlign:'left',color:'#8b0d1e',fontSize:'20px'}}>选择答题的标签</h3>
                <Scrollbars>
                  <Tree style={{color:'red'}}
                        showIcon
                    onSelect={(e)=>{console.log('e',e[0]);
                    this.changeTag(e[0])
                    }}
                  >{this.state.tags}</Tree>
                </Scrollbars>
              </Sider>
              <Content style={{ padding: '18px' }}>
                <div className="d-iframe">
                  <div className={styles.web}>
                    <div className={styles.top}></div>
                    <div className={styles.headerRow}>
                      <span className={styles.big}>{this.state.questionNumber}</span>
                      /{allNumber}
                    </div>
                    <div className={styles.question} style={{ height: '490px', overflow: 'scroll' }}>
                      <div className={styles.qbody}>
                        <div><h3>{question[recent] ? question[recent].questionContent : ''}</h3></div>
                      </div>
                        <form id={'choose'}
                              style={{top:'3em',left:'3em'}} >
                          <Row>
                            {question[recent]&&question[recent].hasOwnProperty('optionA')?
                              <div>
                                <div id="1" className={styles.qanswer}
                                     onClick={(event)=>{
                                       event.stopPropagation();
                                       document.getElementsByTagName("input")[0].checked=!document.getElementsByTagName("input")[0].checked;
                                       this.onChange()}}>
                                  <div style={{pointerEvents:'none'}}>
                                    <p><input type="checkbox"   value={'A'} className="answer"/>
                                      {'A  '+(question[recent]?question[recent].optionA:'')}
                                    </p></div>

                                  {this.state.answer&&this.state.questionChoose[recent][0]!=-1?<img width='24px' height='24px' src={this.state.questionChoose[recent][0]} />:''}
                                </div></div>:'此标签下暂时没有题目'}
                          </Row>
                          {question[recent]&&question[recent].hasOwnProperty('optionB')?<div id="2" className={styles.qanswer}onClick={()=>{document.getElementsByTagName("input")[1].checked=!document.getElementsByTagName("input")[1].checked;this.onChange()}}>
                            <div style={{pointerEvents:'none'}}>
                              <p><input type="checkbox"   value={'B'}
                                        className="answer"
                              />
                                {'B  '+(question[recent]?question[recent].optionB:'')}
                              </p></div>
                            {this.state.answer&&this.state.questionChoose[recent][1]!=-1?<img width='24px' height='24px' src={this.state.questionChoose[recent][1]} />:''}
                          </div>:''}
                          {question[recent]&&question[recent].hasOwnProperty('optionC')?<div className={styles.qanswer} onClick={()=>{document.getElementsByTagName("input")[2].checked=!document.getElementsByTagName("input")[2].checked;this.onChange()}} >
                            <div style={{pointerEvents:'none'}}>
                              <p><input type="checkbox"   value={'C'} className="answer"/>
                                {'C  '+(question[recent]?question[recent].optionC:'')}
                              </p></div>
                            {this.state.answer&&this.state.questionChoose[recent][2]!=-1?<img width='24px' height='24px' src={this.state.questionChoose[recent][2]} />:''}
                          </div>:""}
                          {question[recent]&&question[recent].hasOwnProperty('optionD')?
                            <div className={styles.qanswer} onClick={()=>{document.getElementsByTagName("input")[3].checked=!document.getElementsByTagName("input")[3].checked;this.onChange()}}>
                              <div style={{pointerEvents:'none'}}>
                                <p><input type="checkbox"   value={'D'} className="answer"/>
                                  {'D  '+(question[recent]?question[recent].optionD:'')}
                                </p></div>
                              {this.state.answer&&this.state.questionChoose[recent][3]!=-1?<img width='24px' height='24px' src={this.state.questionChoose[recent][3]} />:''}
                            </div>:''}
                        </form>
                      {this.state.answer == true ?
                        (<h3>正确答案是</h3>) : ''}
                      {this.state.answer == true ?
                        (<h2 style={{textAlign:'center',color:'red'}}> {(question[recent] ? question[recent].answer : '')} </h2>) : ''}
                      {this.state.questionNumber == allNumber && this.state.answer ?
                        (<div>
                          {/*<div className={styles.try}></div>*/}
                          <h3><span>您的得分为</span><h2 style={{textAlign:'center',color:'red'}}>{this.state.grade}</h2></h3>
                        </div>) : ''}
                    </div>
                    <div className={styles.actionRow}>
                      <Button className={styles.preBtn} disabled={this.state.questionNumber <= 1 ? true : false}
                              onClick={() => {
                                this.lastQuestion()
                              }}>上一题</Button>
                      <Button className={styles.nextBtn} disabled={this.answerOrNext()} onClick={() => {
                        this.state.answer ? this.nextQuestion() : this.submitQuestion()
                      }}>{this.state.answer ? "下一题" : "提 交"}</Button>
                    </div>
                  </div>
                </div>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Authorized>
    );
  }
}

export default connect(({ mapPage}) => ({
  mapPage
}))(Question);
