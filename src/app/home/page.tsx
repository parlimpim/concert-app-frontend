"use client";
import { useCallback, useContext, useState } from "react";
import { useConcerts } from "@/hooks";
import { UserContext, UserRole } from "@/contexts/userContext";
import AppLayout from "@/layouts/appLayout";
import Concert, { ConcertType } from "./concert";
import styles from "./styles/page.module.scss";
import Tab, { MenuType } from "@/components/tab";
import CreateConcert from "./createConcert";

enum HomeMenus {
  OVERVIEW = "overview",
  CREATE = "create",
}

const HomeMenusDetails: Record<HomeMenus, MenuType> = {
  [HomeMenus.OVERVIEW]: {
    label: HomeMenus.OVERVIEW.toUpperCase(),
    value: HomeMenus.OVERVIEW,
  },
  [HomeMenus.CREATE]: {
    label: HomeMenus.CREATE.toUpperCase(),
    value: HomeMenus.CREATE,
  },
};

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(HomeMenus.OVERVIEW as string);
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
        {loginRole === UserRole.ADMIN && (
          <Tab
            id="home-tab"
            menus={Object.values(HomeMenusDetails)}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        )}
        {/* Overview */}
        {selectedTab === HomeMenus.OVERVIEW && (
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
        )}
        {/* Create */}
        {selectedTab === HomeMenus.CREATE && <CreateConcert />}
      </div>
    </AppLayout>
  );
};

export default Home;
