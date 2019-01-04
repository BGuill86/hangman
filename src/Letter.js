import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Letter.css'

class Letter extends Component {

  yooo = (e) => {
	console.log(e.target)
	this.props.clickLetter(e)
  }
  render() {
	  return (
	    <span
	      className={`letter ${ this.props.clicked }`}
	      onClick={this.yooo}
	      >
	      {this.props.letter}
	    </span>
	  )
  }
}

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  clicked: PropTypes.string.isRequired,
}

export default Letter