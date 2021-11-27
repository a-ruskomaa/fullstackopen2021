import { NewEntry, Entry, Patient } from '../types/types';
import { v1 as uuid } from 'uuid';

const addEntry = (newEntry: NewEntry, patient: Patient): Entry => {

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