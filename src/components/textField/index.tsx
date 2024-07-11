import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import styles from "./textField.module.scss";

export type TextFieldType = {
  id: string;
  value: string;
  placeholder: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (newValue: string) => void;
};

const TextField = ({
  id,
  value: valueFromProps,
  placeholder,
  label,
  type,
  onChange,
}: TextFieldType) => {
  const [value, setValue] = useState<string>(valueFromProps);

  useEffect(() => {
    setValue(valueFromProps);
  }, [valueFromProps]);

  useEffect(() => {
    return () => onChange("");
  }, []);

  return (
    <div className={styles.textField}>
      {label && <div className={styles.textField__label}>{label}</div>}
      <input
        id={`${id}-input`}
        className={styles.textField__input}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
