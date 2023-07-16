import { Lightning, Utils, Colors } from "@lightningjs/sdk";
import { ItemData } from "../data/observables";
import { Theme } from "../Utils/theme";

interface TileTemplateSpec extends Lightning.Component.TemplateSpec {
  Border: object;
  Image: object;
  BookmarkBackground: object;
  BookmarkIcon: object;
  Title: object;
  Year: object;
  Icon: object;

  item: ItemData;
}

interface TileSignal extends Lightning.Component.SignalMap {
  action(data: ItemData): void;
}

interface TileTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: TileSignal;
}

export default class Tile
  extends Lightning.Component<TileTemplateSpec, TileTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<TileTemplateSpec>
{
  static override _template(): Lightning.Component.Template<TileTemplateSpec> {
    return {
      w: this.width,
      h: this.height,
      alpha: 0.8,

      Border: {
        w: 210,
        h: 290,
        x: -5,
        y: -5,
        rect: true,
        color: Colors("transparent").get(),
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 15,
          stroke: 7,
          strokeColor: Colors(Theme.Light).alpha(0.001).get(),
        },
      },

      Image: {
        src: undefined,
        w: 200,
        h: 280,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 10,
        },
      },

      BookmarkBackground: {
        w: 40,
        h: 40,
        x: 155,
        y: 5,
        rect: true,
        color: Colors(Theme.Dark).alpha(0.9).get(),
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 20,
        },
      },

      BookmarkIcon: {
        w: 17,
        h: 20,
        x: 166.5,
        y: 15,
        texture: Lightning.Tools.getSvgTexture(
          Utils.asset("icons/bookmark.svg"),
          17,
          20
        ),
      },

      Year: {
        y: 295,
        alpha: 0.3,
        text: {
          text: "Year",
          fontSize: 16,
          textColor: Colors(Theme.White).get(),
          fontFace: "Avenir-Regular",
        },
      },

      Title: {
        w: (w) => w,
        y: 320,
        text: {
          text: "Title",
          fontSize: 22,
          textColor: Colors(Theme.White).get(),
          fontFace: "Avenir-Regular",
        },
      },
    };
  }

  static get width() {
    return 200;
  }

  static get height() {
    return 400;
  }

  itemData!: ItemData;

  set item(item: ItemData) {
    this.itemData = item;

    const { title, year, poster, isBookmarked } = this.itemData;

    this.tag("Image")?.patch({
      src: Utils.asset(poster),
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

    this.tag("BookmarkBackground")?.patch({
      color: isBookmarked
        ? Colors(Theme.Added).alpha(1).get()
        : Colors(Theme.Dark).alpha(0.9).get(),
    }),
      this.tag("BookmarkIcon")?.patch({
        texture: isBookmarked
          ? Lightning.Tools.getSvgTexture(
              Utils.asset("icons/bookmark-filled.svg"),
              17,
              20
            )
          : Lightning.Tools.getSvgTexture(
              Utils.asset("icons/bookmark.svg"),
              17,
              20
            ),
      });
  }

  // Focus
  override _focus() {
    this.patch({
      smooth: {
        scale: 1.05,
        alpha: 1,
      },
    });

    this.tag("Border")?.patch({
      shader: {
        strokeColor: Colors(Theme.Light).alpha(1).get(),
      },
    });
  }

  override _unfocus() {
    this.patch({
      smooth: {
        scale: 1,
        alpha: 0.8,
      },
    });

    this.tag("Border")?.patch({
      shader: {
        strokeColor: Colors(Theme.Light).alpha(0.001).get(),
      },
    });
  }

  // Signals
  override _handleEnter() {
    this.signal("action", this.itemData);
  }
}
