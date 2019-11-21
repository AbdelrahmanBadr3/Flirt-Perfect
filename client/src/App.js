import React ,{Component}from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Quiz from './components/pages/Quiz'

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
               <Route exact path="/quiz" component={Quiz} />
        </Router>

      </div>
    );
  }
}

export default App;
