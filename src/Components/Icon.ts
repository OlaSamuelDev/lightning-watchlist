/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Lightning, Utils } from "@lightningjs/sdk";

interface IconTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: object;
  icon: { src: string; width: number; height: number };
}

export default class Icon
  extends Lightning.Component<IconTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<IconTemplateSpec>
{
  static override _template(): Lightning.Component.Template<IconTemplateSpec> {
    return {
      Container: { alpha: 1 },
    };
  }

  set icon(iconData: { src: string; width: number; height: number }) {
    const { src, width, height } = iconData;
    this.getByRef("Container")!.texture = Lightning.Tools.getSvgTexture(
      Utils.asset(src),
      width,
      height
    );
  }

  override _focus() {
    this.getByRef("Container")!.alpha = 1;
  }

  override _unfocus() {
    this.getByRef("Container")!.alpha = 0.3;
  }
}
