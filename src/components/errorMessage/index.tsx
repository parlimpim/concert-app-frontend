import { MdErrorOutline } from "react-icons/md";
import styles from "./error-message.module.scss";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles.error}>
      <MdErrorOutline size={20} />
      <div>{message}</div>
    </div>
  );
};

export default ErrorMessage;
