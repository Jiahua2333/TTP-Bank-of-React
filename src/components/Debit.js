import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Debit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debit: {
        id: "",
        description: "",
        amount: "",
        date: "",
      },
    };
  }

  handleChange = (event) => {
    const updatedDebit = { ...this.state.debit };
    const inputField = event.target.name;
    const inputValue = event.target.value;

    updatedDebit[inputField] = inputValue;
    if (inputField === "amount") {
      updatedDebit.amount = Number(inputValue);
    }
    this.setState({ debit: updatedDebit });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createDebit(this.state.debit);
    this.setState({
        debit: {
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
          <h1>Debits Page</h1>
          <Link to="/">
            Back to Home
          </Link>
        </div>

        <AccountBalance accountBalance={this.props.accountBalance} debits={this.props.debitsTotal} credits={this.props.creditsTotal}/>

        <div>
          <h3>Adding a debit</h3>
          <form onSubmit={this.handleSubmit}>
            <label for="description">Description:</label>
            <input
              name="description"
              value={this.state.debit.description}
              onChange={this.handleChange}
              placeholder="Enter description"
            />
            <label for="amount">Amount:</label>
            <input
              name="amount"
              value={this.state.debit.amount}
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
                {this.props.debit.map((debit) => {
                    let date = new Date(debit.date);

                    return (
                    <li>
                        <div key={debit.id}>
                            <div>Description: {debit.description}</div>
                            <ul>
                                <li>Amount: ${debit.amount}</li>
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

export default Debit;