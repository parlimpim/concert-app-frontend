import styles from "./checkbox.module.scss";

export type CheckboxType = {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
};

const Checkbox = ({ id, checked, onChange, label, disabled }: CheckboxType) => {
  return (
    <div className={styles.checkbox}>
      <label className={styles.checkbox__input}>
        <input
          id={`${id}-checkbox`}
          className={styles.input}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className={styles.checkmark}></span>
      </label>
      {label && <div>{label}</div>}
    </div>
  );
};

export default Checkbox;
