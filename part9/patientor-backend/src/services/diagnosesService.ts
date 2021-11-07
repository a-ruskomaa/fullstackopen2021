import diagnosesData from '../../data/diagnoses.json';
import { Diagnosis } from '../types/types';

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnosesData;
};

export default {
  getDiagnoses,
};