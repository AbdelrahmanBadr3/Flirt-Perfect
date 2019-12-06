import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTOSequence, setAnswer } from '../../globalStore/actions/quizActions'

//Button,ToggleButtonGroup,ToggleButton
import { Card, CardDeck, ToggleButton, ButtonGroup, Badge, Button } from 'react-bootstrap'
import ImageSrc from '../../assessments/quiz7.gif';

//import { connect } from 'react-redux'
import './QuizTemplate.css';

class QuizTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colors: ['outline-secondary', 'outline-secondary', 'outline-secondary', 'outline-secondary', 'outline-secondary']
    }
    this.onClick = this.onClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
  }

  onClick(key) {
    let temp = this.state.colors
    for (let j = 1; j < 5; j++)
      if (j === key) temp[j] = 'secondary'
      else temp[j] = temp[0]
    this.setState({ colors: temp })
    this.props.onChange(key)
  }
  handleClick() {
    this.setState({ colors: ['outline-secondary', 'outline-secondary', 'outline-secondary', 'outline-secondary', 'outline-secondary'] })
    this.props.handleClick()

  }
  render() {
    return (
      <div className="Quiz">
        <Card>
          <Card.Body>

            <CardDeck>
              <Card style={{ marginRight: '0px' }}>
                <Card.Img variant="top" src={ImageSrc} />


              </Card>
              <Card style={{ marginLeft: '0px' }}>
                <Card.Body>
                  <Card.Title><h4><Badge variant="dark">{this.props.count + 1}</Badge> {this.props.question}</h4></Card.Title>
                  <div className="d-flex flex-column">
                    <ButtonGroup toggle className="mt-3">
                      <ToggleButton variant={this.state.colors[1]} type="radio" onClick={() => this.onClick(1)} >
                        {this.props.answers[0]}
                      </ToggleButton>
                    </ButtonGroup>
                    <ButtonGroup toggle className="mt-3">
                      <ToggleButton variant={this.state.colors[2]} type="radio" onClick={() => this.onClick(2)}>
                        {this.props.answers[1]}
                      </ToggleButton>
                    </ButtonGroup>
                    <ButtonGroup toggle className="mt-3">
                      <ToggleButton variant={this.state.colors[3]} type="radio" onClick={() => this.onClick(3)}>
                        {this.props.answers[2]}
                      </ToggleButton>
                    </ButtonGroup>
                    <ButtonGroup toggle className="mt-3">
                      <ToggleButton variant={this.state.colors[4]} type="radio" onClick={() => this.onClick(4)}>
                        {this.props.answers[3]}
                      </ToggleButton>
                    </ButtonGroup>
                  </div>
                </Card.Body>
                <Button variant="dark" size="lg" block onClick={this.handleClick}>
                  Next</Button>
                  

              </Card>
            </CardDeck>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  quiz: state.quiz
})

export default connect(mapStateToProps, { addTOSequence, setAnswer })(QuizTemplate);


