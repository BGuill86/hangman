import React, { Component } from 'react';
import './App.css';

import Letter from './Letter'

const words = ['rhinocéros laineux','ours blanc', 'panthère des neiges']
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

  componentDidMount(){
    this.initGame()
  }

  // componentDidUpdate(){
  //   console.log(this.state)
  // }

  initGame = () => {
    const solution = words[Math.floor(Math.random() * words.length)]
    this.setState({
      wrongClickedLetters: [],
      solution: solution,
      wordToFind: [...solution].map((letter) => (letter === ' ') ? ' ' : '_').join('')
    })
  }

  clickLetter = e => {
    const letter = e.target.innerText.toLowerCase()
    const { solution, wordToFind, wrongClickedLetters } = this.state
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
      if (wrongClickedLetters.length === 10) {
        alert('game over !')         
      }
    }
  }

  showFirstLetters = () => {
    const { solution, wordToFind } = this.state
    this.setState({
      wordToFind: [...wordToFind].map((letter, index) => {
        return (index === 0 || wordToFind[index-1] === ' ') ? solution[index] : wordToFind[index]
      }).join('')
    })    
  }

  showSolution = () => {
    this.setState({
      wordToFind: this.state.solution
    })
  }

  render() {
    const { wordToFind, wrongClickedLetters } = this.state
    const clickLetters = [...alphabet].map((letter, index) => {
      let clicked = 'unclicked'
      if (wordToFind && wordToFind.includes(letter)) { clicked = 'correct' }
      if (wrongClickedLetters && wrongClickedLetters.includes(letter)) { clicked = 'wrong' }
      return (
        <Letter
          clickLetter={this.clickLetter}
          clicked={clicked}
          letter={letter}
          key={index}
        />
      )
    })
    return (
      <div className="App">
        <header>
          {'Welcome to the Hangman...'}
        </header>
        <div className="wordToFind">{wordToFind}</div>
        <div className="alphabet">
          {clickLetters}
        </div>
        {
          wrongClickedLetters 
          &&  <div className="wrongClickedLetters">
                Erreurs : {wrongClickedLetters.length}/10
              </div>
        }
        <button onClick={this.showFirstLetters}>Help</button>
        <button onClick={this.showSolution}>Solution</button>
        <button onClick={this.initGame}>Restart</button>
      </div>
    );
  }
}

export default App;
