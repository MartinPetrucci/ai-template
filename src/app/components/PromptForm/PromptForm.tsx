"use client";

import styles from "./styles.module.scss";
import { Inter } from "@next/font/google";
import cn from "classnames";
import {
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ResponseBox from "../ResponseBox/ResponseBox";
import useGenerateCompletion from "@/app/hooks/custom/useGenerateCompletion";
import { CompletionParams, Model } from "@/app/services";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";

const inter = Inter({ subsets: ["latin"] });

export default function PropmtForm() {
  const {
    watch,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CompletionParams>();
  const [model, prompt] = watch(["model", "prompt"]);
  const { completion, refetch, isFetching } = useGenerateCompletion({
    model,
    prompt,
  });

  console.log(errors);

  async function handleSubmitX(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = { model, prompt };
    reset({ ...params, prompt: "" });
    console.log({ params });
    refetch();
  }
  const onSubmit: SubmitHandler<CompletionParams> = (data) => console.log(data);

  return (
    <div className={styles["prompt-form"]}>
      <ResponseBox isLoading={isFetching} response={completion || ""} />
      <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
        <div className={cn(styles["input-group"], styles["prompt"])}>
          <input type="text" {...register("prompt", { required: true })} />
          <p>{errors.prompt && 'Este campo es requerido!!'}</p>
          <button type="submit">&gt;</button>
        </div>
        <div className={cn(styles["input-group"], styles.models)}>
          <input
            {...register("model")}
            type="radio"
            name="model"
            id="ada"
            value="text-ada-001"
          />
          <label htmlFor="ada">
            <span>Ada</span>
            <span>$0.0004 / 1k tokens</span>
          </label>
          <input
            {...register("model")}
            type="radio"
            name="model"
            id="babbage"
            value="text-babbage-001"
          />
          <label htmlFor="babbage">
            <span>Babagge</span>
            <span>$0.0005 / 1k tokens</span>
          </label>
          <input
            {...register("model")}
            type="radio"
            name="model"
            id="curie"
            value="text-curie-001"
          />
          <label htmlFor="curie">
            <span>Curie</span>
            <span>$0.0020 / 1k tokens</span>
          </label>
          <input
            {...register("model")}
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
