import React from 'react';
import styled from 'styled-components';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    const startingTime = parseFloat(props.time);
    this.state = {
      totalTimeInSec: startingTime * 60,
      timeRemaining: startingTime * 60,
    };

    this.startTimer = this.startTimer.bind(this);
    this.alarm = this.alarm.bind(this);
    this.changeTimeDisplayed = this.changeTimeDisplayed.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    if (this.props.startOnRender === 'true') {
      this.startTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.stopTimer();
    if (this.props !== nextProps) {
      this.setState({ totalTimeInSec: nextProps.time * 60, timeRemaining: nextProps.time * 60 });
    }
    if (nextProps.startOnRender === 'true') {
      this.startTimer();
    }
  }

  componentDidUpdate() {
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.state.intervalID);
    }
  }

  alarm() {
    const alarm = new Audio(this.props.soundFile);
    alarm.play();
    this.props.timerFinished();
  }

  changeTimeDisplayed() {
    this.setState({ timeRemaining: this.state.timeRemaining - 1 });
  }

  startTimer() {
    const timeInMS = this.state.totalTimeInSec * 1000;
    this.setState({
      intervalID: setInterval(this.changeTimeDisplayed, 1000),
      timerID: setTimeout(this.alarm, timeInMS),
    });
  }

  stopTimer() {
    clearInterval(this.state.intervalID);
    clearTimeout(this.state.timerID);
  }

  render() {
    const secondsRemaining = (this.state.timeRemaining % 60).toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });
    const minutesRemaining = Math.trunc(this.state.timeRemaining / 60);
    return (
      <TimerBody>
        <TimerTitle>{this.props.title}</TimerTitle>
        <TimeRemaining>
          {minutesRemaining}:{secondsRemaining}
        </TimeRemaining>
      </TimerBody>
    );
  }
}

export default Timer;

const TimerBody = styled.div`
  border: 1px solid black;
  margin: 5px;
  padding: 10px;
  border-radius: 15%;
  background: rgba(50, 50, 50, 0.3);
  text-align: center;
  color: rgb(15, 15, 15);
`;

const TimeRemaining = styled.p`
  font-size: 2em;
  margin: 0;
`;

const TimerTitle = styled.p`
  margin: 0;
  padding: 5px;
  font-size: 1.5em;
  font-family: 'Helvetica';
`;
