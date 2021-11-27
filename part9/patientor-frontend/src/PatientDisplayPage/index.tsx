import React from "react";
import axios from "axios";
import { Button, Container } from "semantic-ui-react";

import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { addPatientDetails, addPatientEntry, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import GenderIcon from "../components/GenderIcon";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDisplayPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails: patients }, dispatch] = useStateValue();

  const [error, setError] = React.useState<string | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  let patient = Object.entries(patients).find(([k, _]) => k === id)?.[1];

  if (!patient) {
    axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    ).then(res => res.data)
      .then(pt => {
        dispatch(addPatientDetails(pt));
        patient = pt;
      }).catch(e => {
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response?.data?.error || 'Unknown error');
      });
  }


  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patient) {
      setError('No patient selected');
      return;
    }

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addPatientEntry(patient.id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };


  return (
    patient ?
      <div className="App">
        <Container>
          <h3>{patient.name} <GenderIcon gender={patient.gender} /></h3>
        </Container>
        <Container style={{ marginTop: '20px' }}>
          <div>ssn: {patient.ssn} </div>
          <div>occupation: {patient.occupation} </div>
        </Container>
        <Container style={{ marginTop: '20px' }}>
          <h4>Entries</h4>
          {patient.entries && patient.entries.length > 0 ?
            patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} />) : <div>{'No entries found'}</div>}
        </Container>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
      : null
  );
};

export default PatientDisplayPage;
