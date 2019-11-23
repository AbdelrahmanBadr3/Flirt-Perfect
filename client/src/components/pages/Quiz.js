import React ,{Component}from 'react';
import axios from "axios";
import { connect } from 'react-redux'
import {addTOSequence,setAnswer } from '../../globalStore/actions/quizActions'


import {Card,Button,ToggleButtonGroup,ToggleButton} from 'react-bootstrap'

//import { connect } from 'react-redux'
import './Quiz.css';

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
      //currentUserID:'5dd4552460124e107a6057f5'
    }
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    var tempQuestions=[]
    var tempAnswers=    []
    this.props.quiz.questions.forEach(element => {
      tempQuestions.push(element.question)
      tempAnswers.push(element.answers)
    });
    this.setState({questions:tempQuestions})
    this.setState({answers:tempAnswers})

   // console.log(this.state.questions)
   // console.log(this.state.answers[0][0])

   
  }
  onChange(e) {
    console.log(e)
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
    }
  }
  displayQuestions(){
    if(this.state.currentQuestion<10){
return(<div>
  
  <ToggleButtonGroup name="quiz" type="radio" value={this.state.value} onChange={this.onChange}>
    
    <ToggleButton value={1} variant="outline-danger" >{this.state.answers[this.state.currentQuestion][0]}</ToggleButton>
    <ToggleButton value={2}variant="outline-danger">{this.state.answers[this.state.currentQuestion][1]}</ToggleButton>    
<br/>  
    <ToggleButton value={3}variant="outline-danger">{this.state.answers[this.state.currentQuestion][2]}</ToggleButton>
    <ToggleButton value={4}variant="outline-danger">{this.state.answers[this.state.currentQuestion][3]}</ToggleButton>
    </ToggleButtonGroup>
    <br/>
<Button variant="secondary" onClick={this.handleClick}>Next </Button>
</div>
);
    }else{
      const tempCurrent= this.state.currentQuestion+1;
      this.setState({ currentQuestion: tempCurrent })
      console.log("here")
      this.props.setAnswer(this.state.sequence,this.props.auth.user.id);
return(<div>Done with Quiz</div>)
     // this.props.setAnswer(tempSequence,this.props.auth.id);


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
  <div className="Quiz">
    
    <Card className="text-center">
    <Card.Header><h1>{this.state.questions[this.state.currentQuestion]}</h1></Card.Header>
    <Card.Body>
      {this.display()}
    </Card.Body>
  
    </Card>

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

export default connect(mapStateToProps,{addTOSequence,setAnswer})(Quiz);

