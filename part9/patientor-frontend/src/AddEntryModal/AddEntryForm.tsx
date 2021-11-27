import React from "react";
import { Entry } from "../types";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return <div>FORM</div>;
};

export default AddEntryForm;