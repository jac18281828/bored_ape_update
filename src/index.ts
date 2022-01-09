import * as dotenv from 'dotenv'
import { ActiveBook } from './book'
import { Event, isAddingEvent, isRemovingEvent } from './event'
import { EventRetriever } from './retriever'
import dayToEpochMillis from './timeconversion'
import writeListings from './writecsv'

dotenv.config();

(async () => {
  const maximumDays: string | undefined = process.env.MAXIMUM_DAY
  const displayLimit: string | undefined = process.env.DISPLAY_LIMIT
  const outputFile: string | undefined = process.env.OUTPUT_FILE
  const auctionType: string | undefined = process.env.AUCTION_TYPE
  const collectionName: string | undefined = process.env.COLLECTION_NAME
  const apiUrl: string | undefined = process.env.API_URL
  const apiKey: string | undefined = process.env.API_KEY

  if (!maximumDays || !collectionName || !apiUrl || !displayLimit) {
    console.log('Environment configuration is required.  Please review .env')
    process.exit(1)
  }

  if (!apiUrl?.startsWith('https')) {
    console.log('Secure connection is required')
    process.exit(1)
  }

  const activeBook = new ActiveBook()

  const event = new EventRetriever(apiUrl, apiKey ? apiKey : '')
  const afterTimestampSec = dayToEpochMillis(parseInt(maximumDays))
  const fetchPromise = event.fetch(collectionName, auctionType, afterTimestampSec, parseInt(displayLimit), (event: Event) => {
    if (isAddingEvent(event.eventType)) {
      activeBook.addListing(event)
    } else if (isRemovingEvent(event.eventType)) {
      activeBook.removeListing(event.tokenId)
    }
  })

  const fetchPipeline = [fetchPromise]

  fetchPromise.then(() => {
    const currentListing = activeBook.getActive()
    if (currentListing.length > 0) {
      const writePromise = writeListings(outputFile, currentListing, true)
      fetchPipeline.push(writePromise)
    }
  }).catch(() => {
    console.log('Fetch failed.')
  })

  await Promise.all(fetchPipeline).catch(() => console.log('unexpected error'))
})()
