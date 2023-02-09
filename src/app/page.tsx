"use client";

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.scss";
import { MouseEventHandler, useEffect, useState } from "react";
import PropmtForm from "./components/PromptForm/PromptForm";
import ResponseBox from "./components/ResponseBox/ResponseBox";

const inter = Inter({ subsets: ["latin"] });

type Model = {
  created: number;
  id: string;
  object: string;
  owned_by: string;
  parent?: any;
  root: string;
  permission: [
    {
      allow_create_engine: boolean;
      allow_fine_tuning: boolean;
      allow_logprobs: boolean;
      allow_sampling: boolean;
      allow_search_indices: boolean;
      allow_view: boolean;
      created: number;
      group?: any;
      id: string;
      is_blocking: boolean;
      object: string;
      organization: string;
    }
  ];
};

export default function Home() {
  const [models, setModels] = useState<Model[]>([]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    console.log("click");
    const response = await fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify({ animal: "Sasd" }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log({ data });
  };

  return (
    <main className={styles.main}>
      <PropmtForm />
    </main>
  );
}
