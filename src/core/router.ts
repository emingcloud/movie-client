import { createBrowserRouter } from "react-router";
import App from "../App";
import SignedRoute from "../shared/SignedRoute";
import Home from "../feature/home/component/Home";
import Login from "../feature/login/component/Login";
import Error from "../feature/error/Error";
import Header from "../shared/Header";
import Browse from "../feature/browse/component/Browse";
import Detail from "../feature/detail/component/Detail";
import MovieDetail from "../feature/detail/component/MovieDetail";
import VideoPlayer from "../feature/VideoPlayer/component/VideoPlayer";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        Component: SignedRoute,
        children: [
          {
            Component: Header,
            children: [
              {
                Component: Home,
                index: true,
                path: "/",
              },
              {
                Component: Browse,
                path: "/browse",
              },
            ],
          },
          {
            Component: MovieDetail,
            path: "/m/:id",
          },
          {
            Component: VideoPlayer,
            path: "/watch/:id",
          },
        ],
      },
      {
        Component: Login,
        path: "/login",
      },
      {
        Component: Error,
        path: "/error",
      },
    ],
  },
]);

export default router;
