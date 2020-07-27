import React from 'react';
import './Button.css'

class PrimaryButton extends React.Component {
    render() { return (
        <div 
            className={'button primary-button ' + this.props.className} 
            onClick={ this.props.onClick }>{ this.props.children }
        </div>
    )}
}

class SecondaryButton extends React.Component {
    render() { return (
        <div 
            className={'button secondary-button ' + this.props.className} 
            onClick={ this.props.onClick }>{ this.props.children }
        </div>
    )}
}

export { PrimaryButton, SecondaryButton };