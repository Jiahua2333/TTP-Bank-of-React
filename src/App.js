import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from "./components/Login";
import axios from "axios";
import Debit from "./components/Debit";
import Credit from "./components/Credit";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      debitsSum: 0,
      creditsSum: 0,
      debit: [],
      credit: [],
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }

  componentDidMount() {
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then((response) => {
        let data = response.data;
        let debitsTotal = 0;

        for (const value of data) {
          debitsTotal += value.amount;
        }
        //console.log(debitsTotal);
        this.setState({
          debit: data,
          debitsSum: debitsTotal,
        });
        //console.log(this.state.debitsSum);
      }) 
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then((response) => {
        let data = response.data;
        this.setState({

        });

        let creditsTotal = 0;
        for (const value of data) {
          creditsTotal += value.amount;
        }
        
        this.setState({
          creditsSum: creditsTotal,
          credit: data,
        });
      }) 
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.credit !== this.state.credit) {
      let creditsTotal = 0;
      for (const value of this.state.credit) {
        creditsTotal += value.amount;
      }

      this.setState({
        creditsSum: creditsTotal,
      });
    }

    if (prevState.debit !== this.state.debit) {
      let debitsTotal = 0;
      for (const value of this.state.debit) {
        debitsTotal += value.amount;
      }

      this.setState({
        debitsSum: debitsTotal,
      });
    }
  }

  createCredit = (credit) => {
    credit.id = (Math.random() * 10000).toString();
    const date = new Date();
    credit.date = date.toISOString();
    const newCredit = [credit, ...this.state.credit];

    this.setState({ credit: newCredit });
  };

  createDebit = (debit) => {
    debit.id = (Math.random() * 10000).toString();
    const date = new Date();
    debit.date = date.toISOString();
    const newDebit = [debit, ...this.state.debit];

    this.setState({ debit: newDebit });
  };


  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {
    //console.log(this.state);
    const HomeComponent = () => (<Home accountBalance={(this.state.creditsSum - this.state.debitsSum).toFixed(2)} credits={this.state.creditsSum} debits={this.state.debitsSum} />);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );

    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>);

    const DebitsComponent = () => (
      <Debit
        accountBalance={(this.state.creditsSum - this.state.debitsSum).toFixed(2)}
        debit={this.state.debit}
        creditsTotal={this.state.creditsSum}
        debitsTotal={this.state.debitsSum}
        createDebit={this.createDebit}
      />
    );

    const CreditsComponent = () => (
      <Credit
        accountBalance={(this.state.creditsSum - this.state.debitsSum).toFixed(2)}
        credit={this.state.credit}
        creditsTotal={this.state.creditsSum}
        debitsTotal={this.state.debitsSum}
        createCredit={this.createCredit}
      />
    );

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debit" render={DebitsComponent}/>
            <Route exact path="/credit" render={CreditsComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;