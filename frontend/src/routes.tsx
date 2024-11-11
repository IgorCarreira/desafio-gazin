import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/404";
import AppLayout from "./pages/_layout/app";
import { Levels } from "./pages/levels/levels";
import { Developers } from "./pages/developers/developers";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Developers />,
        },
        {
          path: "/desenvolvedores",
          element: <Developers />,
        },
        {
          path: "/niveis",
          element: <Levels />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
