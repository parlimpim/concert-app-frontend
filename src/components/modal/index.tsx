import { FiX } from "react-icons/fi";
import styles from "./modal.module.scss";

type ModalType = {
  open: boolean;
  title?: string;
  onClose: () => void;
  footers?: React.ReactNode[];
  width?: number;
  height?: number;
  children: React.ReactNode;
};

const Modal = ({
  open,
  title,
  onClose,
  footers,
  width,
  height,
  children,
}: ModalType) => {
  if (!open) return null;

  return (
    <div className={styles.modal__backdrop}>
      <div
        className={styles.modal__container}
        style={{ minWidth: width, minHeight: height }}
      >
        <div className={styles.modal__header}>
          <FiX
            className={styles.close}
            width={20}
            height={20}
            onClick={onClose}
          />
        </div>
        <div className={styles.modal__body}>
          {title && <div className={styles.modal__title}>{title}</div>}
          {children}
          <div className={styles.modal__footer}>
            {footers?.map((item) => item)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
