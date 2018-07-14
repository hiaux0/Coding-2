import {bindable} from 'aurelia-framework';

export class CssLeveling {
  @bindable value;

  valueChanged(newValue, oldValue) {

  }

  routerConfig(config, router) {
    config.title = 'Css Leveling'
    config.map([
      { route: '', redirect: ''}
    ])
  }
}

