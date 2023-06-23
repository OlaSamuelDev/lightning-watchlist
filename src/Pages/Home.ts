// eslint-disable-next-line max-classes-per-file
import { Lightning, Router } from "@lightningjs/sdk";
import Grid from "../Components/Grid";
import { itemsData } from "../Data/items";

interface HomeTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
  Home: {
    Grid: typeof Grid;
  };
}

export interface HomeTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export default class HomePage
  extends Lightning.Component<HomeTemplateSpec, HomeTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<HomeTemplateSpec>
{
  Grid = this.tag("Home.Grid")!;

  static override _template(): Lightning.Component.Template<HomeTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
        color: 0xff10141f,
        rect: true,
      },
      Home: {
        x: 250,
        y: 100,
        Grid: {
          type: Grid,
        },
      },
    };
  }

  /** Focus */
  _index = 0;

  override _getFocused() {
    return this.Grid as unknown as Lightning.Component;
  }

  override _handleLeft() {
    console.log("LEFT");
    if (this._index === 0) {
      Router.focusWidget("Navbar");
    }
    return true;
  }

  override _firstActive() {
    this.Grid.patch({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      items: itemsData,
    });
  }
}
