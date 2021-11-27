import express from 'express';
import entryService from '../services/entryService';
import patientsService from '../services/patientsService';
import { toEntry } from '../utils/utils';

const router = express.Router();

router.post('/patients/:patientId/entries', (req, res) => {
  const patient = patientsService.getPatientById(req.params.patientId);
  if (!patient) {
    res.sendStatus(404);
  } else {
    const newEntry = toEntry(req.body);
    res.send(entryService.addEntry(newEntry, patient));
  }
});


export default router;