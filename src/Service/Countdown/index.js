const model = {
  attach: (value) => localStorage.setItem("countdown", JSON.stringify(value)),
  get: () =>
    localStorage.getItem("countdown")
      ? JSON.parse(localStorage.getItem("countdown"))
      : { time: 0, paused: true },
  save: () =>
    localStorage.setItem(
      "countdown_save",
      JSON.stringify({ time: Date.now() })
    ),
  getSave: () =>
    localStorage.getItem("countdown_save")
      ? JSON.parse(localStorage.getItem("countdown_save"))
      : { time: Date.now() },
}

export function setTime(time, options) {
  const { paused } = model.get()
  model.attach({ time, paused, options })

  return model.get()
}

export function updateTime(time, options) {
  const { paused } = model.get()

  if (time <= 0) {
    model.attach({ time: 0, paused: true, options })
  } else {
    const newTime = time - 1000

    if (!paused) {
      model.attach({ time: newTime, paused, options })
    }
  }

  return model.get()
}

export function toggleTime() {
  const { time, paused, options } = model.get()
  model.attach({ time, paused: !paused, options })

  return model.get()
}

export function getTime() {
  return model.get()
}

export function saveTime() {
  model.save()
  return model.getSave()
}

export function getDifferences() {
  return Date.now() - model.getSave().time
}
