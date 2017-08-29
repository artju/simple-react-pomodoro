import React, { Component } from 'react';
import './App.css';
import ring from './ring.wav';

class StartStop extends React.Component {  
render() {
    return (
      <button onClick={this.props.onClick}>{this.props.name}</button>
    );
  }
}

class Pomodoro extends Component {
  constructor() {
    super();
    this.state = {
      timeLeft: 1500,
      timeString: "25:00",
      current: "Work!",
      sessions: 1,
      counting: false,
    }

    this.timer = null;
    this.handleClick = this.handleClick.bind(this);
    this.count = this.count.bind(this);
    this.secsToMins = this.secsToMins.bind(this);
  }

  /* Counts remaining time */
  count() {
    let secs = this.state.timeLeft - 1;
    if (secs === 0) {
      if (this.state.current === "Work!") {
        secs = 300;
        this.setState({current: "Break time!"});
      } else {
        secs = 1500;
        let sessions = parseInt(this.state.sessions) + 1;
        this.setState({current: "Work!", sessions: sessions});
      }
      document.getElementById('ringer').play(); //End of session sound
    }
    this.setState({timeLeft: secs});
    this.secsToMins();
  }

  /* Display of time */
  secsToMins() {
    let mins = Math.floor(this.state.timeLeft / 60);
    let secs = this.state.timeLeft % 60;
    let minsAndSecs = "";

    if (mins < 10) {
      minsAndSecs += "0" + mins + ":";
    } else {
      minsAndSecs += mins + ":";
    }

    if (secs < 10) {
      minsAndSecs += "0" + secs;
    } else {
      minsAndSecs += secs;
    }

    this.setState({timeString: minsAndSecs});
  }

  /* Starting and stopping timer */
  handleClick() {
    if (!this.state.counting) {
      this.setState({counting: true});
      this.timer = setInterval(this.count, 1000);
    } else {
      this.setState({ counting: false});
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div className="app">
        <h1>{this.state.current}</h1>
        <div className="counter">
          {this.state.timeString}
        </div>
        <div className="startstop">
          <StartStop onClick={() => this.handleClick()} name={this.state.counting ? 'Stop' : 'Start'}/>
        </div>
        <p>Session {this.state.sessions}</p>
        <div><audio id="ringer" src={ring}/></div>
      </div>
    );
  }
}

export default Pomodoro;
