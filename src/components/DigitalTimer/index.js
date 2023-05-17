import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isRunning: false, minutesLeft: 25, totalSeconds: 1500}

  toggleStatus = () => {
    const {isRunning} = this.state
    if (isRunning === false) {
      this.timerId = setInterval(this.tikTik, 1000)
    } else {
      clearInterval(this.timerId)
    }
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  tikTik = () => {
    const {totalSeconds} = this.state
    if (totalSeconds === 0) {
      this.setState({isRunning: false})
      this.clearInterval(this.timerId)
    }
    this.setState(prevState => ({totalSeconds: prevState.totalSeconds - 1}))
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({totalSeconds: 1500, isRunning: false})
  }

  onIncrement = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        minutesLeft: prevState.minutesLeft + 1,
        totalSeconds: prevState.totalSeconds + 60,
      }))
    }
  }

  onDecrement = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        minutesLeft: prevState.minutesLeft - 1,
        totalSeconds: prevState.totalSeconds - 60,
      }))
    }
  }

  render() {
    const {isRunning, minutesLeft, totalSeconds} = this.state
    let minutes = parseInt(totalSeconds / 60)
    let seconds = totalSeconds - minutes * 60
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="bottom-container">
          <div className="image-container">
            <div className="time-running-container">
              <h1 className="count-down-time">
                {minutes}:{seconds}
              </h1>
              <p className="status">{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="operating-container">
            <div className="start-reset-container">
              <img
                src={
                  isRunning
                    ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                }
                alt={isRunning ? 'pause icon' : 'play icon'}
                className="icon"
              />
              <button
                type="button"
                className="operate-type"
                onClick={this.toggleStatus}
              >
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
                className="icon"
              />
              <button
                type="button"
                className="operate-type"
                onClick={this.onReset}
              >
                Reset
              </button>
            </div>
            <p className="set-timer">set Timer Limit</p>
            <div className="minutes-adjust-container">
              <button
                type="button"
                className="adjust-button"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="minutes">{minutesLeft}</p>
              <button
                type="button"
                className="adjust-button"
                onClick={this.onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
