import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { routes } from "./Router";
import Navbar from "./Widgets/Navbar";

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Widgets: { Navbar: typeof Navbar };
}

export class App
  extends Router.App
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      ...super._template(),
      w: 1920,
      h: 1080,
      Widgets: {
        Navbar: {
          type: Navbar,
        },
      },
    };
  }

  static getFonts() {
    return [
      {
        family: "Avenir-Regular",
        url: Utils.asset("fonts/Avenir-Regular.ttf") as string,
      },
      {
        family: "Avenir-Bold",
        url: Utils.asset("fonts/Avenir-Bold.ttf") as string,
      },
    ];
  }

  override async _setup() {
    super._setup();
    Router.startRouter(routes, this);
  }

  override _init() {
    Router.focusWidget("Navbar");
  }
}
