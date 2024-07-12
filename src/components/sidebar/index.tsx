"use client";
import { useCallback, useContext, useState } from "react";
import Link from "next/link";
import cn from "classnames";

// icons
import { IoMdClose, IoIosMenu } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { HiSwitchHorizontal } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";

// contexts
import { UserContext } from "@/contexts/userContext";
import { SidebarContext, Menus, MenuDetails } from "@/contexts/sidebarContext";

// utils
import { UserRole } from "@/utils/enums";
import en from "@/utils/en";

import styles from "./sidebar.module.scss";

const {
  COMMON: { LOG_OUT },
  SIDEBAR: { SWITCH_ROLE },
} = en;

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { email, name, loginRole, role } = useContext(UserContext)!;
  const { setSelectedMenu, selectedMenu } = useContext(SidebarContext)!;

  const onClickMenu = useCallback((menu: Menus) => {
    setSelectedMenu(menu);
  }, []);

  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles.sidebar}>
        <div
          className={cn(styles.sidebar__detail, { [styles.show]: showSidebar })}
        >
          <div className={styles.sidebar__user}>
            <RxAvatar fontSize={"2rem"} color="#050C3F" />
            <div className={styles.name}>{name}</div>
            <div className={styles.role}>{loginRole}</div>
            <div>{email}</div>
          </div>
          <ul className={styles.sidebar__menu}>
            {Object.values(Menus).map((menu: Menus) => (
              <li
                key={menu}
                className={cn(styles.item, {
                  [styles.selected]: selectedMenu === menu,
                })}
                onClick={() => onClickMenu(menu)}
              >
                <Link href={MenuDetails[menu].link}>
                  <div className={styles.item__detail}>
                    {MenuDetails[menu].icon}
                    <div>{menu}</div>
                  </div>
                </Link>
              </li>
            ))}
            {role === UserRole.ADMIN && (
              <li
                className={styles.item}
                onClick={() => console.log("switch role")}
              >
                <div className={styles.item__detail}>
                  <HiSwitchHorizontal />
                  <div>
                    {SWITCH_ROLE}
                    {loginRole === UserRole.ADMIN
                      ? UserRole.USER
                      : UserRole.ADMIN}
                  </div>
                </div>
              </li>
            )}
          </ul>
          <div className={styles.sidebar__logout}>
            <LuLogOut />
            <div>{LOG_OUT}</div>
          </div>
          <div className={styles.sidebar__close}>
            <IoMdClose
              onClick={() => setShowSidebar(false)}
              fontSize={"1rem"}
              color="black"
            />
          </div>
        </div>
        <div className={styles.sidebar__toggle}>
          <IoIosMenu
            color="black"
            fontSize={"2rem"}
            onClick={() => setShowSidebar(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
