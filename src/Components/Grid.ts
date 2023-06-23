import { Lightning } from "@lightningjs/sdk";
import { Row } from "@lightningjs/ui-components";
import Card from "./Card";

interface TileTemplateSpec extends Lightning.Component.TemplateSpec {
  Grid: typeof Row;
}

export default class Grid
  extends Lightning.Component<TileTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<TileTemplateSpec>
{
  Grid = this.getByRef("Grid")!;

  static override _template(): Lightning.Component.Template<TileTemplateSpec> {
    return {
      w: 1670,
      h: 1080,
      Grid: {
        type: Row,
        items: [],
      },
    };
  }

  set items(items: object[]) {
    if (items) {
      const components: any[] = [];
      items.forEach((item) => {
        const c = this.stage.element({
          type: Card,
          item,
        });
        components.push(c);
      });
      this.Grid.patch({
        items: components,
      });
    }
  }
}
