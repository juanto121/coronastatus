const request = require('request-promise')
import { CovidReport } from '../domain/types';

export interface Scoring {
  covidScore: number;
  covidRisk?: string;
  patientScore?: number;
  patientRisk?: string;
}

// Report that includes scoring and saves to external Mongo database
export class ExtendedCovidReportApi {
  static async getScore(report: CovidReport): Promise<Scoring> {
    try {
      const score = await request({
        uri: 'https://ocpi33er57.execute-api.us-east-1.amazonaws.com/dev/score',
        method: 'POST',
        body: report,
        json: true
      });
      return {
        covidScore: score.covid_score,
        covidRisk: score.covid_risk,
        patientScore: score.patient_score,
        patientRisk: score.patient_risk
      };
    } catch (err) {
      console.log('Failed to get score', err);
      return { covidScore: -1 };
    }
  }
}
