/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Lightning, Router, Colors } from "@lightningjs/sdk";
import {
  ItemData,
  watchlistData$,
  updateHomeData,
} from "../../data/observables";
import CtaButton from "../CtaButton";
import { Theme } from "../../Utils/theme";
import Keyboard from "../Keyboard/Keyboard";
import itemsData from "../../data/items";
import { Input } from "./Input";

interface FormTemplateSpec extends Lightning.Component.TemplateSpec {
  Form: {
    HeadingTop: object;
    HeadingBottom: object;
    Inputs: {
      TitleLabel: object;
      Title: typeof Input;
      YearLabel: object;
      Year: typeof Input;
    };
    Buttons: {
      Save: typeof CtaButton;
      Cancel: typeof CtaButton;
    };
  };

  Keyboard: typeof Keyboard;

  movieTitle: string;
}

export class Form
  extends Lightning.Component<FormTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<FormTemplateSpec>
{
  static override _template(): Lightning.Component.Template<FormTemplateSpec> {
    return {
      w: 1300,
      h: 800,
      flex: {
        direction: "row",
        alignItems: "center",
      },

      Form: {
        w: 700,
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

        HeadingTop: {
          text: {
            text: "You are editing:",
            textColor: Colors(Theme.White).alpha(0.5).get(),
            fontSize: 22,
            wordWrapWidth: 400,
            wordWrap: true,
            fontFace: "Avenir-Regular",
            textAlign: "center",
          },
          flexItem: {
            marginBottom: 15,
          },
        },

        HeadingBottom: {
          text: {
            text: "Title",
            textColor: Colors(Theme.White).get(),
            fontSize: 32,
            wordWrapWidth: 500,
            wordWrap: true,
            fontFace: "Avenir-Regular",
            textAlign: "center",
          },
          flexItem: {
            marginBottom: 60,
          },
        },

        Inputs: {
          flex: {
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
          },
          flexItem: {
            marginBottom: 60,
          },

          TitleLabel: {
            text: {
              text: "Update Title:",
              textColor: Colors(Theme.White).alpha(0.5).get(),
              fontSize: 22,
              wordWrapWidth: 400,
              wordWrap: true,
              fontFace: "Avenir-Regular",
              textAlign: "center",
            },
            flexItem: {
              marginBottom: 15,
            },
          },

          Title: {
            type: Input,
            fieldText: "Title",
            flexItem: {
              marginBottom: 30,
            },
          },

          YearLabel: {
            text: {
              text: "Update Year:",
              textColor: Colors(Theme.White).alpha(0.5).get(),
              fontSize: 22,
              wordWrapWidth: 400,
              wordWrap: true,
              fontFace: "Avenir-Regular",
              textAlign: "center",
            },
            flexItem: {
              marginBottom: 15,
            },
          },

          Year: {
            type: Input,
            fieldText: "Year",
          },
        },

        Buttons: {
          flex: {
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
          },

          Save: {
            type: CtaButton,
            label: "Save Changes",
            flexItem: {
              marginBottom: 30,
            },
          },

          Cancel: {
            type: CtaButton,
            label: "Cancel",
          },
        },
      },

      Keyboard: {
        alpha: 0.5,
        type: Keyboard,
        flexItem: {
          marginLeft: 100,
        },

        signals: {
          keyPressed: "keyPressed",
          spacePressed: "spacePressed",
          backspacePressed: "backspacePressed",
        },
      },
    };
  }

  // Focus
  formFocusIndex = 0;
  buttonFocusIndex = 0;
  focusedSection: "keyboard" | "form" | "buttons" = "form";

  title = "";

  year = "";

  Title = this.getByRef("Form")!.getByRef("Inputs")!.getByRef("Title")!;
  Year = this.getByRef("Form")!.getByRef("Inputs")!.getByRef("Year")!;
  Save = this.getByRef("Form")!.getByRef("Buttons")!.getByRef("Save")!;
  Cancel = this.getByRef("Form")!.getByRef("Buttons")!.getByRef("Cancel")!;
  Keyboard = this.getByRef("Keyboard")!;

  set movieTitle(label: string) {
    this.title = label;

    const filteredData = itemsData.filter(
      (item: { title: string }) => item.title === label
    );

    if (filteredData.length > 0 && filteredData[0]) {
      this.year = filteredData[0].year.toString();

      this.patch({
        Form: {
          HeadingBottom: {
            text: {
              text: `"${this.title}"`,
            },
          },
          Inputs: {
            Title: {
              fieldText: this.title,
            },
            Year: {
              fieldText: this.year,
            },
          },
        },
      });
    }
  }

  getFocusedSection(section: "form" | "buttons" | "keyboard") {
    if (section === "form") {
      this.Keyboard.patch({
        smooth: {
          scale: 1,
          alpha: 0.5,
        },
      });

      if (this.formFocusIndex === 0) {
        return this.Title;
      }
      return this.Year;
    }

    if (section === "buttons") {
      this.Keyboard.patch({
        smooth: {
          scale: 1,
          alpha: 0.5,
        },
      });

      if (this.buttonFocusIndex === 0) {
        return this.Save;
      }
      return this.Cancel;
    }

    if (section === "keyboard") return this.getByRef("Keyboard");
  }

  override _getFocused() {
    return this.getFocusedSection(this.focusedSection);
  }

  keyPressed(key: string) {
    if (this.formFocusIndex === 0) {
      this.title = `${this.title}${key}`;
      this.Title.fieldText = this.title;
    } else {
      this.year = `${this.year}${key}`;
      this.Year.fieldText = this.year;
    }
  }

  spacePressed() {
    if (this.formFocusIndex === 0) {
      this.title = `${this.title} `;
      this.Title.fieldText = this.title;
    } else {
      this.year = `${this.year} `;
      this.Year.fieldText = this.year;
    }
  }

  backspacePressed() {
    if (this.formFocusIndex === 0) {
      this.title = this.title.substring(0, this.title.length - 1);
      this.Title.fieldText = this.title;
    } else {
      this.year = this.year.substring(0, this.year.length - 1);
      this.Year.fieldText = this.year;
    }
  }

  override _handleUp() {
    if (this.focusedSection === "form") {
      if (this.formFocusIndex === 1) {
        this.formFocusIndex = 0;
      }
      return true;
    }

    if (this.focusedSection === "buttons" && this.buttonFocusIndex === 1) {
      this.buttonFocusIndex = 0;
      return true;
    }

    if (this.focusedSection === "buttons" && this.buttonFocusIndex === 0) {
      this.formFocusIndex = 1;
      this.focusedSection = "form";
      return true;
    }
  }

  override _handleDown() {
    if (this.focusedSection === "form") {
      if (this.formFocusIndex === 1) {
        this.buttonFocusIndex = 0;
        this.focusedSection = "buttons";
      } else {
        this.formFocusIndex = 1;
      }
      return true;
    }

    if (this.focusedSection === "buttons") {
      if (this.buttonFocusIndex === 0) {
        this.buttonFocusIndex = 1;
      }
      return true;
    }

    return true;
  }

  override _handleLeft() {
    if (this.focusedSection === "keyboard") {
      this.focusedSection = "buttons";
      this.Title.isFocused = false;
      this.Year.isFocused = false;
      return true;
    }
  }

  override _handleEnter() {
    if (this.focusedSection === "form") {
      if (this.formFocusIndex === 0) {
        this.Title.isFocused = true;
      } else {
        this.Year.isFocused = true;
      }

      this.Keyboard.patch({
        smooth: {
          scale: 1.025,
          alpha: 1,
        },
      });

      this.focusedSection = "keyboard";
    }

    if (this.focusedSection === "buttons") {
      if (this.buttonFocusIndex === 0) {
        let bookMarkData: ItemData[] = [];
        watchlistData$().subscribe((itemsData) => {
          bookMarkData = itemsData;
        });

        const checkifMatch = itemsData.filter(
          (data) =>
            data.title === this.title && data.year.toString() === this.year
        );

        if (checkifMatch.length === 0) {
          const newData = itemsData.map((item) => {
            const itemData = { ...item, isBookmarked: false };
            bookMarkData.forEach((bookmark) => {
              if (bookmark.title === item.title) {
                itemData.isBookmarked = true;
              }
            });

            if (itemData.title === this.title) {
              itemData.title = this.title;
              itemData.year = parseInt(this.year, 10);
            }
            return itemData;
          });
          updateHomeData(newData);
        }
      }

      Router.navigate("home");
    }
  }
}
