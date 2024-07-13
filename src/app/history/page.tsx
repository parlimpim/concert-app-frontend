"use client";
import { useEffect, useMemo } from "react";
import cn from "classnames";
import axios from "axios";
import AppLayout from "@/layouts/appLayout";

// hooks
import { useHistories } from "@/hooks";

// components
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/table";
import { Header } from "@/components/table/tableHeader";
import ErrorMessage from "@/components/errorMessage";

// utils
import { formatDate } from "@/utils";
import { StatusMap } from "@/utils/enums";
import { HistoryType } from "@/utils/responseTypes";
import en from "@/utils/en";

import styles from "./page.module.scss";
import LoadingSpinner from "@/components/loadingSpinner";

const headers: Header[] = [
  {
    key: "date-time",
    header: "Date Time",
  },
  {
    key: "user-name",
    header: "User Name",
  },
  {
    key: "user-email",
    header: "User Email",
  },
  {
    key: "concert-name",
    header: "Concert Name",
  },
  {
    key: "action",
    header: "Action",
  },
];

const {
  ERROR_MESSAGE: { UNEXPECTED },
} = en;

const History = () => {
  const {
    data,
    isError,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useHistories();

  const histories = useMemo(() => {
    return data?.pages.reduce((acc: HistoryType[], cur) => {
      return [...acc, ...cur.data];
    }, []);
  }, [data]);

  const errorMessage = useMemo(() => {
    if (isError) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data.message;
      } else {
        return UNEXPECTED;
      }
    }
  }, [isError, error]);

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

  if (error)
    return (
      <AppLayout>
        <div className={styles.history}>
          <ErrorMessage message={errorMessage} />
        </div>
      </AppLayout>
    );

  return (
    <AppLayout>
      <div className={styles.history}>
        {isLoading && <LoadingSpinner />}
        <Table>
          <TableHeader headers={headers}></TableHeader>
          <TableBody>
            {histories?.map((history) => (
              <TableRow
                key={`${history.user.name}-${formatDate(history.createdAt)}`}
              >
                <TableCell>{formatDate(history.createdAt)}</TableCell>
                <TableCell>{history.user.name}</TableCell>
                <TableCell>{history.user.email}</TableCell>
                <TableCell>{history.concert.name}</TableCell>
                <TableCell>
                  <div
                    className={cn(styles.history__status, {
                      [styles[history.status]]: history.status,
                    })}
                  >
                    {StatusMap[history.status]}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
};

export default History;
