import React from "react";
import axios from "axios";
import { Container, Icon, SemanticICONS } from "semantic-ui-react";

import { Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientDisplayPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails: patients }, dispatch] = useStateValue();
  const [, setError] = React.useState<string | undefined>();

  let patient = Object.entries(patients).find(([k, _]) => k === id)?.[1];

  if (!patient) {
    axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    ).then(res => res.data)
      .then(pt => {
        dispatch({ type: "ADD_PATIENT_DETAILS", payload: pt });
        patient = pt;
      }).catch(e => {
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response?.data?.error || 'Unknown error');
      });
  }

  return (
    patient ?
      <div className="App">
        <Container>
          <h3>{patient.name} <Icon name={resolveGenderIconName(patient.gender)} /></h3>
        </Container>
        <Container>
          <div>ssn: {patient.ssn} </div>
          <div>occupation: {patient.occupation} </div>
        </Container>
      </div>
      : null
  );
};

const resolveGenderIconName = (gender: Gender): SemanticICONS => {
  switch (gender) {
    case Gender.Male:
      return 'mars';
    case Gender.Female:
      return 'venus';
    default:
      return 'genderless';
  }
};

export default PatientDisplayPage;
