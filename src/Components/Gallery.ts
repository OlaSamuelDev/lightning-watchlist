/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Lightning, Router } from "@lightningjs/sdk";
import Tile from "./Tile";
import { ItemData } from "../data/observables";

interface GalleryTemplateSpec extends Lightning.Component.TemplateSpec {
  TilesContainer: object;

  items: ItemData[];
}

export default class Gallery
  extends Lightning.Component<GalleryTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<GalleryTemplateSpec>
{
  static override _template(): Lightning.Component.Template<GalleryTemplateSpec> {
    return {
      TilesContainer: {
        w: 1600,
        flex: {
          direction: "row",
          wrap: true,
        },
      },
    };
  }

  // Class constants
  onScreenColumns = 6;
  horizontalOffset = 65;
  verticalOffset = 30;

  // Focus
  focusIndex = 0;

  // Current row and column calculations
  get selectedRow() {
    return Math.trunc(this.focusIndex / this.onScreenColumns) + 1;
  }

  get selectedColumn() {
    const lastItemNumberOnCurrentRow = this.selectedRow * this.onScreenColumns;
    return (
      this.onScreenColumns -
      (lastItemNumberOnCurrentRow - (this.focusIndex + 1))
    );
  }

  TilesContainer = this.getByRef("TilesContainer")!;

  // Number of items in gallery
  numOfItems = this.TilesContainer.children.length;

  set items(itemsData: ItemData[]) {
    if (itemsData.length === 0) {
      this.TilesContainer.children = [];
      Router.focusWidget("Navbar");
    } else {
      Router.focusPage();

      this.TilesContainer.children = itemsData.map(
        (item: ItemData, index: number) => ({
          type: Tile,
          flexItem: {
            marginLeft:
              index % this.onScreenColumns !== 0 ? this.horizontalOffset : 0,
            marginBottom: this.verticalOffset,
          },
          item: item,
          passSignals: {
            action: "action",
          },
        })
      );

      this.numOfItems = this.TilesContainer.children.length;
    }
  }

  override _active() {
    this.focusIndex = 0;

    this.animateToSelected();
  }

  get focusedItem() {
    return this.TilesContainer.children[this.focusIndex];
  }

  override _getFocused() {
    return this.focusedItem as Lightning.Component;
  }

  override _handleUp() {
    if (this.focusIndex < this.onScreenColumns) {
      return true;
    }

    if (this.focusIndex + 1 > this.onScreenColumns) {
      this.focusIndex -= this.onScreenColumns;
      this.animateToSelected();
    }
  }

  override _handleDown() {
    if (this.focusIndex + this.onScreenColumns < this.numOfItems) {
      this.focusIndex += this.onScreenColumns;
      this.animateToSelected();
    }

    return true;
  }

  override _handleRight() {
    if (this.focusIndex < this.TilesContainer.children.length - 1) {
      this.focusIndex += 1;
      this.animateToSelected();

      return true;
    }

    return false;
  }

  override _handleLeft() {
    if (this.focusIndex > 0 && this.selectedColumn > 1) {
      this.focusIndex -= 1;
      this.animateToSelected();

      return true;
    } else {
      Router.focusWidget("Navbar");
    }

    return false;
  }

  animateToSelected() {
    if (this.focusedItem) {
      this.patch({
        smooth: {
          y: -this.focusedItem.finalY + 180,
        },
      });
    }
  }

  // Clear items in Galley when navigating to a different page
  override _disable() {
    this.TilesContainer.children = [];
  }
}
