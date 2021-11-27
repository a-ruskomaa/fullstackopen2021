import { Entry, Gender, HealthCheckRating, NewPatient, Patient } from "../types/types";
import { parse as parseUuid } from 'uuid';

export const toNewPatient = (object: unknown): NewPatient => {
  const obj = object as NewPatient;

  const newPatient: NewPatient = {
    name: parseString(obj.name, 'name'),
    dateOfBirth: parseDate(obj.dateOfBirth, 'date of birth'),
    ssn: parseString(obj.ssn, 'ssn'),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation, 'occupation'),
  };

  return newPatient;
};

export const toPatient = (object: unknown): Patient => {
  const obj = object as Patient;

  const patient = {
    id: parseId(obj.id),
    entries: obj.entries ? obj.entries.map(entry => toEntry(entry)) : [],
    ...toNewPatient({
      name: obj.name,
      dateOfBirth: obj.dateOfBirth,
      ssn: obj.ssn,
      gender: obj.gender,
      occupation: obj.occupation
    }),
  };

  return patient;
};


export const toEntry = (object: unknown): Entry => {
  const obj = object as Entry;

  const entry = {
    id: parseString(obj.id, 'id'),
    description: parseString(obj.id, 'description'),
    date: parseDate(obj.id, 'date'),
    specialist: parseString(obj.id, 'specialist'),
    diagnosisCodes: obj.diagnosisCodes?.map(code => parseString(code, 'diagnosis code'))
  } as Entry;

  switch (obj.type) {
    case 'OccupationalHealthcare':
      return {
        ...entry,
        type: 'OccupationalHealthcare',
        employerName: parseString(obj.employerName, 'employer name'),
        sickLeave: obj.sickLeave ? {
          startDate: parseDate(obj.sickLeave.startDate, 'sick leave start date'),
          endDate: parseDate(obj.sickLeave.endDate, 'sick leave end date'),
        } : undefined
      };
    case 'Hospital':
      return {
        ...entry,
        type: 'Hospital',
        discharge: {
          date: parseDate(obj.discharge.date, 'discharge date'),
          criteria: parseString(obj.discharge.criteria, 'discharge criteria')
        }
      };
    case 'HealthCheck':
      return {
        ...entry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
      };
  }
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

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
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

const parseDate = (date: unknown, name: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${name}: ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (
    healthCheckRating === null ||
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      `Incorrect or missing health check rating: ${healthCheckRating}`
    );
  }
  return healthCheckRating;
};

export default {
  toNewPatient
};