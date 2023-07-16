/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Lightning, Colors } from "@lightningjs/sdk";
import { Theme } from "../../Utils/theme";

export interface KeyTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
  Border: object;
  Container: {
    Icon: object;
    Title: object;
  };
  icon: string;
  width: number;
  title: string;
}

export class Key
  extends Lightning.Component<KeyTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<KeyTemplateSpec>
{
  Container = this.getByRef("Container")!;

  Background = this.getByRef("Background")!;

  TitleText = this.getByRef("Container")!.getByRef("Title")!;

  Icon = this.getByRef("Container")!.getByRef("Icon")!;

  static override _template(): Lightning.Component.Template<KeyTemplateSpec> {
    return {
      w: this.width,
      h: this.height,
      rect: true,
      color: Colors("transparent").get(),
      flexItem: {
        margin: 10,
      },

      Background: {
        color: Colors(Theme.Secondary).get(),
        rect: true,
        w: (w) => w,
        h: (h) => h,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: this.radius,
          stroke: 2,
          strokeColor: Colors(Theme.White).alpha(0.1).get(),
        },
      },

      Container: {
        w: (w) => w,
        h: (h) => h,
        flex: {
          justifyContent: "center",
          alignItems: "center",
        },

        Icon: {
          color: Colors(Theme.White).get(),
          texture: {},
        },

        Title: {
          text: {
            text: "",
            fontSize: 28,
            fontFace: "Avenir-Regular",
            textColor: Colors(Theme.White).get(),
          },
        },
      },
    };
  }

  static get width() {
    return 60;
  }

  static get height() {
    return 60;
  }

  static get radius() {
    return 30;
  }

  titleText = "";

  set title(value: string) {
    this.titleText = value;
    this.Container.patch({
      Title: { text: { text: value } },
    });
  }

  get title() {
    return this.titleText;
  }

  set icon(value: string) {
    this.Container.patch({
      Icon: { texture: Lightning.Tools.getSvgTexture(value, 69, 30) },
    });
  }

  set width(width: number) {
    this.patch({
      Background: { w: width },
      Container: { w: width },
    });
  }

  override _focus() {
    this.Background.color = Colors(Theme.Light).get();
    if (this.TitleText && this.TitleText.text) {
      this.TitleText.text.textColor = Colors(Theme.Secondary).get();
    }
    if (this.Icon && this.Icon.texture) {
      this.Icon.color = Colors(Theme.Secondary).get();
    }
  }

  override _unfocus() {
    this.Background.color = Colors(Theme.Secondary).get();
    if (this.TitleText && this.TitleText.text) {
      this.TitleText.text.textColor = Colors(Theme.White).get();
    }
    if (this.Icon && this.Icon.texture) {
      this.Icon.color = Colors(Theme.White).get();
    }
  }
}
