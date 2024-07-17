import App from "./App";
import { createBrowserRouter } from "react-router-dom";

// elements
import Home from "./pages/Home";
import Error from "./pages/Error";
import ComingSoon from "./pages/ComingSoon";
import NowPlaying from "./pages/NowPlaying";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    errorElement: <Error />,
    children: [
      { element: <Home />, path: "" },
      { element: <ComingSoon />, path: "coming-soon" },
      { element: <NowPlaying />, path: "now-playing" },
    ],
  },
]);
