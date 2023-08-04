export function formatDate(timestamp: number): string {
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

  // The hours and minutes of the date
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // Format hours and minutes to be two digits
  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  // If the date is today
  if (dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay)
    return `${formattedHours}:${formattedMinutes}`

  // If the date is not today
  else
    return `${dateYear}/${dateMonth + 1}/${dateDay}`
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

export function formatFileSize(sizeInBytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let unitIndex = 0

  while (sizeInBytes >= 1024 && unitIndex < units.length - 1) {
    sizeInBytes /= 1024
    unitIndex++
  }

  return `${sizeInBytes.toFixed(2)} ${units[unitIndex]}`
}

export function getFileIcon(fileName: string): string {
  // Get the file extension
  const extension = fileName.split('.').pop()?.toLowerCase() || ''
  // Define a mapping from file extensions to icons
  const extensionToIcon: { [key: string]: string } = {
    bmp: 'i-bi:filetype-bmp',
    txt: 'i-bi:filetype-txt',
    doc: 'i-bi:filetype-doc',
    docx: 'i-bi:filetype-docx',
    pdf: 'i-bi:filetype-pdf',
    xls: 'i-bi:filetype-xls',
    xlsx: 'i-bi:filetype-xlsx',
    ppt: 'i-bi:filetype-ppt',
    pptx: 'i-bi:filetype-pptx',
    mp3: 'i-bi:filetype-mp3',
    aac: 'i-bi:filetype-aac',
    mp4: 'i-bi:filetype-mp4',
    html: 'i-bi:filetype-html',
    css: 'i-bi:filetype-css',
    js: 'i-bi:filetype-js',
    svg: 'i-bi:filetype-svg',
    sh: 'i-bi:filetype-sh',
    scss: 'i-bi:filetype-scss',
    sql: 'i-bi:filetype-sql',
    tsx: 'bi:filetype-tsx',
    // Add more file types and icons as needed
  }

  // Return the icon for the file extension, or a default icon if the extension is not recognized
  return extensionToIcon[extension] || 'i-ri:file-2-line'
}
