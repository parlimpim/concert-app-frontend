import styles from "./table.module.scss";

export type Header = {
  key: string;
  header: React.ReactNode | string;
};

type TableHeaderType = {
  headers: Header[];
};

const TableHeader = ({ headers }: TableHeaderType) => {
  return (
    <thead className={styles.table__header}>
      <tr>
        {headers.map(({ key, header }) => (
          <th key={key} className={styles.item}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
