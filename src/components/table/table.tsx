import styles from "./table.module.scss";

const Table = ({ children }: { children: React.ReactNode }) => {
  return <table className={styles.table}>{children}</table>;
};

export default Table;
