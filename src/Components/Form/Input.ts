import { Colors, Lightning } from "@lightningjs/sdk";
import { Theme } from "../../Utils/theme";

interface FieldTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Input: {
      Input: object;
    };
    Value: object;
  };

  valueText: string;
  isFocused: boolean;
}

export class Input
  extends Lightning.Component<FieldTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<FieldTemplateSpec>
{
  static override _template(): Lightning.Component.Template<FieldTemplateSpec> {
    return {
      w: 580,
      h: 60,

      Container: {
        flex: {
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
        },

        Input: {
          w: 580,
          h: 60,
          rect: true,
          color: Colors(Theme.White).get(),
          shader: {
            type: Lightning.shaders.RoundedRectangle,
            radius: 30,
            stroke: 7,
            strokeColor: Colors(Theme.White).get(),
          },
        },

        Value: {
          y: -44,
          text: {
            text: "",
            textColor: Colors(Theme.Secondary).get(),
            fontSize: 22,
            fontFace: "Avenir-Regular",
            textAlign: "center",
          },
        },
      },
    };
  }

  remainFocused = false;

  set valueText(text: string) {
    this.patch({
      Container: {
        Value: {
          text: { text },
        },
      },
    });
  }

  styleFocusedInput(isFocused: boolean) {
    this.patch({
      Container: {
        Input: {
          shader: isFocused
            ? {
                strokeColor: Colors(Theme.Light).get(),
              }
            : {
                strokeColor: Colors(Theme.White).get(),
              },
        },
      },
    });
  }

  set isFocused(isFocused: boolean) {
    this.styleFocusedInput(isFocused);
    this.remainFocused = isFocused;
  }

  override _focus() {
    this.styleFocusedInput(true);
  }

  override _unfocus() {
    this.styleFocusedInput(this.remainFocused);
    this.remainFocused = false;
  }
}
