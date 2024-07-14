import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./textField.module.scss";

export type TextFieldType = {
  id: string;
  value: string;
  placeholder: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  width?: number;
  textarea?: boolean;
  rows?: number;
  min?: number;
  error?: boolean;
  errorMessage?: string;
  onChange: (newValue: string) => void;
};

const TextField = ({
  id,
  value: valueFromProps,
  placeholder,
  label,
  type,
  width,
  textarea,
  rows,
  min,
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
      {label && <div>{label}</div>}
      {textarea ? (
        <textarea
          id={`${id}-textarea`}
          className={cn(styles.textField__input, styles.textField__textarea)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          style={{ width }}
        />
      ) : (
        <input
          id={`${id}-input`}
          className={styles.textField__input}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ width }}
          min={min}
          step={1}
        />
      )}
    </div>
  );
};

export default TextField;
