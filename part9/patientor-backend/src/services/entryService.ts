import { NewEntry, Entry } from '../types/types';
import { v1 as uuid } from 'uuid';
import patientsService from './patientsService';

const addEntry = (newEntry: NewEntry, patientId: string): Entry => {
  const patient = patientsService.getPatientById(patientId);

  if (patient == undefined) {
    throw new Error('no patient found');
  }

  const entry = {
    id: uuid(),
    ...newEntry
  } as Entry;

  patient?.entries.push(entry);
  return entry;
};

export default {
  addEntry
};