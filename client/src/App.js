import React ,{Component}from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Quiz from './components/pages/Quiz'
import Login from './components/pages/Login'
import MatchingList from './components/pages/MatchingList.js'

import { connect } from 'react-redux'

//import { connect } from 'react-redux'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render(){
    return (
      <div className="App">
        <Router>
               <Route exact path="/matchingList" component={MatchingList} />
              <Route exact path="/quiz" component={Quiz} />
               <Route exact path="/" component={Login} />
        </Router>

      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(App);

