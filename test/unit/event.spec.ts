import { expect } from 'chai';
import { isAddingEvent, isRemovingEvent, EventType } from '../../src/event'

describe('EventType adding or removing', function () {
    it('CREATED is adding', function () {
        expect(isAddingEvent(EventType.CREATED)).to.equal(true)
    })
    it('Type is removing', function () {
        expect(isRemovingEvent(EventType.APPROVE)).to.equal(true)
        expect(isRemovingEvent(EventType.CANCELLED)).to.equal(true)
        expect(isRemovingEvent(EventType.SUCCESSFUL)).to.equal(true)
        expect(isRemovingEvent(EventType.TRANSFER)).to.equal(true)
    })
})
