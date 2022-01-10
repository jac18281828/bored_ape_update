import { format } from '@fast-csv/format'
import fs from 'fs'
import { Stream } from 'stream'
import { Event } from './event'

export default
  function writeListings(outputPath: string | undefined, activeListings: Event[], logConsole: boolean): Promise<void> {
  const writePromise = new Promise<void>((resolve, reject) => {
    const csvStream = format()
    if (outputPath) {
      const writeStream = fs.createWriteStream(outputPath)
      csvStream.pipe(writeStream)
    }
    if (logConsole) {
      csvStream.pipe(process.stdout)
    }
    activeListings.forEach(listing => {
      csvStream.write([listing.price, listing.tokenId, listing.date])
    })

    csvStream.on('error', () => reject())
    csvStream.on('end', () => resolve())
    csvStream.end()
  })
  return writePromise
}