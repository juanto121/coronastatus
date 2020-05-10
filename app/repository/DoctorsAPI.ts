import config from '../config';

const request = require('request-promise');

// Report that includes scoring and saves to external Mongo database
export class DoctorsAPI {
  static async aggregateContacted() {
    try {
      const response = await request({
        uri: config.DOCTORS_API_URL + "/appointment",
        method: 'GET',
        qs: {"summary":true},
        json: true
      });
      const message = response.message;
      const contacted = message.accepted_consent_videocalls;
      return {
        contacted: contacted
      };
    } catch (err) {
      console.log('Failed to get contacted patients', err);
      return {
        contacted: null
      };
    }
  }
}
