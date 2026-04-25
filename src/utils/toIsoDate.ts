export const toIsoDate = (date: string) => {
  const isoDate = new Date(date).toISOString()
  return isoDate
}
