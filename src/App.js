import React, { Component } from 'react';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <form className="registrar">
            <input type="text" name="name" placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit" className="submitButton">Submit</button>
          </form>
        </header>
        <div className="wrapper">
          <div className="main">
            <h2>Invitees</h2>
            <div className="subMain">
              <label>Hide those who haben't responded</label>
              <input type="checkbox" className="filterCheck" />
            </div>
          </div>
          <ul className="invitedList">
            <li>
              <span>Jerry</span>
              <label>Confirm
                <input type="checkbox" className="filterCheck" />
              </label>
              <button className="edit">edit</button>
              <button className="remove">remove</button>
            </li>
          </ul>
          <button name="clear" value="clear" className="clear">Clear</button>
        </div>
      </div>
    );
  }
}

export default App;
