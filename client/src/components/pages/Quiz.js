import React ,{Component}from 'react';
import axios from "axios";


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
      currentQuestion:0
    }
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    const workingUrl=`http://localhost:3333/routes/api/questions`
    axios.get(workingUrl).then(res =>{
    var tempQuestions=[]
    var tempAnswers=[]
    res.data.data.forEach(element => {
      tempQuestions.push(element.question)
      tempAnswers.push(element.answers)
    });
    this.setState({questions:tempQuestions})
    this.setState({answers:tempAnswers})

    console.log(this.state.questions)
    console.log(this.state.answers[0][0])

    }
    ).catch(e => {
       console.log(e)
    });
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
    }
  }
  displayQuestions(){
    if(this.state.currentQuestion<10){
return(<div>
<ToggleButtonGroup name="qut" type="radio" value={this.state.value} onChange={this.onChange}>
    
<ToggleButton value={1} >{this.state.answers[this.state.currentQuestion][0]}</ToggleButton>
<br />
<ToggleButton value={2}>{this.state.answers[this.state.currentQuestion][1]}</ToggleButton>      
<br />
<ToggleButton value={3}>{this.state.answers[this.state.currentQuestion][2]}</ToggleButton>
<br />
<ToggleButton value={4}>{this.state.answers[this.state.currentQuestion][3]}</ToggleButton>
</ToggleButtonGroup>
<Button variant="secondary"onClick={this.handleClick}>Next </Button>
</div>
);
    }else{
      const workingUrl=`http://localhost:3333/routes/api/quizzes`
      const id ='5dd4552460124e107a6057f5';
      var matching=[];
      axios.post(workingUrl+`/${id}`,{sequence:this.state.sequence}).then(res =>{
      matching=res.data.data.users; 
      console.log(res.data)
      var temp;
      matching.forEach(user=>{
      if(user._id!==id)
      temp.push(<div><p>{user.name}</p> <br/></div>);
      })
      console.log(matching)  
      console.log(temp)  

      return(<div>
      {temp}
      </div>
        )
      }
      ).catch(e => {
         console.log(e)
      });

    }
  }
  
  render(){
    
    return (
  <div className="Quiz">
    <Card className="text-center">
    <Card.Header>{this.state.questions[this.state.currentQuestion]}</Card.Header>
    <Card.Body>
      {this.displayQuestions()}
    </Card.Body>
  
    </Card>

      </div>
    );
  }
}

export default Quiz;
