import React from 'react';
import PropTypes from 'prop-types';

const Counter = props => {

  return (<table className="counter">
    <tbody>
      <tr>
        <td>Attending: &nbsp;</td>
        <td>{props.numberAttending}</td>
      </tr>
      <tr>
        <td>Unconfirmed: &nbsp;</td>
        <td>{props.numberUnconfirmed}</td>
      </tr>
      <tr>
        <td>Total: &nbsp;</td>
        <td>{props.totalInvited}</td>
      </tr>
    </tbody>
  </table>);
};
Counter.propTypes = {
  numberAttending: PropTypes.number,
  numberUnconfirmed: PropTypes.number,
  totalInvited: PropTypes.number,
};
export default Counter;
