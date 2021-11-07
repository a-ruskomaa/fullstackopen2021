import patientsData from '../../data/patients.json';
import { PatientNoSensitive } from '../types/types';

const getPatients = (): Array<PatientNoSensitive> => {
  return patientsData.map(({ssn, ...rest}) => ({...rest}) as PatientNoSensitive);
};

export default {
  getPatients,
};