export function dateFormat(time: number) {
  const date = new Date(time)
  const m = date.getMonth().toString()
  const d = date.getDay().toString()
  return `${m.length === 1 ? '0' : ''}${m}-${d.length === 0 ? '0' : ''}${d}`
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()

  // The year, month, and day of the date
  const dateYear = date.getFullYear()
  const dateMonth = date.getMonth()
  const dateDay = date.getDate()

  // The year, month, and day of now
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDay = now.getDate()

  // The day of the week of the date
  const dayOfWeek = date.getDay()

  // The hours and minutes of the date
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // Format hours and minutes to be two digits
  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  // Array of weekdays
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

  // If the date is today
  if (dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay)
    return `${formattedHours}:${formattedMinutes}`

  // If the date is yesterday
  else if (dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay - 1)
    return `昨天 ${formattedHours}:${formattedMinutes}`

  // If the date is within this week
  else if (date > new Date(nowYear, nowMonth, nowDay - now.getDay()))
    return `${weekdays[dayOfWeek]} ${formattedHours}:${formattedMinutes}`

  // If the date is not within this week
  else
    return `${dateYear} 年 ${dateMonth + 1} 月 ${dateDay} 日 ${formattedHours}:${formattedMinutes}`
}
