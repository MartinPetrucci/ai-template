import { CompletionParams } from "@/types";
import { ENDPOINTS } from "../hooks/custom/queries";

export const getCompletion = async (params: CompletionParams) => {
  const response = await fetch(ENDPOINTS.GENERATE, {
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response.json();
};
