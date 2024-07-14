import styles from "./table.module.scss";

const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr className={styles.table__row}>{children}</tr>;
};

export default TableRow;
