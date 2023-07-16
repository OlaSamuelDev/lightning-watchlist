import { Colors, Lightning } from "@lightningjs/sdk";
import { Theme } from "../../Utils/theme";

interface FieldTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Field: {
      Fields: object;
    };
    Text: object;
  };
  fieldText: string;
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

        Field: {
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

        Text: {
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

  shouldStayFocused = false;

  set fieldText(text: string) {
    this.patch({
      Container: {
        Text: {
          text: { text },
        },
      },
    });
  }

  makeFieldFocused(isFocused: boolean) {
    this.patch({
      Container: {
        Field: {
          shader: isFocused
            ? {
                strokeColor: Colors(Theme.Light).get(),
              }
            : {
                strokeColor: Colors(Theme.White).get(),
              },
        },
        Text: {
          color: Colors(isFocused ? Theme.Light : Theme.White).get(),
        },
      },
    });
  }

  set isFocused(isFocused: boolean) {
    this.makeFieldFocused(isFocused);
    this.shouldStayFocused = isFocused;
  }

  override _focus() {
    this.makeFieldFocused(true);
  }

  override _unfocus() {
    this.makeFieldFocused(this.shouldStayFocused);
    this.shouldStayFocused = false;
  }
}
