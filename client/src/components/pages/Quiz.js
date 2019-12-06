import React ,{Component}from 'react';
import { connect } from 'react-redux'
import {addTOSequence,setAnswer,getMatchingList } from '../../globalStore/actions/quizActions'
import QuizTamplate from './QuizTemplate'
import './Quiz.css';
const frontEndIP= require('../../config/URLS.json').frontEndIP;

class Quiz extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      value:0,
      questions:[],
      answers:[[]],
      sequence:[],
      currentQuestion:0,
      users:[],
    }
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    var tempQuestions=[]
    var tempAnswers= []
    this.props.quiz.questions.forEach(element => {
      tempQuestions.push(element.question)
      tempAnswers.push(element.answers)
    });
    this.setState({questions:tempQuestions})
    this.setState({answers:tempAnswers})
  }
  onChange(e) {
    this.setState({ value: e })
  }
  handleClick() {
    if(this.state.value!==0 && this.state.currentQuestion<10){
    const tempCurrent= this.state.currentQuestion+1;
    const tempSequence=this.state.sequence
    tempSequence.push(this.state.value)
    this.setState({ currentQuestion: tempCurrent })
    this.setState({ sequence: tempSequence })
    this.setState({ value: 0 })
    
    this.props.addTOSequence(tempSequence);
    }else{
      if(this.state.value!==0)
        this.setState({ currentQuestion: 10 })
    }
  }
  displayQuestions(){
    if(this.state.currentQuestion<10){
return(
  
  <div>

  <QuizTamplate 
  onChange={this.onChange} 
  handleClick={this.handleClick} 
  count={this.state.currentQuestion} 
  question={this.state.questions[this.state.currentQuestion]} 
  answers={this.state.answers[this.state.currentQuestion]}/>

</div>
);
    }else{
      const tempCurrent= this.state.currentQuestion+1;
      this.setState({ currentQuestion: tempCurrent })
      //console.log("here")
      window.location.href=`${frontEndIP}/matchingList`
      this.props.setAnswer(this.state.sequence,this.props.auth.user.id);
     

    }
  }



  display(){
    if(this.state.currentQuestion<=10)
    return this.displayQuestions();
    else{
      var temp=[]
      this.state.users.forEach(user=>{
        let i=1;
        if(user._id!==this.state.currentUserID){
        temp.push(<div key={i}><p>{user.name}</p> <br/></div>)
        i++;
      }
        })
        return temp
    }

  } 
  render(){
    if(this.props.auth.isAuthenticated)
    return (
      <div className="Quiz-image">
  <div className="Quiz">
    
      {this.display()}
  
</div>
      </div>
    );
    else
    return<div>Not Authenticated</div>
  }
}

const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
  quiz:state.quiz
})

export default connect(mapStateToProps,{addTOSequence,setAnswer,getMatchingList})(Quiz);

