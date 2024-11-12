import { fetcher } from "@/api/fetcher";
import { FetchDataResponse } from "@/types/fetch-data-response";
import { useMemo } from "react";
import useSWR from "swr";

const useFetchData = <T>(
  url: string,
  page: number,
  query: Record<string, any>
) => {
  const requestUrl = useMemo(() => {
    const request = new URL(url);
    request.searchParams.set("current_page", String(page));
    Object.entries(query).forEach(([key, value]) => {
      if (value) request.searchParams.set(key, String(value));
    });
    return request.toString();
  }, [url, page, query]);

  const { data, error, mutate } = useSWR<FetchDataResponse<T>>(
    requestUrl,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    data: data?.data,
    total: data?.meta.total || 0,
    lastPage: data?.meta.last_page || 0,
    perPage: data?.data.length || 0,
    mutate,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useFetchData;
