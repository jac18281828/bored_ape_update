export default function dayToEpochMillis(maximumDay: number): number {
  const epochSeconds = Date.now() / 1000
  return Math.floor(epochSeconds - maximumDay * 86400)
}