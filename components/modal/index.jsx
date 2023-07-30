import React, { useCallback, useEffect, } from "react";
import { RxCross2 } from "react-icons/rx";
import styles from "./modal.module.scss";
export default function Modal(Prop) {

  const { visible, onClose, children, btn, connectWallet } = Prop;

  const escFunction = useCallback(
    (e) => {
      if (e.type === "click") {
        e.preventDefault();
      }
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
  }, [visible, onClose, escFunction]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    document.removeEventListener("click", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
      document.removeEventListener("click", escFunction, false);

    };
  }, [escFunction]);




  if (visible) {
    return (
      <div className={styles.modal}>
        <div className={connectWallet ? styles.ConnectOuter : styles.outer}>
          {btn && <RxCross2 className={styles.IconClose} onClick={onClose} />}
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
