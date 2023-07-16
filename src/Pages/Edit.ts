/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Lightning, Router, Colors } from "@lightningjs/sdk";
import { Theme } from "../Utils/theme";
import { Form } from "../Components/Form/Form";

interface EditTemplateSpec extends Lightning.Component.TemplateSpec {
  Wrapper: {
    Form: typeof Form;
  };
}

export interface EditTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export default class Edit
  extends Lightning.Component<EditTemplateSpec, EditTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<EditTemplateSpec>
{
  static override _template(): Lightning.Component.Template<EditTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      color: Colors(Theme.Background).get(),
      flex: {
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
      },

      Wrapper: {
        flex: {
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
        },

        Form: {
          type: Form,
        },
      },
    };
  }

  Form = this.getByRef("Wrapper")!.getByRef("Form")!;

  override _active() {
    Router.focusPage();
    this.Form.movieTitle = this.params?.title || "";
  }

  override _getFocused() {
    return this.Form;
  }
}
