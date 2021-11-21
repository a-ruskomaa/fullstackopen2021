import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (_req, res) => {
  const patient = _req.body;
  res.send(patientsService.addPatient(patient));
});


export default router;