"use client";
import Link from "next/link";
import cn from "classnames";
import { IoIosCloseCircle, IoIosMenu } from "react-icons/io";
import Button from "@/components/button";
import en from "@/utils/en";
import styles from "./page.module.scss";
import { useState } from "react";

const {
  COMMON: { TICKET_VIBES },
  LANDING: {
    SUBTITLE,
    DETAIL,
    MENU: { HOME, ABOUT_US, CONTACT },
  },
} = en;

const MENU = [HOME, ABOUT_US, CONTACT];

const Landing = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <div className={styles.landing}>
      <div className={styles.landing__header}>
        <div className={styles.navbar}>
          <Link href="#" className={styles.navbar__icon}>
            {TICKET_VIBES}
          </Link>
          <div
            className={cn(styles.navbar__menu, { [styles.show]: isShowMenu })}
          >
            <ul className={styles.navbar__list}>
              {MENU.map((menu) => (
                <li key={menu}>
                  <Link href="#">{menu}</Link>
                </li>
              ))}
            </ul>
            <div className={styles.navbar__close}>
              <IoIosCloseCircle onClick={() => setIsShowMenu(false)} />
            </div>
          </div>

          <div className={styles.navbar__toggle_menu}>
            <IoIosMenu
              color="#fff"
              fontSize={"2rem"}
              onClick={() => setIsShowMenu((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      <div className={styles.landing__main}>
        <div className={styles.detail}>
          <div className={styles.title}>{TICKET_VIBES}</div>
          <div className={styles.subtitle}>{SUBTITLE}</div>
          <div className={styles.detail}>{DETAIL}</div>
          <Button secondary className={styles.button} onClick={() => {}}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
