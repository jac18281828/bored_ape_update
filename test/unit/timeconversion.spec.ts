import { expect } from 'chai';
import dayToEpochMillis from '../../src/timeconversion'

describe('dayConversion is working', function () {
  it('convert number of days', function () {
    const days = 17
    const timeNow = Date.now()
    const expectTime = Math.floor(timeNow / 1000 - (days * 86400))
    expect(dayToEpochMillis(days)).to.be.greaterThanOrEqual(expectTime)
  })
})
