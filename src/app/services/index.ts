import { CompletionResponse } from "../hooks/custom/useGenerateCompletion";

export type CompletionParams = {
  prompt: string;
  model: Model;
  max_tokens?: number;
  temperature?: number;
};

export enum Model {
  DAVINCI = "text-davinci-003",
  CURIE = "text-curie-001",
  BABBAGE = "text-babbage-001",
  ADA = "text-ada-001",
}

export enum ENDPOINTS {
  GENERATE = "api/generate",
  IMAGES = "api/images",
}

export const getCompletion = async (
  params: CompletionParams
) => {
  const response = await fetch(ENDPOINTS.GENERATE, {
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response.json();
};
// export async function getCompletion(
//   params: CompletionParams
// ): Promise<CompletionResponse> {
//   const response = await fetch(ENDPOINTS.GENERATE, {
//     body: JSON.stringify(params),
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "POST",
//   });
//   return response.json() as Promise<CompletionResponse>;
// }
