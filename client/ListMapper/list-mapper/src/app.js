window.DEBUG_MODE = true;

import { PLATFORM } from 'aurelia-pal';
import {observable} from 'aurelia-framework';

import {commandList} from './resources/commandStorage/command-storage'
import './app.less';
import 'font-awesome/css/font-awesome.css';

export class App {
  @observable value;

  constructor() {
    this.showNavbar = false;
    this.showCommandPalett = false;
    this.suggestedList = null;
    this.key = 'name'
  }

  attached() {
    this.simpleCommand = commandList.simpleCommand;
  }

  submitCommand() {
    console.log('submit command')
  }

  toggleNavbarHandler() {
    this.showNavbar = !this.showNavbar;
  }

  configureRouter(config, router) {
    config.options.pushState = true; // responsable for not including # in url
    config.options.root = '/';
    config.title = 'List Mapper';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./resources/home'), 
        nav: true, title: 'Home' },
      { route: ['simpleList'], moduleId: PLATFORM.moduleName('./resources/elements/simple-list'), 
        nav: true, title: 'Simple List'},
        // Dropdown items for CSS Leveling
        {
          route: ['css-leveling/flex-box-leveling'], 
          moduleId: PLATFORM.moduleName('./resources/elements/flex-box-leveling'),
          nav:true, title: 'Flexbox Leveling', 
          settings: {
            dropdownId: 'cssLeveling',
            dropdownTitle: 'Css Leveling',
          }
        },
        {
          route: ['css-leveling/simple-table'], 
          moduleId: PLATFORM.moduleName('./resources/elements/simple-table'),
          nav:true, title: 'Simple Table', 
          settings: {
            dropdownId: 'cssLeveling',
            dropdownTitle: 'Css Leveling',
          }
        },
        // Dropdown items for Drag drop Leveling (interactjs)
        {
          route: ['drag-drop-leveling/initial'], 
          moduleId: PLATFORM.moduleName('./resources/elements/drag-drop/leveling/init'),
          nav:true, title: 'Init', 
          settings: {
            dropdownId: 'dragDropLeveling',
            dropdownTitle: 'Drag Drop Leveling',
          }
        },
        {
          route: ['drag-drop-leveling/drag-drop-ca'], 
          moduleId: PLATFORM.moduleName('./resources/elements/drag-drop/leveling/drag-drop-ca'),
          nav:true, title: 'Drag Drop Custom Attribute', 
          settings: {
            dropdownId: 'dragDropLeveling',
            dropdownTitle: 'Drag Drop Leveling',
          }
        },
        {
          route: ['drag-drop-leveling/drag-drop-v1'], 
          moduleId: PLATFORM.moduleName('./resources/elements/drag-drop/leveling/drag-drop-v1-ce'),
          nav: true, title: 'drag-drop-v1', 
          settings: {
            dropdownId: 'dragDropLeveling',
            dropdownTitle: 'Drag Drop Leveling',
          }
        },

    ]);
    this.router = router;
  }

}
