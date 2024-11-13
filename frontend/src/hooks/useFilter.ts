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
      if (value && !["current_page", "sort_order", "sort_field"].includes(key))
        result[key] = value;
    });

    return result as T;
  });

  const [order, setOrder] = useState<{
    field: string | null;
    direction: "asc" | "desc" | null;
  }>(() => {
    const url = new URL(window.location.toString());
    const field = url.searchParams.get("sort_field") || "";
    const direction =
      (url.searchParams.get("sort_order") as "asc" | "desc") || null;
    return { field, direction };
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

  const resetParams = useCallback((url?: URL) => {
    const currentUrl = url || new URL(window.location.toString());
    currentUrl.search = "";
    window.history.pushState({}, "", currentUrl);
  }, []);

  const updateURLParams = useCallback(
    (newParams: T) => {
      const url = new URL(window.location.toString());

      resetParams(url);

      Object.entries(newParams as Record<string, unknown>).forEach(
        ([key, value]) => {
          if (value) url.searchParams.set(key, String(value));
        }
      );
      window.history.pushState({}, "", url);
    },
    [resetParams]
  );

  const updatePage = useCallback(
    (newPage: number) => {
      const url = new URL(window.location.toString());
      setPage(newPage);
      url.searchParams.set("current_page", String(newPage));
      if (newPage <= 1) url.searchParams.delete("current_page");
      window.history.pushState({}, "", url);
    },
    [query]
  );

  const updateQuery = useCallback(
    (newQuery: Record<string, any>) => {
      setPage(1);
      setOrder({ direction: null, field: null });
      setQuery(newQuery as T);
      updateURLParams(newQuery as T);
    },
    [updateURLParams]
  );

  const updateOrder = useCallback((field: string) => {
    updatePage(1);
    setOrder((prevOrder) => {
      const newDirection: "asc" | "desc" =
        prevOrder.field === field && prevOrder.direction === "asc"
          ? "desc"
          : "asc";
      const newOrder = { field, direction: newDirection };

      const url = new URL(window.location.toString());
      if (prevOrder.field !== field) {
        url.searchParams.delete("sort_field");
        url.searchParams.delete("sort_order");
      }
      url.searchParams.set("sort_field", field);
      url.searchParams.set("sort_order", newDirection);
      window.history.pushState({}, "", url);

      setQuery((oldQuery) => ({
        ...oldQuery,
        sort_field: field,
        sort_order: newDirection,
      }));

      return newOrder;
    });
  }, []);

  return { page, query, order, updatePage, updateQuery, updateOrder };
};
