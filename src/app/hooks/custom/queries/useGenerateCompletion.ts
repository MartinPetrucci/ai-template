import { getCompletion } from "@/app/services";
import { CompletionParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QUERIES } from ".";

export default function useGenerateCompletion(params: CompletionParams) {
  const resultQuery = useQuery(
    [QUERIES.COMPLETION, params.prompt],
    () => getCompletion(params),
    {
      enabled: false,
    }
  );
  return { completion: resultQuery.data?.result, ...resultQuery };
}
