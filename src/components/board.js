import React from 'react';

import './board.css';
import AddForm from './addForm.js';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          answer: Math.floor((Math.random() * 100) + 1),
          message: "Play the Game",
          guess: '',
          history: []
        };
    }

    messageHot() {
      this.setState({
        message: "Hot"
      });
    }

    messageCold() {
      this.setState({
        message: "Cold"
      });
    }

    messageDefault() {
      this.setState({
        message: "Play the Game"
      });
    }

    messageCorrect() {
      this.setState({
        message: "Correct!"
      });
    }

    messageError(msg) {
      this.setState({
        message: msg
      });
    }

    setAnswer() {
      this.setState({
        answer: Math.floor((Math.random() * 100) + 1)
      });
    }

    setGuess(guess) {
      guess = parseInt(guess);
      if(this.state.history.includes(guess)) {
        this.messageError("You've already tried this number");
      }
      else {
        this.setState(
          {guess},
          () => {
            this.setMessage();
            this.addGuessToHistory(guess);
          }
        );
      }
    }

    addGuessToHistory(guess) {
      this.setState({
        history: [...this.state.history, parseInt(guess)]
      });
    }

    resetGuess() {
      this.setState({
        guess: ''
      });
    }

    resetGuessHistory() {
      this.setState({
        history: []
      })
    }

    setMessage() {

      if(this.state.guess == this.state.answer) {
        this.messageCorrect();
      }
      else if(Math.abs(this.state.guess - this.state.answer) < 21 ) {
        this.messageHot();
      }
      else {
        this.messageCold();
      }
    }

    onRestart() {
      this.messageDefault();
      this.setAnswer();
      this.resetGuess();
      this.resetGuessHistory();
    }

    render() {

      const list = this.state.history.map((guess, index) => {
        return (
          <li key={index} className="prevGuess">
            {guess}
          </li>
        );
      });

      return(
        <div>
          <h1>Welcome to the Guessing Game!</h1>
          <div className="board">
            <div className="section message">
              {this.state.message}
            </div>
            <div className="section guessForm">
              <AddForm onSubmit={guess => this.setGuess(guess)}/>
            </div>
            <div className="section guessHistory">
              <ul className="guessList">
                {list}
              </ul>
            </div>
          </div>
          <button className="restart" onClick={e => this.onRestart(e)}>Restart</button>
        </div> 
      );
    }
    
}