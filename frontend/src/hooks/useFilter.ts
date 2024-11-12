import { useCallback, useEffect, useState } from "react";

export const useFilter = <T>() => {
  const [page, setPage] = useState<number>(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("current_page")) {
      return Number(url.searchParams.get("current_page"));
    }

    return 1;
  });
  const [query, setQuery] = useState<T>(() => {
    const url = new URL(window.location.toString());

    const result: Record<string, unknown> = {};
    Object.entries(url.searchParams).forEach(([key, value]) => {
      if (value && key !== "current_page") result[key] = value;
    });

    return result as T;
  });

  useEffect(() => {
    const url = new URL(window.location.toString());
    const initialPage = url.searchParams.get("current_page");
    const initialQuery: Record<string, unknown> = {};

    url.searchParams.forEach((value, key) => {
      if (key === "current_page") return;
      initialQuery[key] = value;
    });

    setPage(Number(initialPage) || 1);
    setQuery(initialQuery as T);
  }, []);

  const updateURLParams = useCallback((newParams: T) => {
    const url = new URL(window.location.toString());
    Array.from(url.searchParams.keys()).forEach((key) => {
      url.searchParams.delete(key);
    });
    Object.entries(newParams as Record<string, unknown>).forEach(
      ([key, value]) => {
        if (value) url.searchParams.set(key, String(value));
      }
    );
    window.history.pushState({}, "", url);
  }, []);

  const updatePage = useCallback(
    (newPage: number) => {
      setPage(newPage);
      updateURLParams({ ...query, current_page: newPage });
    },
    [query, updateURLParams]
  );

  const updateQuery = useCallback(
    (newQuery: Record<string, any>) => {
      setPage(1);
      setQuery(newQuery as T);
      updateURLParams(newQuery as T);
    },
    [updateURLParams]
  );

  return { page, query, updatePage, updateQuery };
};
