import React, { Component } from "react"
import styles from "./SetTime.module.css"

class SetTime extends Component {
  state = { time: 0 }

  onTimeChange = (event) => {
    this.setState({ time: parseInt(event.target.value, 10) })
  }

  onSubmitTime = (time) => {
    this.props.onSetTime(time)
    this.setState({ time: 0 }, () => {
      document.querySelector(`.${styles.input}`).value = 0
    })
  }

  render() {
    const { time } = this.state
    const { onSubmitTime } = this

    return (
      <div className={styles.root}>
        <label>Milliseconds</label>
        <input
          className={styles.input}
          type="number"
          onChange={this.onTimeChange}
          defaultValue={time}
          disabled={this.props.enabled}
          min={0}
        />
        <button
          className={styles.button}
          onClick={() => onSubmitTime(time)}
          disabled={this.props.enabled}
        >
          Set time
        </button>
      </div>
    )
  }
}

export default SetTime
