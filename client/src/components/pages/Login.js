import React ,{Component}from 'react';
import { connect } from 'react-redux'
import { setQuestions } from '../../globalStore/actions/quizActions'
import { loginUser ,registerUser} from '../../globalStore/actions/authActions'
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal.js";

import {ButtonToolbar,Button} from 'react-bootstrap'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

import "react-datepicker/dist/react-datepicker.css";
import './Login.css';
const fbConfig = require('../../config/firebase');


firebase.initializeApp(fbConfig);

const genderOptions=[
  {
    label: 'Not Specefied',
    value: 'NOTSPECEFIED'
  },
  {
    label: 'Female',
    value: 'FEMALE'
  },
  {
    label: 'Male',
    value: 'MALE'
  }
]

class Login extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      email:'',
      password:'',
      password2:'',
      gender:'NOTSPECIFED',
      dateOFBirth: new Date(),
      isShow:false,
      isShow1:false,
      isSignedIn: false
    }

  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  }
  setModalShow = (show)=>{
    this.setState({isShow:show})
}  
setModalShow1 = (show)=>{
  this.setState({isShow1:show})
}  
onChange = (e)=>{
  e.preventDefault();
  this.setState({[e.target.name]:e.target.value})
}
onSubmitLogin = (e)=>{
  e.preventDefault();
  const userData = {
      email:this.state.email,
      password:this.state.password
  }

 this.props.loginUser(userData)
 this.props.setQuestions()
}
onSubmitSignUp = (e)=>{
  e.preventDefault();
  if(this.state.password!==this.state.password2)
  alert(
    'enter the same passwords'
  )
  else{
  const newUser = {
    name:this.state.username,
    email:this.state.email,
    password:this.state.password,
    gender:this.state.gender,
    dateOFBirth:this.state.dateOFBirth

  }
  this.props.registerUser(newUser);
}
}


handleChange=(date) =>{
  console.log(date)
  this.setState({     
    dateOFBirth: new Date(date)
  });
}
handleChangeSelect = (newValue, actionMeta) => {
  console.group('Value Changed');
  console.log(newValue);
  console.log(`action: ${actionMeta.action}`);
  this.setState({gender:newValue.value})
  console.groupEnd();
};
  componentWillReceiveProps(nexProps){
    if(nexProps.auth.isAuthenticated){
      if(nexProps.auth.user.emailVerified){
        if( nexProps.auth.user.tags.length===0) window.location.href="http://localhost:3000/startAs"
        else{
          if( nexProps.auth.user.tags.length>0) window.location.href="http://localhost:3000/HomePage"
           }
    }
     else  window.location.href="http://localhost:3000/quiz"
    }
    if(nexProps.errors){
      this.setState({errors:nexProps.errors})
    }
  }
  
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
 
 
  render(){
    return (
      <div>
  <div className="Login"> </div>  
      <div className="Bg-text">
      <h1>Find Your </h1>
      <h1>Perfect Match</h1>
      <h4>Everyone wants to find a special person they truly connect with. Countless pieces of literature,</h4>
      <h4> music and art have confronted this same goal,Romance can be a struggle, but also an inspiring muse.</h4>
      <h4>  If you're willing to work for it and truly believe there is someone special for you, you can find love.</h4>
      <ButtonToolbar>
      <Button variant="danger" onClick={() => this.setModalShow(true)}>
      Login
    </Button>
  
    <MyVerticallyCenteredModal
        show={this.state.isShow}
        onHide={() => this.setModalShow(false)}
        onChange={this.onChange}
        onSubmit={this.onSubmitLogin}
        password={this.state.password}
        email={this.state.email}
      
        type={'false'}

      />
      
       <Button variant="light" onClick={() => this.setModalShow1(true)} style={{ marginLeft: 10}}>
      Register
    </Button >
    <MyVerticallyCenteredModal
       show={this.state.isShow1}
       onHide={() => this.setModalShow1(false)}
       onChange={this.onChange}
       onSubmit={this.onSubmitSignUp}
       username={this.state.username}
       password={this.state.password}
       password2={this.state.password2}
       email={this.state.email}
       dateOFBirth={this.state.dateOFBirth}
       handleChange={this.handleChange}
       gender={this.gender}
       genderOptions={genderOptions}
       handleChangeSelect={this.handleChangeSelect}
       type={'true'}
      />
  </ButtonToolbar> 
<div className="Bg-Signin">  <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          /></div>
      </div>
    
              
      </div>
    );
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
  questions:state.questions
})

export default connect(mapStateToProps,{loginUser,setQuestions,registerUser})(Login);