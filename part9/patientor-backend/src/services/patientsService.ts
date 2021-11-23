import patientsData from '../../data/patients';
import { NewPatient, Patient, PatientNoSensitive } from '../types/types';
import { v1 as uuid } from 'uuid';
import { toPatient } from '../utils/utils';

const getPatients = (): Array<PatientNoSensitive> => {
  return patientsData.map(({ ssn: _ssn, ...rest }) => ({ ...rest }) as PatientNoSensitive);
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find(pt => pt.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = toPatient({
    id: uuid(),
    ...newPatient
  });
  patientsData.push(patient);
  return patient;
};

export default {
  getPatients,
  getPatientById,
  addPatient
};