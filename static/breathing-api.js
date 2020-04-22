class BreathingApi {
  static async analyseBreathing(audioUrl) {
    try {
      await axios({
        url: 'https://breathing-frequency-api-dev.5vid.co/calculate_bf',
        method: 'POST',
        data: {
          audio_path: audioUrl
        }
      });
      return true;
    } catch (err) {
      console.log('Failed to call breathing api', err);
      return false;
    }
  }
}
