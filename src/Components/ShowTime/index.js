import React from "react"
import styles from "./ShowTime.module.css"
import moment from "moment"
import SetTime from "./SetTime"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"

const initialOptions = {
  useYears: false,
  useMonth: false,
  useDays: false,
  useHours: true,
  useMinutes: true,
}

function render(time) {
  if (time.hidden) return null
  if (time.value >= Number.MAX_SAFE_INTEGER)
    return (
      <span className={styles.time}>
        <span className={styles.value}>&#8734;</span>
        <span className={styles.description}>{time.description}</span>
      </span>
    )

  return (
    <div className={styles.time}>
      <span className={styles.value}>{time.value.toFixed(0)}</span>
      <span className={styles.description}>{time.description}</span>
    </div>
  )
}

export default function ShowTime({
  time,
  paused,
  onToggle,
  onSetTime,
  options = initialOptions,
}) {
  const {
    useYears,
    useMonth,
    useDays,
    useHours,
    useMinutes,
    useSeconds,
  } = options

  const duration = moment.duration(time)
  const years = {
    hidden: !useYears,
    value: duration.years(),
    description: "Years",
  }
  const month = {
    hidden: !useMonth,
    description: "Months",
    value: useYears ? duration.months() : duration.asMonths(),
  }
  const days = {
    hidden: !useDays,
    description: "Days",
    value: useYears || useMonth ? duration.days() : duration.asDays(),
  }
  const hours = {
    hidden: !useHours,
    description: "Hours",
    value:
      useYears || useMonth || useDays ? duration.hours() : duration.asHours(),
  }
  const minutes = {
    hidden: !useMinutes,
    description: "Minutes",
    value:
      useYears || useMonth || useDays || useHours
        ? duration.minutes()
        : duration.asMinutes(),
  }
  const seconds = {
    hidden: !useSeconds,
    description: "Seconds",
    value:
      useYears || useMonth || useDays || useHours || useMinutes
        ? duration.seconds()
        : duration.asSeconds(),
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.timeRender}>
          {render(years)}
          {render(month)}
          {render(days)}
          {render(hours)}
          {render(minutes)}
          {render(seconds)}
        </div>
        <button onClick={onToggle} className={styles.toggle}>
          {paused ? (
            <FontAwesomeIcon icon={faPlay} />
          ) : (
            <FontAwesomeIcon icon={faPause} />
          )}
        </button>
      </div>
      <div className={styles.setTime}>
        <SetTime onSetTime={onSetTime} enabled={!paused} />
      </div>
    </div>
  )
}
