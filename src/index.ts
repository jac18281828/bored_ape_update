import * as dotenv from 'dotenv'
import { logger } from './logging'

dotenv.config();

(async () => {
  const maximumDays: string | undefined = process.env.MAXIMUM_DAY
  const outputFile:  string | undefined = process.env.OUTPUT_FILE
  const fetchTimeoutSec: string | undefined = process.env.FETCH_TIMEOUT_SECONDS

  if (!maximumDays || !outputFile || !FETCH_TIMEOUT_SECONDS) {
    logger.error('Environment configuration is required.  Please review .env')
  }

  const timer = (ms: number) => new Promise(res => setTimeout(res, ms))
  logger.info(`destination ${outputFile}`)
  logger.info(`maximum history ${maximumDays}`)
  logger.info('waiting 5')
  await timer(5000)
})()
