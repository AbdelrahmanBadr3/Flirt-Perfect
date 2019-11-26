import React ,{Component}from 'react';
import { connect } from 'react-redux'
import { setQuestions } from '../../globalStore/actions/quizActions'
import { loginUser } from '../../globalStore/actions/authActions'


//import {Card,Button,ToggleButtonGroup,ToggleButton} from 'react-bootstrap'
import './Login.css';

class Profile extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      value:0,
      questions:[],
      answers:[[]],
      sequence:[],
      currentQuestion:0,
      users:[],
      currentUserID:'5ddabbba034ab335ac918850'
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
 <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
      </div>
    );
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
})

export default connect(mapStateToProps,{})(Profile);