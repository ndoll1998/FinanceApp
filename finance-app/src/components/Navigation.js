import React from 'react'
import { NavLink } from 'react-router-dom'
import {v4 as uuid} from 'uuid'
// import stylesheet
import './Navigation.css'

class NavItem extends React.Component {
    render() { return (
        <li className={"nav-item"}>
            <NavLink to={this.props.attrs.to}>
                <div className="color-bar"></div>
                <div className="title">{ this.props.attrs.title }</div>
            </NavLink>
            <i className="fa fa-close" onClick={this.props.remove}></i>
        </li>
    )}
}

class Nav extends React.Component {
    state = { items:[] }

    static getDerivedStateFromProps(props, state) {
        // dynamically update state on props change
        // copy items to state
        state.items = props.items;
        // return state
        return state;
    }

    removeItemAtIndex(i) { 
        // call onRemove callback
        if (this.state.items[i].onRemove !== undefined)
            this.state.items[i].onRemove();
        // copy items and remove element at given index
        var items = this.state.items.slice();
        items.splice(i, 1);
        // update state
        this.setState({ items });
    }

    render() { return (
        <ul className={(this.props.className)? ("nav-bar " + this.props.className) : "nav-bar" }>
            { this.state.items.map((item, index) => 
                <NavItem 
                    key={uuid()} 
                    attrs={item} 
                    remove={() => this.removeItemAtIndex(index)} 
                />
            )}
        </ul>
    )}
}

export default Nav;