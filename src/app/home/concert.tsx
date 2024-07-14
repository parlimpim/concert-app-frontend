import { FaRegUser } from "react-icons/fa";
import cn from "classnames";

// components
import Button from "@/components/button";

// utils
import { ConcertType } from "@/utils/responseTypes";
import { UserRole, UserRoleType } from "@/utils/enums";

import styles from "./styles/concert.module.scss";

type ConcertProps = {
  userRole: UserRoleType | "";
  onClick: (action: string, name: string, id: string) => void;
} & ConcertType;

const Concert = ({
  id,
  name,
  description,
  seat,
  availableSeats,
  isReserved,
  userRole,
  onClick,
}: ConcertProps) => {
  const buttonClassname = () => {
    if (userRole === UserRole.ADMIN || isReserved) {
      return styles.red;
    }

    return "";
  };

  const buttonLabel = () => {
    if (userRole === UserRole.ADMIN) {
      return "Delete";
    }

    if (isReserved) {
      return "Cancel";
    }

    return "Reserve";
  };
  return (
    <div id={id} className={styles.concert}>
      <div className={cn(styles.concert__row, styles.border)}>
        <div className={styles.concert__name}>{name}</div>
        {availableSeats ? (
          <div
            className={cn(styles.concert__number, styles.green)}
          >{`${availableSeats} available`}</div>
        ) : (
          <div className={cn(styles.concert__number, styles.gray)}>
            Sold out
          </div>
        )}
      </div>
      <div className={styles.concert__description}>{description}</div>
      <div className={styles.concert__row}>
        <div className={styles.concert__seats}>
          <FaRegUser />
          <div>{seat}</div>
        </div>
        <Button
          size="small"
          id="action"
          disabled={
            userRole === UserRole.USER && !isReserved && !availableSeats
          }
          className={buttonClassname()}
          onClick={() => onClick(buttonLabel().toLowerCase(), name, id)}
        >
          <div>{buttonLabel()}</div>
        </Button>
      </div>
    </div>
  );
};

export default Concert;
