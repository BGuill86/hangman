import React, { Component } from 'react';
import './App.css';
import hangman from './hangman.png'
var animals = require('animals');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solution: '',
      wordToFind: '',
      wrongClickedLetters: []
    }
  }

  componentDidMount() {
    this.initGame()
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  escFunction = e => {
    if (!(e.keyCode >= 65 && e.keyCode <= 90)) return
    const letter = String.fromCharCode(e.keyCode).toLowerCase()
    this.tryLetter(letter)
  }

  initGame = () => {
    const solution = animals()
    this.setState({
      wrongClickedLetters: [],
      solution: solution,
      wordToFind: [...solution].map((letter) => (letter === ' ') ? ' ' : '_').join('')
    })
  }

  clickLetter = e => {
    const letter = e.target.innerText.toLowerCase()
    this.tryLetter(letter)
  }

  tryLetter = letter => {
    const { solution, wordToFind, wrongClickedLetters } = this.state
    if (wrongClickedLetters.includes(letter)) return
    if (solution.includes(letter)) {
      const solutionInProgress = [...solution].map((l, i) => l === letter ? l : wordToFind[i])
      this.setState({
        wordToFind: solutionInProgress
      })
    } else {
      wrongClickedLetters.push(letter)
      this.setState({
        wrongClickedLetters: wrongClickedLetters
      })
    }
  }

  render() {
    const { wordToFind, solution, wrongClickedLetters } = this.state

    const limit = solution.length 
    const gameOver = wrongClickedLetters.length >= limit
    const success = [...wordToFind].join('') === solution

    const clickLetters = [...alphabet].map((letter, index) => {
      let clicked = 'unclicked'
      if (wordToFind && wordToFind.includes(letter)) { clicked = 'correct' }
      if (wrongClickedLetters && wrongClickedLetters.includes(letter)) { clicked = 'wrong' }
      return (
        <span
          className={`letter ${clicked}`}
          onClick={this.clickLetter}
          key={index}
	      >
	      {letter}
	    </span>
      )
    })
    return (
      <div className="App">
        <header>
          <h1>
            <img src={hangman} alt='Pendu' /> 
          </h1>
        </header>
        {
          !gameOver && !success
          && <section className="game">
            <div className="wordToFind">{wordToFind}</div>
            <div className="alphabet">
                {clickLetters}
            </div>
            <div className="wrongClickedLetters">
              Erreurs permises : {wrongClickedLetters.length}/{limit}
            </div>
          </section>
        }
        {
          gameOver
          && <section className="failure">
            Dommage, la solution était "{solution}"...nouvel essai ?
          </section>
        }
        {
          success 
          && <section className="success">
            Bravo, vous avez trouvé "{solution}" !
          </section>
        }
        { (gameOver || success) && 
          <button className="restart-btn" autoFocus onClick={this.initGame}>Commencer une autre partie</button> }
      </div>
    );
  }
}

export default App;
