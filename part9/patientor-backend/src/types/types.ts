export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
}

export type PatientNoSensitive = Omit<Patient, 'ssn'>

export type NewPatient = Omit<Patient, 'id'>

export enum Gender {
    'male',
    'female',
    'other'
}