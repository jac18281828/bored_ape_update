export enum EventType {
  CREATED = 'created',
  SUCCESSFUL = 'successful',
  CANCELLED = 'cancelled',
  BID_ENTERED = 'bid_entered',
  BID_WITHDRAWN = 'bid_withdrawn',
  TRANSFER = 'transfer',
  APPROVE = 'approve'
}

export type EventName = keyof typeof EventType

export interface Event {
  tokenId: string
  price: string
  date: string
  eventType: EventType
}

export function isAddingEvent(eventType: EventType): boolean {
  switch (eventType) {
    case EventType.CREATED:
      return true
    default:
      return false
  }
}

export function isRemovingEvent(eventType: EventType): boolean {
  switch (eventType) {
    case EventType.SUCCESSFUL:
    case EventType.APPROVE:
    case EventType.CANCELLED:
    case EventType.TRANSFER:
      return true
    default:
      return false
  }
}
