import React ,{Component}from 'react';
import { connect } from 'react-redux'
import {addTOSequence,setAnswer,getMatchingList } from '../../globalStore/actions/quizActions'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom';
import {logoutUser} from '../../globalStore/actions/authActions'

import {Card,Image} from 'react-bootstrap'
import girl from '../../assessments/girl.jpg';
import boy from '../../assessments/boy.jpg';
import non from '../../assessments/non.jpg';

import cry from '../../assessments/crying.png';

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
    this.props.getMatchingList();
  }

  onClick(key) {

  }
  getThelist(){
    let MatchedList=[];
  //  console.log(this.props.quiz.matchingUsers)
    for(var user of this.props.quiz.matchingUsers){
        let image =user.gender==="MALE"?<Image src={boy} roundedCircle style={{width: 360,height: 370 ,marginLeft:'4%'}} /> :
        (user.gender==="FEMALE"? <Image src={girl} roundedCircle style={{width: 360,height: 370 ,marginLeft:'4%'}} />:
        <Image src={non} roundedCircle style={{width: 360,height: 370 ,marginLeft:'4%'}} />)
    MatchedList.push( <Carousel.Item style={{ backgroundColor:'#DC4773'}}>
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
   else {
     return(
    <div style={{ backgroundColor:'#DC4773'}}>

   <Card style={{ width:'50%',height:'100%' ,marginLeft:'25%'}}>
   <Image src={cry} roundedCircle style={{width: 360,height: 370 ,marginLeft:'4%'}} />
<Card.Body>
  <Card.Title>Sorry :( </Card.Title>
  <Card.Text style={{ marginBottom:'25%'}}>
  For that no one is matching with you till now
  </Card.Text>
</Card.Body>
</Card>
 </div>)
    }

  }

   handleSelect  (selectedIndex, e) {
    this.setState({index :selectedIndex})
    this.setState({direction :e.direction})
  };
  render(){
    return (
        <div  className="MatchList">
        <div style={{width:'50%',height:'50%',position: 'absolute',left: '25%',top:'7%', backgroundColor:'#DC4773' }} >

   <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
    
  {this.getThelist()}
    </Carousel>
    <div>
   <button type="button" class="btn btn-outline-secondary" 
   style={{position:'absolute',top:'-10%',right:'-30%',left:'135%'}}
   onClick={() => this.props.logoutUser()}
   >
   Logout
   </button>
   </div>
    </div>
    </div>
)
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
  quiz:state.quiz

})

export default connect(mapStateToProps,{logoutUser,addTOSequence,setAnswer,getMatchingList})(MatchingList);



