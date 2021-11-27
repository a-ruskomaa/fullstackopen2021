import express from 'express';
import entryService from '../services/entryService';
import patientsService from '../services/patientsService';
import { toNewEntry, toNewPatient } from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  res.send(patientsService.addPatient(newPatient));
});

router.post('/:patientId/entries', (req, res) => {
  const patient = patientsService.getPatientById(req.params.patientId);
  if (!patient) {
    res.sendStatus(404);
  } else {
    const newEntry = toNewEntry(req.body);
    res.send(entryService.addEntry(newEntry, patient));
  }
});

export default router;