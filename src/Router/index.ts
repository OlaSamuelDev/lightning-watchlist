import type { Router } from "@lightningjs/sdk";
import HomePage from "../Pages/Home";
import WatchlistPage from "../Pages/Watchlist";

export const routes: Router.Config = {
  root: "home",
  routes: [
    {
      path: "watchlist",
      component: WatchlistPage,
    },
    {
      path: "home",
      component: HomePage,
    },
  ],
};
