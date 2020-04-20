import config from '../config';

const request = require('request-promise');

// Informed Consent Accepted 
export class VideocallAPI {
  static async acceptInformedConsent(videocallCode: string) {
    try {
      const response = await request({
        uri: config.VIDEOCALL_API_URL,
        method: 'PATCH',
        body: {
            "videocall_code": videocallCode,
            "informed_consent_accepted": true
        },
        json: true
      });
      return {
        patientId: response.patientId
      };
    } catch (err) {
      console.log('Failed to create Informed Consent', err);
      return {
        patientId: null
      };
    }
  }
}
