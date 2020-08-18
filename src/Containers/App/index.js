import React, { Component } from "react"
import styles from "./App.module.css"
import {
  updateTime,
  toggleTime,
  getTime,
  setTime,
  saveTime,
  getDifferences,
} from "../../Service/Countdown"

import ShowTime from "../../Components/ShowTime"
import Options from "../../Components/Options"

class App extends Component {
  state = {
    time: 0,
    paused: true,
    options: {
      useYears: false,
      useMonth: false,
      useDays: false,
      useHours: true,
      useMinutes: true,
    },
  }
  handler = null

  componentDidMount() {
    this.setState(getTime(), () => {
      this.setState(
        (state) =>
          setTime(
            !state.paused ? state.time - getDifferences() : state.time,
            state.options
          ),
        () => {
          if (!this.state.paused) {
            this.handler = setInterval(this.onUpdate, 1000)
          }
        }
      )
    })

    window.addEventListener("beforeunload", saveTime)
  }

  onToggle = () => {
    this.setState(toggleTime(), () => {
      clearInterval(this.handler)
      if (!this.state.paused) {
        this.handler = setInterval(this.onUpdate, 1000)
      }
    })
  }

  onSetTime = (time) => {
    if (this.handler) {
      clearInterval(this.handler)
    }

    this.setState(setTime(time, this.state.options))
  }

  onUpdate = () => {
    this.setState((state) => updateTime(state.time, state.options))
  }

  onOptionChange = (target, value) => {
    this.setState((state) => ({
      options: { ...state.options, [target]: value },
    }))
  }

  render() {
    const { time, paused, options } = this.state

    return (
      <div className={styles.root}>
        <div>
          <ShowTime
            time={time}
            paused={paused}
            options={options}
            onToggle={this.onToggle}
            onSetTime={this.onSetTime}
          />

          <Options
            options={this.state.options}
            onChange={this.onOptionChange}
          />
        </div>
      </div>
    )
  }
}

export default App
