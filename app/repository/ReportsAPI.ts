import { CovidReport } from '../domain/types';
import config from '../config';

const request = require('request-promise');

// Report that includes scoring and saves to external Mongo database
export class ReportsAPI {
  static async createReport(report: CovidReport) {
    try {
      const response = await request({
        uri: config.REPORT_API_URL + "/reports/",
        method: 'POST',
        body: report,
        json: true
      });
      return {
        patientId: response.patientId
      };
    } catch (err) {
      console.log('Failed to create report', err);
      return {
        patientId: null
      };
    }
  }

  static async getReportStatistics() {
    try {
      const response = await request({
        uri: config.REPORT_API_URL + "/reports/statistics",
        method: 'GET',
        qs: {
          "total": 1,
          "close_contact": 1,
          "with_symptoms": 1
        },
        json: true
      });
      return {
        totalReports: response.total_reports,
        reportsWithCloseContact: response.reports_with_close_contact,
        reportsWithSymptoms: response.reports_with_symptoms
      };
    } catch (err) {
      console.log('Failed to get report statistics', err);
      return {
        totalReports: null,
        reportsWithCloseContact: null,
        reportsWithSymptoms: null
      };
    }
  }

}
