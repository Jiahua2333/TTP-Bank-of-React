import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
     <>
        <div>
          Balance: {this.props.accountBalance}      
        </div>
        <div>
            Total Debits: {this.props.debits}
        </div>
        <div>
            Totab Credits: {this.props.credits}
        </div>
     </>
    );
  }
}

export default AccountBalance;