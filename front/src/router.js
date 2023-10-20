import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Admin from "./pages/Admin/Admin";
import Favorites from "./pages/Favorites/Favorites";
import Details from "./pages/Details/Details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
    ],
  },
]);
