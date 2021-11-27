import React, { ReactFragment } from "react";
import { Field, Formik } from "formik";
import { Button, Form, Grid, Select } from "semantic-ui-react";
import { DiagnosisSelection, NumberField, SelectFieldOption, TextField } from "../components/FormField";
import { Entry, EntryType, UnionOmit } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const requiredError = "Field is required";

const baseInitialValues = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [formEntryType, setFormEntryType] = React.useState<EntryType>(EntryType.HealthCheck);

  return (
    <>
      <EntryTypeSelectField
        value={formEntryType}
        setValue={setFormEntryType}
        label="Entry type"
        options={typeOptions} />
      <FormWithEntryType entrytype={formEntryType} onSubmit={onSubmit} onCancel={onCancel} />
    </>
  );
};

interface TypeOption extends SelectFieldOption {
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  {
    value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare"
  },
  { value: EntryType.HealthCheck, label: "Health Check" }
];

const EntryTypeSelectField = ({
  value,
  setValue,
  label,
  options
}: { value: EntryType, setValue: (entryType: EntryType) => void, label: string, options: SelectFieldOption[] }) => (
  <Form>
    <Form.Field style={{ marginBottom: '1em' }}>
      <label>{label}</label>
      <Select
        value={value}
        onChange={(e, d) => setValue(d.value as EntryType)}
        className="ui dropdown"
        options={options.map(option => ({
          text: option.label,
          value: option.value
        }))} />
    </Form.Field>
  </Form>
);

type FormWithEntryTypeProps = {
  entrytype: EntryType,
  onSubmit: (values: EntryFormValues) => void,
  onCancel: () => void
};

const FormWithEntryType = ({
  entrytype,
  onSubmit,
  onCancel }: FormWithEntryTypeProps) => {
  const [{ diagnosisList }] = useStateValue();
  const [subFormFields, validateSubForm, initialValues] = useEntrySubForm(entrytype);

  return (<Formik
    initialValues={initialValues}
    enableReinitialize={true}
    onSubmit={onSubmit}
    validate={values => {
      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (!values.type) {
        errors.type = requiredError;
      }
      validateSubForm(values, errors);
      return errors;
    }}
  >
    {({ isValid, dirty, submitForm, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Date of entry"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          {subFormFields}
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosisList)}
          />
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onCancel} color="red">
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button
                floated="right"
                type="submit"
                color="green"
                onClick={submitForm}
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      );
    }}
  </Formik>);
};

const useEntrySubForm = (entrytype: EntryType): [fields: ReactFragment, validation: (values: any, errors: { [field: string]: string }) => { [field: string]: string }, initialValues: EntryFormValues] => {
  switch (entrytype) {
    case EntryType.HealthCheck:
      return [
        <>
          <Field
            label="Health rating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />
        </>,
        (values, errors) => {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
          return errors;
        },
        {
          ...baseInitialValues,
          type: EntryType.HealthCheck,
          healthCheckRating: 0,
        }
      ];
    case EntryType.Hospital:
      return [
        <>
          <Field
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge criteria"
            placeholder="Discharge criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>,
        (values, errors) => {
          if (!values.discharge.date) {
            errors['discharge.date'] = requiredError;
          }
          if (!values.discharge.criteria) {
            errors['discharge.criteria'] = requiredError;
          }
          return errors;
        },
        {
          ...baseInitialValues,
          type: EntryType.Hospital,
          discharge: {
            date: '',
            criteria: ''
          },
        }
      ];
    case EntryType.OccupationalHealthcare:
      return [
        <>
          <Field
            label="Employer name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick leave starts"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sick leave starts"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>,
        (values, errors) => {
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.sickLeave.endDate) {
            errors['sickLeave.endDate'] = requiredError;
          }
          if (!values.sickLeave.startDate) {
            errors['sickLeave.startDate'] = requiredError;
          }
          return errors;
        },
        {
          ...baseInitialValues,
          type: EntryType.OccupationalHealthcare,
          employerName: '',
          sickLeave: {
            startDate: '',
            endDate: '',
          }
        }
      ];
  }
};

export default AddEntryForm;