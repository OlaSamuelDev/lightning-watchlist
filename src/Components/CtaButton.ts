/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Lightning, Colors } from "@lightningjs/sdk";
import { Theme } from "../Utils/theme";

interface ButtonTemplateSpec extends Lightning.Component.TemplateSpec {
  Text: object;
  label: string;
}

interface ButtonSignalMap extends Lightning.Component.SignalMap {
  clearAll(): void;
}

interface ButtonTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: ButtonSignalMap;
}

export default class CtaButton
  extends Lightning.Component<ButtonTemplateSpec, ButtonTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<ButtonTemplateSpec>
{
  static override _template(): Lightning.Component.Template<ButtonTemplateSpec> {
    return {
      w: 350,
      h: 60,
      rect: true,
      color: Colors(Theme.Secondary).get(),
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 30,
      },
      flex: {
        justifyContent: "center",
        alignItems: "center",
      },

      Text: {
        y: 2,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 0,
        },
        text: {
          text: "",
          textColor: Colors(Theme.White).get(),
          fontFace: "Avenir-Regular",
          fontSize: 22,
          lineHeight: 22,
          verticalAlign: "middle",
          wordWrapWidth: 500,
        },
      },
    };
  }

  Text = this.getByRef("Text")!;

  set label(label: string) {
    this.Text.text!.text = label;
  }

  override _focus() {
    this.patch({
      color: Colors(Theme.Light).get(),
      Text: {
        color: Colors(Theme.Secondary).get(),
      },
    });
  }

  override _unfocus() {
    this.patch({
      color: Colors(Theme.Secondary).get(),
      Text: {
        color: Colors(Theme.White).get(),
      },
    });
  }
}
