import { Lightning, Router, Utils } from "@lightningjs/sdk";

interface NavbarSpec extends Lightning.Component.TemplateSpec {
  HomeLink: object;
  WatchlistLink: object;
}

export default class Navbar
  extends Lightning.Component<NavbarSpec>
  implements Lightning.Component.ImplementTemplateSpec<NavbarSpec>
{
  static selectedHighlightStyles = {
    highlight: true,
    highlightOffset: 2,
    highlightColor: 0xffc09d7b,
  };

  static override _template() {
    return {
      w: Navbar.width,
      h: 1720,
      shader: { type: Lightning.shaders.RoundedRectangle, radius: 50 },
      color: 0xff10141f,
      flex: {
        paddingTop: 50,
        paddingRight: 50,
        paddingBottom: 50,
        paddingLeft: 50,
      },

      Items: {
        w: 150,
        h: 880,
        rect: true,
        color: 0xff161d2f,
        flex: {
          direction: "column",
          alignItems: "center",
          paddingTop: 100,
        },

        HomeLink: {
          zIndex: 1,
          texture: lng.Tools.getSvgTexture(
            Utils.asset("images/home.svg"),
            30,
            30
          ),
        },
        WatchlistLink: {
          y: 50,
          zIndex: 1,
          alpha: 0.3,
          texture: lng.Tools.getSvgTexture(
            Utils.asset("images/bookmark-filled.svg"),
            25,
            30
          ),
        },
      },
    };
  }

  static width = 150;

  focusedChild = "HomeLink";

  _handleChildFocus() {
    this.patch({
      HomeLink: {
        text: {
          highlight: this.focusedChild === "HomeLink",
        },
      },
    });
  }

  override _focus() {
    this._handleChildFocus();
  }

  override _unfocus() {
    this.patch({
      HomeLink: {
        text: {
          highlight: false,
        },
      },
      WatchlistLink: {
        text: {
          highlight: false,
        },
      },
    });
  }

  override _handleEnter() {
    if (this.focusedChild === "HomeLink") {
      Router.navigate("home");
    } else {
      Router.navigate("watchlist");
    }
  }

  override _handleDown() {
    if (this.focusedChild === "HomeLink") {
      this.focusedChild = "WatchlistLink";
    }
    this._handleChildFocus();
  }

  override _handleUp() {
    if (this.focusedChild === "WatchlistLink") {
      this.focusedChild = "HomeLink";
    }
    this._handleChildFocus();
  }

  override _handleLeft() {
    Router.focusPage();
  }
}
