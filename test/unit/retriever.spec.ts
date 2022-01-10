import { expect } from 'chai';
import { EventType } from '../../src/event'
import { parseAsset } from '../../src/retriever'

describe('parseAsset', function () {
    it('parseAsset CREATED', function () {
        const assetEvent = {
            asset: { token_id: '1333' },
            starting_price: '0.0',
            created_date: '133',
            total_price: undefined,
            event_type: 'created'
        }
        const event = parseAsset(assetEvent)
        expect(event.tokenId).to.equal('1333')
        expect(event.price).to.equal('0.0')
        expect(event.date).to.equal('133')
        expect(event.eventType).to.equal(EventType.CREATED)
    })
    it('parseAsset SUCCESSFUL', function () {
        const assetEvent = {
            asset: { token_id: '1333' },
            starting_price: '0.0',
            created_date: '133',
            total_price: undefined,
            event_type: 'successful'
        }
        const event = parseAsset(assetEvent)
        expect(event.tokenId).to.equal('1333')
        expect(event.price).to.equal('0.0')
        expect(event.date).to.equal('133')
        expect(event.eventType).to.equal(EventType.SUCCESSFUL)
    })
    it('parseAsset token missing', function () {
        const assetEvent = {
            asset: { token_id: undefined },
            starting_price: '0.0',
            created_date: '133',
            total_price: undefined,
            event_type: 'successful'
        }
        const event = parseAsset(assetEvent)
        expect(event).to.be.undefined
    })
    it('parseAsset asset missing', function () {
        const assetEvent = {
            asset: undefined,
            starting_price: '0.0',
            created_date: '133',
            total_price: undefined,
            event_type: 'successful'
        }
        const event = parseAsset(assetEvent)
        expect(event).to.be.undefined
    })
    it('parseAsset event missing', function () {
        const assetEvent = {
            asset: { token_id: '123' },
            starting_price: '0.0',
            created_date: '133',
            total_price: undefined,
            event_type: undefined
        }
        const event = parseAsset(assetEvent)
        expect(event).to.be.undefined
    })
    it('parseAsset total price but not starting_price', function () {
        const assetEvent = {
            asset: { token_id: '123' },
            starting_price: undefined,
            total_price: '0.0',
            created_date: '133',
            event_type: 'transfer'
        }
        const event = parseAsset(assetEvent)
        expect(event.tokenId).to.equal('123')
        expect(event.price).to.equal('0.0')
        expect(event.date).to.equal('133')
        expect(event.eventType).to.equal(EventType.TRANSFER)
    })
    it('parseAsset date missing', function () {
        const assetEvent = {
            asset: { token_id: '123' },
            starting_price: '100',
            total_price: '100',
            created_date: undefined,
            event_type: undefined
        }
        const event = parseAsset(assetEvent)
        expect(event).to.be.undefined
    })
})
