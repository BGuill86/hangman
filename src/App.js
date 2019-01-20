import React, { Component } from 'react';
import './App.css';
import hangman from './hangman.png'

import Letter from './Letter'

const words = [
  'ornithorynque',
  'globicephale',
  'rhinoceros',
  'orycterope',
  'dugong',
  'tamanoir',
  'requin',
  'capybara',
  'lycaon',
  'gavial',
  'phacochere',
  'hippopotame'
]
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

  componentDidUpdate(){
    console.log(this.state)
  }

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

/*  showFirstLetters = () => {
    const { solution, wordToFind } = this.state
    this.setState({
      wordToFind: [...wordToFind].map((letter, index) => {
        return (index === 0 || wordToFind[index-1] === ' ') ? solution[index] : wordToFind[index]
      }).join('')
    })    
  }

  <button onClick={this.showFirstLetters}>Help</button>
  <button onClick={this.showSolution}>Solution</button>


  showSolution = () => {
    this.setState({
      wordToFind: this.state.solution
    })
  }*/

  render() {
    const { solution, wordToFind, wrongClickedLetters } = this.state

    const limit = solution.length 
    const gameOver = wrongClickedLetters.length === limit
    const success = [...wordToFind].join('') === solution

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
            Dommage... nouvel essai ?
          </section>
        }
        {
          success 
          && <section className="success">
            Bravo, vous avez trouvé "{wordToFind}" !
          </section>
        }
        { (gameOver || success) && <button className="restart-btn" onClick={this.initGame}>Commencer une autre partie</button> }
     </div>
    );
  }
}

export default App;
