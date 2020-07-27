import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

class NavItem extends React.Component {
    render() { return (
        <li className={"nav-item"}>
            <NavLink to={this.props.attrs.to}>
                <div className="color-bar"></div>
                <div className="title">{ this.props.attrs.title }</div>
            </NavLink>
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

    render() { return (
        <ul className={"nav-bar " + this.props.className }>
            { this.state.items.map(item => 
                <NavItem key={item.title} attrs={item} />
            )}
        </ul>
    )}
}

export default Nav;