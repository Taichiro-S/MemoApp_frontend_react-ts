export const dateTimeFormat = (payload: Date) => {
  const dateTime = new Date(payload)
  const year = dateTime.getFullYear()
  const month =
    String(dateTime.getMonth() + 1).length === 1
      ? `0${dateTime.getMonth() + 1}`
      : dateTime.getMonth() + 1
  const date =
    String(dateTime.getDate() + 1).length === 1
      ? `0${dateTime.getDate() + 1}`
      : dateTime.getDate() + 1

  return `${year}/${month}/${date}`
}
