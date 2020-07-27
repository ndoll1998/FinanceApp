import React from 'react'
import './Header.css'

class Header extends React.Component {

    render() {
        return <div className="header">
            { this.props.children }
        </div>
    }
}

export default Header;