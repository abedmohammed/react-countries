import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.scss";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/:countryName", element: <CountryPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
