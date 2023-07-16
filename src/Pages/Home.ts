/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Lightning, Colors } from "@lightningjs/sdk";
import { ItemData, homePageData$, watchlistData$ } from "../data/observables";
import Gallery from "../Components/Gallery";
import { Theme } from "../Utils/theme";
import { Modal } from "../Components/Modal";
import { combineLatest } from "rxjs";

interface HomeTemplateSpec extends Lightning.Component.TemplateSpec {
  Wrapper: {
    TitleBackground: object;
    Title: object;
    Gallery: typeof Gallery;
  };
  Modal: typeof Modal;
}

export interface HomeTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export default class Home
  extends Lightning.Component<HomeTemplateSpec, HomeTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<HomeTemplateSpec>
{
  static override _template(): Lightning.Component.Template<HomeTemplateSpec> {
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
            text: "What to watch? Recommended for you",
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

  override _active() {
    combineLatest([homePageData$(), watchlistData$()]).subscribe(
      ([itemsData, bookmarks]) => {
        const homePageData = itemsData.map((item) => {
          const items: ItemData = { ...item, isBookmarked: false };
          bookmarks.forEach((item) => {
            if (items.title === item.title) {
              items.isBookmarked = true;
            }
          });
          return items;
        });

        this.Gallery.items = homePageData;
      }
    );
    this._refocus();
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
