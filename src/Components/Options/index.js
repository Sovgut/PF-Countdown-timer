import React from "react"
import styles from "./Options.module.css"
import Option from "./Option"

export default function Options({ options, onChange }) {
  return (
    <div className={styles.root}>
      <Option
        active={options.useYears}
        tabIndex={1}
        onChange={(state) => onChange("useYears", state)}
      >
        Show years
      </Option>
      <Option
        active={options.useMonth}
        tabIndex={2}
        onChange={(state) => onChange("useMonth", state)}
      >
        Show months
      </Option>
      <Option
        active={options.useDays}
        tabIndex={3}
        onChange={(state) => onChange("useDays", state)}
      >
        Show days
      </Option>
      <Option
        active={options.useHours}
        tabIndex={4}
        onChange={(state) => onChange("useHours", state)}
      >
        Show hours
      </Option>
      <Option
        active={options.useMinutes}
        tabIndex={5}
        onChange={(state) => onChange("useMinutes", state)}
      >
        Show minutes
      </Option>
    </div>
  )
}
