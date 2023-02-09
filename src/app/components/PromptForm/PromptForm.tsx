"use client";
import styles from "./styles.module.scss";
import cn from "classnames";
import ResponseBox from "../ResponseBox/ResponseBox";
import useGenerateCompletion from "@/app/hooks/custom/useGenerateCompletion";
import { CompletionParams, Model, MODELS } from "@/app/services";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Fragment, useState } from "react";

export default function PropmtForm() {
  const {
    watch,
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<CompletionParams>({ defaultValues: { model: Model.ADA } });
  const [model, prompt] = watch(["model", "prompt"]);
  const params = { model, prompt };
  const { completion, refetch, isFetching } = useGenerateCompletion(params);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<CompletionParams> = () => {
    setSubmitted(true);
    reset({ ...params, prompt: "" });
    refetch();
    setSubmitted(false);
  };

  const validate = (field: keyof typeof errors) =>
    errors[field] ? styles.error : "";

  console.log("rendering");

  return (
    <div className={styles["prompt-form"]}>
      <ResponseBox
        userMsg={submitted ? prompt : ""}
        isLoading={isFetching}
        response={completion || ""}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
        <div className={cn(styles["input-group"], styles["prompt"])}>
          <input
            className={validate("prompt")}
            type="text"
            {...register("prompt", { required: true })}
          />
          <button type="submit">&gt;</button>
        </div>
        <div className={cn(styles["input-group"], styles.models)}>
          {MODELS.map(({ commercialName, name, pricing }) => (
            <Fragment key={commercialName}>
              <input
                type="radio"
                id={commercialName}
                value={name}
                {...register("model")}
              />
              <label htmlFor={commercialName}>
                <span>{commercialName}</span>
                <span>{`$${pricing} / 1k tokens`}</span>
              </label>
            </Fragment>
          ))}
        </div>
      </form>
    </div>
  );
}
