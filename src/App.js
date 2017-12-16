import React, { Component } from 'react';
import GuestList from './components/GuestList.js';
import Counter from './components/Counter.js';
import { base } from './base';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFiltered: false,
      pendingGuest: "",
      guests: [],
    }
    this.getTotalInvited = this.getTotalInvited.bind(this);
    this.toggleGuestProp = this.toggleGuestProp.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.handleAddGuest = this.handleAddGuest.bind(this);
    this.removeGuestAt = this.removeGuestAt.bind(this);
    this.getTotalInvited = this.getTotalInvited.bind(this);
    this.getAttendingGuests = this.getAttendingGuests.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  componentWillMount() {
    this.guestsRef = base.syncState('guests', {
      context: this,
      state: 'guests'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.guestsRef);
  }

  getTotalInvited = () => this.state.guests.length;

  toggleGuestProp = (property, indexToChange) =>
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest;
      })
  });

  toggleConfirmation = index => this.toggleGuestProp("isConfirmed", index);

  toggleEditing = index => this.toggleGuestProp("isEditing", index);

  setNameAt = (name, indexToChange) =>
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name
          }
        }
        return guest;
      })
  });

  toggleFilter = () => {
    this.setState({
      isFiltered: !this.state.isFiltered,
    });
  }

  handlePendingGuest = e => {
    this.setState({
      pendingGuest: e.target.value,
    });
  }

  handleAddGuest = e => {
    e.preventDefault();
    let newGuests;
    if(this.state.guests.length) {
      newGuests = this.state.guests;
    } else {
      newGuests = [];
    }
    console.log(this.state.guests);
    const guest = {
      name: this.state.pendingGuest,
      isConfirmed: false,
      isEditing: false
    };
    newGuests.unshift(guest);
    this.setState({
      guests: newGuests,
      pendingGuest: '',
    });
  }

  removeGuestAt = index => {
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    });
  }

  getTotalInvited = () => {
    if(this.state.guests.length) {
      return this.state.guests.length;
    } else {
      return 0;
    }
  }

  getAttendingGuests = () => {
    if(this.state.guests.length) {
      return this.state.guests.reduce((total, guest) => guest.isConfirmed ? total + 1 : total, 0);
    } else {
      return 0;
    }

  }

  clearAll = () => {
    console.log('clicked!');
    const newGuests =  []
    this.setState({
      guests: newGuests,
    });
  }

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    let guests;
    if(this.state.guests.length) {
      guests = this.state.guests;
    } else {
      guests = [];
    }
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <form className="registrar"  onSubmit={this.handleAddGuest}>
            <input
              type="text"
              name="name"
              placeholder="Invite Someone"
              onChange={this.handlePendingGuest}
              value={this.state.pendingGuest} />
            <button type="submit" name="submit" value="submit" className="submitButton">Submit</button>
          </form>
        </header>
        <div className="wrapper">
          <div className="main">

            <div className="subMain">
              <h2>Invitees</h2>
              <label>
                <input type="checkbox" className="filterCheck" onChange={this.toggleFilter} checked={this.state.isFiltered} />
                Hide those who haven't responded
              </label>

            </div>

            <div className="subMainLeft">
              <Counter
                totalInvited={totalInvited}
                numberAttending={numberAttending}
                numberUnconfirmed={numberUnconfirmed} />
            </div>


          </div>

          <GuestList
            toggleEditing={this.toggleEditing}
            toggleConfirmation={this.toggleConfirmation}
            guests={guests}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest} />
          <button name="clear" value="clear" className="clear" onClick={this.clearAll}>Clear</button>
        </div>
      </div>
    );
  }
}

export default App;
