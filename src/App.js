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
  props = {audio: null };
  constructor() {
    super();
    this.state = {
      timeLeft: 1500,
      timeString: "25:00",
      current: "Work!",
      sessions: 1,
      counting: false
    }
    this.props.audio = new Audio({ring});
    this.time = 0;
    this.handleClick = this.handleClick.bind(this);
    this.count = this.count.bind(this);
    this.secsToMins = this.secsToMins.bind(this);
  }

  count() {
    let secs = this.state.timeLeft - 1;
    if (secs === 0) {
      if (this.state.current === "Work!") {
        secs = 300;
        this.setState({current: "Break time!"});
        this.props.audio.play();
      } else {
        secs = 1500;
        let sessions = parseInt(this.state.sessions) + 1;
        this.setState({current: "Work!", sessions: sessions});

      }
    }
    this.setState({timeLeft: secs});
    this.secsToMins();

  }

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

  handleClick() {

    if (!this.state.counting) {
      this.setState({counting: true});
      this.time = setInterval(this.count, 10);

    } else {
      this.setState({ counting: false});
      clearInterval(this.time);

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
        <div>{this.props.audio}</div>
      </div>
    );
  }
}

export default Pomodoro;
