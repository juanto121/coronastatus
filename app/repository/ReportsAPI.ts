import { CovidReport } from '../domain/types';
import config from '../config';

const request = require('request-promise');

// Report that includes scoring and saves to external Mongo database
export class ReportsAPI {
  static async createReport(report: CovidReport) {
    try {
      await request({
        uri: config.REPORT_API_URL,
        method: 'POST',
        body: report,
        json: true
      });
    } catch (err) {
      console.log('Failed to create report', err);
    }
  }
}
