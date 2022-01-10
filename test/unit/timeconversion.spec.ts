import { expect } from 'chai';
import dayToEpochSeconds from '../../src/timeconversion'

describe('dayConversion is working', function () {
  it('convert number of days', function () {
    const days = 17
    const timeNowSec = Date.now() / 1000
    const expectTime = Math.floor(timeNowSec - (days * 86400))
    expect(dayToEpochSeconds(days)).to.be.greaterThanOrEqual(expectTime)
  })
})
