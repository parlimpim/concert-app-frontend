"use client";
import AppLayout from "@/layouts/appLayout";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/table";
import styles from "./page.module.scss";
import { Header } from "@/components/table/tableHeader";
import { useHistories } from "@/hooks";
import { HistoryType, StatusMap } from "@/hooks/useHistories";
import { formatDate } from "@/utils/formatDate";
import cn from "classnames";

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

const ReservationHistory = () => {
  const { data, isLoading, error } = useHistories({});

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
      <div className={styles.history}>
        <Table>
          <TableHeader headers={headers}></TableHeader>
          <TableBody>
            {data?.data?.map((history: HistoryType) => (
              <TableRow>
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

export default ReservationHistory;
