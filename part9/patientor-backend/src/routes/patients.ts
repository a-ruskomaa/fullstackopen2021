import express from 'express';
import patientsService from '../services/patientsService';
import { toPatient } from '../utils/utils';

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
  const newPatient = toPatient(req.body);
  res.send(patientsService.addPatient(newPatient));
});


export default router;