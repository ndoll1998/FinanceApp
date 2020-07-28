import React from 'react'
import './Slidable.css'

class Slidable extends React.Component {
    state = { inView: false }

    slideIn = () => { this.setState({ inView: true }); }
    slideOut = () => { this.setState({ inView: false }); }

    getClassName = () => {
        // build classname from state and props
        var className = (this.state.inView)? "slidable " : "slidable slide-out-top ";
        className += (this.props.className)? this.props.className : "";
        return className;
    }

    render() { return (
        <div className={this.getClassName()}>
            <i className="fa fa-close" onClick={this.slideOut}></i>
            { this.props.children }
        </div>
    )}
}

export default Slidable