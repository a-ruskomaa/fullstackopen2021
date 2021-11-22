import { State } from "./state";
import { MinimalPatient, Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: MinimalPatient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: MinimalPatient;
  }
  | {
    type: "ADD_PATIENT_DETAILS";
    payload: Patient;
  };

export const setPatientList = (patients: MinimalPatient[]) => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  } as Action;
};

export const addPatient = (patient: MinimalPatient) => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  } as Action;
};

export const addPatientDetails = (patient: Patient) => {
  return {
    type: "ADD_PATIENT_DETAILS",
    payload: patient,
  } as Action;
};


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patientList: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patientList
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patientList: {
          ...state.patientList,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_DETAILS":
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
