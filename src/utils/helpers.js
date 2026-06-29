import { SUBJECTS, TOTAL_COEFF, EXAM_CONTENT, REV_CONTENT, TOPICS, PLAN } from '../data/constants'

export function fmtMins(m) {
  return `${Math.floor(m / 60)} h ${m % 60} min`
}

export function gradeColor(g) {
  return g < 5 ? 'grade-red' : g <= 8 ? 'grade-amber' : 'grade-green'
}

export function urgencyScore(s) {
  return s.coeff * (20 - s.grade) / 20
}

export function nextThursday8am() {
  const now = new Date()
  const d = new Date(now)
  d.setHours(8, 0, 0, 0)
  const dow = now.getDay()
  let daysUntil = (4 - dow + 7) % 7
  if (daysUntil === 0 && now >= d) daysUntil = 7
  d.setDate(d.getDate() + daysUntil)
  return d
}

export function getCountdown() {
  const target = nextThursday8am()
  const now = new Date()
  let diff = Math.max(0, target - now)
  const days = Math.floor(diff / 86400000); diff %= 86400000
  const hrs = Math.floor(diff / 3600000); diff %= 3600000
  const mins = Math.floor(diff / 60000); diff %= 60000
  const secs = Math.floor(diff / 1000)
  return { days, hrs, mins, secs, urgent: target - now < 86400000, target }
}

export function weightedStudyHours(getStudyMins) {
  return SUBJECTS.reduce((sum, s) => sum + (getStudyMins(s.id, 'total') / 60) * s.coeff, 0) / TOTAL_COEFF
}

export function currentWeightedAvg() {
  return SUBJECTS.reduce((sum, s) => sum + s.grade * s.coeff, 0) / TOTAL_COEFF
}

export function prepLevel(s, getStudyMins) {
  const base = s.grade / 20 * 100
  const bonus = Math.min(95 - base, getStudyMins(s.id, 'total') * 3)
  return Math.min(95, Math.round(base + bonus))
}

export function getTimelineDays() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const saturday = new Date(today)
  const daysUntilSat = (6 - today.getDay() + 7) % 7
  saturday.setDate(saturday.getDate() + daysUntilSat)
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(saturday)
    d.setDate(d.getDate() - i)
    days.push(d)
  }
  return days
}

export function getTimelineCard(d, today) {
  const dow = d.getDay()
  const isToday = d.getTime() === today.getTime()
  const isPast = d < today && !isToday
  const isExam = EXAM_CONTENT[dow] !== undefined
  let content = isExam ? EXAM_CONTENT[dow] : (REV_CONTENT[dow] || 'RÉVISIONS')
  if (isToday && !isExam) content = 'RÉVISIONS INTENSIVES'
  return { dow, isToday, isPast, isExam, content }
}

export function getPlanDayIndex() {
  const dow = new Date().getDay()
  if (dow === 0) return 0
  if (dow === 1) return 1
  if (dow === 2) return 2
  if (dow === 3) return 3
  return 3
}

export function countAllTopics(isTopicDone) {
  let done = 0, total = 0
  Object.keys(TOPICS).forEach((k) => {
    TOPICS[k].forEach((_, i) => {
      total++
      if (isTopicDone(k, i)) done++
    })
  })
  return { done, total }
}

export function countAllPlanTasks(isPlanTaskDone) {
  let done = 0, total = 0
  PLAN.forEach((p, di) => {
    p.tasks.forEach((_, ti) => {
      total++
      if (isPlanTaskDone(di, ti)) done++
    })
  })
  return { done, total }
}
