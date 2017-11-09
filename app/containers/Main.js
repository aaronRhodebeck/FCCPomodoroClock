import React from 'react';
import styled from 'styled-components';
import Tomato from '../displayComponents/Tomato';
import Timer from './Timer';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimerType: 'Session',
      currentSessionLength: 25,
      currentBreakLength: 5,
      sessionSoundFile:
        'http://res.cloudinary.com/arhodebeck/video/upload/v1510027109/get-up-offa-that-thing_hd4q9q.mp3',
      breakSoundFile:
        'http://res.cloudinary.com/arhodebeck/video/upload/v1510027110/work-from-home_htgjo6.mp3',
      autoStartNextTimer: 'false',
    };

    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  incrementSession() {
    if (this.state.currentSessionLength < 60) {
      this.setState({ currentSessionLength: this.state.currentSessionLength + 1 });
    }
  }

  decrementSession() {
    if (this.state.currentSessionLength > 1) {
      this.setState({ currentSessionLength: this.state.currentSessionLength - 1 });
    }
  }

  incrementBreak() {
    if (this.state.currentBreakLength < 60) {
      this.setState({ currentBreakLength: this.state.currentBreakLength + 1 });
    }
  }

  decrementBreak() {
    if (this.state.currentBreakLength > 1) {
      this.setState({ currentBreakLength: this.state.currentBreakLength - 1 });
    }
  }

  switchTimer() {
    this.setState({
      currentTimerType: this.state.currentTimerType === 'Session' ? 'Break' : 'Session',
      autoStartNextTimer: 'true',
    });
  }

  resetTimer() {
    this.setState({
      currentTimerType: 'Session',
      currentSessionLength: 25,
      currentBreakLength: 5,
      sessionSoundFile:
        'http://res.cloudinary.com/arhodebeck/video/upload/v1510027109/get-up-offa-that-thing_hd4q9q.mp3',
      breakSoundFile:
        'http://res.cloudinary.com/arhodebeck/video/upload/v1510027110/work-from-home_htgjo6.mp3',
      autoStartNextTimer: 'false',
    });
  }

  startTimer() {
    this.setState({ autoStartNextTimer: 'true' });
  }

  render() {
    const {
      currentTimerType,
      currentBreakLength,
      currentSessionLength,
      sessionSoundFile,
      breakSoundFile,
      autoStartNextTimer,
    } = this.state;

    let length;
    let soundFile;
    const title = currentTimerType;

    if (currentTimerType === 'Session') {
      length = currentSessionLength;
      soundFile = sessionSoundFile;
    } else {
      length = currentBreakLength;
      soundFile = breakSoundFile;
    }

    return (
      <AppContainer>
        <Tomato />
        <TimerContainer id="pomodoro-timer">
          <SetLengthContainer>
            <SetLengthButton onClick={this.incrementSession}>+</SetLengthButton>
            <SetLengthLabel>Session: {this.state.currentSessionLength}</SetLengthLabel>
            <SetLengthButton onClick={this.decrementSession}>-</SetLengthButton>
            <Spacer />
            <SetLengthButton onClick={this.incrementBreak}>+</SetLengthButton>
            <SetLengthLabel>Break {this.state.currentBreakLength}</SetLengthLabel>
            <SetLengthButton onClick={this.decrementBreak}>-</SetLengthButton>
          </SetLengthContainer>
          <Timer
            title={title}
            time={length}
            soundFile={soundFile}
            startOnRender={autoStartNextTimer}
            timerFinished={this.switchTimer}
          />
          <div style={{ display: 'flex' }}>
            <ControlButton onClick={this.startTimer}>&#9654;</ControlButton>
            <ControlButton onClick={this.resetTimer}>&#8634;</ControlButton>
          </div>
        </TimerContainer>
      </AppContainer>
    );
  }
}

export default Main;

const AppContainer = styled.div`
  position: absolute;
  height: 80vh;
  min-height: 430px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 15vh;
`;

const TimerContainer = styled.div`
  z-index: 1;
  position: absolute;
  flex: 1 1 auto;
  max-width: 40vh;
  margin: 0 auto;
  top: 25vh;
`;

const ControlButton = styled.button`
  background: rgba(0, 0, 0, 0);
  flex: 1 1 auto;
  margin: 5px 25px 5px 25px;
  border: 0;
  font-size: 2em;
`;

const SetLengthContainer = styled.div`
  display: flex;
  flex-direction: row;
  postion: absolute;
  z-index: 1;
  flex: 1 1 auto;
`;

const SetLengthButton = styled.button`
  padding: 3px;
  background: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: 1px solid black;
  border-radius: 10%;
  align-self: baseline;
  font-size: 1.8em;
  font-family: monospace;
  outline: none;
  text-align: center;

  &:active {
    outline: 1px solid black;
  }
`;

const SetLengthLabel = styled.span`
  align-self: baseline;
  margin: 10px;
  font-size: 1.2em;
  text-align: center;
`;

const Spacer = styled.div`width: 60px;`;
