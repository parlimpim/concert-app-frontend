import styles from "./table.module.scss";

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className={styles.table__cell}>{children}</td>;
};

export default TableCell;
