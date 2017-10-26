import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { actions as modalsActions } from 'modules/modals';
import { APP_NAVBAR, generateKey, MODAL_NAMES } from 'utils';

class AppNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navIsOpen: false
    };
  }

  navToggle = () => this.setState({ navIsOpen: !this.state.navIsOpen });

  addNewPost = () => this.props.toggleModal(MODAL_NAMES.NEW_POST_MODAL);

  renderNavItems = () => {
    return APP_NAVBAR.map(item => (
      <NavItem key={generateKey()}>
        <NavLink exact to={item.href} tag={RouterNavLink} activeClassName="active">
          {item.name}
        </NavLink>
      </NavItem>
    ));
  };

  renderNewPostNavItem = () => {
    return (
      <NavItem>
        <NavLink onClick={this.addNewPost}>Add New Post</NavLink>
      </NavItem>
    );
  };

  render() {
    const { navIsOpen } = this.state;
    const { brand } = this.props;

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand to="/" tag={RouterNavLink}>
            {brand}
          </NavbarBrand>
          <NavbarToggler onClick={this.navToggle} />
          <Collapse isOpen={navIsOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.renderNavItems()}
              {this.renderNewPostNavItem()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

AppNav.propTypes = {
  brand      : PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default connect(null, {
  toggleModal: modalsActions.toggleModalById
})(AppNav);
