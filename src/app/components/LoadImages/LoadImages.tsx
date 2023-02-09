"use client";
import cn from "classnames";
import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.scss";
export default function LoadImages() {
  const [images, setImages] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const getImages = async (p: string) => {
    const res = await fetch("api/images", {
      method: "POST",
      body: JSON.stringify({ prompt: p }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log({ data });
    setImages(data.images.map((item: { url: string }) => item.url));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // const prompt = e.currentTarget.value;
    e.preventDefault();
    const p = inputRef.current?.value;
    e.currentTarget.value = "";
    if (p) {
      setIsLoading(true);
      await getImages(p);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.cuadro}>
      <form onSubmit={handleSubmit}>
        <div className={cn(styles["input-group"], styles["prompt"])}>
          <input ref={inputRef} type="text" name="prompt" />
          <button>&gt;</button>
        </div>
      </form>
      <div className={styles["images-container"]}>
        {isLoading ? (
          <div className={styles.loader}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        ) : (
          images.map((img, index) => <img key={`${img}-${index}`} src={img} />)
        )}
      </div>
    </div>
  );
}
