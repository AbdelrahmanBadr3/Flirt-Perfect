import React ,{Component}from 'react';
import { connect } from 'react-redux'
import {addTOSequence,setAnswer } from '../../globalStore/actions/quizActions'
import Carousel from 'react-bootstrap/Carousel'
//Button,ToggleButtonGroup,ToggleButton
import { Link } from 'react-router-dom';

import {Card,Image} from 'react-bootstrap'
import girl from '../../assessments/girl.jpg';
import boy from '../../assessments/boy.jpg';
import non from '../../assessments/non.jpg';
//import Moment from 'react-moment';

//import { connect } from 'react-redux'
import './MatchingList.css';

class MatchingList extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
        direction:null,
        index:0
    }
    this.onClick = this.onClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    }
  componentDidMount(){
  }
  onClick(key) {
    
  }
  getThelist(){
    let MatchedList=[];
    console.log(this.props.quiz.matchingUsers)
    for(var user of this.props.quiz.matchingUsers){
        let image =user.gender==="MALE"?<Image src={boy} roundedCircle style={{width: 370,height: 370 ,marginLeft:'4%'}} /> :
        (user.gender==="FEMALE"? <Image src={girl} roundedCircle style={{width: 370,height: 370 ,marginLeft:'4%'}} />:
        <Image src={non} roundedCircle style={{width: 370,height: 370 ,marginLeft:'4%'}} />)
    MatchedList.push( <Carousel.Item style={{ backgroundColor:'#c47ba5'}}>
    <Card style={{ width:'50%',height:'100%' ,marginLeft:'25%'}}>
  {image}
<Card.Body>
  <Card.Title><Link to={`/users/${user.id}`} style={{ color: "#3192a0" ,marginLeft:5 }} >{user.name}</Link></Card.Title>
  <Card.Text>
  </Card.Text>
</Card.Body>
</Card>
  </Carousel.Item>)
   }
   if(MatchedList.length>0) return(MatchedList)
   else return(
    <Carousel.Item style={{ backgroundColor:'#c47ba5'}}>
   <Carousel.Caption>
      <h1>Sorry :(</h1>
      <p>For that no one is matching with you till now </p>
    </Carousel.Caption>

  </Carousel.Item>
   )
/*
    <Carousel.Item style={{ backgroundColor:'black'}}>
    <Card style={{ width:'50%',height:'100%' ,marginLeft:'25%'}}>
    <Image src={boy} roundedCircle style={{width: 370,height: 370 ,marginLeft:'4%'}} />
        <Card.Body>
  <Card.Title>User Name</Card.Title>
  <Card.Text>
    Some quick example text to build on the card title and make up the bulk of
    the card's content.
  </Card.Text>
  <Button variant="primary">Go somewhere</Button>
    </Card.Body>
    </Card>
  </Carousel.Item>*/

  }

   handleSelect  (selectedIndex, e) {
    this.setState({index :selectedIndex})
    this.setState({direction :e.direction})
  };
  render(){
    return (
        <div  className="MatchList">
        <div style={{width:'50%',height:'50%',position: 'absolute',left: '25%',top:'7%', backgroundColor:'#c47ba5' }} >

   <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
    
  {this.getThelist()}
    </Carousel>
      </div>
      </div>
)
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
  quiz:state.quiz,
})

export default connect(mapStateToProps,{addTOSequence,setAnswer})(MatchingList);



