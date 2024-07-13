"use client";
import { Fragment, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

// icons
import { IoMdClose, IoIosMenu } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { HiSwitchHorizontal } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";

// contexts
import { UserContext } from "@/contexts/userContext";
import { SidebarContext, MenuDetails } from "@/contexts/sidebarContext";

// utils
import en from "@/utils/en";
import { formatString } from "@/utils";
import { logoutUser, switchRole } from "@/utils/auth";
import { ErrorResponse } from "@/utils/responseTypes";
import { cancelTokenSource } from "@/utils/axiosInstance";
import { UserRole, Menus } from "@/utils/enums";
import { formatErrorMessage } from "@/utils/formatData";

import LoadingSpinner from "../loadingSpinner";
import styles from "./sidebar.module.scss";

const {
  COMMON: { LOG_OUT },
  SIDEBAR: { SWITCH_ROLE },
  ERROR_MESSAGE: { UNEXPECTED },
} = en;

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { email, name, loginRole, role, setUser } = useContext(UserContext)!;
  const { setSelectedMenu, selectedMenu } = useContext(SidebarContext)!;

  const queryClient = useQueryClient();
  const router = useRouter();

  const newRole = useMemo(() => {
    const test = loginRole === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;
    return test;
  }, [loginRole]);

  const onClickMenu = useCallback((menu: Menus) => {
    setSelectedMenu(menu);
    router.push(MenuDetails[menu].link);
  }, []);

  const onSwitchRole = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await switchRole(newRole);
      setUser(response.user);
      window.location.reload();
    } catch (error: any) {
      if (error.response) {
        const { message } = error.response.data as ErrorResponse;
        const errorMessage = formatErrorMessage(message);
        toast.error(errorMessage);
      } else {
        toast.error(UNEXPECTED);
      }
    } finally {
      setIsLoading(false);
    }
  }, [newRole]);

  const onLogout = useCallback(async () => {
    setIsLoading(true);

    try {
      await logoutUser();

      // clear local storage
      localStorage.clear();

      // clear requests
      cancelTokenSource.cancel("User logged out");

      // clear query cache
      queryClient.clear();

      // navigate to landing page
      window.location.replace("/");
    } catch (error: any) {
      if (error.response) {
        const { message } = error.response.data as ErrorResponse;
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <div className={styles["sidebar-container"]}>
        <div className={styles.sidebar}>
          <div
            className={cn(styles.sidebar__detail, {
              [styles.show]: showSidebar,
            })}
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
                  <div className={styles.item__detail}>
                    {MenuDetails[menu].icon}
                    <div>{menu}</div>
                  </div>
                </li>
              ))}
              {role === UserRole.ADMIN && (
                <li className={styles.item} onClick={onSwitchRole}>
                  <div className={styles.item__detail}>
                    <HiSwitchHorizontal />
                    <div>{formatString(SWITCH_ROLE, newRole)}</div>
                  </div>
                </li>
              )}
            </ul>
            <div className={styles.sidebar__logout} onClick={onLogout}>
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
    </Fragment>
  );
};

export default Sidebar;
