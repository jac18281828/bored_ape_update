import * as http from 'https'
import { EventType, EventName, Event } from './event'

export interface Asset {
  token_id: string
}

export interface AssetEvent {
  asset: Asset
  starting_price: string
  total_price: string
  created_date: string
  event_type: string
}

interface AssetPayload {
  asset_events: AssetEvent[]
  success: boolean
}

export function parseAsset(assetEvt: AssetEvent): Event | undefined {
  if (assetEvt.asset) {
    if (assetEvt.event_type && assetEvt.asset.token_id && assetEvt.created_date && (assetEvt.starting_price || assetEvt.total_price)) {
      const eventName: EventName = assetEvt.event_type.toUpperCase() as EventName
      const price = assetEvt.starting_price ? assetEvt.starting_price : assetEvt.total_price
      const event: Event = { tokenId: assetEvt.asset.token_id, price: price, date: assetEvt.created_date, eventType: EventType[eventName] }
      return event
    }
  }
  return undefined
}

export interface EventHandler {
  (event: Event): void
}

export class EventRetriever {
  apiUrl: string
  apiKey: string

  public constructor(
    apiUrl: string,
    apiKey: string
  ) {
    this.apiUrl = apiUrl
    this.apiKey = apiKey
  }

  parsePayload(payload: AssetPayload, eventHandler: EventHandler): void {
    if (payload.asset_events) {
      const assetEvents = payload.asset_events
      assetEvents.forEach((assetEvent: AssetEvent) => {
        const event = parseAsset(assetEvent)
        if (event) {
          eventHandler(event)
        }
      })
    } else if (!payload.success || payload.success !== true) {
      console.log('API reported failure')
    }
  }

  public fetch(collectionName: string, auctionType: string | undefined, afterTimestampEpochSec: number, displayLimit: number, eventHandler: EventHandler): Promise<void> {
    const eventPromise = new Promise<void>((resolve, reject) => {
      const parameters = ['collection_slug=' + collectionName, 'only_opensea=false', 'limit=' + displayLimit, 'occurred_after=' + afterTimestampEpochSec ]
      if(auctionType) {
        parameters.push('auction_type=' + auctionType)
      }
      const resourceLocator = this.apiUrl + '?' + encodeURI(parameters.join('&'))
      const headers: { [headerName: string]: string } = {
        Accept: 'application/json'
      }

      if (this.apiKey && this.apiKey.length > 0) {
        headers['X-API-KEY'] = this.apiKey
      }

      const options = {
        headers: headers
      }

      const req = http.get(resourceLocator, options, result => {
        if (result.statusCode !== 200) {
          if (result.statusCode === 403) {
            console.log('X-API-KEY required')
            reject()
          } else {
            console.log(`Unexpected http status code ${result.statusCode}`)
            reject()
          }
          result.resume()
        }

        let bodyPayload = ''
        const jsonMessage = 'content-type' in result.headers && result.headers['content-type'] === 'application/json'
        result.on('data', payload => {
          bodyPayload += payload
        })
        result.on('end', () => {
          if (jsonMessage) {
            this.parsePayload(JSON.parse(bodyPayload), eventHandler)
          }
          resolve()
        })
      })

      req.on('error', () => {
        reject()
      })

      req.end()

    })
    return eventPromise
  }
}
