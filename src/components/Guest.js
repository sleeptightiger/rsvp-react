import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GuestName from './GuestName.js';

class Guest extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <li>
        <GuestName
          isEditing={this.props.isEditing}
          handleNameEdits={e => this.props.setName(e.target.value)}>
          {this.props.name}
        </GuestName>
        <label>Confirm
          <input type="checkbox" className="filterCheck" checked={this.props.isConfirmed} onChange={this.props.handleConfirmation}/>
        </label>
        <button onClick={this.props.handleToggleEditing} className="edit">
          {this.props.isEditing ? "save" : "edit"}
        </button>
        <button onClick={this.props.handleRemove} className="remove">remove</button>
      </li>
    );
  }
}

Guest.propTypes = {
  name: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handleToggleEditing: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Guest;
