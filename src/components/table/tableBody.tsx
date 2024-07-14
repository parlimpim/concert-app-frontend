import styles from "./table.module.scss";

const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody className={styles.table__body}>{children}</tbody>;
};

export default TableBody;
