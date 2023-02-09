"use client";
import styles from "./styles.module.scss";
import cn from "classnames";
import { CompletionParams, Model, MODELS } from "../../../types";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Dispatch, Fragment, SetStateAction } from "react";

export default function PropmtForm({
  onSub,
  setParams,
}: {
  onSub: (message: string) => void;
  setParams: Dispatch<SetStateAction<CompletionParams>>;
}) {
  const {
    watch,
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<CompletionParams>({ defaultValues: { model: Model.ADA } });
  const [model, prompt] = watch(["model", "prompt"]);
  const params = { model, prompt };

  const onSubmit: SubmitHandler<CompletionParams> = () => {
    setParams(params);
    onSub(prompt);
    reset({ ...params, prompt: "" });
  };

  const validate = (field: keyof typeof errors) =>
    errors[field] ? styles.error : "";

  console.log("rendering");

  return (
    <div className={styles["prompt-form"]}>
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
