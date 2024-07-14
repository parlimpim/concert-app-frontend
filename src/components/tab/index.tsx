import cn from "classnames";
import styles from "./tab.module.scss";

export type MenuType = {
  label: string;
  value: string;
};
type TabType = {
  id: string;
  menus: MenuType[];
  selectedTab: string;
  setSelectedTab: (_: string) => void;
};

const Tab = ({ id, menus, selectedTab, setSelectedTab }: TabType) => {
  return (
    <div id={id} className={styles.tab}>
      <ul className={styles.tab__menus}>
        {menus.map((menu: MenuType) => (
          <li
            key={menu.value}
            id={`${menu.value}-tab`}
            className={cn(styles.tab__item, {
              [styles.selected]: selectedTab === menu.value,
            })}
            onClick={() => setSelectedTab(menu.value)}
          >
            {menu.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab;
