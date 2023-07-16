/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Lightning, Router, Colors, Utils } from "@lightningjs/sdk";
import {
  ItemData,
  updateWatchlistData,
  watchlistData$,
} from "../data/observables";
import { Theme } from "../Utils/theme";
import CtaButton from "./CtaButton";

interface ModalTemplateSpec extends Lightning.Component.TemplateSpec {
  Modal: {
    Heading: object;
    Poster: {
      Border: object;
      Image: object;
    };
    Buttons: {
      Bookmark: typeof CtaButton;
      Edit: typeof CtaButton;
      Cancel: typeof CtaButton;
    };
  };
  items: ItemData;
}

interface ModalSignals extends Lightning.Component.SignalMap {
  closeModal(): void;
}

interface ModalTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: ModalSignals;
}

export class Modal
  extends Lightning.Component<ModalTemplateSpec, ModalTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<ModalTemplateSpec>
{
  static override _template(): Lightning.Component.Template<ModalTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      colorUr: Colors(Theme.Secondary).alpha(0.8).get(),
      colorUl: Colors(Theme.Secondary).alpha(0.8).get(),
      colorBr: Colors(Theme.Secondary).alpha(0.8).get(),
      colorBl: Colors(Theme.Secondary).alpha(0).get(),
      zIndex: 10,
      flex: {
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
      },

      Modal: {
        w: 500,
        h: 800,
        zIndex: 10,
        rect: true,
        color: Colors(Theme.Tertiary).get(),
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 30,
        },
        flex: {
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
        },

        Heading: {
          text: {
            text: "Title",
            textColor: Colors(Theme.White).get(),
            fontSize: 32,
            wordWrapWidth: 400,
            wordWrap: true,
            fontFace: "Avenir-Regular",
            textAlign: "center",
          },
          flexItem: {
            marginBottom: 30,
          },
        },

        Poster: {
          w: 200,
          h: 280,
          Border: {
            w: 210,
            h: 290,
            x: -5,
            y: -5,
            rect: true,
            shader: {
              type: Lightning.shaders.RoundedRectangle,
              radius: 15,
              stroke: 7,
              strokeColor: Colors(Theme.Light).get(),
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
          flexItem: {
            marginBottom: 60,
          },
        },

        Buttons: {
          flex: {
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
          },

          Bookmark: {
            type: CtaButton,
            label: "Bookmark",
            flexItem: {
              marginBottom: 30,
            },
          },

          Edit: {
            type: CtaButton,
            label: "Edit",
            flexItem: {
              marginBottom: 30,
            },
          },

          Cancel: {
            type: CtaButton,
            label: "Cancel",
            flexItem: {
              marginBottom: 30,
            },
          },
        },
      },
    };
  }

  // Focus
  focusIndex = 0;

  static get width() {
    return 500;
  }

  static get height() {
    return 800;
  }

  Buttons = this.getByRef("Modal")!.getByRef("Buttons")!;

  get focusedItem() {
    return this.Buttons.children[this.focusIndex];
  }

  override _getFocused() {
    return this.focusedItem as Lightning.Component;
  }

  override _handleUp() {
    if (this.focusIndex === 0) {
      return;
    } else {
      this.focusIndex -= 1;
    }
  }

  override _handleDown() {
    if (this.focusIndex < 2) {
      this.focusIndex += 1;
    }
  }

  itemData!: ItemData;

  set items(item: ItemData) {
    this.itemData = item;

    let isBookmarked = false;

    watchlistData$().subscribe((bookmarks) => {
      const filteredBookmarks = bookmarks.filter((selectedItem) => {
        return selectedItem.title === item.title;
      });
      isBookmarked = filteredBookmarks.length > 0;
    });

    this.patch({
      Modal: {
        Heading: {
          text: {
            text: item.title,
          },
        },
        Poster: {
          Image: { src: Utils.asset(item.poster) },
        },
        Buttons: {
          Bookmark: {
            label: isBookmarked ? "Remove from Watchlist" : "Add to Watchlist",
          },
        },
      },
    });
  }

  override _handleEnter() {
    if (this.focusIndex === 0) {
      updateWatchlistData(this.itemData);
    }
    if (this.focusIndex === 1) {
      Router.navigate(`edit/${this.itemData.title}`);
    }
    this.signal("closeModal");
  }

  override _handleBack() {
    this.signal("closeModal");
  }
}
