import React, { useState, ChangeEvent } from "react";
import { Input } from "./Input";
import { Button, DownloadButton } from "./Button";
import { JokeTitle } from "./JokeList";


export const AddJokesForm: React.FC<{ afterSubmit: () => void }> = ({
    afterSubmit, }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    count: "",
  });

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
    await fetch('/api/joke', {
       method: "POST",
        headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        ...values,
        count: Math.abs(parseFloat(values.count)).toString(),
      }),
    });
    afterSubmit();
  };
  return (
      <form onSubmit={onSubmitForm}>
        <Input
          name="name"
          type="text"
          label="Name"
          onChange={fieldDidChange}
          required
          value={values.name}
        />
        <Input
          name="description"
          label="Description"
          type="text"
          onChange={fieldDidChange}
          required
          value={values.description}
        />
        <Input
          name="count"
          label="Rate your Joke (1-5)"
          type="number"
          step="1."
          onChange={fieldDidChange}
          required
          value={values.count}
      />
        <Button type="submit">Add New Joke</Button>

      </form>
  );
};
