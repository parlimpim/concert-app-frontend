import { FaRegUser } from "react-icons/fa";
import cn from "classnames";
import Button from "@/components/button";
import styles from "./concert.module.scss";
import { UserRole } from "@/contexts/userContext";

export type ConcertType = {
  id: string;
  name: string;
  description: string;
  seat: number;
  availableSeats: number;
  createdAt: Date;
  updatedAt: Date;
  isReserved: boolean;
  onClick: (_: boolean) => void;
};

type ConcertProps = {
  userRole: UserRole;
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
          disabled={!availableSeats && userRole === UserRole.USER}
          className={buttonClassname()}
          onClick={() => onClick(isReserved)}
        >
          <div>{buttonLabel()}</div>
        </Button>
      </div>
    </div>
  );
};

export default Concert;
