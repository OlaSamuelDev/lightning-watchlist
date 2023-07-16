import type { Router } from "@lightningjs/sdk";
import Home from "../Pages/Home";
import Watchlist from "../Pages/Watchlist";
import Edit from "../Pages/Edit";

export const routes: Router.Config = {
  root: "home",
  routes: [
    {
      path: "home",
      component: Home,
      widgets: ["navbar"],
    },
    {
      path: "watchlist",
      component: Watchlist,
      widgets: ["navbar"],
    },
    {
      path: "edit/:title",
      component: Edit,
    },
  ],
};
