/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-vars */
import { Lightning, Router } from "@lightningjs/sdk";
import { Key } from "./Key";

interface KeyboardTemplateSpec extends Lightning.Component.TemplateSpec {
  Keyboard: object;
  SpecialKeys: {
    Space: typeof Key;
    BackSpace: typeof Key;
  };
}

enum Icons {
  spacebar = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjkiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA2OSAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik00OCAxMEw0OCAxNkM0OCAxOC4yMDkxIDQ2LjIwOTEgMjAgNDQgMjBMMzMuNSAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4NCjxwYXRoIGQ9Ik0yMSAxMEwyMSAxNkMyMSAxOC4yMDkxIDIyLjc5MDkgMjAgMjUgMjBMMzQgMjAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+DQo8L3N2Zz4NCg==",
  backspace = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjkiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA2OSAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik00NC4xNTAyIDguODY0NzJDNDMuNTgwNiA4LjI5NTA5IDQyLjY1NzggOC4yOTUwOSA0Mi4wODggOC44NjQ3MkwzOC4wMTUzIDEyLjkzNzdMMzMuOTQyNiA4Ljg2NDcyQzMzLjM3MyA4LjI5NTA5IDMyLjQ1MDIgOC4yOTUwOSAzMS44ODA0IDguODY0NzJDMzEuMzEwNiA5LjQzNDM0IDMxLjMxMDggMTAuMzU3MiAzMS44ODA0IDEwLjkyNjlMMzUuOTUzNCAxNC45OTk5TDMxLjg4MDUgMTkuMDczMUMzMS4zMTA5IDE5LjY0MjcgMzEuMzEwOSAyMC41NjU1IDMxLjg4MDUgMjEuMTM1M0MzMi4xNjU0IDIxLjQyMDEgMzIuNTM4NSAyMS41NjI2IDMyLjkxMTYgMjEuNTYyNkMzMy4yODQ2IDIxLjU2MjYgMzMuNjU3OCAyMS40MjAxIDMzLjk0MjYgMjEuMTM1M0wzOC4wMTUzIDE3LjA2MjNMNDIuMDg4IDIxLjEzNTNDNDIuMzcyOCAyMS40MjAxIDQyLjc0NiAyMS41NjI2IDQzLjExOSAyMS41NjI2QzQzLjQ5MjEgMjEuNTYyNiA0My44NjUzIDIxLjQyMDEgNDQuMTUwMSAyMS4xMzUzQzQ0LjcxOTcgMjAuNTY1NyA0NC43MTk3IDE5LjY0MjggNDQuMTUwMSAxOS4wNzMxTDQwLjA3NzUgMTQuOTk5OUw0NC4xNTA0IDEwLjkyNjhDNDQuNzIgMTAuMzU3MiA0NC43MiA5LjQzNDM0IDQ0LjE1MDIgOC44NjQ3MloiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBkPSJNNDYuMTcwNiAyLjYwNTQ3SDI5LjcxMTdDMjguNTU0IDIuNjA1NDcgMjcuNDQxIDMuMTA2ODQgMjYuNDE2OSA0LjEzODYxTDE5LjY0OTQgMTIuMDc0N0MxOC4wOTI4IDEzLjYzMzQgMTguMDYzNiAxNi4xMTg1IDE5LjU3MTggMTcuODQ0TDI2LjM4NzggMjUuODI5M0MyNy4yMjAyIDI2Ljg2ODggMjguMzM4MSAyNy4zOTcxIDI5LjcxMTcgMjcuMzk3MUg0Ni4xNzA2QzQ4LjU4MDIgMjcuMzk3MSA1MC41NDE0IDI1LjQzNDcgNTAuNTQxNCAyMy4wMjIxVjYuOTgwNDdDNTAuNTQxNCA0LjU2Nzk1IDQ4LjU4MDQgMi42MDU0NyA0Ni4xNzA2IDIuNjA1NDdaTTQ3LjYyNDcgMjMuMDIyMUM0Ny42MjQ3IDIzLjgyNjggNDYuOTcyNCAyNC40ODA1IDQ2LjE3MDYgMjQuNDgwNUgyOS43MTE3QzI5LjIyNTQgMjQuNDgwNSAyOC45NDEzIDI0LjM1MjMgMjguNjM1OCAyMy45NzA2TDIxLjc3OTEgMTUuOTM3QzIxLjI2NjQgMTUuMzUwOSAyMS4yMzk0IDE0LjYxMDMgMjEuNzkwNSAxNC4wNTIxTDI4LjU1ODEgNi4xMTUyNEMyOS4xNTA2IDUuNTIyMTQgMjkuNTcyOSA1LjUyMjE0IDI5LjcxMTcgNS41MjIxNEg0Ni4xNzA2QzQ2Ljk3MjQgNS41MjIxNCA0Ny42MjQ3IDYuMTc2NDkgNDcuNjI0NyA2Ljk4MDQ3VjIzLjAyMjFaIiBmaWxsPSJ3aGl0ZSIvPg0KPC9zdmc+DQo=",
}

interface KeyboardSignalMap extends Lightning.Component.SignalMap {
  keyPressed(key: string): void;
  spacePressed(): void;
  backspacePressed(): void;
}

interface KeyboardTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: KeyboardSignalMap;
}

export default class Keyboard
  extends Lightning.Component<KeyboardTemplateSpec, KeyboardTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<KeyboardTemplateSpec>
{
  static override _template(): Lightning.Component.Template<KeyboardTemplateSpec> {
    return {
      flex: {
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
      },

      Keyboard: {
        w: 500,
        flex: {
          direction: "row",
          alignItems: "center",
          justifyContent: "center",
          wrap: true,
        },
      },

      SpecialKeys: {
        w: 500,
        flex: {
          direction: "row",
          alignItems: "center",
          justifyContent: "center",
          wrap: true,
        },

        Space: {
          w: 220,
          type: Key,
          width: 220,
          icon: Icons.spacebar,
        },

        BackSpace: {
          w: 220,
          type: Key,
          width: 220,
          icon: Icons.backspace,
        },
      },
    };
  }

  // Focus
  focusedSection: "main" | "special" = "main";
  mainIndex = 0;
  specialIndex = 0;

  // Class constants
  keyboardColumns = 6;

  numberOfKeys = 0;

  Keyboard = this.getByRef("Keyboard")!;
  Space = this.getByRef("SpecialKeys")!.getByRef("Space")!;
  BackSpace = this.getByRef("SpecialKeys")!.getByRef("BackSpace")!;

  // Current row and column calculations
  get selectedRow() {
    return Math.trunc(this.mainIndex / this.keyboardColumns) + 1;
  }

  get selectedColumn() {
    const lastItemNumberOnCurrentRow = this.selectedRow * this.keyboardColumns;
    return (
      this.keyboardColumns - (lastItemNumberOnCurrentRow - (this.mainIndex + 1))
    );
  }

  override _active() {
    Router.focusPage();
  }

  override _init() {
    const keys = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ];

    this.numberOfKeys = keys.length;

    keys.forEach((title: string) => {
      const key = this.stage.element<typeof Key>({
        type: Key,
        title,
      });
      this.Keyboard?.childList.add(key);
    });
  }

  getFocusedSection(focusedSection: "main" | "special") {
    if (focusedSection === "main") {
      return this.Keyboard.children[this.mainIndex] as Lightning.Component;
    }

    if (focusedSection === "special") {
      if (this.specialIndex === 0) {
        return this.Space;
      }
      return this.BackSpace;
    }
  }

  override _getFocused() {
    return this.getFocusedSection(this.focusedSection);
  }

  override _handleUp() {
    if (this.focusedSection === "main") {
      if (this.mainIndex < this.keyboardColumns) {
        return true;
      }

      if (this.mainIndex + 1 > this.keyboardColumns) {
        this.mainIndex -= this.keyboardColumns;
      }
    }
    this.focusedSection = "main";
  }

  override _handleDown() {
    if (this.focusedSection === "main") {
      if (this.mainIndex + this.keyboardColumns < this.numberOfKeys) {
        this.mainIndex += this.keyboardColumns;
        return true;
      }

      if (this.mainIndex + this.keyboardColumns - 2 > this.numberOfKeys) {
        this.focusedSection = "special";
        this.specialIndex = 1;
        return true;
      }

      if (this.mainIndex + this.keyboardColumns + 1 > this.numberOfKeys) {
        this.focusedSection = "special";
        this.specialIndex = 0;
        return true;
      }
    }
  }

  override _handleRight() {
    if (
      this.focusedSection === "main" &&
      this.mainIndex >= 0 &&
      this.mainIndex < this.numberOfKeys - 1
    ) {
      this.mainIndex += 1;
      return true;
    }

    if (
      this.focusedSection === "main" &&
      this.mainIndex + 1 === this.numberOfKeys
    ) {
      this.specialIndex = 0;
      this.focusedSection = "special";
      return true;
    }

    if (this.focusedSection === "special" && this.specialIndex === 0) {
      this.specialIndex = 1;
    }
  }

  override _handleLeft() {
    if (this.focusedSection === "main") {
      if (this.mainIndex > 0 && this.selectedColumn > 1) {
        this.mainIndex -= 1;
        return true;
      } else {
        return false;
      }
    }

    if (this.focusedSection === "special") {
      if (this.specialIndex === 1) {
        this.specialIndex = 0;
      } else {
        return false;
      }
    }
  }

  override _handleEnter() {
    if (this.focusedSection === "special") {
      this.signal(
        this.specialIndex === 0 ? "spacePressed" : "backspacePressed"
      );
    }

    if (this.focusedSection === "main") {
      const key = this._getFocused() as Key;
      this.signal("keyPressed", key.title || "");
    }
  }
}
