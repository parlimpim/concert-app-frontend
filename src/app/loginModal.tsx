import { useCallback, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import en from "@/utils/en";

// components
import Modal from "@/components/modal";
import TextField from "@/components/textField";
import PasswordField from "@/components/passwordField";
import Button from "@/components/button";
import Checkbox from "@/components/checkBox";
import { loginUser } from "@/utils/auth";

// contexts
import { UserContext } from "@/contexts/userContext";

import styles from "./page.module.scss";
import LoadingSpinner from "@/components/loadingSpinner";

const {
  LOGIN: { TITLE, EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, FORGOT_PASSWORD },
  COMMON: { LOG_IN },
} = en;

// TODO: handle sign up, show error message
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext)!;
  const router = useRouter();

  const navagateToHomePage = useCallback(() => {
    router.push("/home");
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleLogin = useCallback(async () => {
    const params = { email, password, isAdmin };
    setIsLoading(true);
    try {
      const user = await loginUser(params);
      setUser(user);
      navagateToHomePage();
      onClose();
    } catch (error: any) {
      console.log("error", error);
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, isAdmin]);

  return (
    <Modal open={open} title={TITLE} onClose={onClose}>
      <LoadingSpinner isLoading={isLoading} />
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