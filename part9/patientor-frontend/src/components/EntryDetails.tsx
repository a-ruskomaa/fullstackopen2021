import React from 'react';
import { Container, Icon, SemanticICONS } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import { assertNever } from '../utils';
import HealthRatingBar from './HealthRatingBar';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }

};

type BaseEntryDetailsProps = {
  entry: Entry,
  iconName: SemanticICONS,
  headingText?: string,
  content?: JSX.Element
};

const BaseEntryDetails = ({ entry, iconName, content, headingText }: BaseEntryDetailsProps) => {
  return (
    <div style={{ border: "1px solid black ", margin: '5px 0px', padding: '10px 10px 20px 5px' }}>
      <EntryHeading date={entry.date} iconName={iconName} text={headingText} />
      <Container style={{ fontStyle: "italic", marginBottom: '5px ' }}>{entry.description}</Container>
      {content ? <Container style={{ fontStyle: "italic" }}>{content}</Container> : null}
      {
        entry.diagnosisCodes ? <DiagnosisList diagnosisCodes={entry.diagnosisCodes} /> : null
      }
    </div>
  );
};

const DiagnosisList = ({ diagnosisCodes }: { diagnosisCodes: string[] }) => {
  const [{ diagnosisList: diagnoses },] = useStateValue();

  const diagnosisDetails = diagnosisCodes.map(code =>
    Object.getOwnPropertyNames(diagnoses).includes(code) ?
      diagnoses[code] : { code, name: '' });

  return (
    <Container>
      <ul>
        {diagnosisDetails.map(dg => (<li key={dg.code}>{dg.code} {dg.name}</li>))}
      </ul>
    </Container>);
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return <BaseEntryDetails entry={entry} iconName={'heartbeat'} content={
    <Container>
      <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
    </Container>
  } />;
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return <BaseEntryDetails entry={entry} iconName={'hospital'} />;
};

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return <BaseEntryDetails entry={entry} iconName={'user md'} headingText={entry.employerName} />;
};

type EntryHeadingProps = {
  date: string,
  iconName: SemanticICONS,
  text?: string
};

const EntryHeading = ({ date, iconName, text }: EntryHeadingProps) => {
  return (<Container style={{ fontSize: '1rem', marginBottom: '5px ' }}>{date} <Icon name={iconName} size={'big'} /> {text}</Container>);
};

export default EntryDetails;