/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Lightning, Colors } from "@lightningjs/sdk";
import Gallery from "../Components/Gallery";
import { Theme } from "../Utils/theme";
import { ItemData, watchlistData$ } from "../data/observables";
import { Modal } from "../Components/Modal";

interface WatchlistTemplateSpec extends Lightning.Component.TemplateSpec {
  Wrapper: {
    TitleBackground: object;
    Title: object;
    Gallery: typeof Gallery;
    Placeholder: { HeadingOne: object; HeadingTwo: object };
  };
  Modal: typeof Modal;
}

export interface WatchlistTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export default class Watchlist
  extends Lightning.Component<WatchlistTemplateSpec, WatchlistTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<WatchlistTemplateSpec>
{
  static override _template(): Lightning.Component.Template<WatchlistTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      color: Colors(Theme.Background).get(),
      Wrapper: {
        x: 300, // width of navbar

        TitleBackground: {
          w: 1700,
          h: 150,
          x: -50,
          rect: true,
          color: Colors(Theme.Background).get(),
          zIndex: 2,
        },

        Title: {
          y: 60,
          zIndex: 3,
          text: {
            text: "My Watchlist",
            textColor: Colors(Theme.White).get(),
            fontFace: "Avenir-Regular",
            fontSize: 44,
          },
        },

        Gallery: {
          type: Gallery,
          y: 180,
          signals: {
            action: "action",
          },
        },

        Placeholder: {
          HeadingOne: {
            zIndex: 5,
            y: 200,
            text: {
              text: "Oops! There is nothing in your Watchlist at the moment...",
              textColor: Colors(Theme.White).alpha(0.5).get(),
              fontSize: 32,
              fontFace: "Avenir-Regular",
            },
          },

          HeadingTwo: {
            zIndex: 5,
            y: 300,
            text: {
              text: "Start adding your favourite movies now! 🍿",
              textColor: Colors(Theme.White).alpha(0.5).get(),
              fontSize: 32,
              fontFace: "Avenir-Regular",
            },
          },
        },
      },

      Modal: {
        type: Modal,
        signals: {
          closeModal: "closeModal",
        },
        visible: false,
      },
    };
  }

  Gallery = this.getByRef("Wrapper")!.getByRef("Gallery")!;

  HeadingOne = this.getByRef("Wrapper")!
    .getByRef("Placeholder")!
    .getByRef("HeadingOne")!;

  HeadingTwo = this.getByRef("Wrapper")!
    .getByRef("Placeholder")!
    .getByRef("HeadingTwo")!;

  override _active() {
    watchlistData$().subscribe((itemsData) => {
      this.Gallery.items = [];

      const watchlistData = itemsData.map((item) => {
        return { ...item, isBookmarked: true };
      });

      if (itemsData.length === 0) {
        this.HeadingOne.patch({
          visible: true,
        });
        this.HeadingTwo.patch({
          visible: true,
        });
      } else {
        this.Gallery.patch({
          items: watchlistData,
        });
        this.HeadingOne.patch({
          visible: false,
        });
        this.HeadingTwo.patch({
          visible: false,
        });
      }
    });
  }

  isModalOpen = false;

  override _getFocused() {
    if (this.isModalOpen) {
      return this.getByRef("Modal");
    }
    return this.Gallery;
  }

  action(info: ItemData) {
    this.isModalOpen = true;
    this.patch({
      Modal: {
        items: info,
        visible: true,
      },
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.patch({
      Modal: {
        visible: false,
      },
    });
  }
}
