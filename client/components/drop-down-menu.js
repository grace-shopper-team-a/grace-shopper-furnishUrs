import React from 'react'
import {Link} from 'react-router-dom'

export class Dropdown extends React.Component {
  constructor() {
    super()

    this.state = {
      displayMenu: false
    }

    this.showDropdownMenu = this.showDropdownMenu.bind(this)
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this)
  }

  showDropdownMenu(event) {
    event.preventDefault()
    this.setState({displayMenu: true}, () => {
      document.addEventListener('click', this.hideDropdownMenu)
    })
  }

  hideDropdownMenu() {
    this.setState({displayMenu: false}, () => {
      document.removeEventListener('click', this.hideDropdownMenu)
    })
  }

  render() {
    return (
      <div className="dropdown">
        <div className="button" onClick={this.showDropdownMenu}>
          {' '}
          Shop{' '}
        </div>

        {this.state.displayMenu ? (
          <ul>
            <Link to="/chair">
              <li>
                <a>Chair</a>
              </li>
            </Link>
            <Link to="/table">
              <li>
                <a>Table</a>
              </li>
            </Link>
            <Link to="/couch">
              {' '}
              <li>
                <a>Couch</a>
              </li>
            </Link>
            <Link to="/bed">
              {' '}
              <li>
                <a>Bed</a>
              </li>
            </Link>
            <Link to="/drawers">
              <li>
                <a>Drawers</a>
              </li>
            </Link>
          </ul>
        ) : null}
      </div>
    )
  }
}

// export default Dropdown;
