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

export const toNewPatient = (data: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(data.name, 'name'),
    dateOfBirth: parseDateOfBirth(data.dateOfBirth),
    ssn: parseString(data.ssn, 'ssn'),
    gender: parseGender(data.gender),
    occupation: parseString(data.occupation, 'occupation'),
  };

  return newPatient;
};

export const toPatient = (data: PatientFields): Patient => {
  const patient = {
    id: parseId(data.id),
    entries: [],
    ...toNewPatient(data),
  }

  return patient;
}

const isGender = (text: any): text is Gender => {
  return Object.values(Gender).includes(text);
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isUuid = (val: string): boolean => {
  return Boolean(parseUuid(val));
}


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
}

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
}