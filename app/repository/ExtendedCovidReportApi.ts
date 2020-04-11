const request = require('request-promise')
import config from '../config';
import { getInstance } from './Database';
import { CovidReport } from '../domain/types';

export interface Scoring {
  scoring: string;
}
// Report that includes scoring and saves to external Mongo database
export class ExtendedCovidReportApi {
  static async getScore(report: CovidReport): Promise<Scoring> {
    //console.log('Report', report);
    try {
      const score: Scoring = await request({
        uri: 'https://ocpi33er57.execute-api.us-east-1.amazonaws.com/dev/score',
        method: 'POST',
        body: report,
        json: true
      });
      return score;
    } catch (err) {
      console.log('Failed to get score', err);
      return { scoring: '-1' };
    }
  }
}
