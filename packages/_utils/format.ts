export function dateFormat(time: number) {
  const date = new Date(time)
  const m = date.getMonth().toString()
  const d = date.getDay().toString()
  return `${m.length === 1 ? '0' : ''}${m}-${d.length === 0 ? '0' : ''}${d}`
}
