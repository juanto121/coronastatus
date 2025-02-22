import express from 'express';
import { urls } from '../domain/urls';
import config from '../config';

const router = express.Router();

router.get(`${urls.privacyPolicy}`, (req, res) => {
  return res.render(
    `privacy-statements/${config.LANGUAGE}-lang-privacy-statement`
  );
});

router.get(`${urls.help}`, (req, res) => {
  return res.render('pages/help'
  );
});

router.get(`${urls.contributors}`, (req, res) => {
  return res.render('pages/contributors');
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  return res.render('pages/robots');
});

router.get(`${urls.videocall}`, (req, res) => {
  const videocallURL = config.DOCTORS_API_URL
  return res.render('pages/videocall', {
    videocallURL
    }
  );
});

export default router;
