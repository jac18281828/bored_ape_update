import { expect } from 'chai';
import { Event, EventType } from '../../src/event'
import { ActiveBook } from '../../src/book'

describe('Book adding one listing', function () {
  it('Add one element to book', function () {
    const book = new ActiveBook()
    book.addListing({ tokenId: '1', price: '1', date: '.', eventType: EventType.CREATED })
    const listings = book.getActive()
    expect(listings.length).to.equal(1)
    const event1 = listings[0]
    expect(event1.tokenId).to.equal('1')
  })
  it('Add two element to book', function () {
    const book = new ActiveBook()
    book.addListing({ tokenId: '1', price: '1', date: '.', eventType: EventType.CREATED })
    book.addListing({ tokenId: '2', price: '1', date: '.', eventType: EventType.CREATED })
    const listings = book.getActive()
    expect(listings.length).to.equal(2)
    const event1 = listings[0]
    expect(event1.tokenId).to.equal('1')
  })
  it('add two elements but remove one', function () {
    const book = new ActiveBook()
    book.addListing({ tokenId: '1', price: '1', date: '.', eventType: EventType.CREATED })
    book.addListing({ tokenId: '2', price: '1', date: '.', eventType: EventType.CREATED })
    book.removeListing('2')
    const listings = book.getActive()
    expect(listings.length).to.equal(1)
    const event1 = listings[0]
    expect(event1.tokenId).to.equal('1')
  })
  it('Permit out of order removal', function () {
    const book = new ActiveBook()
    book.removeListing('2')
    book.addListing({ tokenId: '1', price: '1', date: '.', eventType: EventType.CREATED })
    book.addListing({ tokenId: '2', price: '1', date: '.', eventType: EventType.CREATED })
    const listings = book.getActive()
    expect(listings.length).to.equal(1)
    const event1 = listings[0]
    expect(event1.tokenId).to.equal('1')
  })

})
