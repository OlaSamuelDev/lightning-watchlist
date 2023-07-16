/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Lightning, Router, Colors } from "@lightningjs/sdk";
import { Theme } from "../Utils/theme";
import Icon from "../Components/Icon";

interface NavbarTemplateSpec extends Lightning.Component.TemplateSpec {
  HomeLink: typeof Icon;
  WatchlistLink: typeof Icon;
}

export default class Navbar
  extends Lightning.Component<NavbarTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<NavbarTemplateSpec>
{
  static override _template(): Lightning.Component.Template<NavbarTemplateSpec> {
    return {
      rect: true,
      w: 180,
      h: 860,
      y: 60,
      x: 60,
      zIndex: 5,
      color: Colors(Theme.Secondary).get(),
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 30,
      },
      flex: {
        direction: "column",
        alignItems: "center",
        paddingTop: 100,
      },
      HomeLink: {
        type: Icon,
        w: 30,
        h: 30,
        icon: {
          src: "icons/home.svg",
          width: 30,
          height: 30,
        },
      },
      WatchlistLink: {
        w: 25,
        h: 30,
        y: 50,
        type: Icon,
        icon: {
          src: "icons/bookmark-filled.svg",
          width: 25,
          height: 30,
        },
      },
    };
  }

  _focused!: "homeLink" | "watchlistLink";

  HomeLink = this.getByRef("HomeLink")!;

  WatchlistLink = this.getByRef("WatchlistLink")!;

  override _firstActive() {
    this._focused = "homeLink";
  }

  override _getFocused() {
    if (this._focused === "homeLink") {
      return this.getByRef("HomeLink");
    }
    return this.getByRef("WatchlistLink");
  }

  override _handleUp() {
    if (this._focused === "watchlistLink") {
      this._focused = "homeLink";
    } else {
      this._focused = "homeLink";
    }
  }

  override _handleDown() {
    if (this._focused === "homeLink") {
      this._focused = "watchlistLink";
    } else {
      this._focused = "watchlistLink";
    }
  }

  override _handleRight() {
    Router.focusPage();
  }

  override _handleLeft() {
    return true;
  }

  override _handleEnter() {
    if (this._focused === "homeLink") {
      Router.navigate("home");
    } else {
      Router.navigate("watchlist");
    }
  }
}
