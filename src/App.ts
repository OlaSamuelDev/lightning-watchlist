import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { routes } from "./Router";

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  /*
   * The following properties exist to make it more convenient to access elements
   * below in a type-safe way. They are optional.
   *
   * See https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/TemplateSpecs?id=using-a-template-spec
   * for more information.
   */

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
    };
  }

  static getFonts() {
    return [
      {
        family: "Regular",
        url: Utils.asset("fonts/Roboto-Regular.ttf") as string,
      },
    ];
  }

  override async _setup() {
    super._setup();
    Router.startRouter(routes, this);
  }
}
