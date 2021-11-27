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

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck"
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

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare,
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string,
  },
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital,
  discharge: {
    date: string,
    criteria: string,
  },
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;