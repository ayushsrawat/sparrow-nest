import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ResultsPage from "../pages/ResultPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/search", element: <ResultsPage /> },
]);
