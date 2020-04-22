class VideocallAPI {
  static async acceptInformedConsent(videocallCode, videocallUrl) {
    try {
      await axios({
        url: videocallUrl + '/appointment',
        method: 'patch',
        data: {
          videocall_code: videocallCode,
          informed_consent_accepted: true
        }
      });
      console.log('');
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
