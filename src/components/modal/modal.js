import React from "react";
import styles from "./modal.module.css";

const Modal = (props) => {
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>{props.children}</div>
    </>
  );
};

export { Modal };
