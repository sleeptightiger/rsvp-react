import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Guest from './Guest.js';
import PendingGuest from './PendingGuest';

class GuestList extends Component {

  render() {
    let guests = [];
    if(this.props.guests.length) {
      guests = this.props.guests
                      .filter(guest => !this.props.isFiltered || guest.isConfirmed)
                      .map((guest, index) => {

        return <Guest
                  key={index}
                  name={guest.name}
                  isConfirmed={guest.isConfirmed}
                  isEditing={guest.isEditing}
                  handleConfirmation={() => this.props.toggleConfirmation(index)}
                  handleToggleEditing={() => this.props.toggleEditing(index)}
                  setName={text => this.props.setNameAt(text, index)}
                  handleRemove={() => this.props.removeGuestAt(index)} />;
      });
    } 

    return (
      <ul className="invitedList">
        <PendingGuest name={this.props.pendingGuest} />
        {guests}
      </ul>
    );
  }
}

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmation: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  removeGuestAt: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired,
}

export default GuestList;
