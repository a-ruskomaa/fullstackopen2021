import patientsData from '../../data/patients';
import { NewPatient, Patient, PatientNoSensitive } from '../types/types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<PatientNoSensitive> => {
  return patientsData.map(({ ssn: _ssn, ...rest }) => ({ ...rest }) as PatientNoSensitive);
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find(pt => pt.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    id: uuid(),
    entries: [],
    ...newPatient
  } as Patient;
  patientsData.push(patient);
  return patient;
};

export default {
  getPatients,
  getPatientById,
  addPatient
};