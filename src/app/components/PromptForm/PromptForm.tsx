import styles from "./styles.module.scss";
import { Inter } from "@next/font/google";
import cn from "classnames";
import {
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  useMemo,
  useRef,
  useState,
} from "react";
import ResponseBox from "../ResponseBox/ResponseBox";

const inter = Inter({ subsets: ["latin"] });

export default function PropmtForm() {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const promptRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const info = Object.fromEntries(new FormData(e.currentTarget));
    const { current } = promptRef;
    if (current) {
      setResponse(current.value);
      current.value = "";
    }
    setIsLoading(true);
    const response = await fetch("api/generate", {
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const data = await response.json();
    console.log(data.result);
    setIsLoading(false);
    setResponse(data.result);
  }

  // document.querySelectorAll("input").forEach(input => {
  //   input.addEventListener("focus", event => {
  //   });
  // });

  const handleFocus: FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    // e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className={styles["prompt-form"]}>
      <ResponseBox isLoading={isLoading} response={response} />
      <form onSubmit={handleSubmit} className={cn(styles.form)}>
        <div className={cn(styles["input-group"], styles["prompt"])}>
          {/* <label htmlFor="propmt">Ingresá tu prompt</label> */}
          <input
            ref={promptRef}
            onFocus={handleFocus}
            type="text"
            name="prompt"
          />
          <button type="submit">&gt;</button>
          {/* <button type="submit">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.29 7.71L18 16.41l-10.71 9.7M16.59 8.71a1 1 0 010 1.42l-3 3a1 1 0 11-1.42-1.42L15 9.59l-2.29-2.3a1 1 0 011.42-1.42l3 3z" />
            </svg>
          </button> */}
        </div>
        <div className={cn(styles["input-group"], styles.models)}>
          <input type="radio" name="model" id="ada" value="text-ada-001" />
          <label htmlFor="ada">
            <span>Ada</span>
            <span>$0.0004 / 1k tokens</span>
          </label>
          <input
            type="radio"
            name="model"
            id="babbage"
            value="text-babbage-001"
          />
          <label htmlFor="babbage">
            <span>Babagge</span>
            <span>$0.0005 / 1k tokens</span>
          </label>
          <input type="radio" name="model" id="curie" value="text-curie-001" />
          <label htmlFor="curie">
            <span>Curie</span>
            <span>$0.0020 / 1k tokens</span>
          </label>
          <input
            type="radio"
            name="model"
            id="davinci"
            value="text-davinci-003"
          />
          <label htmlFor="davinci">
            <span>Davinci</span>
            <span>$0.0200 / 1k tokens</span>
          </label>
        </div>
      </form>
    </div>
  );
}
