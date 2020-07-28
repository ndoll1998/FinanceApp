import React from 'react'
// import stylesheet
import './Separator.css'

class Separator extends React.Component {
    render() { return (
        <div 
            className="separator" 
            title={this.props.title}
        />
    )}
}

class SeparatorButton extends React.Component {
    render() { return (
        <div 
            className="separator separator-button"
            title={this.props.title}
            onClick={this.props.onButtonClick}
        />
    )}
}

export { SeparatorButton }
export default Separator;