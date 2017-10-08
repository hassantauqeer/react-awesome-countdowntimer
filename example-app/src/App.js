import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Datetime from 'react-datetime';
import Timer from "react-awesome-countdowntimer"
import moment from 'moment'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            dateTime: moment(),

        }
    }
    onChangeDateTime(evt){
        this.setState({
            dateTime: evt._d
        })
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React Awesome Countdown Timer</h1>
        </header>
          <div className="datetime">
              <Datetime value={this.state.dateTime} onChange={this.onChangeDateTime.bind(this)}/>
          </div>
          <Timer endDate={this.state.dateTime}/>
      </div>
    );
  }
}

export default App;
