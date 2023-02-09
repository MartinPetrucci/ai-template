import { CompletionParams, getCompletion } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

enum QUERIES {
  COMPLETION = "COMPLETION",
}

export type CompletionResponse = {
  completion: string;
};

export default function useGenerateCompletion(params: CompletionParams) {
  const resultQuery = useQuery(
    [QUERIES.COMPLETION],
    () => getCompletion(params),
    {
      enabled: false,
    }
  );
  return { completion: resultQuery.data?.result, ...resultQuery };
}
