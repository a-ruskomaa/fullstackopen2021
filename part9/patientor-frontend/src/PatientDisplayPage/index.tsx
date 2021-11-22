import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

const PatientDisplayPage = ({ id }: { id: string }) => {
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
    <div className="App">
      <Container textAlign="left">
        <h3>{patient?.name}</h3>
      </Container>

    </div>
  );
};

export default PatientDisplayPage;
