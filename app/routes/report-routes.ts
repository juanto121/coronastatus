import express, { Request } from 'express';
import rateLimit from 'express-rate-limit';
import {
  Symptom,
  CovidReport,
  Sex,
  TestResult,
  SmokingHabit,
  IsolationStatus,
  Diagnosed
} from '../domain/types';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import { getPasscodeCreator } from '../util/passcode-creator';
import { aggregateCovidReports } from '../util/report-aggregator';
import { urls } from '../domain/urls';
import {
  ExtendedCovidReportApi,
  Scoring
} from '../repository/ExtendedCovidReportApi';
import { ReportsAPI } from '../repository/ReportsAPI';
import { DoctorsAPI } from '../repository/DoctorsAPI';

const cookieOptions = {
  maxAge: 31557600000, // maxAge is set to 1 year in ms
  httpOnly: false, // httpOnly means the cookie is only accessible by the web server
  signed: false // signed indicates if the cookie should be signed
};

function determineRemoteAddress(req: Request): string {
  const ipWithPort =
    (req.headers['x-real-ip'] as string) || req.connection.remoteAddress;
  if (ipWithPort) {
    const [ipWithoutPort] = ipWithPort.split(':');
    return ipWithoutPort;
  }
  return req.ip;
}

const router = express.Router();
const reportRepo = new CovidReportRepository();
const passcodeCreator = getPasscodeCreator();

router.get('/', async (req, res) => {
  return res.render('pages/maintenance');
});

router.get(`${urls.profile}/:passcode`, async (req, res) => {
  const success = req.query?.success === 'true';
  const clear = req.query?.clear === 'true';

  const { passcode } = req.params;
  if (!passcode) {
    return res.redirect(res.locals.urls.submitReport);
  }

  // When somebody wants to clear the cookie and register as a new user
  if (clear) {
    res.cookie('passcode', '', { ...cookieOptions, maxAge: -1000000 });
    return res.redirect('/?cleared=true');
  }

  const profile = await reportRepo.getCovidReportByPasscode(passcode);
  if (profile) {
    const reports = await reportRepo.getLatestCovidReports();
    const aggregated = aggregateCovidReports(reports);
    return res.render('pages/report', {
      profile,
      passcode,
      success,
      aggregated
    });
  }
  return res.redirect(res.locals.urls.submitReport);
});

const extractTestResult = (req: Request): TestResult | undefined => {
  const testResponse = req.body['test-response'];
  if (testResponse === 'positive') {
    return TestResult.POSITIVE;
  }
  if (testResponse === 'negative') {
    return TestResult.NEGATIVE;
  }
  if (testResponse === 'pending') {
    return TestResult.PENDING;
  }
  return undefined;
};

const createReportRateLimit = rateLimit({
  max: 20, // allowed requests per window
  windowMs: 24 * 60 * 60 * 1000, // 24 hour window,
  keyGenerator: req => determineRemoteAddress(req)
});

const toSex = (inputValue: string): Sex => {
  if (inputValue === 'male') {
    return Sex.MALE;
  }
  if (inputValue === 'female') {
    return Sex.FEMALE;
  }
  return Sex.OTHER;
};

const toSmokingHabit = (inputValue: string): SmokingHabit | undefined => {
  if (inputValue === 'currently-smoking') {
    return SmokingHabit.CURRENTLY;
  }
  if (inputValue === 'used-to-smoke') {
    return SmokingHabit.USED_TO;
  }
  if (inputValue === 'never-smoked') {
    return SmokingHabit.NEVER;
  }
  return undefined;
};

const toIsolationStatus = (inputValue: string): IsolationStatus | undefined => {
  if (inputValue === 'not-in-isolation') {
    return IsolationStatus.NOT_IN_ISOLATION;
  }
  if (inputValue === 'isolation-due-to-travel') {
    return IsolationStatus.ISOLATION_DUE_TO_TRAVEL;
  }
  if (inputValue === 'isolation-due-to-contact') {
    return IsolationStatus.ISOLATION_DUE_TO_CONTACT;
  }
  if (inputValue === 'isolation-due-to-covid-19') {
    return IsolationStatus.ISOLATION_DUE_TO_COVID_19;
  }
  if (inputValue === 'isolation-due-to-government') {
    return IsolationStatus.ISOLATION_DUE_TO_GOVERNMENT_ORDERS;
  }
  return undefined;
};

router.post('/', async (req, res) => {
  const acceptPrivacyPolicy = req.body['accept-privacy-policy'] === 'on';
  if (!acceptPrivacyPolicy) {
    const reports = await reportRepo.getLatestCovidReports();
    const aggregated = aggregateCovidReports(reports);
    return res.render('pages/report', {
      didNotAcceptPrivacyPolicy: true,
      aggregated
    });
  }

  const covidReport: CovidReport = {
    age: req.body['age'],
    postalCode: req.body['postal-code'].toUpperCase(),
    hasBeenTested: req.body['been-tested'] === 'yes',
    testResult: extractTestResult(req),
    isPregnant: req.body['is-pregnant'] === 'yes',
    sex: toSex(req.body['gender']),
    symptoms: {
      [Symptom.DRY_COUGH]: req.body['symptom-cough'] === 'on',
      [Symptom.EXHAUSTION]: req.body['symptom-fatigue'] === 'on',
      [Symptom.FEVER]: req.body['symptom-fever'] === 'on',
      [Symptom.HEAVY_BREATHING]: req.body['symptom-heavy-breath'] === 'on',
      [Symptom.MUSCLE_ACHING]: req.body['symptom-muscle-pain'] === 'on',
      [Symptom.DIARRHEA]: req.body['symptom-diarrhea'] === 'on',
      [Symptom.HEADACHE]: req.body['symptom-headache'] === 'on',
      [Symptom.SORE_THROAT]: req.body['symptom-sore-throat'] === 'on',
      [Symptom.NO_TASTE]: req.body['symptom-no-taste'] === 'on',
      [Symptom.NO_SMELL]: req.body['symptom-no-smell'] === 'on',
      [Symptom.SLIME_COUGH]: req.body['symptom-slime-cough'] === 'on',
      [Symptom.RUNNY_NOSE]: req.body['symptom-runny-nose'] === 'on',
      [Symptom.CHEST_PAIN]: req.body['symptom-chest-pain'] === 'on',
      [Symptom.NAUSEA_OR_VOMITING]: req.body['symptom-nausea-or-vomiting'] === 'on'
    },
    symptomStart: req.body['symptom-start'],
    hasBeenInContactWithInfected: req.body['been-in-contact-with'] === 'yes',
    bodyTemperature: req.body['body-temperature'],
    smokingHabit: toSmokingHabit(req.body['smoking-habits']),
    isolationStatus: toIsolationStatus(req.body['isolation-status']),
    //Added
    diagnosedWith: {
      [Diagnosed.DIABETES]: req.body['diagnosed-diabetes'] === 'on',
      [Diagnosed.HYPERTENSIONARTERIAL]: req.body['diagnosed-hypertension-arterial'] === 'on',
      [Diagnosed.CORONARYHEARTDISEASE]: req.body['diagnosed-coronary-heart-disease'] === 'on',
      [Diagnosed.ASTHMA]: req.body['diagnosed-asthma'] === 'on',
      [Diagnosed.CHRONICLUNGDISEASE]: req.body['diagnosed-chronic-lung-disease'] === 'on',
      [Diagnosed.KIDNEYDISEASE]: req.body['diagnosed-kidney-disease'] === 'on',
      [Diagnosed.AUTOIMMUNEDISEASE]: req.body['diagnosed-autoimmune-disease'] === 'on',
      [Diagnosed.CANCER]: req.body['diagnosed-cancer'] === 'on',
      [Diagnosed.VIH]: req.body['diagnosed-vih'] === 'on',
      [Diagnosed.OBESITY_OR_MALNUTRITION]: req.body['diagnosed-obesity-or-malnutrition'] === 'on',
      [Diagnosed.IMMUNOSUPRESSION]: req.body['diagnosed-immunosupression'] === 'on'
    },
    submissionTimestamp: new Date().getTime(),
    phone: req.body['phone-number'],
    name: req.body['name-value'],
    patientId: req.body['patient-id-value'],
    videoUrl: req.body['video-url'],
    audioUrl: req.body['audio-url']
  };

  const passcode = req.body['passcode'] || passcodeCreator.createPasscode();

  const acceptRemember = req.body['accept-remember'] === 'on';

  // Set cookie with passcode
  if (acceptRemember) {
    res.cookie('passcode', passcode, cookieOptions);
  } else {
    res.clearCookie('passcode');
  }
  const score: Scoring = await ExtendedCovidReportApi.getScore(covidReport);
  covidReport.score = score;

  const patientIdOriginal = covidReport.patientId;
  if ((patientIdOriginal !== null) && (patientIdOriginal !== '')) {
    covidReport.patientId = patientIdOriginal.trim();
  }

  const responseReportsAPI = await ReportsAPI.createReport(covidReport);

  // Set cookie with patientID
  let patientId = responseReportsAPI.patientId;
  console.log('PatientID response: ', patientId);

  if ((patientId !== null) && (patientId !== '')) {
    res.cookie('patientId', patientId, cookieOptions);
    console.log('Cookie Done');
  }

  reportRepo.addNewCovidReport(passcode, covidReport);
  if (req.body['passcode']) {
    return res.redirect(
      `${res.locals.urls.profile}/${passcode}?success=true#contribute`
    );
  }
  const covidRisk = covidReport.score.covidRisk
    ? covidReport.score.covidRisk
    : null;
  return res.render('pages/confirm-profile', {
    covidRisk,
    patientId,
    passcode,
    hasCookie: acceptRemember
  });
});

export default router;
