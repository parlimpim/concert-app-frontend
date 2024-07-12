"use client";
import { useCallback, useContext } from "react";
import { useConcerts } from "@/hooks";
import { UserContext, UserRole } from "@/contexts/userContext";
import AppLayout from "@/layouts/appLayout";
import Concert, { ConcertType } from "./concert";
import styles from "./page.module.scss";

const Home = () => {
  const { loginRole } = useContext(UserContext)!;
  const { data, isLoading, error } = useConcerts({});

  // Todo: handle error and loading
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onClick = useCallback(
    (isReserved: boolean) => {
      if (loginRole === UserRole.ADMIN) {
        // show confirm delete dialog
      } else if (isReserved) {
        // case: user cancel concert
        // show confirm dialog
      } else {
        // case: user reserve concert
        // show confirm dialog
      }
    },
    [loginRole],
  );

  return (
    <AppLayout>
      <div className={styles.home}>
        {loginRole && <div></div>}
        <div className={styles.home__concerts}>
          {data?.data.map((item: ConcertType) => (
            <Concert
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              seat={item.seat}
              availableSeats={item.availableSeats}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              userRole={loginRole}
              isReserved={item.isReserved}
              onClick={onClick}
            ></Concert>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
