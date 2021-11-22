import patientsData from '../../data/patients.json';
import { NewPatient, Patient, PatientNoSensitive } from '../types/types';
import { v1 as uuid } from 'uuid';
import { toPatient } from '../utils/utils';

const patientsDataTyped = patientsData.map(pt => toPatient(pt));

const getPatients = (): Array<PatientNoSensitive> => {
  return patientsDataTyped.map(({ ssn, ...rest }) => ({ ...rest }) as PatientNoSensitive);
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsDataTyped.find(pt => pt.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = toPatient({
    id: uuid(),
    ...newPatient
  });
  patientsDataTyped.push(patient);
  return patient;
}

export default {
  getPatients,
  getPatientById,
  addPatient
};