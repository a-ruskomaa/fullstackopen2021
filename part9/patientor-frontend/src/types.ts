export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}