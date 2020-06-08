import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Credit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credit: {
        id: "",
        description: "",
        amount: "",
        date: "",
      },
    };
  }

  handleChange = (event) => {
    const updatedCredit = { ...this.state.credit };
    const inputField = event.target.name;
    const inputValue = event.target.value;

    updatedCredit[inputField] = inputValue;
    if (inputField === "amount") {
      updatedCredit.amount = Number(inputValue);
    }
    this.setState({ credit: updatedCredit });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createCredit(this.state.credit);
    this.setState({
        credit: {
            id: "",
            description: "",
            amount: "",
            date: "",
          }
    });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Credits Page</h1>
          <Link to="/">
            Back to Home
          </Link>
        </div>

        <AccountBalance accountBalance={this.props.accountBalance} debits={this.props.debitsTotal} credits={this.props.creditsTotal}/>

        <div>
          <h3>Adding a credit</h3>
          <form onSubmit={this.handleSubmit}>
            <label for="description">Description:</label>
            <input
              name="description"
              value={this.state.credit.description}
              onChange={this.handleChange}
              placeholder="Enter description"
            />
            <label for="amount">Amount:</label>
            <input
              name="amount"
              value={this.state.credit.amount}
              onChange={this.handleChange}
              placeholder="Enter amount"
            />
            <br/>
            <button>submit</button>
          </form>
        </div>


        <div>
          <h3>History</h3>
        </div>
        <div>
            <ul>
                {this.props.credit.map((credit) => {
                    let date = new Date(credit.date);

                    return (
                    <li>
                        <div key={credit.id}>
                            <div>Description: {credit.description}</div>
                            <ul>
                                <li>Amount: ${credit.amount}</li>
                                <li>Date: {date.toLocaleDateString()}</li>
                            </ul>
                        </div>
                    </li>
                    );
                })}
            </ul>
        </div>
      </div>
    );
  }
}

export default Credit;