export function ls(k, d) {
  try {
    const v = localStorage.getItem(k)
    return v === null ? d : JSON.parse(v)
  } catch {
    return d
  }
}

export function ss(k, v) {
  localStorage.setItem(k, JSON.stringify(v))
}

export function getRaw(k, d = '') {
  return localStorage.getItem(k) ?? d
}

export function setRaw(k, v) {
  localStorage.setItem(k, v)
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function checkDayReset(subjects) {
  const last = localStorage.getItem('last_visit_date')
  const today = todayKey()
  if (last && last !== today) {
    subjects.forEach((s) => localStorage.removeItem(`study_hours_TODAY_${s.id}`))
    localStorage.removeItem('pomodoro_count_today')
    localStorage.setItem('pomodoro_count_today', '0')
  }
  localStorage.setItem('last_visit_date', today)
}
