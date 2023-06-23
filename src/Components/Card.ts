import { Lightning, Utils } from "@lightningjs/sdk";
import { Tile } from "@lightningjs/ui-components";

interface TileTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
  Card: typeof Tile;
  Title: object;
  Year: object;
}

interface cardProperties {
  title: string;
  year: number;
  poster: string;
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
      },
      Card: {
        w: 300,
        h: 250,
        type: Tile,
      },
      Title: {
        y: 260,
        text: {
          text: "Title",
          fontSize: 22,
        },
      },
      Year: {
        y: 300,
        alpha: 0.3,
        text: {
          text: "Year",
          fontSize: 16,
        },
      },
    };
  }

  set item(item: cardProperties) {
    const { title, year, poster } = item;

    this.Card.patch({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      artwork: {
        src: Utils.asset(`images/${poster}`),
      },
    });

    this.tag("Title")?.patch({
      text: {
        text: title,
      },
    });
    this.tag("Year")?.patch({
      text: {
        text: year.toString(),
      },
    });
  }
}
