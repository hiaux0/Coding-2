import { PLATFORM } from "aurelia-pal";
import './app.less';


export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  configureRouter(config, router) {
    config.options.pushState = true; // responsable for not including # in url
    config.options.root = '/';
    config.title = 'List Mapper';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./resources/home'), 
        nav: true, title: "Home" },
      { route: ['simpleList'], moduleId: PLATFORM.moduleName('./resources/elements/simple-list'), 
        nav: true, title: "Simple List"},
        // Dropdown items for CSS Leveling
        {
          route: ['css-leveling/flex-box-leveling'], 
          moduleId: PLATFORM.moduleName('./resources/elements/flex-box-leveling'),
          nav:true, title: 'Flexbox Leveling', 
          settings: {
            dropdownId: 'cssLeveling',
            dropdownTitle: "Css Leveling",
          }
        },
        {
          route: ['css-leveling/simple-table'], 
          moduleId: PLATFORM.moduleName('./resources/elements/simple-table'),
          nav:true, title: 'Simple Table', 
          settings: {
            dropdownId: 'cssLeveling',
            dropdownTitle: "Css Leveling",
          }
        },
    ]);
    this.router = router;
  }
}
