"use client";
import { useCallback, useContext, useState } from "react";
import { useConcerts, useMutateConcert, useMutateDeleteConcert } from "@/hooks";
import { UserContext, UserRole } from "@/contexts/userContext";
import AppLayout from "@/layouts/appLayout";
import Concert, { ConcertType } from "./concert";
import styles from "./styles/page.module.scss";
import Tab, { MenuType } from "@/components/tab";
import CreateConcert from "./createConcert";
import ConfirmModal from "./confirmModal";

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [action, setAction] = useState("");
  const [concertName, setConcertName] = useState("");
  const [concertId, setConcertId] = useState("");

  // mutate
  const { mutate: mutateDeleteConcert } = useMutateDeleteConcert(false);

  const { loginRole } = useContext(UserContext)!;
  const { data, isLoading, error } = useConcerts({});

  const onClick = useCallback(
    (action: string, concertName: string, concertId: string) => {
      setConcertName(concertName);
      setAction(action);
      setConcertId(concertId);
      setShowConfirmModal(true);
    },
    [loginRole],
  );

  // TODO: mutate
  const onDone = useCallback(() => {
    setShowConfirmModal(false);

    switch (action) {
      case "delete": {
        mutateDeleteConcert({
          id: concertId,
        });
      }
      case "cancel": {
      }
      case "reserve": {
      }
    }
  }, [action, concertId]);

  // Todo: handle error and loading
  if (isLoading)
    return (
      <AppLayout>
        <div className={styles.home}>Loading...</div>
      </AppLayout>
    );
  if (error)
    return (
      <AppLayout>
        <div className={styles.home}>Error: {error.message}</div>
      </AppLayout>
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
      <ConfirmModal
        open={showConfirmModal}
        setOpen={setShowConfirmModal}
        onDone={onDone}
        action={action}
        concertName={concertName}
      />
    </AppLayout>
  );
};

export default Home;
