import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
        <div>
          <img src="https://image.shutterstock.com/image-vector/bank-icon-logo-vector-260nw-399995245.jpg" alt="bank"/>
          <h1>Bank of React</h1>
          <ul>
            <li><Link to="/userProfile">User Profile</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/debit">Debit</Link></li>
            <li><Link to="/Credit">Credit</Link></li>
          </ul>

          <AccountBalance accountBalance={this.props.accountBalance} credits={this.props.credits} debits={this.props.debits} />
        </div>
    );
  }
}

export default Home;