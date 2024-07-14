import { useEffect, useState } from "react";
import TextField, { TextFieldType } from "../textField";
import Image from "next/image";
import styles from "./passwordField.module.scss";

const PasswordField = ({
  id,
  value,
  placeholder,
  label,
  onChange,
}: TextFieldType) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    return () => setVisible(false);
  }, []);

  return (
    <div className={styles.passwordField}>
      <TextField
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        label={label}
        onChange={onChange}
      />
      <Image
        className={styles.visibleIcon}
        src={visible ? "/icons/show-password.svg" : "/icons/hide-password.svg"}
        alt="visible password"
        width={18}
        height={18}
        onClick={() => setVisible((prev) => !prev)}
      />
    </div>
  );
};

export default PasswordField;
