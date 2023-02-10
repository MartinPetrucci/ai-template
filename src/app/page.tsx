"use client";
import styles from "./page.module.scss";
import PropmtForm from "./components/PromptForm/PromptForm";
import { useEffect, useState } from "react";
import ResponseBox from "./components/ResponseBox/ResponseBox";
import useGenerateCompletion from "./hooks/custom/queries/useGenerateCompletion";
import { CompletionParams, Model } from "@/types";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [params, setParams] = useState<CompletionParams>({
    model: Model.DAVINCI,
    prompt: "",
  });
  const { refetch, completion, isFetching } = useGenerateCompletion(params);

  const onSubmit = (message: string) => {
    console.log(message);
    setMessages([...messages, message]);
  };

  useEffect(() => {
    if (params.prompt) {
      refetch();
    }
  }, [params, refetch]);

  useEffect(() => {
    if (completion) {
      setMessages([...messages, completion]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completion]);

  return (
    <main className={styles.main}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ResponseBox messages={messages} isLoading={isFetching} />
      <PropmtForm onSub={onSubmit} setParams={setParams} />
    </main>
  );
}
