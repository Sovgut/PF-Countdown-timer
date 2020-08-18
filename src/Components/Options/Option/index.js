import React from "react"
import styles from "./Option.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { faSquare } from "@fortawesome/free-regular-svg-icons"

export default function Option({ active, onChange, tabIndex, children }) {
  return (
    <span
      className={styles.root}
      tabIndex={tabIndex}
      onKeyPress={() => onChange(!active)}
      onClick={() => onChange(!active)}
    >
      <div className={styles.group}>
        {active ? (
          <span className={styles.check}>
            <FontAwesomeIcon icon={faCheckSquare} />
          </span>
        ) : (
          <span className={styles.check}>
            <FontAwesomeIcon icon={faSquare} />
          </span>
        )}
        <p className={styles.text}>{children}</p>
      </div>
    </span>
  )
}
