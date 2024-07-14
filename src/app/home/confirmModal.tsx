import cn from "classnames";
import en from "@/utils/en";

// components
import Modal from "@/components/modal";
import Button from "@/components/button";
import LoadingSpinner from "@/components/loadingSpinner";

// utils
import { formatString } from "@/utils";

import styles from "./styles/confirmModal.module.scss";

type ConfirmModalType = {
  open: boolean;
  action: string;
  concertName: string;
  onDone: () => void;
  isLoading: boolean;
  setOpen: (open: boolean) => void;
};

const {
  COMMON: { CANCEL, CONFIRM },
  HOME: {
    CONFIRM: { QUESTION },
  },
} = en;

const ConfirmModal = ({
  open,
  setOpen,
  action,
  concertName,
  onDone,
  isLoading,
}: ConfirmModalType) => {
  const onClose = () => {
    setOpen(false);
  };

  const footers = [
    <Button key="cancel" id="cancel" size="small" secondary onClick={onClose}>
      <div>{CANCEL}</div>
    </Button>,
    <Button
      key="confirm"
      id="confirm"
      size="small"
      className={cn(styles.confirm__button, { [styles[action]]: action })}
      onClick={onDone}
    >
      <div>{CONFIRM}</div>
    </Button>,
  ];

  return (
    <Modal open={open} onClose={onClose} footers={footers}>
      {isLoading && <LoadingSpinner />}
      <div className={styles.confirm}>
        <div className={styles.confirm__question}>
          {formatString(QUESTION, action, concertName)}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
