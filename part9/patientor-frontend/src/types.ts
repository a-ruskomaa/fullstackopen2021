export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface MinimalPatient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  dateOfBirth?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[]
}


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string,
  },
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: {
    date: string,
    criteria: string,
  },
}

export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;