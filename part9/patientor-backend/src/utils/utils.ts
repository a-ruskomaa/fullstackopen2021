import { Gender, NewPatient, Patient } from "../types/types";
import { parse as parseUuid } from 'uuid';

type PatientFields = {
  id: unknown,
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

type NewPatientFields = Omit<PatientFields, 'id'>;

export const toNewPatient = ({ 
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation }: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
  };

  return newPatient;
};

export const toPatient = ({ id, ...rest }: PatientFields): Patient => {
  const patient = {
    id: parseId(id),
    entries: [],
    ...toNewPatient({...rest}),
  };

  return patient;
};

const isGender = (text: unknown): text is Gender => {
  return Object.values(Gender).includes(text as Gender);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isUuid = (val: string): boolean => {
  return Boolean(parseUuid(val));
};

const parseId = (text: unknown): string => {
  if (!text || !isString(text) || !isUuid(text)) {
    throw new Error('Incorrect or missing id: ' + text);
  }
  return text;
};

const parseString = (text: unknown, name: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${name}`);
  }

  return text;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export default {
  toNewPatient
};