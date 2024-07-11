import cn from "classnames";
import styles from "./button.module.scss";
import React from "react";

type ButtonType = {
  id: string;
  disabled?: boolean;
  secondary?: boolean;
  size?: "small" | "medium" | "large";
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  width?: number;
};

const Button = ({
  id,
  disabled = false,
  secondary = false,
  size = "medium",
  onClick,
  children,
  className,
  width,
}: ButtonType) => {
  return (
    <button
      id={id}
      style={{ width }}
      className={cn(
        styles.button,
        { [styles[size]]: size },
        { [styles.secondary]: secondary },
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
