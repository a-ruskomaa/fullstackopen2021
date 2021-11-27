import express from 'express';
import entryService from '../services/entryService';
import { toEntry } from '../utils/utils';

const router = express.Router();

router.post('/patients/:patientId/entries', (req, res) => {
  const newEntry = toEntry(req.body);
  res.send(entryService.addEntry(newEntry, req.params.patientId));
});


export default router;