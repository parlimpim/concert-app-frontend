"use client";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useConcerts, useMutateDeleteConcert, useMutateHistory } from "@/hooks";
import { UserContext, UserRole } from "@/contexts/userContext";
import AppLayout from "@/layouts/appLayout";
import Concert from "./concert";
import styles from "./styles/page.module.scss";
import Tab, { MenuType } from "@/components/tab";
import CreateConcert from "./createConcert";
import ConfirmModal from "./confirmModal";
import LoadingSpinner from "@/components/loadingSpinner";
import { ConcertType } from "@/utils/responseTypes";
import { Status } from "@/utils/enums";

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
  const { mutate: mutateDeleteConcert, isPending: isPendingDeleteConcert } =
    useMutateDeleteConcert(false);
  const { mutate: mutateHistory, isPending: isPendingHistory } =
    useMutateHistory(false);

  const { loginRole } = useContext(UserContext)!;
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useConcerts();

  const concerts = useMemo(() => {
    return data?.pages.reduce((acc: ConcertType[], cur) => {
      return [...acc, ...cur.data];
    }, []);
  }, [data]);

  const onClick = useCallback(
    (action: string, concertName: string, concertId: string) => {
      setConcertName(concertName);
      setAction(action);
      setConcertId(concertId);
      setShowConfirmModal(true);
    },
    [loginRole],
  );

  const onDone = useCallback(() => {
    setShowConfirmModal(false);

    switch (action) {
      case "delete": {
        mutateDeleteConcert({
          id: concertId,
        });
        break;
      }
      case "cancel": {
        mutateHistory({
          params: { concertId, status: Status.CANCELED },
        });
        break;
      }
      case "reserve": {
        mutateHistory({
          params: { concertId, status: Status.RESERVED },
        });
        break;
      }
      default: {
        break;
      }
    }
  }, [action, concertId]);

  useEffect(() => {
    const onScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight;
      if (bottom) {
        if (!isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  // Todo: handle error and loading
  if (isLoading)
    return (
      <AppLayout>
        <div className={styles.home}>
          <LoadingSpinner size={100} />
        </div>
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
            {concerts?.map((item: ConcertType) => (
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
        isLoading={isPendingDeleteConcert || isPendingHistory}
      />
    </AppLayout>
  );
};

export default Home;
