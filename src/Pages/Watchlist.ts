// eslint-disable-next-line max-classes-per-file
import { Lightning } from "@lightningjs/sdk";

interface WatchlistTemplateSpec extends Lightning.Component.TemplateSpec {
  Watchlist: object;
}

export interface WatchlistTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export default class WatchlistPage
  extends Lightning.Component<WatchlistTemplateSpec, WatchlistTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<WatchlistTemplateSpec>
{
  static override _template(): Lightning.Component.Template<WatchlistTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
    };
  }
}
