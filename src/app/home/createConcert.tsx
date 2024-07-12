"use client";
import TextField from "@/components/textField";
import en from "@/utils/en";
import styles from "./styles/createConcert.module.scss";
import { useState } from "react";
import Button from "@/components/button";

const {
  HOME: {
    CREATE_CONCERT: {
      CREATE,
      CONCERT_NAME,
      TOTAL_OF_SEATS,
      DESCRIPTION,
      CONCERT_NAME_PLACEHOLDER,
      TOTAL_OF_SEATS_PLACEHOLDER,
      DESCRIPTION_PLACEHOLDER,
      SAVE,
    },
  },
} = en;

// TODO: handle save, check empty before save, number to be int
const CreateConcert = () => {
  const [name, setName] = useState("");
  const [seat, setSeat] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className={styles.create}>
      <div className={styles.create__title}>{CREATE}</div>
      <div className={styles.create__row}>
        <TextField
          id="concert-name"
          value={name}
          onChange={setName}
          label={CONCERT_NAME}
          placeholder={CONCERT_NAME_PLACEHOLDER}
        />
        <TextField
          id="total-of-seats"
          value={seat}
          onChange={setSeat}
          label={TOTAL_OF_SEATS}
          placeholder={TOTAL_OF_SEATS_PLACEHOLDER}
          type="number"
        />
      </div>
      <TextField
        id="description"
        value={description}
        onChange={setDescription}
        label={DESCRIPTION}
        placeholder={DESCRIPTION_PLACEHOLDER}
        rows={5}
        textarea
      />
      <Button id="save" className={styles.create__actions} onClick={() => {}}>
        <div>{SAVE}</div>
      </Button>
    </div>
  );
};

export default CreateConcert;
