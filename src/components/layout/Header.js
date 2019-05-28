import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => {
  const { branding } = props;

  return (
    <div>

      <nav className="navbar navbar-expand-sm bg-dark mb-3 w-100 p-3 py-0">
        <div className="container">
          <a href="/" className="navbar-brand text-danger">{branding}</a>
        </div>

        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                <i className="fas fa-home"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact/add" className="nav-link text-light">
                <i className="fas fa-plus"></i>
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-light">
                <i className="fas fa-question"></i>
                About
              </Link>
            </li>
          </ul>
        </div>

      </nav>
    </div >
  )
}

/* Default Prop Value*/
Header.defaultProps = {
  branding: ''
};

/* Type Checking */
Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;