import React ,{Component}from 'react';
import { connect } from 'react-redux'
import { setQuestions } from '../../globalStore/actions/quizActions'
import { loginUser } from '../../globalStore/actions/authActions'


//import {Card,Button,ToggleButtonGroup,ToggleButton} from 'react-bootstrap'
import './Login.css';

class Login extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      value:0,
      questions:[],
      answers:[[]],
      sequence:[],
      currentQuestion:0,
      users:[],
      currentUserID:'5dd4552460124e107a6057f5'
    }
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }
  onChange(e) {
    console.log(e)
    this.setState({ value: e })
  }

  componentWillReceiveProps(nexProps){
    if(nexProps.auth.isAuthenticated){
      if(nexProps.auth.user.emailVerified){
        if( nexProps.auth.user.tags.length===0) window.location.href="http://localhost:3000/startAs"
        else{
          if( nexProps.auth.user.tags.length>0) window.location.href="http://localhost:3000/HomePage"
    }
    }
     else  window.location.href="http://localhost:3000/verificationpage"
    }
    if(nexProps.errors){
      this.setState({errors:nexProps.errors})
    }
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
 
 
  render(){
    
    return (
      <div>
  <div className="Login"> </div>  
      <div className="Bg-text">
      <h1>Find Your </h1>
      <h1>Perfect Match</h1>
      <h3>Everyone wants to find a special person they truly connect with. Countless pieces of literature,</h3>
      <h3> music and art have confronted this same goal,Romance can be a struggle, but also an inspiring muse.</h3>
      <h3>  If you're willing to work for it and truly believe there is someone special for you, you can find love.</h3>
      </div></div>
    );
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
  questions:state.questions
})

export default connect(mapStateToProps,{loginUser,setQuestions})(Login);