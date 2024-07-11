import { useCallback, useState } from "react";
import Link from "next/link";
import en from "@/utils/en";
import styles from "./page.module.scss";

// components
import Modal from "@/components/modal";
import TextField from "@/components/textField";
import PasswordField from "@/components/passwordField";
import Button from "@/components/button";
import Checkbox from "@/components/checkBox";

const {
  LOGIN: { TITLE, EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, FORGOT_PASSWORD },
  COMMON: { LOG_IN },
} = en;

const LoginModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const onClose = () => {
    setOpen(false);
    console.log("close");
  };

  const handleLogin = useCallback(async () => {}, [email, password, isAdmin]);

  return (
    <Modal open={open} title={TITLE} onClose={onClose}>
      <div className={styles.login}>
        <div className={styles.login__form}>
          <TextField
            id="email"
            placeholder={EMAIL_PLACEHOLDER}
            value={email}
            onChange={setEmail}
          />
          <PasswordField
            id="password"
            placeholder={PASSWORD_PLACEHOLDER}
            value={password}
            onChange={setPassword}
          />
          <Checkbox
            id="checkbox"
            label="Login as admin"
            checked={isAdmin}
            onChange={() => setIsAdmin((prev) => !prev)}
          />
        </div>
        <div className={styles.login__action}>
          <Button id="login" width={300} onClick={handleLogin}>
            {LOG_IN}
          </Button>
          <div>create account</div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
