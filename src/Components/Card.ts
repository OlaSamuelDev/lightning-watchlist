import { Colors, Lightning } from "@lightningjs/sdk";
import { CardTitle } from "@lightningjs/ui-components";

interface TileTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
  Card: typeof CardTitle;
}

interface cardProperties {
  title: string;
  year: number;
}

export default class Card
  extends Lightning.Component<TileTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<TileTemplateSpec>
{
  Card = this.getByRef("Card")!;

  static override _template(): Lightning.Component.Template<TileTemplateSpec> {
    return {
      w: 300,
      h: 250,
      Background: {
        w: 300,
        h: 250,
        rect: true,
        color: Colors("red").get(),
      },
      Card: {
        w: 300,
        h: 250,
        type: CardTitle,
      },
    };
  }

  set item(item: cardProperties) {
    const { title, year } = item;
    this.Card.patch({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      title: title,
      description: year.toString(),
    });
  }
}
