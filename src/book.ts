import { Event } from './event'

export class ActiveBook {
  activeListings: { [tokenId: string]: Event } = {}
  terminalListings: Set<string> = new Set()

  public addListing(event: Event): void {
    if (!this.terminalListings.has(event.tokenId)) {
      this.activeListings[event.tokenId] = event
    }
  }

  public removeListing(tokenId: string): void {
    delete this.activeListings[tokenId]
    this.terminalListings.add(tokenId)
  }

  public getActive(): Event[] {
    const activeList: Event[] = []
    for (const key in this.activeListings) {
      activeList.push(this.activeListings[key])
    }
    return activeList
  }
}