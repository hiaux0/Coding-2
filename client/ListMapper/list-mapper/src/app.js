import {PLATFORM} from 'aurelia-pal';
import {inject} from 'aurelia-framework';

import {CommandCentral} from './resources/common/command-central';
import {commandList} from './resources/commandStorage/command-storage'
import {toggleJumpable, togglePersistJumpable} from './resources/common/jumpable';
import {JUMPABLE} from './application-key-bindings/app.keys';
import {darkTheme, lightTheme} from './resources/common/styles/themes';

import hotkeys from 'hotkeys-js';

import './app.less';
import 'font-awesome/css/font-awesome.css';

@inject(CommandCentral)
export class App {

  constructor(commandCentral) {
    this.commandCentral = commandCentral;

    this.showNavbar = false;
    this.showMouseCoords = false;
    this.suggestedList = null;
    this.key = 'name';

    this.darkTheme = darkTheme;
    this.lightTheme = lightTheme;

    this.x = null;
    this.y = null;
    document.addEventListener('mousemove', (ev) => {
      this.x = ev.x;
      this.y = ev.y;
    })
  }

  attached() {
    this.simpleCommand = commandList.simpleCommand;
    this.commandCentral.subscribeToCommandEvents({
      changeToDarkTheme: darkTheme,
      changeToLightTheme: lightTheme,
      jumpable: toggleJumpable,
      togglePersistJumpable: togglePersistJumpable,
      toggleMouseCoords: this.toggleMouseCoords.bind(this),
    });
    this.initDebugMode();
    this.initAppKeybindings();
  }

  initAppKeybindings() {
    let keyBinding = hotkeys.noConflict();
    hotkeys.filter = function () { return true }; // 2018-08-09 23:30:46 what does this do?

    keyBinding(JUMPABLE, () => { toggleJumpable(); });
  }

  toggleNavbarHandler() {
    this.showNavbar = !this.showNavbar;
  }

  toggleMouseCoords() {
    console.log(this.showMouseCoords)
    this.showMouseCoords = !this.showMouseCoords;
  }

  configureRouter(config, router) {
    config.options.pushState = true; // responsable for not including # in url
    config.options.root = '/';
    config.title = 'List Mapper';
    config.map([
      { route: ['', 'home'],
        name: 'home',
        moduleId: PLATFORM.moduleName('./resources/home'),
        nav: true, title: 'Home'
      },
      { route: ['simpleList'],
        moduleId: PLATFORM.moduleName('./resources/common/elements/simple-list'),
        nav: true, title: 'Simple List'
      },
      { route: ['code-block-map'],
        moduleId: PLATFORM.moduleName('./resources/elements/code-block-map/code-block-map'),
        nav: true, title: 'Code Block Map'
      },
        // Dropdown items Markdown Parser
        {
          route: ['markdown-parser/index'],
          moduleId: PLATFORM.moduleName('./resources/common/elements/markdown-parser'),
          nav:true, title: 'Markdown Parser',
          settings: {
            dropdownId: 'markdownParser',
            dropdownTitle: 'Markdown Parser',
          }
        },
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
          route: ['drag-drop-leveling/drag-drop-v1'],
          moduleId: PLATFORM.moduleName('./resources/elements/drag-drop/leveling/drag-drop-v1-ce'),
          nav: true, title: 'enable-drag-drop',
          settings: {
            dropdownId: 'dragDropLeveling',
            dropdownTitle: 'Drag Drop Leveling',
          }
        },
        {
          route: ['drag-drop-leveling/drag-drop-connect-itmes'],
          moduleId: PLATFORM.moduleName('./resources/elements/drag-drop/leveling/drag-drop-connect-items'),
          nav: true, title: 'drag-drop-connect-items',
          settings: {
            dropdownId: 'dragDropLeveling',
            dropdownTitle: 'drag drop connect items',
          }
        },

    ]);
    this.router = router;
  }

  initDebugMode() {
    // toggleJumpable();

    if (window.DEBUG_MODE.standardTheme === 'light') {
      this.lightTheme();
    }
  }
}


window.DEBUG_MODE = {
  commandPalett: false,
  standardTheme: 'dark', // should be persisted in db
}
