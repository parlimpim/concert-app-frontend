"use client";
import TextField from "@/components/textField";
import en from "@/utils/en";
import styles from "./styles/createConcert.module.scss";
import { Fragment, useCallback, useState } from "react";
import Button from "@/components/button";
import { useMutateConcert } from "@/hooks";
import LoadingSpinner from "@/components/loadingSpinner";

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
      EMPTY_ERROR,
    },
  },
} = en;

const CreateConcert = () => {
  const [name, setName] = useState("");
  const [seat, setSeat] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutateConcert(false);

  const onCreate = useCallback(() => {
    mutate({
      params: {
        name,
        description,
        seat: parseInt(seat),
      },
      onSuccess: () => {
        window.location.reload();
      },
    });
  }, [name, seat, description]);

  const onSave = useCallback(() => {
    if (!name || !seat || !description) {
      setError(EMPTY_ERROR);
    }

    if (name && seat && description) {
      onCreate();
    }
  }, [name, seat, description]);

  return (
    <Fragment>
      {isPending && <LoadingSpinner />}
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
            min={1}
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
        <div className={styles.create__actions}>
          <div className={styles.create__error}>{error}</div>
          <Button id="save" onClick={onSave}>
            <div>{SAVE}</div>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateConcert;
