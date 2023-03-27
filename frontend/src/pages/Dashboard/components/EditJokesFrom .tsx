import React, { useState, ChangeEvent } from "react";
import { Input } from "./Input";
import { Button, DangerButton } from "./Button";
import { Jokes, JokeTitle } from "./JokeList";

interface EditJokesFormState {
  name: string;
  description: string;
  count: number;
}


export const EditJokesForm: React.FC<{ afterSubmit: () => void;
  joke:Jokes;
}> = ({
    afterSubmit, joke}) => {
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

    await fetch('/api/joke/${joke.id}', {
       method: "PATCH",
        headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        ...values,
        count: Math.abs(parseFloat(values.count)).toString(),
      }),
    });
    afterSubmit();
  };

  const deleteJoke = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`/api/joke/${joke.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json"},
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

        <Button type="submit">Edit Joke</Button>
        <DangerButton onClick={deleteJoke}>
        Delete Joke
        </DangerButton>

      </form>
  );
};