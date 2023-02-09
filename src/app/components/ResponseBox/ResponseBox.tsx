import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

export default function ResponseBox({
  response: modelMsg,
  userMsg,
  isLoading,
}: {
  response: string;
  userMsg: string;
  isLoading: boolean;
}) {
  const [chat, setChat] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modelMsg !== "") {
      setChat((prev) => prev.concat(modelMsg));
    }
  }, [modelMsg]);
  useEffect(() => {
    if (userMsg !== "") {
      setChat((prev) => prev.concat(userMsg));
    }
  }, [userMsg]);

  useEffect(() => {
    const { current } = ref;
    if (current) {
      const lastChild = current.lastElementChild;
      // Scroll to the bottom of the textbox
      if (lastChild) {
        lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [isLoading, chat.length]);

  const msgKey = (msg: string) => {
    return `${msg?.slice(0, 5)}-${new Date()}-${Math.random()}`;
  };

  return (
    <div className={styles["response-box"]} ref={ref}>
      {chat.map((response) => (
        <div className={styles.msg} key={msgKey(response)}>
          {response}
        </div>
      ))}
      {isLoading && (
        <div className={styles.loader}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      )}
    </div>
  );
}
