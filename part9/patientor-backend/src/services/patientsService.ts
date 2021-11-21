import patientsData from '../../data/patients.json';
import { Patient, PatientNoSensitive } from '../types/types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<PatientNoSensitive> => {
  return patientsData.map(({ ssn, ...rest }) => ({ ...rest }) as PatientNoSensitive);
};

const addPatient = (patient: Patient): Patient => {
  patient.id = uuid();
  patientsData.push(patient);
  return patient;
}

export default {
  getPatients,
  addPatient
};